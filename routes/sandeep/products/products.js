const express = require('express');
const Item = require('../../../models/inventory/Item');
const router = express.Router();

// GET all items
router.get('/products', async (req, res) => {
    try {
        const items = await Item.find(); // Fetch all items from the database
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
