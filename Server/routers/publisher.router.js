const express = require("express");
const PublisherController = require("../controllers/publisher.controller");
const { uploadImage } = require("../midleware/uploadImage");
const publisherRouter = express.Router();

publisherRouter.post(
  "/",
  uploadImage("publisher"),
  PublisherController.createPublisher
);
publisherRouter.get("/", PublisherController.getAllPublisher);
publisherRouter.delete("/:id", PublisherController.deletePublisher);
publisherRouter.put("/:id", PublisherController.putPublisher);

module.exports = publisherRouter;
