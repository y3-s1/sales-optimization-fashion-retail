const LoyaltyConfig = require("../../../models/sandeep/loyalty/LoyaltyConfig");
const LoyaltyRewards = require("../../../models/sandeep/loyalty/LoyaltyReward");
// const { verifyToken } = require("../../../utils/veryfyToken.js");

const router = require("express").Router();

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

  
  router.route('/add-reward').post(async (req, res) => {
    try {
      const { name, pointsRequired, category, minPoints, maxPoints } = req.body;
      
      // Create a new reward document
      const newReward = new LoyaltyRewards({
        name,
        pointsRequired,
        category,
        availabilityRange: { minPoints, maxPoints }
      });
  
      // Save the new reward to the database
      const reward = await newReward.save();
  
      // Send success response with the saved reward
      res.status(201).json({ message: 'Reward added successfully', reward });
    } catch (error) {
      // Handle errors and send an error response
      console.error('Error adding reward:', error);
      res.status(400).json({ error: 'Error adding reward', details: error.message });
    }
  });


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




module.exports = router;