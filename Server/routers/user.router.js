const express = require("express");
const UserController = require("../controllers/user.controller");
const { uploadImage } = require("../midleware/uploadImage");
const { authenticate } = require("../midleware/authenticate");
const { authorize } = require("../midleware/authorize");
const userRouter = express.Router();

userRouter.get(
  "/",

  UserController.getAllUser
);
userRouter.get("/:id", UserController.getUser);
userRouter.post(
  "/",
  authenticate,
  authorize(["admin"]),
  UserController.createUser
);
userRouter.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  UserController.deleteUser
);
userRouter.put(
  "/edit-avatar/:id",
  authenticate,
  uploadImage("avatar"),
  UserController.uploadAvatarUser
);
userRouter.put(
  "/edit-profile/:id",
  authenticate,
  UserController.editProfileUser
);
userRouter.put(
  "/:id/change-password",
  authenticate,
  UserController.changePassword
);

module.exports = userRouter;
