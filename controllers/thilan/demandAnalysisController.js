const FashionProduct = require("../../models/thilan/FashionProduct");

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

module.exports = {
    sendHighDemandData,
    sendAllProductsData,
    addProduct,
    getProductById
};
