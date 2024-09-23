const router = require('express').Router();
const bcrypt = require ('bcryptjs');
const jwt  = require("jsonwebtoken");
const Customer = require('../../../models/sandeep/user/Customer.js');
const Manager = require('../../../models/sandeep/user/Manager.js');

/*
//Seller Login
router.route('/login').post(async (req, res) => {
    try {
      const seller = await Seller.findOne({ sellerId : req.body.username });
      if (!seller) return res.status(500).json( 'No user found' );
  
      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        seller.password
      );
      if (!isPasswordCorrect)
        return res.status(500).json( {"message": "Wrong password"} ); 
  
      const token = jwt.sign(
        { sellerId: seller.sellerId },
        process.env.JWT
      );

      const products = await SellerProducts.find({ sellerId : seller.sellerId });
  
      const { status, price_margine, ...otherDetails } = seller._doc;
      res
        .cookie("access_token", token, {
            httpOnly: true,
        })
        .status(200)
        .json({ sellerdetails: { ...otherDetails }, productDetails : products });
    } catch (err) {
        console.log(err);
    }
  });
 
 */
  router.route('/login').post(async (req, res) => {
    try {
      // Find the user based on the username (assuming unique usernames across different user types)
      const customer = await Customer.findOne({ email: req.body.username });
      const manager = await Manager.findOne({ email: req.body.username });

      // Determine the user type
      let userType = null;
      let userDetails = null;
      if (customer) {
        userType = 'customer';
        userDetails = customer;
      } 
      else if (manager) {
        userType = 'manager';
        userDetails = manager;
      } 

      if (!userType) {
        return res.status(401).json({ message: 'No user found' });
      }
  
      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        userDetails.password
      );
      if (!isPasswordCorrect) {
        return res.status(401).json({ message: 'Wrong password' }); 
      }

      let token ;

        token = jwt.sign(
          { userId: userDetails._id, userType: userType },
          process.env.JWT
        );

      
      // Redirect logic based on user type
      let redirectURL = '/';
      switch(userType) {
        case 'customer':
          redirectURL = '/';
          break;
        case 'manager':
          redirectURL = '/admin/dashboard';
          break;
      }
  
  
      res
        .cookie("access_token", token, {
            httpOnly: true,
        })
        .status(200)
        .json({ redirect: redirectURL,  user:userDetails });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;