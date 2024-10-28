const express = require("express");
const BookController = require("../controllers/book.controller");
const { uploadImage } = require("../midleware/uploadImage");
const bookRouter = express.Router();

bookRouter.get("/", BookController.getAllBook);
bookRouter.get("/search/book", BookController.searchBook);
bookRouter.get("/:id", BookController.getBook);
bookRouter.post("/", uploadImage("book"), BookController.createBook);
bookRouter.put("/:id", BookController.putBook);
bookRouter.delete("/:id", BookController.deleteBook);

module.exports = bookRouter;
