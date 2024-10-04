const express = require("express");
const router = express.Router();

const {
    sendAllProductsData,
    addProduct,
    getProductById,
    calculateProductDemand,
    getTopHighDemandProducts,
    getTopHighDemandCategories
} = require("../../controllers/thilan/demandAnalysisController");


// Get all products data
router.get("/allProducts", sendAllProductsData);

// Add Product
router.post("/addProduct", addProduct);

// Get a product by id
router.get("/product/:id", getProductById);

// Calculate demand for a product by id
router.get("/product/demand/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const demandData = await calculateProductDemand(id);
        res.status(200).json(demandData);
    } catch (error) {
        res.status(500).json({ message: "Error calculating demand", error: error.message });
    }
});

// Get top 7 high-demand products
router.get("/topHighDemandProducts", getTopHighDemandProducts);


// Get top 4 high-demand categories
// router.get("/topHighDemandCategories", getTopHighDemandCategories);
router.get("/topHighDemandCategories", async (req, res) => {
    try {
        const topCategories = await getTopHighDemandCategories();
        res.status(200).json(topCategories);
    } catch (error) {
        res.status(500).json({ message: "Error calculating top categories", error: error.message });
    }
});

module.exports = router;
