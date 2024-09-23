const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the sales sub-schema
const salesSchema = new Schema({
  year: {
    type: String,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  avgPrice: {
    type: Number,
    required: true,
  }
}, { _id: false });


// Define the main product schema
const fashionProductSchema = new Schema({
  productId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  averageOrder: {
    type: Number,
    required: true
  },
  currentStock: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  sales: [salesSchema],  // Embedding the sales sub-schema
  manufacture: {
    type: String,
    required: true
  }
},
{ timestamps: true }
);


module.exports = mongoose.model('FashionProduct', fashionProductSchema);
