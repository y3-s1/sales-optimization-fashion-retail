const express = require('express');
const { updateProductPrice } = require('../../controllers/thilan/productController');
const router = express.Router();
const FashionProduct = require('../../models/thilan/FashionProduct');

// Route to update product price
router.put('/updatePrice/:productId', updateProductPrice);




// Route to update a fashion product
router.put('/update/:id', async (req, res) => {
    try {
      const productId = req.params.id;
      const updateData = req.body; // Data to update passed in the request body
  
      // Find and update the product by its ID, only updating the fields in updateData
      const updatedProduct = await FashionProduct.findByIdAndUpdate(
        productId,
        { $set: updateData }, // Use $set to update only the passed fields
        { new: true, runValidators: true } // Return the updated document and run validation
      );
  
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
      res.status(500).json({ message: 'Error updating product', error: error.message });
    }
  });




module.exports = router;
