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


module.exports = router;