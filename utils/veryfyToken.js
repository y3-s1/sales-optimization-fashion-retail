const jwt = require("jsonwebtoken");

module.exports.verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log("Token")
  if (!token) {
    return res.status(401).json("You are not authenticated");
  }
  

  jwt.verify(token, process.env.JWT, (err, person) => {
    if (err) return res.status(500).json("You are not authorized");
    req.person = person;
    next();
    
  });
};

// for profile edit
module.exports.verifySeller = (req, res, next) => {
  module.exports.verifyToken(req, res, next, () => {
    if (req.person.sellerId === req.params.id) {
      next();
    } else {
      return res.status(500).json("You are not authorized to do this");
    }
  });
};

// for get sellerID
module.exports.verifySellerToOther = (req, res, next) => {
  module.exports.verifyToken(req, res, next, () => {
    if (req.person.sellerId) {
      next();
    } else {
      return res.status(500).json("You are not authorized to do this");
    }
  });
};

// for Others
module.exports.verifyToOther = (req, res, next) => {
  module.exports.verifyToken(req, res, next, () => {
    if (req.person.userId) {
      next();
    } else {
      return res.status(500).json("You are not authorized to do this");
    }
  });
};