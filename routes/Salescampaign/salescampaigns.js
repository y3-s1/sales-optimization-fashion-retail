const router = require("express").Router();
let Salecampaign = require("../../models/Salescampaign/Salecampaign"); //updated - ishara
let Item = require("../../models/inventory/Item"); //updated - ishara

// Insert new sale campaign
router.route("/addcampaign").post(async (req, res) => {
    const { campaignName, items, discountPercentage, startDate, endDate } = req.body;
  
    try {
      const newSaleCampaign = new Salecampaign({
        campaignName,
        items,
        discountPercentage: Number(discountPercentage),
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      });
  
      await newSaleCampaign.save();
  
      // Update the items: set isOnSale to true and set discounted price
      for (let itemId of items) {
        let item = await Item.findById(itemId);
        if (item) {
          item.discountedPrice = item.price * (1 - discountPercentage / 100);
          item.isOnSale = true;
          await item.save();
        }
      }
  
      res.json("Sale Campaign Added and items updated");
    } catch (err) {
      console.log(err);
      res.status(500).json("Error adding sale campaign");
    }
  });



//delete campaign
router.route("/deletecampaign/:id").delete(async (req, res) => {
    const campaignId = req.params.id;

    try {
        const campaign = await Salecampaign.findById(campaignId);
        if (!campaign) {
            return res.status(404).json("Sale campaign not found");
        }

        // Reset the items: set isOnSale to false and clear discounted price
        for (let itemId of campaign.items) {
            let item = await Item.findById(itemId);
            if (item) {
                item.discountedPrice = null;  // Clear discounted price
                item.isOnSale = false;
                await item.save();
            }
        }

        await Salecampaign.findByIdAndDelete(campaignId);

        res.json("Sale Campaign Deleted and items restored");
    } catch (err) {
        console.log(err);
        res.status(500).json("Error deleting sale campaign");
    }
});





// Fetch all sale campaigns
router.route("/allcampaigns").get(async (req, res) => {
    try {
        const campaigns = await Salecampaign.find();
        res.json(campaigns);
    } catch (err) {
        console.log(err);
        res.status(500).json("Error fetching sale campaigns");
    }
});





// Add an item to a sale campaign
router.put("/additem/:campaignId", async (req, res) => {
    try {
        const { itemId } = req.body;
        const campaign = await Salecampaign.findById(req.params.campaignId);
        if (!campaign) return res.status(404).json("Sale campaign not found");

        // Check if item is already in the campaign
        if (campaign.items.includes(itemId)) {
            return res.status(400).json("Item already in the campaign");
        }

        // Add item to campaign and update isOnSale to true
        campaign.items.push(itemId);
        await campaign.save();

        await Item.findByIdAndUpdate(itemId, { isOnSale: true });

        res.json("Item added to campaign and updated");
    } catch (err) {
        console.log(err);
        res.status(500).json("Error adding item to campaign");
    }
});

// Remove an item from a sale campaign
router.put("/removeitem/:campaignId", async (req, res) => {
    try {
        const { itemId } = req.body;
        const campaign = await Salecampaign.findById(req.params.campaignId);
        if (!campaign) return res.status(404).json("Sale campaign not found");

        // Remove the item from campaign
        campaign.items = campaign.items.filter(id => id.toString() !== itemId);
        await campaign.save();

        // Update the item's isOnSale field to false
        await Item.findByIdAndUpdate(itemId, { isOnSale: false });

        res.json("Item removed from campaign and updated");
    } catch (err) {
        console.log(err);
        res.status(500).json("Error removing item from campaign");
    }
});



// Fetch details of a specific sale campaign by ID, including items
router.route("/campaigndetails/:id").get(async (req, res) => {
    try {
        const campaignId = req.params.id;
        const campaign = await Salecampaign.findById(campaignId).populate('items'); // Populate items
        if (!campaign) {
            return res.status(404).json("Sale campaign not found");
        }

        res.json(campaign);
    } catch (err) {
        console.log(err);
        res.status(500).json("Error fetching sale campaign details");
    }
});




module.exports = router;   