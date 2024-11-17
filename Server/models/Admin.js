const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("./User");

const adminSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Tham chiếu đến mô hình User
    required: true,
  },
  position: {
    type: String,
    // enum: [
    //   "Librarian", // Thủ thư
    //   "Library Assistant", // Trợ lý thư viện
    //   "Library Manager", // Quản lý thư viện
    //   "Cataloger", // Người phân loại
    //   "Acquisitions Officer", // Nhân viên thu mua
    //   "Technical Services Librarian", // Thủ thư dịch vụ kỹ thuật
    //   "Reference Librarian", // Thủ thư tham khảo
    //   "Children’s Librarian", // Thủ thư thiếu nhi
    //   "Dev",
    // ],
  },
  salary: {
    type: Number,
    default: 0,
  },
  hireDate: {
    type: Date,
    default: Date.now,
  },
});

// Tạo models từ schema
const Admin = mongoose.model("admin", adminSchema);

module.exports = Admin;
