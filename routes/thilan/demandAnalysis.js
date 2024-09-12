const express = require("express");
const router = express.Router();

const {sendHighDemandData, sendAllProductsData, addProduct} = require("../../controllers/thilan/demandAnalysisController");

//Get High Demand data
router.get("/highDemandData", sendHighDemandData);

//Get all products data
router.get("/allProducts", sendAllProductsData);

//Add Product
router.post("/addProduct", addProduct);


module.exports = router;