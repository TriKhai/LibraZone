const UserService = require("../services/user.service");

class UserController {
  async getAllUser(req, res) {
    try {
      const userList = await UserService.findAllUser();
      res.status(200).send(userList);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }

  async deleteUser(req, res) {
    const idUser = req.params.id;

    try {
      const deletedUser = await UserService.deleteUser(idUser);
      res.status(200).send(`Delete user successfully: ${deletedUser}`);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Faild to delete user" });
    }
  }

  async getUser(req, res) {
    try {
      const userId = req.params.id;
      const user = await UserService.findUser(userId);
      console.log(user);
      res.status(200).send(user);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

// const createUser = async (req, res) => {
//   const data = req.body;

//   // hash password
//   const pwrd = hashPassword(data.password);

//   // image path
//   const imagesUrl = req.file ? `${req.file.path}` : "";
//   const userData = {
//     title: data.title,
//     author: data.author,
//     publisher: data.publisher,
//     genre: data.genre,
//     published_date: new Date(data.published_date),
//     price: parseFloat(data.price),
//     image: imagesUrl,
//     stock: parseInt(data.stock),
//     description: data.description,
//     country: data.country,
//     language: data.language,
//   };

//   const user = new models.User(userData);
//   await user.save();

//   if (userData.type === "admin") {
//   }
// };

module.exports = new UserController();
