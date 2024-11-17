const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    require: true, // Sửa lại từ "require" thành "required"
  },
  reader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true, // Sửa lại từ "require" thành "required"
  },
  star: {
    type: Number,
  },
  comment: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
});

// Tạo model với tên "Review"
const Review = mongoose.model("Review", reviewSchema);

// Export model
module.exports = Review;
