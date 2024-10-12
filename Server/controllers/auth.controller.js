const AuthService = require("../services/auth.service");

class AuthController {
  async postSignIn(req, res) {
    try {
      const loginPayload = req.body;
      const { user, token } = await AuthService.signIn(loginPayload);
      res.status(200).json({
        message: "Login success!",
        user: user,
        token: token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }

  async postSignUp(req, res) {
    try {
      const signupPayload = req.body;
      const newUser = await AuthService.signUp(signupPayload);
      res.status(201).json({
        message: "sign up successfully",
        user: newUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new AuthController();
