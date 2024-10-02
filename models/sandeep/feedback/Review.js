const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Customer', 
      required: true 
    },
    productId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Item', 
      required: true 
    },
    rating: { 
      type: Number, 
      required: true, 
      min: 1, 
      max: 5 
    },
    title: { 
      type: String, 
      maxlength: 500 
    },
    comment: { 
      type: String, 
      maxlength: 500 
    },
    images: [{
      type: String // URL or path to the image
    }],
    sentimentScore: { 
      type: Number, 
      default: null 
    },
    createdAt: { 
      type: Date, 
      default: Date.now 
    }
});

const Review = mongoose.model('review', ReviewSchema);
module.exports = Review;
