const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// Define the schema for Order
const FashionOrderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    products: [
    {
        product: {
            type: mongoose.Types.ObjectId,
            ref: "Item",
            required: true,
        },
        productName: String,
        quantity: Number,
        pricePerItem: Number,
    },
    ],
    totalPrice: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ["pending", "processing", "readyToDelivery" , "onDelivery" , "completed" , "cancelled"],
        default: "completed",
    },
    datePlaced: {
        type: Date,
        default: Date.now
    },
    payment: {
      type: String,
      required: true,
    },
    shippingAddress: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
});
// OrderSchema.pre('save', async function(next) {
//     // Hash the username if it exists
//     if (this.username) {
//         const salt = await bcrypt.genSalt(10);
//         this.hashedUsername = await bcrypt.hash(this.username, salt);
//     }
//     next();
// });
// Create the Order model
const FashionOrderModel = mongoose.model('FashionOrder', FashionOrderSchema);

module.exports = FashionOrderModel;