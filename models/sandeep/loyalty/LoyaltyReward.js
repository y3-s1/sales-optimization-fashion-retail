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
            required: true,
            enum: ['Percentage Discount', 'Flat Reduction', 'Free Shipping'] // Defining valid categories
        },
        discountValue: { // For 'Percentage Discount' or 'Flat Reduction'
            type: Number, 
            required: function() {
                return this.category === 'Percentage Discount' || this.category === 'Flat Reduction';
            }
        },
        freeShippingAmount: { // Only used if the category is 'Free Shipping'
            type: Number, 
            default: 250, // Default value for free shipping reduction
            required: function() {
                return this.category === 'Free Shipping';
            }
        },
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
        createdAt: { 
            type: Date, 
            default: Date.now 
        }
    }
);

// Pre-save validation logic to ensure the correct fields are filled based on category
LoyaltyRewardSchema.pre('save', function(next) {
    if (this.category === 'Percentage Discount' && !this.discountValue) {
        return next(new Error('Percentage Discount requires a discount value.'));
    } else if (this.category === 'Flat Reduction' && !this.discountValue) {
        return next(new Error('Flat Reduction requires a reduction amount.'));
    } else if (this.category === 'Free Shipping' && !this.freeShippingAmount) {
        return next(new Error('Free Shipping requires a shipping reduction amount.'));
    }
    next();
});

const LoyaltyRewards = mongoose.model("loyaltyRewards", LoyaltyRewardSchema);
module.exports = LoyaltyRewards;
