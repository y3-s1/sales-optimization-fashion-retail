const express = require('express');
const { updateProductPrice } = require('../../controllers/thilan/productController');
const router = express.Router();

// Route to update product price
router.put('/updatePrice/:productId', updateProductPrice);

module.exports = router;
