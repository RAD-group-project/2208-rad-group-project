const express = require("express");
const router = express.Router();


const {
  getAuthor,
  getAllAuthors,
  addAuthor,
  updateAuthor,
  deleteAuthor
} = require('../controllers/authorController');

router.get("/get/:id", async (req, res) => {
    try {
      await getAuthor(req, res);
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });


router.get("/getAll", async (req, res) => {
  try {
    await getAllAuthors(req, res);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});


router.post("/add", async (req, res) => {
  try {
    await addAuthor(req, res);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    await updateAuthor(req, res);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    await deleteAuthor(req, res);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
