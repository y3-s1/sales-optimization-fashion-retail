const {
    highDemandProducts,
    highDemandCategory1,
    highDemandCategory2,
    highDemandCategory3,
    highDemandCategory4
  } = require("../../data/demandAnalysis/highDemandData");


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


module.exports = sendHighDemandData;
