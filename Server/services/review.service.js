const ApiError = require("../api-error");
const models = require("../models/index");
class ReviewService {
  async createReviewService(bookId, readerId, star, comment) {
    if (!bookId) throw new ApiError(400, "Missing Book ID.");
    if (!readerId) throw new ApiError(400, "Missing Reader ID.");
    if (!star) throw new ApiError(400, "Missing rating stars.");
    if (!comment) throw new ApiError(400, "Missing review comment.");

    const existingReview = await models.Review.findOne({
      book: bookId,
      reader: readerId,
    });
    if (existingReview) {
      throw new ApiError(
        409,
        "User has already submitted a review for this book."
      );
    }
    const currentDate = new Date();
    // console.log(currentDate);
    const newReview = new models.Review({
      book: bookId,
      reader: readerId,
      createdAt: currentDate,
      star: star,
      comment: comment,
    });

    return await newReview.save();
  }

  // Lấy review
  async getReviewsService() {
    const reviews = await models.Review.find()
      .populate("reader", "lastName")
      .populate({
        path: "book",
        select: "title",
        populate: {
          path: "author",
          select: "name",
        },
      });
    if (!reviews || reviews.length === 0)
      throw new ApiError(404, "No comments found.");
    return reviews;
  }

  async getReviewsByUserService(userID) {
    if (!userID) throw new ApiError(400, "Missing user ID.");
    const reviews = await models.Review.find({ reader: userID })
      .populate({
        path: "reader",
        select: "firstName lastName email",
      })
      .populate({
        path: "book",
        select: "title",
        populate: {
          path: "author",
          select: "name",
        },
      });

    if (!reviews || reviews.length === 0)
      throw new ApiError(404, "No comments found.");
    return reviews;
  }

  async calculateStarBook(bookID, reviews) {
    const book = await models.Book.findOne({ _id: bookID });
    if (!reviews || reviews.length === 0) {
      book.ratings.average = 0;
      book.ratings.reviews_count = reviews.length;
      await book.save();
      throw new ApiError(404, "No comments found.");
    }
    const totalStars = reviews.reduce((sum, review) => sum + review.star, 0);
    const star = Math.ceil(totalStars / reviews.length);

    book.ratings.average = star;
    book.ratings.reviews_count = reviews.length;
    console.log(book);
    await book.save();
  }

  async getReviewsByBookService(bookID) {
    if (!bookID) throw new ApiError(400, "Missing book ID.");
    const reviews = await models.Review.find({ book: bookID })
      .populate({
        path: "reader",
        select: "firstName lastName image",
      })
      .populate({
        path: "book",
        select: "title",
        populate: {
          path: "author",
          select: "name",
        },
      });

    await this.calculateStarBook(bookID, reviews);
    return reviews;
  }

  // Cập nhật review
  async updateReviewService(reviewId, star, comment) {
    return await Review.findByIdAndUpdate(
      reviewId,
      { star, comment },
      { new: true }
    );
  }

  // Xóa review
  async deleteReviewService(reviewId) {
    if (!reviewId) throw new ApiError(400, "Missing review ID.");
    const deleteReview = await models.Review.findByIdAndDelete(reviewId);
    if (!deleteReview) throw new ApiError(404, "Review not found.");
    return deleteReview;
  }
}

module.exports = new ReviewService();
