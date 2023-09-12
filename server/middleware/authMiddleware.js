// authMiddleware.js

const authMiddleware = (req, res, next) => {
    // Check if the user is authenticate
    // console.log(req)
    if (req.isAuthenticated()) {
      return next(); // User is authenticated, proceed to the next middleware
    } else {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
  };
  
  module.exports = authMiddleware;
  