const FashionProduct = require('../../models/thilan/FashionProduct');

// Controller to update the price of a product
const updateProductPrice = async (req, res) => {
  try {
    const { productId } = req.params;
    const { newPrice } = req.body;

    // Find the product by ID and update the price
    const product = await FashionProduct.findByIdAndUpdate(
      productId,
      { $set: { price: newPrice } },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Return the updated product
    res.status(200).json({ message: 'Price updated successfully', product });
  } catch (error) {
    console.error('Error updating product price:', error);
    res.status(500).json({ message: 'Error updating product price', error: error.message });
  }
};

module.exports = {
  updateProductPrice,
};
