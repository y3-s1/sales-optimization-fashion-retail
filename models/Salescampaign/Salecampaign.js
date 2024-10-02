const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const campaignSchema = new Schema({
    campaignName: {
        type: String,
        required: true,
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item', // Reference to Item model
        required: true,
    }],
    discountPercentage: {
        type: Number,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    }
})

const Salecampaign = mongoose.model("Salecampaign",campaignSchema);

module.exports = Salecampaign;