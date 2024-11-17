const AuthService = require("../services/auth.service");
const ApiError = require("../api-error");
class AuthController {
  // async postSignIn(req, res) {
  //   try {
  //     const loginPayload = req.body;
  //     const { user, token } = await AuthService.signIn(loginPayload);
  //     res.status(200).json({
  //       message: "Login success!",
  //       user: user,
  //       token: token,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).json({ message: error.message });
  //   }
  // }
  async postSignIn(req, res) {
    try {
      const loginPayload = req.body;
      const result = await AuthService.signIn(loginPayload);
      // console.log(result);
      res.status(200).json({
        message: "Login successful!",
        user: result.user,
        token: result.token,
      });
    } catch (error) {
      console.error(error);
      const statusCode = error instanceof ApiError ? error.statusCode : 500;
      const message = error.message || "An unexpected error occurred";
      res.status(statusCode).json({ error: message });
    }
  }

  async postSignUp(req, res) {
    try {
      const signupPayload = req.body;
      const newUser = await AuthService.signUp(signupPayload);
      console.log("Sign up successfully");
      res.status(201).json({
        message: "Sign up successfully",
        user: newUser,
      });
    } catch (error) {
      console.error(error);
      const statusCode = error instanceof ApiError ? error.statusCode : 500;
      const message = error.message || "An error occurred during sign-up";
      res.status(statusCode).json({ error: message });
    }
  }
}

module.exports = new AuthController();
