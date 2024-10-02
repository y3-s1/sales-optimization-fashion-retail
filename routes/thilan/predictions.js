const express = require("express");
const router = express.Router();

const { predictProductPrice, predictSalesForPrice, predictNextMonthStock } = require("../../controllers/thilan/predictionsController");

// Route to predict the price for a selected product
router.get("/predictPrice/:productId", predictProductPrice);

// Route to predict sales for the next 12 months for a given product and price
router.post('/predictSales', predictSalesForPrice);

// Route to predict stock for the next month
router.get("/predictStock/:productId", predictNextMonthStock);


module.exports = router;
