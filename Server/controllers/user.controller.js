const UserService = require("../services/user.service");

class UserController {
  async createUser(req, res) {
    try {
      const data = req.body;
      const newUser = await UserService.createUser(data);
      res.status(201).send(newUser);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }

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
      // console.log(user);
      res.status(200).send(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Faild to get user" });
    }
  }

  async uploadAvatarUser(req, res) {
    try {
      const { id } = req.params;
      console.log(id);
      const reqFile = req.file;
      // Kiểm tra nếu có file được tải lên
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded." });
      }

      // Gọi UserService để xử lý upload
      const result = await UserService.uploadAvatar(id, reqFile);

      // Gửi phản hồi thành công
      res.status(200).json({
        message: "Avatar uploaded successfully",
        data: result,
      });
    } catch (error) {
      console.error("Error uploading avatar:", error.message);
      res
        .status(500)
        .json({ error: "An error occurred while uploading the avatar." });
    }
  }

  async editProfileUser(req, res) {
    const idUser = req.params.id;
    const dataUser = req.body;
    try {
      const updatedUser = await UserService.updateUser(idUser, dataUser);
      res
        .status(200)
        .json({ message: "Update user successfully", data: updatedUser });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Update user failed" });
    }
  }

  async changePassword(req, res) {
    const idUser = req.params.id;
    const data = req.body;
    const currentPassword = data.currentPassword;
    const newPassword = data.newPassword;
    try {
      const user = await UserService.updatePassword(
        idUser,
        currentPassword,
        newPassword
      );
      res.status(200).json({ message: "Change Password successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = new UserController();
