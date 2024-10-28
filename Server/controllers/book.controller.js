const BookService = require("../services/book.service");

class BookController {
  async createBook(req, res) {
    try {
      const bookPayload = req.body;
      const reqFile = req.file;
      const newBook = await BookService.createBook(bookPayload, reqFile);

      res.status(201).send(newBook);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }

  async getAllBook(req, res) {
    try {
      const bookList = await BookService.findAllBook();

      res.status(200).send(bookList);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }

  async getBook(req, res) {
    try {
      const idBook = req.params.id;
      const bookList = await BookService.findBook(idBook);
      res.status(200).send(bookList);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
  async searchBook(req, res) {
    const { keyWord } = req.query;
    console.log("search book", keyWord);
    try {
      const result = await BookService.searchBookWord(keyWord);
      res.status(200).send(result);
    } catch (error) {
      console.error("Lỗi khi tìm kiếm sản phẩm:", error);
      res.status(404).json({ message: "Có lỗi xảy ra khi tìm kiếm sản phẩm" });
    }
  }
  async deleteBook(req, res) {
    const idBook = req.params.id;
    try {
      const deletedBook = await BookService.deleteBook(idBook);
      res.status(200).send(`Delete book successfully: ${deletedBook}`); // Trả về thông tin sách đã bị xóa
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Delete book failed" });
    }
  }

  async putBook(req, res) {
    const idBook = req.params.id;
    const dataBook = req.body; // payload book
    try {
      const updatedBook = await BookService.updateBook(idBook, dataBook);
      res
        .status(200)
        .json({ message: "Update book successfully", book: updatedBook });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Update book failed" });
    }
  }
}

module.exports = new BookController();
