const models = require("../models");
const bcrypt = require("bcrypt"); // mã hóa password
const jwt = require("jsonwebtoken"); // token

const SECRET_KEY = "LZ2024";

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

  async signIn(loginPayload) {
    if (!loginPayload.email) throw new Error("Username is required");
    if (!loginPayload.password) throw new Error("Password is required");

    const userLogin = await models.User.findOne({ email: loginPayload.email });

    if (!userLogin) throw new Error("User not found");
    const isMatchPasword = await this.decryptPassword(
      loginPayload.password,
      userLogin.password
    );

    if (!isMatchPasword) throw Error("Password is incorrect");

    const token = await await jwt.sign(
      { id: userLogin._id, role: userLogin.role },
      SECRET_KEY,
      {
        expiresIn: 60 * 60,
      }
    );
    return { user: userLogin, token };
  }

  async signUp(signupPayload) {
    if (!signupPayload.password) {
      throw new Error("Password is required");
    }
    const newPassword = await this.encryptPassword(signupPayload.password);
    signupPayload.password = newPassword;
    const newUser = new models.User(signupPayload);
    await newUser.save();

    if (signupPayload.type === "admin") {
      const dataAdmin = { user: User._id }; // Lưu ID của người dùng
      const newAdmin = new models.Admin(dataAdmin);
      await newAdmin.save();
    }
    console.log(newUser);
    return newUser;
  }
}
module.exports = new AuthService();
