const express = require("express");
const BookController = require("../controllers/book.controller");
const { uploadImage } = require("../midleware/uploadImage");
const { authenticate } = require("../midleware/authenticate");
const { authorize } = require("../midleware/authorize");
const bookRouter = express.Router();

bookRouter.get("/", authenticate, BookController.getAllBook);
bookRouter.get("/search/book", authenticate, BookController.searchBook);
bookRouter.get("/:id", authenticate, BookController.getBook);
bookRouter.post(
  "/",
  authenticate,
  authorize(["admin"]),
  uploadImage("book"),
  BookController.createBook
);
bookRouter.put(
  "/:id",
  authenticate,
  authorize(["admin"]),
  BookController.putBook
);
bookRouter.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  BookController.deleteBook
);

module.exports = bookRouter;
