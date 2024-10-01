const FashionProduct = require("../../models/thilan/FashionProduct");
const natural = require('natural');
const sentimentAnalyzer = new natural.SentimentAnalyzer('English', natural.PorterStemmer, 'afinn');

const {
    highDemandProducts,
    highDemandCategory1,
    highDemandCategory2,
    highDemandCategory3,
    highDemandCategory4
} = require("../../data/demandAnalysis/highDemandData");

const allProducts = require("../../data/demandAnalysis/products");


// Send high demand data
const sendHighDemandData = (req, res) => {
    const highDemandData = {
        highDemandProducts, 
        highDemandCategory1, 
        highDemandCategory2, 
        highDemandCategory3, 
        highDemandCategory4
    };
    res.status(200).json(highDemandData); 
};

// Send all products data
const sendAllProductsData = async (req, res) => {
    try {
      const products = await FashionProduct.find({});
      res.json(products);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Error" });
    }
};

// Add a new product
const addProduct = async (req, res) => {
    try {
        const { productId, name, price, description, averageOrder, currentStock, imageUrl, category, rating, sales, manufacture } = req.body;

        // Create a new product instance
        const newProduct = new FashionProduct({
            productId,
            name,
            price,
            description,
            averageOrder,
            currentStock,
            imageUrl,
            category,
            rating,
            sales,
            manufacture
        });

        // Save the product to the database
        const savedProduct = await newProduct.save();

        res.status(201).json({ message: "Product added successfully!", product: savedProduct });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to add product" });
    }
};

// Get product by ID
const getProductById = async (req, res) => {
    try {
        const product = await FashionProduct.findById(req.params.id);
        res.json(product);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
      }
};




// Function to calculate product demand
const calculateProductDemand = async (productId) => {
    try {
      // Find the product by its ID
      const product = await FashionProduct.findById(productId);
      
      if (!product) {
        throw new Error('Product not found');
      }
  
      // Calculate sales-based demand (same logic as before)
      const productSales = product.sales;
      const totalSales = productSales.reduce((total, sale) => total + sale.count, 0);
      const averageDemand = totalSales / productSales.length;
  
      // Find related products in the same category
      const query = { 
        category: product.category, 
        productId: { $ne: productId }
      };
  
      if (product.material) query.material = product.material;
      if (product.season) query.season = product.season;
      if (product.gender) query.gender = product.gender;
      if (product.ageGroup) query.ageGroup = product.ageGroup;
      if (product.brand) query.brand = product.brand;
  
      const relatedProducts = await FashionProduct.find(query);
      let relatedTotalSales = 0;
      let relatedTotalMonths = 0;
  
      relatedProducts.forEach((relatedProduct) => {
        relatedProduct.sales.forEach((sale) => {
          relatedTotalSales += sale.count;
        });
        relatedTotalMonths += relatedProduct.sales.length;
      });
  
      const relatedAverageDemand = relatedTotalSales / (relatedTotalMonths || 1);
  
      // Final demand: a weighted average of the product's demand and related products' demand
      const demand = (0.7 * averageDemand) + (0.3 * relatedAverageDemand);
  
      // Sentiment Analysis of Customer Reviews
      let totalSentiment = 0;
      let reviewCount = 0;
  
      if (product.reviews && product.reviews.length > 0) {
        product.reviews.forEach((review) => {
          const tokens = review.reviewText.split(' ');  // Tokenize the review text
          const sentiment = sentimentAnalyzer.getSentiment(tokens);  // Analyze sentiment
          totalSentiment += sentiment;
          reviewCount++;
        });
      }
  
      const averageSentiment = reviewCount ? totalSentiment / reviewCount : 0;
      let demandAdjustment = 1 + (averageSentiment / 10);  // Adjust demand based on sentiment (scaled)
  
      // Adjust demand based on seasonality, trends, and reviews
      if (product.season === 'Winter' && new Date().getMonth() >= 10) {
        demandAdjustment *= 1.2;
      } else if (product.season === 'Summer' && new Date().getMonth() <= 5) {
        demandAdjustment *= 1.2;
      }
  
      if (product.isTrending) {
        demandAdjustment *= 1.3;
      }
  
      const finalDemand = demand * demandAdjustment;
  
      return {
        productId: productId,
        name: product.name,
        category: product.category,
        img: product.imageUrl,
        demand: finalDemand.toFixed(2),
        demandDetails: {
          averageProductDemand: averageDemand.toFixed(2),
          relatedProductDemand: relatedAverageDemand.toFixed(2),
          averageSentiment: averageSentiment.toFixed(2),
          demandAdjustment: demandAdjustment.toFixed(2)
        }
      };
    } catch (error) {
      console.error(error);
      throw new Error('Error calculating product demand');
    }
  };




  // Function to calculate demand for each product and find top 7 high demand products
  const getTopHighDemandProducts = async (req, res) => {
    try {
      // Fetch all products from the database
      const products = await FashionProduct.find({});
      if (!products || products.length === 0) {
        return res.status(404).json({ message: "No products found" });
      }

      // Calculate demand for each product
      const demandPromises = products.map(async (product) => {
        const demandData = await calculateProductDemand(product._id);
        return {
          productId: product._id,
          name: product.name,
          img: product.imageUrl,
          category:product.category,
          demand: parseFloat(demandData.demand),  // Convert demand to a number for sorting
          details: demandData.demandDetails
        };
      });

      // Resolve all demand calculations
      const demandResults = await Promise.all(demandPromises);

      // Sort products by demand in descending order
      const sortedProducts = demandResults.sort((a, b) => b.demand - a.demand);

      // Get the top 7 high-demand products
      const top7Products = sortedProducts.slice(0, 7);

      // Return the top 7 products
      res.status(200).json(top7Products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching high-demand products", error: error.message });
    }
  };






// Helper function to calculate percentage growth
const calculateGrowthPercentage = (currentMonthSales, previousMonthSales) => {
  if (previousMonthSales === 0) {
    return currentMonthSales > 0 ? 100 : 0;
  }
  return ((currentMonthSales - previousMonthSales) / previousMonthSales) * 100;
};

// Helper function to get month names for the past 7 months
const getLast7Months = () => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const result = [];
  const currentMonth = new Date().getMonth();

  for (let i = 0; i < 7; i++) {
    const monthIndex = (currentMonth - i + 12) % 12;
    result.unshift(months[monthIndex]);
  }
  return result;
};

