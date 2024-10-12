const AuthorService = require("../services/author.service");

class AuthorController {
  async createAuthor(req, res) {
    try {
      const authorPayload = req.body;
      const reqFile = req.file;
      const newAuthor = await AuthorService.createAuthor(
        authorPayload,
        reqFile
      );
      res.status(201).send(newAuthor);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }

  async getAuthors(req, res) {
    try {
      const authorList = await AuthorService.findAllAuthor();
      res.status(200).send(authorList);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }

  async deleteAuthor(req, res) {
    const idAuthor = req.params.id;
    try {
      const deletedAuthor = await AuthorService.deleteAuthor(idAuthor);
      res.status(200).send(`Delete author successfuly: ${deletedAuthor}`); // Trả về thông tin sách đã bị xóa
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Delete author failed" });
    }
  }

  async putAuthor(req, res) {
    const idAuthor = req.params.id;
    const dataAuthor = req.body; // Lấy dữ liệu từ body của request

    try {
      const updatedAuthor = await AuthorService.updateAuthor(
        idAuthor,
        dataAuthor
      );
      res.status(200).json(`Update author successfully: ${updatedAuthor}`);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Update author failed" });
    }
  }
}

module.exports = new AuthorController();
