const AdminService = require("../services/admin.service");

class AdminController {
  async fetchAdmin(req, res) {
    try {
      const userId = req.params.id;
      // console.log(userId);
      const user = await AdminService.findAdmin(userId);
      res.status(200).send(user);
    } catch (error) {
      console.log(error);
      res.status(500).send("You are not a cat");
    }
  }
}

module.exports = new AdminController();
