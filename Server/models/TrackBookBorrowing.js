const mongoose = require("mongoose");
const Book = require("./Book");
const Reader = require("./User");

const trackBookBorrowingSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    require: true,
  },
  reader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reader",
    require: true,
  },
  borrowDate: {
    type: Date,
    require: true,
    default: Date.now,
  },
  returnDate: {
    type: Date,
  },
  status: {
    type: String,
    enum: ["pending", "borrowed", "returned", "overdue"],
    default: "pending",
  },
});

const TrackBookBorrowing = mongoose.model(
  "TrackBookBorrowing",
  trackBookBorrowingSchema
);
module.exports = TrackBookBorrowing;
