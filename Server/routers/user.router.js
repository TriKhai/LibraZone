const express = require("express");
const UserController = require("../controllers/user.controller");
const userRouter = express.Router();

userRouter.get("/", UserController.getAllUser);
userRouter.get("/:id", UserController.getUser);
userRouter.delete("/:id", UserController.deleteUser);

module.exports = userRouter;
