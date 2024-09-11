const express = require("express");
const router = express.Router();

const {sendHighDemandData, sendAllProductsData} = require("../../controllers/thilan/demandAnalysisController");

//Get High Demand data
router.get("/highDemandData", sendHighDemandData);

//Get all products data
router.get("/allProducts", sendAllProductsData);


module.exports = router;