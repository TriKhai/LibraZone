const express = require("express");
const userRouter = require("./user.router");
const bookRouter = require("./book.router");
const authorRouter = require("./author.router");
const publisherRouter = require("./publisher.router");
const authRouter = require("./auth.router");
const trackRouter = require("./track.router");
const reviewRouter = require("./review.router");
const adminRouter = require("./admin.router");
const router = express.Router();

router.use("/users", userRouter);
router.use("/admin", adminRouter);
router.use("/books", bookRouter);
router.use("/author", authorRouter);
router.use("/publisher", publisherRouter);
router.use("/auth", authRouter);
router.use("/borrow", trackRouter);
router.use("/review", reviewRouter);

module.exports = router;
