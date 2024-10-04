// models/LoyaltyConfig.js
const mongoose = require('mongoose');

// Define sub-schema for purchasing conditions
const PurchasingConditionSchema = new mongoose.Schema({
  amount: { type: Number, required: true }, // Amount spent to qualify
  points: { type: Number, required: true }  // Points awarded
});

// Define sub-schema for action-based conditions
const ActionConditionSchema = new mongoose.Schema({
  action: { type: String, required: true }, // Action name (e.g., 'signUp', 'firstPurchase')
  points: { type: Number, required: true }  // Points awarded
});

// Main schema for Loyalty Configurations
const LoyaltyConfigSchema = new mongoose.Schema({
  type: { 
    type: String,
    required: true,
    enum: ['purchasing', 'actions'] // Define valid types of configurations
  },
  conditions: { 
    type: mongoose.Schema.Types.Mixed, // Can store an array of either purchasing or action conditions
    required: true,
    validate: {
      validator: function(value) {
        // Custom validation: checks the conditions based on the type field
        if (this.type === 'purchasing') {
          // Check if conditions match the PurchasingConditionSchema format
          return Array.isArray(value) && value.every(cond => cond.amount && cond.points);
        }
        if (this.type === 'actions') {
          // Check if conditions match the ActionConditionSchema format
          return Array.isArray(value) && value.every(cond => cond.action && cond.points);
        }
        return false;
      },
      message: props => `${props.value} is not a valid condition format for the type ${props.type}`
    }
  },
  createdAt: { 
    type: Date,
    default: Date.now 
  }
});

const LoyaltyConfig = mongoose.model("LoyaltyConfig", LoyaltyConfigSchema);
module.exports = LoyaltyConfig;
