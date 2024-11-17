const AuthorService = require("../services/author.service");
const ApiError = require("../api-error");

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
    } catch (error) {
      console.error(error);
      const statusCode = error instanceof ApiError ? error.statusCode : 500;
      const message =
        error.message ||
        "An unexpected error occurred while creating the author.";
      res.status(statusCode).json({ error: message });
    }
  }

  async getAuthors(req, res) {
    try {
      const authorList = await AuthorService.findAllAuthor();
      res.status(200).send(authorList);
    } catch (error) {
      console.error(error);
      const statusCode = error instanceof ApiError ? error.statusCode : 500;
      const message =
        error.message ||
        "An unexpected error occurred while getting the author.";
      res.status(statusCode).json({ error: message });
    }
  }

  async deleteAuthor(req, res) {
    const idAuthor = req.params.id;
    try {
      const deletedAuthor = await AuthorService.deleteAuthor(idAuthor);
      res.status(200).send(`Delete author successfuly: ${deletedAuthor}`); // Trả về thông tin sách đã bị xóa
    } catch (error) {
      console.error(error);
      const statusCode = error instanceof ApiError ? error.statusCode : 500;
      const message = error.message || "Delete author failed";
      res.status(statusCode).json({ error: message });
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
      console.error(error);
      const statusCode = error instanceof ApiError ? error.statusCode : 500;
      const message = error.message || "Update author failed";
      res.status(statusCode).json({ error: message });
    }
  }
}

module.exports = new AuthorController();
