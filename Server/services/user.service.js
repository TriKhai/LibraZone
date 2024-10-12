const models = require("../models/index");
const mongoose = require("mongoose");

class UserService {
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

    return deletedUser;
  }

  async findUser(idUser) {
    if (!idUser) throw new Error("The user's ID is require");
    const userObjId = new mongoose.Types.ObjectId(id);
    const user = await models.User.findOne({ _id: userObjId });
    if (!user) {
      throw new Error("Not found any user to given id");
    }
    return user;
  }
}

module.exports = new UserService();
