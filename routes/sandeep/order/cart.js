const Item = require("../../../models/inventory/Item.js");
const Cart = require("../../../models/sandeep/order/FashionCart.js");

const router = require("express").Router();

router.post('/add/:productId', async (req, res) => {
    try {
      const userId = req.body.userId;
      const productId = req.params.productId;
      const quantity = req.body.quantity;
  
      // Fetch the product to get its price
      const product = await Item.findById(productId);
      if (!product) return res.status(404).json({ error: 'Product not found' });
  
      const price = product.price;
      const totalPrice = price * quantity;
  
      // Check if the product already exists in the cart
      const existingCartItem = await Cart.findOne({ customerId: userId, product_id: productId });
  
      if (existingCartItem) {
        // Update quantity and total price if the product exists
        existingCartItem.quantity += quantity;
        existingCartItem.totalPrice = existingCartItem.quantity * price;
        await existingCartItem.save();
        return res.status(200).json(existingCartItem);
      } else {
        // Add a new product to the cart if it doesn't exist
        const newCartItem = new Cart({
          customerId: userId,
          product_id: productId,
          quantity,
          price,
          totalPrice,
          status: 'inBag'
        });
  
        const savedCartItem = await newCartItem.save();
        return res.status(200).json(savedCartItem);
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.post('/allcart', async (req, res) => {
    try {
      const items = await Cart.find({});
      const totalPrice = items.reduce((total, item) => total + item.totalPrice, 0);
  
      res.status(200).json({
        items,
        totalPrice
      });
    } catch (error) {
      console.error("Error fetching items from cart:", error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

  router.delete('/remove/:id', async (req, res) => {
    const cartItemId = req.params.id;
    try {
      const removedItem = await Cart.findByIdAndDelete(cartItemId);
      if (!removedItem) {
        return res.status(404).json({ error: "Item not found" });
      }
      res.json({ message: "Item removed from cart successfully." });
    } catch (error) {
      res.status(500).json({ message: "Error removing item from cart." });
    }
  });
  

  router.put('/update/:id', async (req, res) => {
    try {
      const itemId = req.params.id;
      const { quantity } = req.body;
  
      const cartItem = await Cart.findById(itemId);
      if (!cartItem) return res.status(404).json({ error: 'Cart item not found' });
  
      // Update quantity and total price
      cartItem.quantity = quantity;
      cartItem.totalPrice = cartItem.price * quantity;
      await cartItem.save();
  
      res.status(200).json(cartItem);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  


  router.get('/user/:customerId', async (req, res) => {
    const customerId = req.params.customerId;
    try {
      const cartItems = await Cart.find({ customerId }).populate('product_id');
      console.log(cartItems)
      const mergedItems = cartItems.map(item => (
        console.log('first', item.product_id),
        {
        ...item.product_id._doc,
        item_id: item._id,
        quantity: item.quantity,
        totalPrice: item.totalPrice
      }));
  
      res.status(200).json(mergedItems);
    } catch (error) {
      console.error("Error fetching items from cart for user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  


  router.get('/checkout', async (req, res) => {
    try {
      const selectedItems = req.query.selectedItems;
      const cartItems = await Cart.find({ _id: { $in: selectedItems } }).populate('product_id');
  
      const totalPrice = cartItems.reduce((total, item) => total + item.totalPrice, 0);
      const products = cartItems.map(item => ({
        details: {
          product_name: item.product_id.name,
          product_image: item.product_id.image
        },
        order: {
          product_Id: item.product_id._id,
          product_price: item.price,
          total_price: item.totalPrice,
          quantity: item.quantity
        }
      }));
  
      res.status(200).json({
        cart: {
          itemCount: cartItems.length,
          totalPrice
        },
        products
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  

module.exports = router;