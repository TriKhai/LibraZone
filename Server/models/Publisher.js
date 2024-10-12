const mongoose = require("mongoose");

const publisherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true, // Địa chỉ hoặc thành phố trụ sở của nhà xuất bản
  },
  establishedYear: {
    type: Number, // Năm thành lập nhà xuất bản
  },
  contact: {
    email: {
      type: String,
      match: [/^\S+@\S+\.\S+$/, "email không hợp lệ"],
    },
    phone: String,
    website: String,
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
  },
});

const Publisher = mongoose.model("Publisher", publisherSchema);
module.exports = Publisher;
