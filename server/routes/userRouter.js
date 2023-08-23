const express = require("express");
const router = express.Router();
const {
  getUser,
  getAllUsers,
  getAllMembers,
  addUser,
  updateUser,
  deleteUser
} = require('../controllers/userController');

router.get("/getAll", async (req, res) => {
  try {
    await getAllUsers(req, res);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get("/getAllMembers", async (req, res) => {
  try {
    await getAllMembers(req, res);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get("/get/:id", async (req, res) => {
  try {
    await getUser(req, res);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post("/add", async (req, res) => {
  try {
    await addUser(req, res);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    await updateUser(req, res);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    await deleteUser(req, res);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
