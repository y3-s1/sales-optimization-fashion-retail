// utils/loyalty.js
const LoyaltyConfig = require('../models/sandeep/loyalty/LoyaltyConfig');
const UserActivity = require('../models/sandeep/loyalty/UserActivity');
const Customer = require('../models/sandeep/user/Customer');

async function awardPoints(userId, actionType, purchaseAmount = 0) {
  try {
    // Fetch loyalty configuration based on the action type (purchase, review, etc.)
    let loyaltyConfig = {};
    if (actionType == 'purchasing') {
        loyaltyConfig = await LoyaltyConfig.findOne({ type: 'purchasing' });
    }else {

        loyaltyConfig = await LoyaltyConfig.findOne({ type: 'actions', "conditions.action": actionType });
    }

    if (!loyaltyConfig) {
      throw new Error('No loyalty configuration found for this action');
    }

    // Calculate points based on the type of action

  
      // Determine points based on action
      let points = 0;
  
      if (actionType === 'purchasing' && loyaltyConfig) {
        // Calculate points based on the purchase amount by finding the maximum points
        const matchingConditions = loyaltyConfig.conditions.filter(cond => purchaseAmount >= cond.amount);
        
        // If there are matching conditions, find the one with the highest points
        if (matchingConditions.length > 0) {
          const maxPointsCondition = matchingConditions.reduce((max, cond) => cond.points > max ? cond.points : max, 0);
          points = maxPointsCondition;
        }
      } else if (loyaltyConfig) {
        // Assign points for actions like 'register', 'review', etc.
        const condition = loyaltyConfig.conditions.find(cond => cond.action === actionType);
        if (condition) points = condition.points;
      }
      
  
      const customer = await Customer.findById(userId);
      if (!customer) {
        throw new Error('Customer not found');
      }
      // Special case: Birthday reward
      const today = new Date();
      const customerBirthday = customer.dob ? new Date(customer.dob) : null;
      if (actionType === 'birthday' && customerBirthday && customerBirthday.getMonth() === today.getMonth() && customerBirthday.getDate() === today.getDate()) {
        // Award birthday points (assuming a config for birthday exists)
        const birthdayConfig = await LoyaltyConfig.findOne({ type: 'actions', "conditions.action": 'birthday' });
        if (birthdayConfig) {
          const birthdayCondition = birthdayConfig.conditions.find(cond => cond.action === 'birthday');
          if (birthdayCondition) points += birthdayCondition.points;
        }
      }


    // Update user's action and points
    if (points > 0) {
      
      customer.points += points;
      await customer.save();

      // Log the activity in UserActivity
      await UserActivity.findOneAndUpdate(
        { userId },
        {
          $inc: { visitCount: actionType === 'login' ? 1 : 0, purchaseCount: actionType === 'purchasing' ? 1 : 0, totalSpent: purchaseAmount },
          $push: { engagementLogs: { type: actionType, pointsUsed: actionType === 'redemption' ? points : null } },
          lastActivity: Date.now(),
        },
        { upsert: true }
      );

      console.log(`Applied ${points} points to user ${userId} for activity ${actionType}`); 
    }
     else {
    console.log(`No points applied for action ${actionType}`);
    }
  } catch (error) {
    console.error('Error awarding points:', error);
  }
}

module.exports = { awardPoints };
