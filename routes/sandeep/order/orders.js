const Order = require("../../../models/sandeep/order/Order.js");
const Product = require("../../../models/sandeep/product/Product.js")
const router = require("express").Router();

router.route("/getCompleteOrdersForUser/:userId").get(async (req, res) => {
    const userId = req.params.userId;
    try {
        const orders = await Order.find({
            userId: userId,
            status: "completed"
        }).populate('products.product'); // Populate product details from Product schema

        const completeOrders = orders.map(order => {
            return {
                id: order._id,
                status: order.status,
                price: order.totalPrice,
                paymentMethod: order.payment,
                date: order.datePlaced,
                products: order.products.map(product => {
                    if (product.product) { // Check if product is populated
                      return {
                        id: product.product._id,
                        productName: product.product.name,
                        quantity: product.quantity
                      };
                    } else {
                      return {
                        id: null,
                        productName: 'Product not available', // You can handle missing products here
                        quantity: product.quantity
                      };
                    }
                  })
                  
            };
        });
        res.status(200).json(completeOrders);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to retrieve orders" });
    }
});


module.exports = router;