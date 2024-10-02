const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const LoyaltyRewards = require('../../../models/sandeep/loyalty/LoyaltyReward');
const LoyaltyConfig = require("../../../models/sandeep/loyalty/LoyaltyConfig");
const { applyLoyaltyPoints } = require('../../../utils/loyalty');
const Customer = require('../../../models/sandeep/user/Customer');
const UserActivity = require('../../../models/sandeep/loyalty/UserActivity');

const router = require("express").Router();

// Multer configuration for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = 'uploads/rewards/';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images only!');
    }
  }
}).single('image');

router.route('/set-conditions').post(async (req, res) => {
    try {
      const { type, conditions } = req.body;
      console.log("create")
      // Validate type field
      if (!['purchasing', 'actions'].includes(type)) {
        return res.status(400).json({ error: 'Invalid type. Must be "purchasing" or "actions".' });
      }
  
      // Find the existing configuration for the specified type
      const config = await LoyaltyConfig.findOne({ type });
  
      if (config) {
        // Append new conditions to existing conditions
        config.conditions = config.conditions.concat(conditions);
        await config.save();
        res.status(200).json({ message: 'Conditions appended successfully', config });
      } else {
        // If no config exists, create a new one
        const newConfig = new LoyaltyConfig({ type, conditions });
        await newConfig.save();
        res.status(201).json({ message: 'New conditions created successfully', config: newConfig });
      }
    } catch (error) {
      console.error('Error updating conditions:', error);
      res.status(400).json({ error: 'Error updating conditions', details: error.message });
    }
  });



  router.route('/update-condition').put(async (req, res) => {
    try {
      const { type, identifier, update } = req.body; // Expecting { type: 'purchasing', identifier: { amount: 100 }, update: { points: 20 } }
  
      // Validate type field
      if (!['purchasing', 'actions'].includes(type)) {
        return res.status(400).json({ error: 'Invalid type. Must be "purchasing" or "actions".' });
      }
  
      // Find the existing configuration for the specified type
      const config = await LoyaltyConfig.findOne({ type });
  
      if (!config) {
        return res.status(404).json({ error: 'Configuration not found for the specified type.' });
      }
  
      // Find and update the specific condition within the configuration
      let conditionUpdated = false;
  
      if (type === 'purchasing') {
        // Update condition for purchasing type based on 'amount' identifier
        config.conditions = config.conditions.map(cond => {
          if (cond.amount === identifier.amount) {
            conditionUpdated = true;
            return { ...cond, ...update }; // Apply the updates to the matched condition
          }
          return cond;
        });
      } else if (type === 'actions') {
        // Update condition for actions type based on 'action' identifier
        config.conditions = config.conditions.map(cond => {
          if (cond.action === identifier.action) {
            conditionUpdated = true;
            return { ...cond, ...update }; // Apply the updates to the matched condition
          }
          return cond;
        });
      }
  
      if (!conditionUpdated) {
        return res.status(404).json({ error: 'Condition not found for the given identifier.' });
      }
  
      // Save the updated configuration
      await config.save();
      res.status(200).json({ message: 'Condition updated successfully', config });
  
    } catch (error) {
      console.error('Error updating condition:', error);
      res.status(400).json({ error: 'Error updating condition', details: error.message });
    }
  });

  // Route to get all loyalty conditions
