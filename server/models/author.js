// Importing modules
const mongoose = require("mongoose");

// Creating book schema
const AuthorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: false,
  },
  nationality: {
    type: String,
    required: false,
  },
  startDateOfPublishing: {
    type: Date,
    required: false,
  },

  genres: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Genre",
    },
  ],

  noOfBooksWritten: {
    type: Number,
    required: true,

  },
});

// Creating the Author model
module.exports = mongoose.model("Author", AuthorSchema);