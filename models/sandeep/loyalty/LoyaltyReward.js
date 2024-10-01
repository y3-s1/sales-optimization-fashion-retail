const mongoose = require('mongoose');

const LoyaltyRewardSchema = new mongoose.Schema(
    {
        name: { 
            type: String, 
            required: true 
        },
        pointsRequired: { 
            type: Number, 
            required: true 
        },
        category: { 
            type: String, 
            required: true 
        }, // Example: 'Discounts', 'Free Shipping'
        availabilityRange: { // Defines the range of points where the reward is available
            minPoints: { 
                type: Number, 
                default: 0 
            },
            maxPoints: { 
                type: Number, 
                required: true 
            }
        },
        imageUrl: { 
            type: String, // URL of the uploaded image
            required: false 
        },
        createdAt: { type: Date, default: Date.now }
    }
);

const LoyaltyRewards = mongoose.model("loyaltyRewards", LoyaltyRewardSchema);
module.exports = LoyaltyRewards;
