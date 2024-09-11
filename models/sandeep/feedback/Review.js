const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Customer', 
      required: true 
    },
    productId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Product', 
      required: true 
    },
    rating: { 
      type: Number, 
      required: true, 
      min: 1, 
      max: 5 
    },
    comment: { 
      type: String, 
      maxlength: 500 
    },
    sentimentScore: { 
      type: Number, // Sentiment score if you are integrating sentiment analysis
      default: null 
    },
    createdAt: { 
      type: Date, 
      default: Date.now 
    }
  });
  
const Review = mongoose.model('review', ReviewSchema);
module.exports = Review;