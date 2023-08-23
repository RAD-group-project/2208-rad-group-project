const express = require("express");
const router = express.Router();
const {
  loginUser,
  registerUser,
  logoutUser,
} = require('../controllers/authController');

router.post("/login", async (req, res) => {
  try {
    await loginUser(req, res);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post("/register", async (req, res) => {
  try {
    await registerUser(req, res);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get("/logout", async (req, res) => {
  try {
    await logoutUser(req, res);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
