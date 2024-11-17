const { default: mongoose } = require("mongoose");
const models = require("../models");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const IMAGE_BASE_PATH = process.env.IMAGE_BASE_PATH;

class BookService {
  async deleteImgage(imgPath) {
    imgPath = imgPath.replace(IMAGE_BASE_PATH, "");
    const fullPath = path.join(__dirname, "..", imgPath);
    try {
      fs.unlinkSync(fullPath);
      console.log("Ảnh đã bị xóa thành công:", imgPath);
    } catch (err) {
      console.error("Lỗi khi xóa ảnh:", err);
      throw new Error("Lỗi khi xóa ảnh!");
    }
  }

  async createBook(bookPayload, reqFile) {
    if (!bookPayload) throw new Error("bookPayload is empty");
    const imagesUrl = reqFile ? `${IMAGE_BASE_PATH}${reqFile.path}` : "";

    console.log(imagesUrl);

    const bookData = {
      title: bookPayload.title,
      author: bookPayload.idAuthor,
      publisher: bookPayload.idPublisher,
      genre: bookPayload.genre,
      published_date: new Date(bookPayload.published_date),
      price: parseFloat(bookPayload.price),
      image: imagesUrl,
      stock: parseInt(bookPayload.stock),
      description: bookPayload.description,
      country: bookPayload.country,
      language: bookPayload.language,
      label: bookPayload.label,
    };

    if (!bookData) throw Error("Data Book is empty");

    const newBook = new models.Book(bookData);
    if (!newBook) throw new Error("Create book failed");
    await newBook.save();
    return newBook;
  }

  async searchBookWord(keyWord) {
    // console.log("searchBookWord");
    if (!keyWord) {
      throw new Error("keyWord is required");
    }

    //
    const results = await models.Book.find({
      $or: [
        { title: { $regex: keyWord, $options: "i" } }, // Tìm theo tên sản phẩm
        { description: { $regex: keyWord, $options: "i" } }, // Tìm theo mô tả
      ],
    });
    if (!results) throw new Error("Not found any book");
    return results;
  }

  async findAllBook() {
    const books = await models.Book.find()
      .populate("author") // Lấy chi tiết của author bằng ObjectId
      .populate("publisher"); // Lấy chi tiết của publisher bằng ObjectId;
    // const author = await model.Author.find();
    if (!books) throw new Error("Not found");
    return books;
  }

  async findBook(idBook) {
    if (!idBook)
      throw new Error("The book's id is require and cannot be empty");
    const bookObjId = new mongoose.Types.ObjectId(idBook);
    const books = await models.Book.findOne({ _id: bookObjId })
      .populate("author") // Lấy chi tiết của author bằng ObjectId
      .populate("publisher"); // Lấy chi tiết của publisher bằng ObjectId;
    // const author = await model.Author.find();
    if (!books) throw new Error("Not found");
    return books;
  }

  async deleteBook(idBook) {
    if (!idBook)
      throw new Error("The book's ID is required and cannot be empty");

    const bookObjId = new mongoose.Types.ObjectId(idBook);
    const deletedBook = await models.Book.findByIdAndDelete(bookObjId);

    if (!deletedBook)
      throw new Error(
        "Failed to delete the book. No book found with the given ID."
      );

    const imgPath = deletedBook.image;
    if (imgPath) {
      console.log(imgPath);
      await this.deleteImgage(imgPath);
    }
    return deletedBook;
  }

  async updateBook(idBook, dataBook) {
    const date = new Date();

    if (!idBook) throw new Error("id is empty");
    if (!dataBook) throw new Error("data is empty");

    const dataBookUpdate = {
      title: dataBook.title,
      author: dataBook.author,
      publisher: dataBook.publisher,
      genre: dataBook.genre,
      published_date: new Date(dataBook.published_date),
      price: parseFloat(dataBook.price),
      image: dataBook.image,
      stock: parseInt(dataBook.stock),
      description: dataBook.description,
      country: dataBook.country,
      language: dataBook.language,
      updateAt: date,
      label: dataBook.label,
    };

    if (!dataBookUpdate) throw new Error("The book's data is error");

    const updatedBook = await models.Book.findByIdAndUpdate(
      idBook,
      dataBookUpdate,
      {
        new: true,
      }
    );
    // Tham số { new: true } để trả về tài liệu sau khi đã được cập nhật

    if (!updatedBook) throw new Error("update book failed");

    return updatedBook;
  }
}
module.exports = new BookService();
