const express = require("express");
const { uploadImage } = require("../midleware/uploadImage");
const { authenticate } = require("../midleware/authenticate");
const { authorize } = require("../midleware/authorize");
const AuthorController = require("../controllers/author.controller");
const authorRouter = express.Router();

authorRouter.post(
  "/",
  authenticate,
  authorize(["admin"]),
  uploadImage("author"),
  AuthorController.createAuthor
);
authorRouter.get(
  "/",
  authenticate,
  authorize(["admin"]),
  AuthorController.getAuthors
);
authorRouter.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  AuthorController.deleteAuthor
);
authorRouter.put(
  "/:id",
  authenticate,
  authorize(["admin"]),
  AuthorController.putAuthor
);

module.exports = authorRouter;
