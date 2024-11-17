const models = require("../models/index");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const IMAGE_BASE_PATH = process.env.IMAGE_BASE_PATH;

class PublisherService {
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

  async createPublisher(publisherPayload, reqFile) {
    if (!publisherPayload)
      throw new Error("publisherPayload is require and cannot be empty");
    const imagesUrl = reqFile ? `${IMAGE_BASE_PATH}${reqFile.path}` : "";
    // const imagesUrl = reqFile ? `${reqFile.path}` : "";

    const pubData = {
      name: publisherPayload.name,
      location: publisherPayload.location,
      establishedYear: publisherPayload.establishedYear,
      contact: {
        email: publisherPayload.contact.email,
        phone: publisherPayload.contact.phone,
        website: publisherPayload.contact.website,
      },
      image: imagesUrl,
    };

    if (!pubData) throw Error("pubData is error");
    const newPublisher = new models.Publisher(pubData);
    if (!newPublisher) throw new Error("Create publisher failed");
    await newPublisher.save();
    return newPublisher;
  }

  async findAllPublisher() {
    const publisherList = await models.Publisher.find();
    if (!publisherList) throw new "Not found"();
    return publisherList;
  }

  async deletePublisher(idPublisher) {
    if (!idPublisher)
      throw new Error("The publisher's ID is reuqire and cannot be empty");

    const pubObjId = new mongoose.Types.ObjectId(idPublisher);
    const deletedPublisher = await models.Publisher.findByIdAndDelete(pubObjId); // Xóa tài liệu theo ID

    if (!deletedPublisher) {
      throw new Error("Failed to delete the publisher");
    }

    const imagePath = deletedPublisher.image;

    if (imagePath) {
      await this.deleteImgage(imagePath);
    }
    return deletedPublisher;
  }

  async updatePublisher(idPublisher, dataPublisher) {
    const date = new Date();

    if (!idPublisher) throw new Error("ID publisher is empty");
    if (!dataPublisher) throw new Error("Data publisher is empty");

    const dataPublisherUpdate = {
      name: dataPublisher.name,
      location: dataPublisher.location,
      establishedYear: dataPublisher.establishedYear,
      contact: {
        email: dataPublisher.contact.email,
        phone: dataPublisher.contact.phone,
        website: dataPublisher.contact.website,
      },
      updateAt: date,
    };
    if (!dataPublisherUpdate) throw new Error("The publisher's data is error");

    const updatedPublisher = await models.Publisher.findByIdAndUpdate(
      idPublisher,
      dataPublisherUpdate,
      {
        new: true,
      }
    );
    // Tham số { new: true } để trả về tài liệu sau khi đã được cập nhật

    if (!updatedPublisher) throw new Error("Faild to update publisher");
    return updatedPublisher;
  }
}

module.exports = new PublisherService();
