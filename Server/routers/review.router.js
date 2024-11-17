const express = require("express");
const { authenticate } = require("../midleware/authenticate");
const { authorize } = require("../midleware/authorize");
const ReviewController = require("../controllers/review.controller");
const reviewRouter = express.Router();

reviewRouter.get("/user/:id", authenticate, ReviewController.getReviewsByUser);
reviewRouter.get("/book/:id", authenticate, ReviewController.getReviewsByBook);
reviewRouter.get("/", authenticate, ReviewController.getReviews);
reviewRouter.post("/", authenticate, ReviewController.createReview);
reviewRouter.delete("/:id", authenticate, ReviewController.deleteReviewService);

module.exports = reviewRouter;
