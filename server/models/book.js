// Importing modules
const mongoose = require("mongoose");

// Creating book schema
const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  ISBN: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
    required: false,
  },
  datePublished: {
    type: Date,
    required: false,
  },
  genre: {
    type: String,
    required: false,
  },
  copies: {
    type: Number,
    required: true,

  },
});


module.exports = mongoose.model("Book", BookSchema);
