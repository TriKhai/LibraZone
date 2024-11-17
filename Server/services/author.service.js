const models = require("../models/index");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const ApiError = require("../api-error");
require("dotenv").config();

const IMAGE_BASE_PATH = process.env.IMAGE_BASE_PATH;
class AuthorService {
  async deleteImgage(imgPath) {
    imgPath = imgPath.replace(IMAGE_BASE_PATH, "");
    const fullPath = path.join(__dirname, "..", imgPath);
    fs.unlinkSync(fullPath);
  }

  async createAuthor(authorPayload, reqFile) {
    if (!authorPayload) {
      throw new ApiError(400, "Payload is required");
    }

    const imagesUrl = reqFile ? `${IMAGE_BASE_PATH}${reqFile.path}` : "";
    const authorData = {
      name: authorPayload.name,
      bio: authorPayload.bio,
      dob: authorPayload.dob,
      link: authorPayload.link,
      image: imagesUrl,
    };

    const newAuthor = new models.Author(authorData);
    await newAuthor.save();
    return newAuthor;
  }

  async findAllAuthor() {
    const authors = await models.Author.find();
    if (!authors) {
      throw new ApiError(404, "Authors not found");
    }
    return authors;
  }

  async deleteAuthor(idAuthor) {
    if (!idAuthor)
      throw new ApiError(
        400,
        "The author's ID is required and cannot be empty"
      );

    const authorId = new mongoose.Types.ObjectId(idAuthor);
    const deletedAuthor = await models.Author.findByIdAndDelete(authorId); // Xóa tài liệu theo ID

    if (!deletedAuthor) {
      throw new ApiError(
        404,
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

    if (!idAuthor) {
      throw new ApiError(
        400,
        "The author's ID is required and cannot be empty"
      );
    }

    if (!dataAuthor) {
      throw new ApiError(
        400,
        "The author's data is required and cannot be empty"
      );
    }

    const dataAuthorUpdate = {
      name: dataAuthor.name,
      bio: dataAuthor.bio,
      dob: dataAuthor.dob,
      link: dataAuthor.link,
      updatedAt: date, // Lưu ý: sửa `updateAt` thành `updatedAt` theo cách đặt tên chuẩn
    };

    const updatedAuthor = await models.Author.findByIdAndUpdate(
      idAuthor,
      dataAuthorUpdate,
      { new: true } // Tham số { new: true } để trả về tài liệu sau khi đã được cập nhật
    );

    if (!updatedAuthor) {
      throw new ApiError(
        404,
        "Failed to update the author. No author found with the given ID"
      );
    }

    return updatedAuthor;
  }
}

module.exports = new AuthorService();
