const express = require('express');
const multer = require('multer');
const path = require('path');
const Item = require("../../models/inventory/Item");

const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Destination folder for storing images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename for each uploaded image
  }
});

// Multer file filter to accept only image files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Multer upload instance
const upload = multer({ storage: storage, fileFilter: fileFilter });

// Route to add a new item
router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const { 
      name, category, description, price, stock, size, color, material, 
      careInstructions, availability, SKU
    } = req.body;

    // File path of the uploaded image
    const image = req.file ? req.file.filename : null; // Check if image is uploaded

    // Create a new item instance with default values for isOnSale and discountedPrice
    const newItem = new Item({
      name, 
      category, 
      description, 
      price, 
      stock, 
      size, 
      color, 
      material, 
      careInstructions, 
      availability, 
      SKU, 
      image, 
      isOnSale: false,  // Default isOnSale to false
      discountedPrice: null  // Default discountedPrice to null
    });

    // Save the new item to the database
    await newItem.save();

    // Respond with success message
    res.json({ message: 'Item added successfully' });
  } catch (error) {
    // Handle errors
    console.error('Error adding item:', error.message || error); // Display full error message
    res.status(500).json({ error: 'Internal server error', details: error.message || 'Error details not available' });
  }
});


// Route to update an existing item
router.put('/update/:id', upload.single('image'), async (req, res) => {
  try {
    const itemId = req.params.id;
    const updateData = req.body;
    const image = req.file ? req.file.filename : undefined; // Update image if a new file is uploaded

    // Include image in updateData if it's provided
    if (image) {
      updateData.image = image;
    }

    // // Handle discountedPrice: convert to number or set to null
    // if (updateData.discountedPrice !== undefined && updateData.discountedPrice !== '') {
    //   if (updateData.discountedPrice === "null") {
    //     updateData.discountedPrice = null;
    //   } else {
    //     const discountedPrice = parseFloat(updateData.discountedPrice);
    //     if (!isNaN(discountedPrice)) {
    //       updateData.discountedPrice = discountedPrice;
    //     } else {
    //       return res.status(400).json({ error: 'Invalid discounted price' });
    //     }
    //   }
    // } else {
    //   updateData.discountedPrice = null; // Set to null if not provided
    // }

    // // Handle isOnSale: convert to boolean or set to null
    // if (updateData.isOnSale !== undefined && updateData.isOnSale !== '') {
    //   updateData.isOnSale = updateData.isOnSale === 'true'; // Convert string to boolean
    // } else {
    //   updateData.isOnSale = null; // Set to null if not provided
    // }

    // Update the item in the database
    const updatedItem = await Item.findByIdAndUpdate(itemId, updateData, { new: true, runValidators: true });

    if (!updatedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.json({ message: 'Item updated successfully', item: updatedItem });
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//ishara
// Route to get sale items
router.route("/getsaleitems").get((req, res) => {
  Item.find({ isOnSale: true })  // Query to get only items where isOnSale is true
      .then((items) => {
          res.json(items);
      })
      .catch((err) => {
          console.error("Error fetching sale items:", err);
          res.status(500).json({ message: "Error fetching sale items", error: err.message });
      });
});

router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    console.error('Error fetching all items:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to fetch a specific item by ID
router.get('/:id', async (req, res) => {
  try {
    const itemId = req.params.id;
    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.json(item);
  } catch (error) {
    console.error('Error fetching item by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to delete an item by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const itemId = req.params.id;

    // Find and delete the item
    const item = await Item.findByIdAndDelete(itemId);

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




//for salecampaign use
router.post("/getitemsbyids", async (req, res) => {
  const { itemIds } = req.body;
  try {
    const items = await Item.find({ _id: { $in: itemIds } });
    res.json(items);
  } catch (err) {
    console.log(err);
    res.status(500).json("Error fetching items by IDs");
  }
});




// Route to get sale items
router.route("/getsaleitems").get((req, res) => {
  Item.find({ isOnSale: true })  // Query to get only items where isOnSale is true
      .then((items) => {
          res.json(items);
      })
      .catch((err) => {
          console.error("Error fetching sale items:", err);
          res.status(500).json({ message: "Error fetching sale items", error: err.message });
      });
});






module.exports = router;
