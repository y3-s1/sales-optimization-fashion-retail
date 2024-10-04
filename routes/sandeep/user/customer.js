const Customer = require("../../../models/sandeep/user/Customer");
const bcrypt = require("bcryptjs");
const router = require("express").Router();
const { awardPoints } = require('../../../utils/loyalty');

router.route('/register').post(async (req,res) => {
    try{

        const {password, ...others} = req.body;

        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);
        
        const newCustomer = new Customer({...others, password: hash});

        const savedCustomer = await newCustomer.save();
        await awardPoints(savedCustomer._id, 'register');
        res.status(200).json(savedCustomer);
    } catch(err){
        console.log(err);
    }
});

router.get('/getUserPoints/:userId', async (req, res) => {
    const { userId } = req.params;
  
    try {
      // Find the user by their ID
      const customer = await Customer.findById(userId);
  
      // If customer not found, send an error response
      if (!customer) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Send back the points
      res.status(200).json({ points: customer.points });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to retrieve user points' });
    }
  });


module.exports = router;