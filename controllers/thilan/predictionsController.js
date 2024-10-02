const FashionProduct = require("../../models/thilan/FashionProduct");
const { getTopHighDemandCategories } = require("./demandAnalysisController");

// Helper function to calculate percentage growth
const calculateGrowthPercentage = (currentMonthSales, previousMonthSales) => {
  if (previousMonthSales === 0) {
    return currentMonthSales > 0 ? 100 : 0;
  }
  return ((currentMonthSales - previousMonthSales) / previousMonthSales) * 100;
};

// Function to predict price for a selected product using the average price of past months
const predictProductPrice = async (req, res) => {
  try {
    const { productId } = req.params;

    // Fetch the selected product
    const product = await FashionProduct.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Get the product's historical sales data (last 7 months)
    const sales = product.sales.slice(-7); // Last 7 months of sales
    const totalSales = sales.reduce((sum, sale) => sum + sale.count, 0);
    const averageSales = totalSales / sales.length;

    // Calculate average price over the past 7 months
    const totalPrices = sales.reduce((sum, sale) => sum + sale.avgPrice, 0);
    const averagePrice = totalPrices / sales.length;  // Use average price instead of the current price

    // Calculate sales growth (last month vs previous month)
    const lastMonthSales = sales[sales.length - 1]?.count || 0;
    const previousMonthSales = sales[sales.length - 2]?.count || 0;
    const salesGrowth = calculateGrowthPercentage(lastMonthSales, previousMonthSales);

    // Fetch top high-demand categories
    const topCategories = await getTopHighDemandCategories();
    if (!topCategories || !Array.isArray(topCategories)) {
      return res.status(500).json({ message: "Error fetching category performance" });
    }

    // Calculate demand factor based on category performance
    // const categoryPerformance = topCategories.find(cat => cat.category === product.category);
    // const categoryDemandFactor = categoryPerformance ? categoryPerformance.demand / 100 : 0;

    // Predict the price based on sales growth and category demand
    const predictedPrice = averagePrice * (1 + salesGrowth / 100);

    // Return the predicted price
    res.status(200).json({
      productId: productId,
      averagePrice: averagePrice.toFixed(2),  // Return the calculated average price
      predictedPrice: predictedPrice.toFixed(2),  // Return the predicted price rounded to 2 decimal places
      salesGrowth: salesGrowth.toFixed(2),
      averageSales: averageSales.toFixed(2),
      // categoryDemandFactor: categoryDemandFactor.toFixed(2),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error predicting price", error: error.message });
  }
};










// Helper function to calculate sales predictions with seasonal trends
const calculateSalesPredictions = (baseSales, priceFactor, seasonalTrends, months = 12) => {
  const predictions = [];
  
  for (let i = 0; i < months; i++) {
    const futureDate = new Date(new Date().setMonth(new Date().getMonth() + i));
    const monthName = futureDate.toLocaleString('default', { month: 'long' });
    const monthIndex = futureDate.getMonth();  // Get the index of the future month

    // Calculate base sales prediction with price factor
    let predictedSales = Math.max(0, baseSales - priceFactor * i); // Ensure sales don't go negative

    // Apply the seasonal trend for the predicted month
    if (seasonalTrends[monthIndex]) {
      predictedSales *= seasonalTrends[monthIndex]; // Adjust sales by the seasonal trend
    }

    predictions.push({ month: monthName, predictedSales });
  }

  return predictions;
};

// Helper function to calculate seasonal trends
const calculateSeasonalTrends = (sales) => {
  const monthlySales = Array(12).fill(0);  // Array to store total sales for each month (Jan-Dec)
  const monthlyCounts = Array(12).fill(0); // Array to store the number of records per month

  // Sum sales by month across all years in the historical data
  sales.forEach(sale => {
    const saleMonthIndex = new Date(sale.year, new Date(sale.month + " 1").getMonth()).getMonth();  // Get the month index
    monthlySales[saleMonthIndex] += sale.count;
    monthlyCounts[saleMonthIndex] += 1;
  });

  // Calculate the average sales for each month (Jan-Dec) and normalize them
  const seasonalTrends = monthlySales.map((totalSales, index) => {
    return monthlyCounts[index] > 0 ? totalSales / monthlyCounts[index] : 1;  // Avoid division by 0
  });

  // Normalize trends to center them around 1 (so months with no significant trends don't affect the predictions)
  const maxSales = Math.max(...seasonalTrends);
  return seasonalTrends.map(trend => trend / maxSales);  // Normalize trends
};

// Controller function to handle sales prediction based on price, considering seasonal trends
const predictSalesForPrice = async (req, res) => {
  try {
    const { productId, analyzingPrice } = req.body;  // Assume price is sent in the body
    if (!productId || !analyzingPrice) {
      return res.status(400).json({ message: "Missing productId or analyzingPrice" });
    }

    // Find the product by ID
    const product = await FashionProduct.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Get base sales data from the product (use the average sales from the past months)
    const pastSales = product.sales.slice(-12);  // Get last 12 months of sales data
    const totalSales = pastSales.reduce((sum, sale) => sum + sale.count, 0);
    const baseSales = totalSales / pastSales.length;  // Calculate average sales

    // Calculate price factor (example: how different the analyzing price is from the current price)
    const priceFactor = (product.price - analyzingPrice) / product.price;

    // Calculate seasonal trends based on past sales
    const seasonalTrends = calculateSeasonalTrends(product.sales);

    // Generate sales predictions for the next 12 months, considering seasonal trends
    const predictions = calculateSalesPredictions(baseSales, priceFactor, seasonalTrends, 12);

    // Return the predicted sales data
    res.status(200).json({ predictions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error predicting sales", error: error.message });
  }
};









module.exports = {
  predictProductPrice,
  predictSalesForPrice,
};
