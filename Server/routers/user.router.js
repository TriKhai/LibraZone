const express = require("express");
const UserController = require("../controllers/user.controller");
const userRouter = express.Router();

userRouter.get("/", UserController.getAllUser);
userRouter.delete("/:id", UserController.deleteUser);

module.exports = userRouter;
