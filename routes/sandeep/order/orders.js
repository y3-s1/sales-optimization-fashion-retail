// const Order = require("../../../models/sandeep/order/FashionOrder.js");
// const Product = require("../../../models/sandeep/product/Product.js")
// const router = require("express").Router();

// router.route("/getCompleteOrdersForUser/:userId").get(async (req, res) => {
//     const userId = req.params.userId;
//     try {
//         const orders = await Order.find({
//             userId: userId,
//             status: "completed"
//         }).populate('products.product_id'); 

//         const completeOrders = orders.map(order => {
//             return {
//                 id: order._id,
//                 status: order.status,
//                 price: order.totalPrice,
//                 paymentMethod: order.payment,
//                 date: order.datePlaced,
//                 products: order.products.map(product => {
//                     if (product.product) { 
//                       return {
//                         id: product.product._id,
//                         productName: product.product.name,
//                         quantity: product.quantity
//                       };
//                     } else {
//                       return {
//                         id: null,
//                         productName: 'Product not available', 
//                         quantity: product.quantity
//                       };
//                     }
//                   })
                  
//             };
//         });
//         res.status(200).json(completeOrders);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ message: "Failed to retrieve orders" });
//     }
// });


// module.exports = router;

const FashionOrderModel = require("../../../models/sandeep/order/FashionOrder.js");
const Item = require("../../../models/inventory/Item.js");
const router = require("express").Router();
const { awardPoints } = require('../../../utils/loyalty');

// Get ongoing orders for a user
router.route("/getOngoingOrdersForUser/:userId").get(async (req, res) => {
  const userId = req.params.userId;
  try {
    const ongoingStatuses = ["pending", "processing", "readyToDelivery", "onDelivery"];
    const orders = await FashionOrderModel.find({
      userId: userId,
      status: { $in: ongoingStatuses }
    });

    const completedOrdersCount = await FashionOrderModel.countDocuments({
      userId: userId,
      status: "completed"
    });

    const cancelledOrdersCount = await FashionOrderModel.countDocuments({
      userId,
      status: "cancelled"
    });

    const ongoingOrders = orders.map(order => ({
      id: order._id,
      status: order.status,
      price: order.totalPrice,
      paymentMethod: order.payment,
      date: order.datePlaced
    }));

    res.status(200).json({
      ongoingOrders: ongoingOrders,
      completedOrdersCount: completedOrdersCount,
      cancelledOrdersCount: cancelledOrdersCount
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to retrieve orders" });
  }
});

// Get completed orders for a user
router.route("/getCompleteOrdersForUser/:userId").get(async (req, res) => {
  const userId = req.params.userId;
  try {
    console.log(userId)
    const orders = await FashionOrderModel.find({
      userId: userId,
      status: "completed"
    })
    .populate({
      path: 'products.product',  // Populate the 'product' field in 'products'
      model: 'Item',             // Reference the Item model (product details)
      select: 'name image price'  // Select only necessary fields for performance
    });


    console.log(orders)
    const completeOrders = orders.map(order => ({
      id: order._id,
      status: order.status,
      price: order.totalPrice,
      paymentMethod: order.payment,
      date: order.datePlaced,
      products: order.products.map(product => {
                            if (product.product) { 
                              return {
                                id: product.product._id,
                                productName: product.product.name,
                                quantity: product.quantity
                              };
                            } else {
                              return {
                                id: null,
                                productName: 'Product not available', 
                                quantity: product.quantity
                              };
                            }
                          })
    }));

    res.status(200).json(completeOrders);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to retrieve orders" });
  }
});

// Get details of a single order
router.route('/getOneOrder/:orderId').get(async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const singleOrder = await FashionOrderModel.findById(orderId).populate('products.product_id');

    const formattedOrder = {
      id: singleOrder._id,
      address: singleOrder.shippingAddress,
      date: singleOrder.datePlaced,
      price: singleOrder.totalPrice.toFixed(2),
      status: singleOrder.status,
      paymentMethod: singleOrder.payment,
      orderDetails: singleOrder.products.map(product => ({
        productId: product.product._id,
        productName: product.product.name,
        quantity: product.quantity,
        price: product.pricePerItem.toFixed(2),
        totalPrice: (product.quantity * product.pricePerItem).toFixed(2)
      }))
    };

    res.status(200).json(formattedOrder);
  } catch (error) {
    console.error('Error fetching single orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Place a new order
router.route('/placeOrder/:userId').post(async (req, res) => {
  try {
    const userId = req.params.userId;
    const { user, products } = req.body;
    const { totalPrice, payment, address, contactNumber } = user;

    const productsArray = products.map(product => ({
      product: product.productId,
      quantity: product.quantity,
      pricePerItem: product.pricePerItem
    }));

    const newOrder = new FashionOrderModel({
      userId,
      products: productsArray,
      totalPrice,
      payment,
      shippingAddress: address,
      contactNumber
    });

    const savedOrder = await newOrder.save();
    console.log('save order', savedOrder)
    await awardPoints(userId, 'purchasing', totalPrice);
    res.status(200).json(savedOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to place order" });
  }
});

// Cancel an order
router.route("/cancelOrder/:id").put(async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await FashionOrderModel.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    order.status = "cancelled";
    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to cancel order" });
  }
});

// Get all pending orders
router.route("/getAllPendingOrders").get(async (req, res) => {
  try {
    const pendingOrders = await FashionOrderModel.find({ status: "pending" });

    const formattedOrders = pendingOrders.map(order => ({
      id: order._id,
      userId: order.userId,
      status: order.status,
      price: order.totalPrice.toFixed(2),
      paymentMethod: order.payment,
      date: order.datePlaced,
      shippingAddress: order.shippingAddress,
      contactNumber: order.contactNumber,
      orderDetails: order.products.map(product => ({
        productName: product.productName,
        productId: product.product,
        quantity: product.quantity,
        price: product.pricePerItem,
        totalPrice: (product.quantity * product.pricePerItem).toFixed(2)
      }))
    }));

    res.status(200).json(formattedOrders);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to retrieve pending orders" });
  }
});

// Set all pending orders to processing
router.route("/setAllPendingToProcessing").put(async (req, res) => {
  try {
    const updatedOrders = await FashionOrderModel.updateMany(
      { status: "pending" },
      { $set: { status: "processing" } }
    );

    if (updatedOrders.modifiedCount === 0) {
      return res.status(404).json({ message: "No pending orders found" });
    }

    res.status(200).json({ message: "All pending orders set to processing" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update orders to processing" });
  }
});

// Continue with the remaining routes similarly, updating statuses and fetching orders as per the new `FashionOrderModel`.

module.exports = router;



