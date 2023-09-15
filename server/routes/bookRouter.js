const express = require("express");
const router = express.Router();

const {
  getBook,
  getAllBooks,
  addBook,
  updateBook,
  deleteBook
} = require('../controllers/bookController');

router.get("/get/:id", async (req, res) => {
    try {
      await getBook(req, res);
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });


router.get("/getAll", async (req, res) => {
  try {
    await getAllBooks(req, res);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});


router.post("/add", async (req, res) => {
  try {
    await addBook(req, res);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    await updateBook(req, res);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    await deleteBook(req, res);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
