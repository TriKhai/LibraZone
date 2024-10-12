const models = require("../models/index");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");

class AuthorService {
  async deleteImgage(imgPath) {
    const fullPath = path.join(__dirname, "..", imgPath);
    try {
      fs.unlinkSync(fullPath);
      console.log("Ảnh đã bị xóa thành công:", imgPath);
    } catch (err) {
      console.error("Lỗi khi xóa ảnh:", err);
      throw new Error("Lỗi khi xóa ảnh!");
    }
  }

  async createAuthor(authorPayload, reqFile) {
    if (!authorPayload) throw new Error("authorPayload is empty");

    const imagesUrl = reqFile ? `${reqFile.path}` : "";
    const authorData = {
      name: authorPayload.name,
      bio: authorPayload.bio,
      dob: authorPayload.dob,
      link: authorPayload.link,
      image: imagesUrl,
    };
    if (!authorData) throw new Error("data is empty");

    const newAuthor = new models.Author(authorData);
    await newAuthor.save();
    return newAuthor;
  }

  async findAllAuthor() {
    const authors = await models.Author.find();
    if (!authors) throw new Error("Not found");
    return authors;
  }

  async deleteAuthor(idAuthor) {
    if (!idAuthor)
      throw new Error("The author's ID is required and cannot be empty");

    const authorId = new mongoose.Types.ObjectId(idAuthor);
    const deletedAuthor = await models.Author.findByIdAndDelete(authorId); // Xóa tài liệu theo ID

    if (!deletedAuthor) {
      throw new Error(
        "Failed to delete the author. No author found with the given ID"
      );
    }

    const imagePath = deletedAuthor.images;
    if (imagePath) {
      await this.deleteImgage(imagePath);
    }

    return deletedAuthor;
  }

  async updateAuthor(idAuthor, dataAuthor) {
    const date = new Date();

    if (!idAuthor)
      throw new Error("The author's ID is required. Cannot be empty");

    if (!dataAuthor) throw new Error("The author's data is error");

    const dataAuthorUpdate = {
      name: dataAuthor.name,
      bio: dataAuthor.bio,
      dob: dataAuthor.dob,
      link: dataAuthor.link,
      updateAt: date,
    };

    const updatedAuthor = await models.Author.findByIdAndUpdate(
      idAuthor,
      dataAuthorUpdate,
      {
        new: true,
      }
    );
    // Tham số { new: true } để trả về tài liệu sau khi đã được cập nhật

    if (!updatedAuthor) throw new Error("Update author is failed");

    return updatedAuthor;
  }
}

module.exports = new AuthorService();
