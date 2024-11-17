const mongoose = require("mongoose");
const Book = require("./Book");
const User = require("./User");

const trackBookBorrowingSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    require: true,
  },
  reader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  dateBorrowed: {
    type: Date,
    require: true,
  },
  dateReturned: {
    type: Date,
  },
  dateApproved: {
    type: Date,
  },
  dueDate: {
    type: Date,
  },

  state: {
    type: String,
    enum: ["Order", "Waiting", "Approved", "Borrowed"],
    default: "Order",
  },
  quantity: {
    type: Number,
    default: 1,
    min: 1,
  },
});

const TrackBookBorrowing = mongoose.model(
  "TrackBookBorrowing",
  trackBookBorrowingSchema
);
module.exports = TrackBookBorrowing;
