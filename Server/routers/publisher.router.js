const express = require("express");
const PublisherController = require("../controllers/publisher.controller");
const publisherRouter = express.Router();
const { uploadImage } = require("../midleware/uploadImage");
const { authenticate } = require("../midleware/authenticate");
const { authorize } = require("../midleware/authorize");

publisherRouter.post(
  "/",
  authenticate,
  authorize(["admin"]),
  uploadImage("publisher"),
  PublisherController.createPublisher
);
publisherRouter.get(
  "/",
  authenticate,
  authorize(["admin"]),
  PublisherController.getAllPublisher
);
publisherRouter.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  PublisherController.deletePublisher
);
publisherRouter.put(
  "/:id",
  authenticate,
  authorize(["admin"]),
  PublisherController.putPublisher
);

module.exports = publisherRouter;
