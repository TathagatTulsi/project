const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    try {
        const _bearerToken = req.headers["authorization"];
        console.log("🚀 ~ file: Auth.js:6 ~ auth ~ _bearerToken:", _bearerToken)
    
        const _token = _bearerToken.split(" ")[1];
    
        const _verifyToken = jwt.verify(_token, "xyz");
    
    
        if (_verifyToken) {
          req.user = _verifyToken.user;
          console.log("🚀 ~ file: Auth.js:15 ~ auth ~ user:", req.user)
          next();
        } else {
          return res.status(403).json({ msg: "Unauthorized user!!" });
        }
      } catch (error) {
        console.log(error);
        return res.status(404).json({ msg: error });
      }
    };
    
module.exports = verifyToken;