router.get('/conditions', async (req, res) => {
  try {
    const conditions = await LoyaltyConfig.find();
    res.json(conditions);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
});

  router.route('/conditions/all').get(async (req, res) => {
    try {
      // Fetch both types of conditions from the database
      const purchasingConfig = await LoyaltyConfig.findOne({ type: 'purchasing' });
      const actionsConfig = await LoyaltyConfig.findOne({ type: 'actions' });
  
      // Prepare the response data
      const conditions = {
        purchasing: purchasingConfig ? purchasingConfig.conditions : [],
        actions: actionsConfig ? actionsConfig.conditions : []
      };
  
      // Send the combined data as a response
      res.status(200).json({ message: 'All conditions fetched successfully', conditions });
    } catch (error) {
      console.error('Error fetching conditions:', error);
      res.status(400).json({ error: 'Error fetching conditions', details: error.message });
    }
  });

  router.route('/redeem/:userId').post(async (req, res) => {
    const { userId } = req.params;
    const { rewardId, pointsRequired } = req.body;
  
    try {
      // Find user and reward
      const user = await Customer.findById(userId);
      const reward = await LoyaltyRewards.findById(rewardId);
  
      if (!user || !reward) {
        return res.status(404).json({ message: 'User or Reward not found' });
      }
  
      // Check if user has enough points
      if (user.points < pointsRequired) {
        return res.status(400).json({ message: 'Not enough points' });
      }
  
      // Generate a unique reward code
      const uniqueCode = `REWARD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  
      // Deduct points and save the unique reward code
      user.points -= pointsRequired;
      user.redeemedRewards.push({ rewardId, uniqueCode });
      await user.save();
  
      // Send back the unique reward code
      res.status(200).json({ uniqueCode });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error redeeming reward' });
    }
  });


  // Route to fetch redeemed rewards for a specific user
router.route('/redeemed-rewards/:userId').get(async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await Customer.findById(userId).populate('redeemedRewards.rewardId'); // Populate the reward details

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send back redeemed rewards
    res.status(200).json(user.redeemedRewards);
  } catch (error) {
    console.error('Error fetching redeemed rewards:', error);
    res.status(500).json({ message: 'Error fetching redeemed rewards' });
  }
});



router.post('/apply-promo-code', async (req, res) => {
  const { promoCode, userId } = req.body;

  try {
    // Find the customer by userId
    const customer = await Customer.findById(userId).populate('redeemedRewards.rewardId');

    if (!customer) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the promo code exists in the customer's redeemedRewards
    const redeemedReward = customer.redeemedRewards.find(reward => reward.uniqueCode === promoCode);

    if (!redeemedReward) {
      return res.status(400).json({ error: 'Invalid promo code' });
    }

    // Get the reward details from the LoyaltyRewards model
    const reward = await LoyaltyRewards.findById(redeemedReward.rewardId);

    if (!reward) {
      return res.status(404).json({ error: 'Reward not found' });
    }

    let discountAmount = 0;
    let discountType = 'flat'; // Default to flat LKR discount

    // Handle different reward categories (e.g., percentage discount or fixed LKR voucher)
    if (reward.category === 'Percentage Discount') {
      discountType = 'percentage';
      discountAmount = reward.discountValue; // Percentage discount, e.g., 10%
    } else if (reward.category === 'Flat Reduction') {
      discountType = 'flat';
      discountAmount = reward.discountValue; // Fixed discount, e.g., 100 LKR
    }

    // Remove the redeemed reward from the customer's redeemedRewards array
    customer.redeemedRewards = customer.redeemedRewards.filter(reward => reward.uniqueCode !== promoCode);

    // Save the updated customer model
    await customer.save();


    // Send back the discount amount and type
    return res.status(200).json({ discountAmount, discountType, isValid: true });
  } catch (error) {
    console.error('Error applying promo code:', error);
    return res.status(500).json({ error: 'Error applying promo code' });
  }
});

  
router.post('/add-reward', upload, async (req, res) => {
  try {
    const { name, pointsRequired, category, minPoints, maxPoints, discountValue, freeShippingAmount } = req.body;

    const imageUrl = req.file ? `/loyalty/uploads/rewards/${req.file.filename}` : null;

    console.log(category)
    // Create a new reward object
    const newReward = new LoyaltyRewards({
      name,
      pointsRequired,
      category,
      availabilityRange: { minPoints, maxPoints },
      imageUrl
    });

    // Handle fields based on the category
    if (category === 'Percentage Discount' || category === 'Flat Reduction') {
      newReward.discountValue = discountValue;
      if (!discountValue) {
        return res.status(400).json({ error: 'Discount value is required for Percentage Discount or Flat Reduction.' });
      }
    } else if (category === 'Free Shipping') {
      newReward.freeShippingAmount = freeShippingAmount || 250; // Use default 250 if not provided
    }

    // Save the reward
    const reward = await newReward.save();
    res.status(201).json({ message: 'Reward added successfully', reward });
  } catch (error) {
    console.error('Error adding reward:', error);
    res.status(400).json({ error: 'Error adding reward', details: error.message });
  }
});


  
// Serve static files from uploads folder
  router.use('/uploads', express.static(path.join(__dirname, '../../../uploads')));


  router.route('/rewards').get(async (req, res) => {
    try {
      // Fetch all rewards from the database
      const rewards = await LoyaltyRewards.find();
  
      // Send a successful response with the retrieved rewards
      res.status(200).json(rewards);
    } catch (error) {
      // Handle errors and send an error response
      console.error('Error fetching rewards:', error);
      res.status(400).json({ error: 'Error fetching rewards', details: error.message });
    }
  });




  // router.get('/analytics', async (req, res) => {
  //   try {
      
  //     const loyaltyCustomers = await LoyaltyConfig.countDocuments({});
  
      
  //     const activities = await UserActivity.find({}).populate('userId', 'name'); 
  
      
  //     const totalVisits = activities.reduce((sum, activity) => sum + activity.visitCount, 0);
  //     const averageVisits = totalVisits / activities.length;
  
  //     const totalSpend = activities.reduce((sum, activity) => sum + activity.totalSpent, 0);
  //     const averageSpend = totalSpend / activities.length;
  
      
  //     const rewards = await LoyaltyRewards.find({});
  //     const redemptions = await RewardRedemption.find({});
      
  //     const pointsRedemptionRates = rewards.map(reward => {
  //       const redemptionsForReward = redemptions.filter(r => r.rewardId.toString() === reward._id.toString()).length;
  //       return {
  //         reward: reward.name,
  //         redemptions: redemptionsForReward
  //       };
  //     });
  
  //     const popularRewards = pointsRedemptionRates
  //       .sort((a, b) => b.redemptions - a.redemptions)
  //       .slice(0, 5)
  //       .map(rate => rate.reward);
  
      
  //     const userEngagement = activities.map(activity => {
  //       const loginCount = activity.engagementLogs.filter(log => log.type === 'login').length;
  //       const purchaseCount = activity.engagementLogs.filter(log => log.type === 'purchase').length;
  //       const redemptionCount = activity.engagementLogs.filter(log => log.type === 'redemption').length;
  
  //       return {
  //         user: activity.userId.name, 
  //         logins: loginCount,
  //         purchases: purchaseCount,
  //         redemptions: redemptionCount
  //       };
  //     });
  
  //     res.status(200).json({
  //       loyaltyCustomers,
  //       averageVisits,
  //       averageSpend,
  //       pointsRedemptionRates,
  //       popularRewards,
  //       userEngagement, 
  //     });
  //   } catch (error) {
  //     console.error('Error fetching analytics data:', error);
  //     res.status(500).json({ error: 'Error fetching analytics data' });
  //   }
  // });


  // router.get('/analytics', async (req, res) => {
  //   try {
  //     // Fetch total loyalty customers
  //     const loyaltyCustomers = await Customer.countDocuments({});
  
  //     // Fetch all user activity data
  //     const activities = await UserActivity.find({}).populate('userId', 'customer_name'); // Using 'customer_name' as per your Customer schema
  
  //     // Calculate average visits and average spend
  //     const totalVisits = activities.reduce((sum, activity) => sum + activity.visitCount, 0);
  //     const averageVisits = activities.length > 0 ? totalVisits / activities.length : 0;
  
  //     const totalSpend = activities.reduce((sum, activity) => sum + activity.totalSpent, 0);
  //     const averageSpend = activities.length > 0 ? totalSpend / activities.length : 0;
  
  //     // Fetch points redemption rates from both LoyaltyRewards and RewardRedemption models
  //     const rewards = await LoyaltyRewards.find({});
  //     const redemptions = await RewardRedemption.find({});
  
  //     const pointsRedemptionRates = rewards.map(reward => {
  //       const redemptionsForReward = redemptions.filter(r => r.rewardId.toString() === reward._id.toString()).length;
  //       return {
  //         reward: reward.name,
  //         redemptions: redemptionsForReward
  //       };
  //     });
  
  //     // Get top 5 popular rewards by redemption count
  //     const popularRewards = pointsRedemptionRates
  //       .sort((a, b) => b.redemptions - a.redemptions)
  //       .slice(0, 5)
  //       .map(rate => rate.reward);
  
  //     // User engagement data from UserActivity logs
  //     const userEngagement = activities.map(activity => {
  //       const loginCount = activity.engagementLogs.filter(log => log.type === 'login').length;
  //       const purchaseCount = activity.engagementLogs.filter(log => log.type === 'purchase').length;
  //       const redemptionCount = activity.engagementLogs.filter(log => log.type === 'redemption').length;
  
  //       return {
  //         user: activity.userId.customer_name, // Assuming 'customer_name' in Customer model
  //         logins: loginCount,
  //         purchases: purchaseCount,
  //         redemptions: redemptionCount
  //       };
  //     });
  
  //     res.status(200).json({
  //       loyaltyCustomers,
  //       averageVisits,
  //       averageSpend,
  //       pointsRedemptionRates,
  //       popularRewards,
  //       userEngagement, // Real engagement data
  //     });
  //   } catch (error) {
  //     console.error('Error fetching analytics data:', error);
  //     res.status(500).json({ error: 'Error fetching analytics data' });
  //   }
  // });
  


  router.get('/analytics', async (req, res) => {
    try {
      // Fetch total loyalty customers
      const loyaltyCustomers = await Customer.countDocuments({});
  
      // Fetch all user activity data
      const activities = await UserActivity.find({}).populate('userId', 'customer_name'); // Using 'customer_name' as per your Customer schema
  
      // Calculate average visits and average spend
      const totalVisits = activities.reduce((sum, activity) => sum + activity.visitCount, 0);
      const averageVisits = activities.length > 0 ? totalVisits / activities.length : 0;
  
      const totalSpend = activities.reduce((sum, activity) => sum + activity.totalSpent, 0);
      const averageSpend = activities.length > 0 ? totalSpend / activities.length : 0;
  
      // Fetch all redeemed rewards from customers
      const customers = await Customer.find({}).populate('redeemedRewards.rewardId'); // Populating reward details
  
      // Calculate points redemption rates from redeemed rewards in Customer model
      const rewards = await LoyaltyRewards.find({});
      
      // Mapping rewards to redemption counts
      const pointsRedemptionRates = rewards.map(reward => {
        const redemptionsForReward = customers.reduce((count, customer) => {
          return count + customer.redeemedRewards.filter(r => r.rewardId._id.toString() === reward._id.toString()).length;
        }, 0);
        
        return {
          reward: reward.name,
          redemptions: redemptionsForReward
        };
      });
  
      // Get top 5 popular rewards by redemption count
      const popularRewards = pointsRedemptionRates
        .sort((a, b) => b.redemptions - a.redemptions)
        .slice(0, 5)
        .map(rate => rate.reward);
  
      // User engagement data from UserActivity logs
      const userEngagement = activities.map(activity => {
        const loginCount = activity.engagementLogs.filter(log => log.type === 'login').length;
        const purchaseCount = activity.engagementLogs.filter(log => log.type === 'purchase').length;
        const redemptionCount = activity.engagementLogs.filter(log => log.type === 'redemption').length;
  
        return {
          id: activity.userId._id,
          user: activity.userId.customer_name, // Assuming 'customer_name' in Customer model
          logins: loginCount,
          purchases: purchaseCount,
          redemptions: redemptionCount
        };
      });

      const topCustomers = activities
      .sort((a, b) => b.totalSpent - a.totalSpent) // Sort by total spent
      .slice(0, 5) // Get top 5 customers
      .map(activity => ({
        user: activity.userId.customer_name,
        totalSpent: activity.totalSpent,
        visits: activity.visitCount
      }));
  
      res.status(200).json({
        loyaltyCustomers,
        averageVisits,
        averageSpend,
        pointsRedemptionRates,
        popularRewards,
        userEngagement, // Real engagement data
        topCustomers, // Top customers by spend
        rewardsRedeemed: pointsRedemptionRates, // Redeemed rewards count
      });
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      res.status(500).json({ error: 'Error fetching analytics data' });
    }
  });
  
  




module.exports = router;