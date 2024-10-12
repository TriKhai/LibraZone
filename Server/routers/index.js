const express = require("express");
const userRouter = require("./user.router");
const bookRouter = require("./book.router");
const authorRouter = require("./author.router");
const publisherRouter = require("./publisher.router");
const authRouter = require("./auth.router");
const router = express.Router();

router.use("/users", userRouter);
router.use("/books", bookRouter);
router.use("/author", authorRouter);
router.use("/publisher", publisherRouter);
router.use("/auth", authRouter);

module.exports = router;
