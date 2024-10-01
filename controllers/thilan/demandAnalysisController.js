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
        productName: product.name,
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





module.exports = {
    sendHighDemandData,
    sendAllProductsData,
    addProduct,
    getProductById,
    calculateProductDemand,
    getTopHighDemandProducts  
};
