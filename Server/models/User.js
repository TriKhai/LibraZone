const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  dateOfBirth: {
    type: Date,
    require: true,
  },
  bio: {
    type: String,
    require: false,
    default: "",
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"], // Ví dụ: phai có thể là 'Nam' hoặc 'Nu'
    required: true, // Ví dụ: phai là bắt buộc
  },
  address: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: false,
    match: [/^[0-9]{10,11}$/, "Số điện thoại phải gồm 10 hoặc 11 số"],
  },
  email: {
    type: String,
    required: true, // Trường SoDienThoai không bắt buộc
    match: [/^[a-zA-Z0-9]+@gmail\.com$/, "email không hợp lệ"], // Validation: example01@gmail.com
  },
  password: {
    type: String,
    require: true,
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
  role: {
    type: String,
    enum: ["reader", "admin", "editor"],
    default: "reader",
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
