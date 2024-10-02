const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the sales sub-schema
const salesSchema = new Schema({
  year: { type: String, required: true },
  month: { type: String, required: true },
  count: { type: Number, required: true },
  avgPrice: { type: Number, required: true }
}, { _id: false });

// Define the reviews sub-schema
const reviewSchema = new Schema({
  customerName: { type: String },
  reviewText: { type: String, required: true },
  rating: { type: Number, default: 0 },  // Rating out of 5, optional
  reviewDate: { type: Date, default: Date.now }
}, { _id: false });

// Define the main product schema
const fashionProductSchema = new Schema({
  productId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  averageOrder: { type: Number, required: true },
  currentStock: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  category: { type: String, required: true },
  rating: { type: Number, required: true },
  sales: [salesSchema],
  manufacture: { type: String, required: true },
  
  // New reviews field
  reviews: [reviewSchema],  // Embedding the reviews sub-schema
  
  material: { type: String },
  season: { type: String },
  gender: { type: String },
  ageGroup: { type: String },
  brand: { type: String },
  discounts: [{ percentage: Number, startDate: Date, endDate: Date }],
  color: { type: String },
  sizesAvailable: [{ size: String, stock: Number }],
  isTrending: { type: Boolean, default: false },
  ratingHistory: [{ date: Date, rating: Number }]
}, { timestamps: true });

module.exports = mongoose.model('FashionProduct', fashionProductSchema);
