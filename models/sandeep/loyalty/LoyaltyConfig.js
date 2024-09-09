// models/LoyaltyConfig.js
const mongoose = require('mongoose');

const LoyaltyConfigSchema = new mongoose.Schema(
    {
        type: { 
            type: String,
            required: true,
            enum: ['earningConditions', 'rewardRanges']
        }, // Define the type of configuration
        conditions: { 
            type: Object,
            required: true 
        }, // Store earning conditions, e.g., { spendingThreshold: 10, pointsPerThreshold: 1 }
        createdAt: { 
            type: Date,
            default: Date.now }
});

const LoyaltyConfig = mongoose.model("loyaltyConfig", LoyaltyConfigSchema)
module.exports = LoyaltyConfig;
