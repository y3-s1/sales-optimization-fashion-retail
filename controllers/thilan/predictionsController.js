const FashionProduct = require("../../models/thilan/FashionProduct");
const { getTopHighDemandCategories } = require("./demandAnalysisController");

// Helper function to calculate percentage growth
const calculateGrowthPercentage = (currentMonthSales, previousMonthSales) => {
  if (previousMonthSales === 0) {
    return currentMonthSales > 0 ? 100 : 0;
  }
  return ((currentMonthSales - previousMonthSales) / previousMonthSales) * 100;
};

// Function to predict price for a selected product
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

    // Calculate sales growth (last month vs previous month)
    const lastMonthSales = sales[sales.length - 1]?.count || 0;
    const previousMonthSales = sales[sales.length - 2]?.count || 0;
    const salesGrowth = calculateGrowthPercentage(lastMonthSales, previousMonthSales);

    // Fetch top high-demand categories
    const topCategories = await getTopHighDemandCategories(); // Removed res from this call
    if (!topCategories || !Array.isArray(topCategories)) {
      return res.status(500).json({ message: "Error fetching category performance" });
    }

    // Calculate demand factor based on category performance
    const categoryPerformance = topCategories.find(cat => cat.category === product.category);
    const categoryDemandFactor = categoryPerformance ? categoryPerformance.demand / 100 : 0;

    // Base price (current price of the product)
    const currentPrice = product.price;

    // Predict the price based on sales growth and category demand
    const predictedPrice = currentPrice * (1 + salesGrowth / 100) * (1 + categoryDemandFactor);

    // Return the predicted price
    res.status(200).json({
      productId: productId,
      currentPrice: currentPrice,
      predictedPrice: predictedPrice.toFixed(2),  // Return the predicted price rounded to 2 decimal places
      salesGrowth: salesGrowth.toFixed(2),
      averageSales: averageSales.toFixed(2),
      categoryDemandFactor: categoryDemandFactor.toFixed(2),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error predicting price", error: error.message });
  }
};







// Helper function to calculate sales predictions
const calculateSalesPredictions = (baseSales, priceFactor, months = 12) => {
  const predictions = [];
  for (let i = 0; i < months; i++) {
    const monthName = new Date(new Date().setMonth(new Date().getMonth() + i)).toLocaleString('default', { month: 'long' });
    // Simple logic: reduce sales by priceFactor (just for example purposes)
    const predictedSales = Math.max(0, baseSales - priceFactor * i); // Ensure sales don't go negative
    predictions.push({ month: monthName, predictedSales });
  }
  return predictions;
};

// Controller function to handle sales prediction based on price
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

    // Generate sales predictions for the next 12 months
    const predictions = calculateSalesPredictions(baseSales, priceFactor, 12);

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
