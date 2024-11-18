const express = require("express");
const UserController = require("../controllers/user.controller");
const { uploadImage } = require("../midleware/uploadImage");
const userRouter = express.Router();

userRouter.get(
  "/",

  UserController.getAllUser
);
userRouter.get("/:id", UserController.getUser);
userRouter.post("/", UserController.createUser);
userRouter.delete("/:id", UserController.deleteUser);
userRouter.put(
  "/edit-avatar/:id",
  uploadImage("avatar"),
  UserController.uploadAvatarUser
);
userRouter.put("/edit-profile/:id", UserController.editProfileUser);
userRouter.put("/:id/change-password", UserController.changePassword);

module.exports = userRouter;
