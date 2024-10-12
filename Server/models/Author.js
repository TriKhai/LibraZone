const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    default: "",
  },
  dob: {
    type: Date,
  },
  link: {
    type: String,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String,
    default: "",
  },
});

const Author = mongoose.model("Author", authorSchema);
module.exports = Author;
