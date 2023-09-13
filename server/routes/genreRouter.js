const express = require("express");
const router = express.Router();
const {
  getGenre,
  getAllGenres,
  addGenre,
  updateGenre,
  deleteGenre
} = require('../controllers/genreController');

router.get("/getAll", async (req, res) => {
  console.log("o")
  try {
    await getAllGenres(req, res);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get("/get/:id", async (req, res) => {
  try {
    await getGenre(req, res);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post("/add", async (req, res) => {
  try {
    await addGenre(req, res);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    await updateGenre (req, res);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    await deleteGenre(req, res);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
