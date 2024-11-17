const models = require("../models/index");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // mã hóa password
const path = require("path");
const fs = require("fs");
const ApiError = require("../api-error");
require("dotenv").config();
IMAGE_BASE_PATH = process.env.IMAGE_BASE_PATH;
IMAGE_DEFAULT_PATH = process.env.IMAGE_DEFAULT_PATH;
const AdminrService = require("../services/admin.service");

class UserService {
  async encryptPassword(plainPassword) {
    // Mã hóa password
    const saltRounds = 10;
    // tạo chuổi random
    const salt = bcrypt.genSaltSync(saltRounds);
    // mã hóa salt + password
    const encryptedPassword = bcrypt.hashSync(plainPassword, salt);

    return encryptedPassword;
  }

  decryptPassword(hash, passwordUser) {
    const isMatchPasword = bcrypt.compareSync(passwordUser, hash);
    return isMatchPasword;
  }

  async findAllUser() {
    const users = await models.User.find();
    if (!users) throw Error("Faild to get users");
    return users;
  }

  async deleteUser(idUser) {
    if (!idUser)
      throw new Error("The user's ID is require and cannot be empty");

    const userObjId = new mongoose.Types.ObjectId(idUser);
    const deletedUser = await models.User.findByIdAndDelete(userObjId);

    if (!deletedUser) throw new Error("Faild to delete user");
    if (deletedUser.role === "admin") {
      const deletedAdmin = await models.Admin.deleteOne({ user: userObjId });
    }

    return deletedUser;
  }

  async findUser(userId) {
    if (!userId) throw new Error("The user's ID is require");
    const userObjId = new mongoose.Types.ObjectId(userId);
    const user = await models.User.findOne({ _id: userObjId });

    if (!user) {
      throw new Error("Not found any user to given id");
    }

    return user;
  }
  async deleteAvatar(imgPath) {
    const fullPath = path.join(__dirname, "..", imgPath);
    try {
      fs.unlinkSync(fullPath);
      console.log("Ảnh đã bị xóa thành công:", imgPath);
    } catch (err) {
      console.error("Lỗi khi xóa ảnh:", err);
      throw new Error("Lỗi khi xóa ảnh!");
    }
  }

  async uploadAvatar(idUser, reqFile) {
    // Lấy đường dẫn của ảnh mới tải lên hoặc để trống nếu không có file
    const imgPath = reqFile ? `${reqFile.path}` : "";
    console.log("New image path:", imgPath);

    // Tìm kiếm người dùng trong cơ sở dữ liệu
    const user = await models.User.findOne({ _id: idUser });
    if (!user) {
      throw new Error("User not found");
    }

    const pathImgDefault = IMAGE_BASE_PATH + IMAGE_DEFAULT_PATH;
    let pathAvatar = user.image;

    // Kiểm tra và xóa ảnh đại diện cũ nếu không phải là ảnh mặc định
    if (pathAvatar && pathAvatar !== pathImgDefault) {
      pathAvatar = pathAvatar.replace(IMAGE_BASE_PATH, "");
      console.log("Deleting old avatar:", pathAvatar);

      // Gọi hàm xóa ảnh từ hệ thống tệp (hoặc triển khai hàm riêng để xóa)
      try {
        await this.deleteAvatar(pathAvatar);
        console.log("Old avatar deleted successfully");
      } catch (error) {
        console.error("Error deleting old avatar:", error.message);
      }
    }

    // Cập nhật ảnh đại diện mới cho người dùng
    user.image = IMAGE_BASE_PATH + imgPath;
    await user.save();

    console.log("User avatar updated successfully:", user.image);

    return user;
  }

  async updateUser(idUser, dataUser) {
    if (!idUser) throw new Error("id is empty");
    if (!dataUser) throw new Error("data is empty");
    console.log(idUser);
    if (!mongoose.Types.ObjectId.isValid(idUser)) {
      throw new Error("Invalid user ID");
    }
    const dataUserUpdate = {
      firstName: dataUser.firstName,
      lastName: dataUser.lastName,
      gender: dataUser.gender,
      dateOfBirth: dataUser.dateOfBirth,
      bio: dataUser.bio,
      address: dataUser.address,
      phone: dataUser.phone,
    };

    console.log("dataUserUpdate: ", dataUserUpdate);
    const updatedUser = await models.User.findByIdAndUpdate(
      idUser,
      dataUserUpdate,
      {
        new: true,
      }
    );
    console.log(updatedUser);
    // Tham số { new: true } để trả về tài liệu sau khi đã được cập nhật

    if (!updatedUser) throw new Error("update user failed");

    return updatedUser;
  }

  async updatePassword(idUser, currentPassword, newPassword) {
    const user = await models.User.findById(idUser);
    if (!user) throw Error("User not found");
    const isMatch = await this.decryptPassword(user.password, currentPassword);
    if (!isMatch) throw Error("Current password is incorrect");
    const hashedPwrd = await this.encryptPassword(newPassword);
    user.password = hashedPwrd;
    await user.save();
    return user;
  }

  async createUser(data) {
    const existingUser = await models.User.findOne({
      email: data.email,
    });
    if (existingUser) {
      throw new ApiError(409, "Email already exists");
    }

    const newPassword = await this.encryptPassword(data.password);
    data.password = newPassword;
    const jmageDefault =
      "public/data/uploads/avatar/default-profile-picture-avatar-png-green.png";
    data.image = IMAGE_BASE_PATH + jmageDefault;

    const userData = {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      gender: data.gender,
      dateOfBirth: data.dateOfBirth,
      bio: data.bio,
      role: data.role,
      phone: data.phone,
      image: data.image,
    };

    const newUser = new models.User(userData);
    await newUser.save();
    console.log(userData);

    if (data.role === "admin") {
      const adminData = {
        hireDate: data.hireDate,
        salary: data.salary,
        position: data.position,
        user: newUser._id,
      };
      const newAdmin = new models.Admin(adminData);
      await newAdmin.save();
      console.log("adminData: ", adminData);
    }

    return newUser;
  }
}

module.exports = new UserService();
