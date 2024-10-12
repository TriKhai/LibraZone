const express = require("express");
const AuthController = require("../controllers/auth.controller");
const authRouter = express.Router();

authRouter.post("/sign-up", AuthController.postSignUp);
authRouter.post("/log-in", AuthController.postSignIn);

module.exports = authRouter;
