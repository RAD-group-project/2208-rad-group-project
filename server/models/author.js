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
    type: String,
    required: false,
  },

  genre: {
    type: String,
    required: false,
  },

  noOfBooksWritten: {
    type: String,
    required: true,

  },
});

// Creating the Author model
module.exports = mongoose.model("Author", AuthorSchema);
