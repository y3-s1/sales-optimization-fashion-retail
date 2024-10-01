const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const LoyaltyRewards = require('../../../models/sandeep/loyalty/LoyaltyReward');
const LoyaltyConfig = require("../../../models/sandeep/loyalty/LoyaltyConfig");
const { applyLoyaltyPoints } = require('../../../utils/loyalty');

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

  
  router.post('/add-reward', upload, async (req, res) => {
    try {
      const { name, pointsRequired, category, minPoints, maxPoints } = req.body;
      
      const imageUrl = req.file ? `/loyalty/uploads/rewards/${req.file.filename}` : null;
  
      const newReward = new LoyaltyRewards({
        name,
        pointsRequired,
        category,
        availabilityRange: { minPoints, maxPoints },
        imageUrl
      });
  
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




  router.get('/analytics', async (req, res) => {
    try {
      // Fetch total loyalty customers
      const loyaltyCustomers = await LoyaltyConfig.countDocuments({});
  
      // Fetch all user activity data
      const activities = await UserActivity.find({}).populate('userId', 'name'); // Assuming User model has 'name'
  
      // Calculate average visits and average spend
      const totalVisits = activities.reduce((sum, activity) => sum + activity.visitCount, 0);
      const averageVisits = totalVisits / activities.length;
  
      const totalSpend = activities.reduce((sum, activity) => sum + activity.totalSpent, 0);
      const averageSpend = totalSpend / activities.length;
  
      // Fetch points redemption rates
      const rewards = await LoyaltyRewards.find({});
      const redemptions = await RewardRedemption.find({});
      
      const pointsRedemptionRates = rewards.map(reward => {
        const redemptionsForReward = redemptions.filter(r => r.rewardId.toString() === reward._id.toString()).length;
        return {
          reward: reward.name,
          redemptions: redemptionsForReward
        };
      });
  
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
          user: activity.userId.name, // Assuming 'name' field in User model
          logins: loginCount,
          purchases: purchaseCount,
          redemptions: redemptionCount
        };
      });
  
      res.status(200).json({
        loyaltyCustomers,
        averageVisits,
        averageSpend,
        pointsRedemptionRates,
        popularRewards,
        userEngagement, // Real engagement data
      });
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      res.status(500).json({ error: 'Error fetching analytics data' });
    }
  });
  




module.exports = router;