const express = require("express");
const BookController = require("../controllers/book.controller");
const { uploadImage } = require("../midleware/uploadImage");
const bookRouter = express.Router();

bookRouter.post("/", uploadImage("book"), BookController.createBook);
bookRouter.get("/", BookController.getAllBook);
bookRouter.get("/:id", BookController.getBook);
bookRouter.delete("/:id", BookController.deleteBook);
bookRouter.put("/:id", BookController.putBook);

module.exports = bookRouter;
