const {
    highDemandProducts,
    highDemandCategory1,
    highDemandCategory2,
    highDemandCategory3,
    highDemandCategory4
} = require("../../data/demandAnalysis/highDemandData");

const allProducts = require("../../data/demandAnalysis/products");




const sendHighDemandData = (req, res) => {
    const highDemandData = {
        highDemandProducts, 
        highDemandCategory1, 
        highDemandCategory2, 
        highDemandCategory3, 
        highDemandCategory4
    };
    res.status(200).json(highDemandData); 
};

const sendAllProductsData = (req, res) => {
    res.status(200).json(allProducts); 
};





module.exports = {
    sendHighDemandData,
    sendAllProductsData
};
