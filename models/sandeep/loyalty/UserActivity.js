// models/UserActivity.js
const mongoose = require('mongoose');

// Schema for tracking user activity and engagement
const UserActivitySchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true, 
    ref: 'User' // assuming you have a User model
  },
  visitCount: { 
    type: Number, 
    default: 0 
  },
  purchaseCount: { 
    type: Number, 
    default: 0 
  },
  totalSpent: { 
    type: Number, 
    default: 0.0 // In currency
  },
  lastActivity: { 
    type: Date, 
    default: Date.now 
  },
  engagementLogs: [
    {
      type: { type: String, enum: ['login', 'purchase', 'redemption'], required: true },
      pointsUsed: { type: Number }, // Used only for redemptions
      createdAt: { type: Date, default: Date.now }
    }
  ] // Log of engagement events
});

const UserActivity = mongoose.model('UserActivity', UserActivitySchema);
module.exports = UserActivity;
