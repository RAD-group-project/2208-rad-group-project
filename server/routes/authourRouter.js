const express = require("express");
const router = express.Router();
const {
  getAuthour,
  getAllAuthours,
  addAuthour,
  updateAuthour,
  deleteAuthour
} = require('../controllers/authourController');

router.get("/get/:id", async (req, res) => {
    try {
      await getAuthour(req, res);
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });


router.get("/getAll", async (req, res) => {
  try {
    await getAllAuthours(req, res);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});


router.post("/add", async (req, res) => {
  try {
    await addAuthour(req, res);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    await updateAuthour(req, res);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    await deleteAuthour(req, res);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
