const models = require("../models");
const bcrypt = require("bcrypt"); // mã hóa password
const jwt = require("jsonwebtoken"); // token
const ApiError = require("../api-error");
require("dotenv").config();

const IMAGE_BASE_PATH = process.env.IMAGE_BASE_PATH;
const SECRET_KEY = process.env.SECRETKEY;
const IMAGE_DEFAULT_PATH = process.env.IMAGE_DEFAULT_PATH;

class AuthService {
  async encryptPassword(plainPassword) {
    // Mã hóa password
    const saltRounds = 10;
    // tạo chuổi random
    const salt = bcrypt.genSaltSync(saltRounds);
    // mã hóa salt + password
    const encryptedPassword = bcrypt.hashSync(plainPassword, salt);

    return encryptedPassword;
  }

  decryptPassword(encryptedPassword, passwordUser) {
    const isMatchPasword = bcrypt.compareSync(encryptedPassword, passwordUser);
    return isMatchPasword;
  }

  // async signIn(loginPayload) {
  //   if (!loginPayload.email) {

  //   }
  //   if (!loginPayload.password) throw new Error("Password is required");

  //   const userLogin = await models.User.findOne({ email: loginPayload.email });

  //   if (!userLogin) throw new Error("User not found");
  //   const isMatchPasword = await this.decryptPassword(
  //     loginPayload.password,
  //     userLogin.password
  //   );

  //   if (!isMatchPasword) throw Error("Password is incorrect");

  //   const token = await await jwt.sign(
  //     { id: userLogin._id, role: userLogin.role },
  //     SECRET_KEY,
  //     {
  //       expiresIn: 60 * 60,
  //     }
  //   );
  //   return { user: userLogin, token };
  // }

  async signIn(loginPayload) {
    if (!loginPayload.email) {
      throw new ApiError(400, "Email is required");
    }

    if (!loginPayload.password) {
      throw new ApiError(400, "Password is required");
    }

    const userLogin = await models.User.findOne({ email: loginPayload.email });

    if (!userLogin) {
      throw new ApiError(404, "User not found");
    }

    const isMatchPassword = await this.decryptPassword(
      loginPayload.password,
      userLogin.password
    );

    if (!isMatchPassword) {
      throw new ApiError(401, "Incorrect password");
    }

    const token = await jwt.sign(
      { id: userLogin._id, role: userLogin.role },
      SECRET_KEY,
      {
        expiresIn: 60 * 60, // Token expires in 1 hour
      }
    );

    return {
      user: userLogin,
      token,
    };
  }

  async signUp(signupPayload) {
    if (!signupPayload.password) {
      throw new ApiError(401, "Password is required");
    }

    if (!signupPayload.email) {
      throw new ApiError(401, "Email is required");
    }

    const existingUser = await models.User.findOne({
      email: signupPayload.email,
    });
    if (existingUser) {
      throw new ApiError(409, "Email already exists"); // Mã 409: Conflict
    }

    const newPassword = await this.encryptPassword(signupPayload.password);
    signupPayload.password = newPassword;
    signupPayload.image = IMAGE_BASE_PATH + IMAGE_DEFAULT_PATH;

    const newUser = new models.User(signupPayload);
    await newUser.save();

    if (signupPayload.role === "admin") {
      const adminData = { user: newUser._id }; // Store the user's ID correctly
      const newAdmin = new models.Admin(adminData);
      await newAdmin.save();
    }

    return {
      statusCode: 200,
      message: "Signed up successfully",
      user: newUser,
    };
  }
}
module.exports = new AuthService();
