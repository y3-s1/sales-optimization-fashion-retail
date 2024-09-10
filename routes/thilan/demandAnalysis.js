const express = require("express");
const router = express.Router();

const sendHighDemandData = require("../../controllers/thilan/demandAnalysisController")

//Get High Demand data
router.get("/highDemandData", sendHighDemandData);


module.exports = router;