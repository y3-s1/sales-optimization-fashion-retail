const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        required: true,
        //enum: ["Dresses", "Tops", "Bottoms", "Outerwear", "Accessories", "Footwear", "Lingerie", "Activewear", "Bags","Other"]
    },
    brand: {
        type: String,
        trim: true
    },
    size: {
        type: String, // Array of sizes
        required: true,
        //enum: ["XS", "S", "M", "L", "XL", "XXL"] // You can modify the sizes based on business needs
    },
    color: {
        type: String, 
        required: true
    },
    image: {
        type: String,
      },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    discount: {
        type: Number,
        default: 0,
        min: 0,
        max: 100 // Discount is in percentage
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    
        SKU: {
        type: String, // Stock Keeping Unit
        trim: true
    },

    material: {
        type: String,
        enum: [
            "Cotton",
            "Polyester",
            "Wool",
            "Silk",
            "Linen",
            "Leather",
            "Nylon",
            "Acrylic",
            "Rayon",
            "Spandex",
            "Other"
        ],
        trim: true
    },
    careInstructions: {
        type: String,
        trim: true
    },
    availability: {
        type: String,
        enum: ["In Stock", "Out of Stock", "Pre-Order"],
        default: "In Stock"
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    reviews: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            comment: { type: String },
            rating: { type: Number, min: 0, max: 5 }
        }
    ],
    isOnSale: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
