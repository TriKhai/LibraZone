const jwt = require("jsonwebtoken");

const authorize = (arrayType) => async (req, res, next) => {
  const { user } = req;
  try {
    if (arrayType.findIndex((e) => e === user.type) > -1) {
      next();
    } else {
      res.status(403).send("Bạn KHÔNG CÓ QUYỀN thực thi");
    }
  } catch (error) {
    res.status(403).send("Bạn KHÔNG CÓ QUYỀN thực thi");
  }
};

module.exports = {
  authorize,
};
