const mongoose = require("mongoose");
const Author = require("./Author");
const Publisher = require("./Publisher");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author", // Tham chiếu tới bảng Author
    required: false,
  },
  publisher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Publisher", // Tham chiếu tới bảng Publisher
    required: false,
  },
  genre: {
    type: [String], // Mảng thể loại
    required: true,
  },
  published_date: {
    type: Date,
    required: false,
    default: Date.now,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    require: true,
  },
  stock: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    default: "",
  },
  ratings: {
    average: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    reviews_count: {
      type: Number,
      default: 0,
    },
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
  country: {
    type: String,
  },
  language: {
    type: String,
  },
  label: {
    type: String,
    default: "",
  },
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
