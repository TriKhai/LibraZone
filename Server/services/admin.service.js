const models = require("../models/index");
const mongoose = require("mongoose");
const ApiError = require("../api-error");

class AdminService {
  // async findAdmin(userId) {
  //   console.log("userId: ", userId);
  //   if (!userId) throw new Error("The user's ID is require");
  //   const userObjId = new mongoose.Types.ObjectId(userId);
  //   const user = await models.Admin.findOne({ user: userObjId });

  //   if (!user) {
  //     throw new Error("Not found any user to given id");
  //   }

  //   return user;
  // }

  async findAdmin(userId) {
    console.log("userId: ", userId);
    if (!userId) throw new Error("The user's ID is required");

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid user ID format");
    }

    const userObjId = new mongoose.Types.ObjectId(userId);
    const user = await models.Admin.findOne({ user: userObjId }).populate(
      "user"
    );

    if (!user) {
      console.error("User not found for given ID:", userObjId);
      throw new Error("Not found any user for the given ID");
    }

    return user;
  }
}

module.exports = new AdminService();
