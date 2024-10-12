const express = require("express");
const { uploadImage } = require("../midleware/uploadImage");
const AuthorController = require("../controllers/author.controller");
const authorRouter = express.Router();

authorRouter.post("/", uploadImage("author"), AuthorController.createAuthor);
authorRouter.get("/", AuthorController.getAuthors);
authorRouter.delete("/:id", AuthorController.deleteAuthor);
authorRouter.put("/:id", AuthorController.putAuthor);

module.exports = authorRouter;
