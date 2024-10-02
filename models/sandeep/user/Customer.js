const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    customer_name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: false,
    },
    contact_num: {
      type: String,
      required: true,
    },
    points: { 
      type: Number, 
      default: 0 
    },
    redeemedRewards: [
      {
        rewardId: { 
          type: mongoose.Types.ObjectId, 
          ref: 'loyaltyRewards', // Assuming the rewards are stored in a 'Reward' model
          required: true 
        },
        uniqueCode: { 
          type: String, 
          required: true 
        }
      }],
    isAdmin: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

const Customer = mongoose.model("customer", customerSchema);
module.exports = Customer;