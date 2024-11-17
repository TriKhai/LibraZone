const ApiError = require("../api-error");
const ReviewService = require("../services/review.service");

class ReviewController {
  async createReview(req, res) {
    try {
      const { bookID, readerID, star, comment } = req.body;
      const newReview = await ReviewService.createReviewService(
        bookID,
        readerID,
        star,
        comment
      );

      res.status(201).json(newReview);
    } catch (error) {
      console.error(error);
      const statusCode = error instanceof ApiError ? error.statusCode : 500;
      const message =
        error.message ||
        "An unexpected error occurred while creating the author.";
      res.status(statusCode).json({ error: message });
    }
  }

  // Lấy tất cả review của một sách
  async getReviews(req, res) {
    try {
      const reviews = await ReviewService.getReviewsService();
      console.log("reviews: ", reviews);
      res.status(200).json(reviews);
    } catch (error) {
      console.error(error);
      const statusCode = error instanceof ApiError ? error.statusCode : 500;
      const message =
        error.message ||
        "An unexpected error occurred while creating the author.";
      res.status(statusCode).json({ error: message });
    }
  }

  async getReviewsByUser(req, res) {
    try {
      const { id } = req.params;
      //   console.log("id: ", id);
      const reviews = await ReviewService.getReviewsByUserService(id);
      console.log("reviews: ", reviews);
      res.status(200).json(reviews);
    } catch (error) {
      console.error(error);
      const statusCode = error instanceof ApiError ? error.statusCode : 500;
      const message =
        error.message ||
        "An unexpected error occurred while creating the author.";
      res.status(statusCode).json({ error: message });
    }
  }

  async getReviewsByBook(req, res) {
    try {
      const { id } = req.params;
      // console.log("id 1: ", id);
      const reviews = await ReviewService.getReviewsByBookService(id);
      // console.log("reviews: ", reviews);
      res.status(200).json(reviews);
    } catch (error) {
      console.error(error);
      const statusCode = error instanceof ApiError ? error.statusCode : 500;
      const message =
        error.message ||
        "An unexpected error occurred while creating the author.";
      res.status(statusCode).json({ error: message });
    }
  }

  async deleteReviewService(req, res) {
    try {
      const { id } = req.params;
      const deletedReview = await ReviewService.deleteReviewService(id);
      res.status(200).json(deletedReview);
    } catch (error) {
      console.error(error);
      const statusCode = error instanceof ApiError ? error.statusCode : 500;
      const message =
        error.message ||
        "An unexpected error occurred while creating the author.";
      res.status(statusCode).json({ error: message });
    }
  }
}

module.exports = new ReviewController();
