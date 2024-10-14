const jwt = require("jsonwebtoken");

const authorize = (arrRole) => async (req, res, next) => {
  const { user } = req;
  try {
    if (arrRole.findIndex((role) => role === user.role) > -1) {
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