// Function to get top 4 high-demand categories
const getTopHighDemandCategories = async (req, res) => {
  try {
    // Fetch all products
    const products = await FashionProduct.find({});
    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    // Get month names for the past 7 months
    const last7Months = getLast7Months();

    // Group products by category and calculate demand
    const categoryDemand = {};

    products.forEach((product) => {
      const { category, sales } = product;

      // Ensure the category exists in categoryDemand
      if (!categoryDemand[category]) {
        categoryDemand[category] = {
          demand: 0,
          salesCounts: [],
          lastMonthSales: 0,
          previousMonthSales: 0,
        };
      }

      // Get sales for the last 7 months (sales array may have fewer than 7 entries)
      const last7MonthsSales = sales.slice(-7).map((sale, index) => ({
        name: last7Months[index],  // Get the corresponding month name
        sales: sale.count
      }));

      // Calculate total demand for the last 7 months
      const totalDemand = last7MonthsSales.reduce((acc, sale) => acc + sale.sales, 0);

      // Calculate sales for the last month and previous month
      const lastMonthSales = sales.length > 0 ? sales[sales.length - 1].count : 0;
      const previousMonthSales = sales.length > 1 ? sales[sales.length - 2].count : 0;

      categoryDemand[category].demand += totalDemand;  // Sum demand for the category
      categoryDemand[category].salesCounts = last7MonthsSales;  // Set sales counts for the last 7 months
      categoryDemand[category].lastMonthSales += lastMonthSales;  // Sum sales of the last month
      categoryDemand[category].previousMonthSales += previousMonthSales;  // Sum sales of the previous month
    });

    // Convert the object into an array and calculate growth percentages
    const categoriesArray = Object.keys(categoryDemand).map((category) => {
      const { demand, salesCounts, lastMonthSales, previousMonthSales } = categoryDemand[category];
      const salesGrowth = calculateGrowthPercentage(lastMonthSales, previousMonthSales);

      return {
        category,
        demand,
        salesGrowth: salesGrowth.toFixed(2),  // Percentage growth of sales
        salesCounts: salesCounts  // Last 7 months' sales counts with month names
      };
    });

    // Sort categories by demand in descending order and get the top 4
    const top4Categories = categoriesArray
      .sort((a, b) => b.demand - a.demand)
      .slice(0, 4);  // Get top 4 categories

    res.status(200).json(top4Categories);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching top high-demand categories", error: error.message });
  }
};




module.exports = {
    sendHighDemandData,
    sendAllProductsData,
    addProduct,
    getProductById,
    calculateProductDemand,
    getTopHighDemandProducts,
    getTopHighDemandCategories
};
