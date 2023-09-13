const express = require("express");
const router = express.Router();
const {
  getBorrower,
  getAllBorrowers,
  addBorrower,
  updateBorrower,
  deleteBorrower,
} = require("../controllers/borrowerController");

router.get("/get/:id", async (req, res) => {
    try {
      await getBorrower(req, res);
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });


router.get("/getAll", async (req, res) => {
  try {
    await getAllBorrowers(req, res);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});


router.post("/add", async (req, res) => {
  try {
    await addBorrower(req, res);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    await updateBorrower(req, res);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    await deleteBorrower(req, res);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
