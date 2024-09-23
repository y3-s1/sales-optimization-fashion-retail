const express = require("express");
const router = express.Router();

const {sendHighDemandData, sendAllProductsData, addProduct, getProductById} = require("../../controllers/thilan/demandAnalysisController");

//Get High Demand data
router.get("/highDemandData", sendHighDemandData);

//Get all products data
router.get("/allProducts", sendAllProductsData);

//Add Product
router.post("/addProduct", addProduct);

//get a product by id
router.get("/product/:id", getProductById);


module.exports = router;