const jwt = require("jsonwebtoken");
const SECRET_KEY = "LZ2024";

const authenticate = async (req, res, next) => {
  const token = req.header("authorization ");
  try {
    const decode = jwt.verify(token, SECRET_KEY);
    if (decode) {
      req.user = decode;
      return next();
    } else {
      res.status(401).send("Bạn chưa đăng nhập");
    }
  } catch (error) {
    res.status(401).send("Bạn chưa đăng nhập");
  }
};

module.exports = {
  authenticate,
};
