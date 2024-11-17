const authorize = (arrRole) => async (req, res, next) => {
  const { user } = req;
  console.log(user);
  try {
    if (arrRole.findIndex((role) => role === user.role) > -1) {
      next();
    } else {
      res.status(403).send("Bạn KHÔNG CÓ QUYỀN thực thi");
    }
  } catch (error) {
    console.log(error);
    res.status(403).send("Bạn KHÔNG CÓ QUYỀN thực thi");
  }
};

module.exports = {
  authorize,
};
