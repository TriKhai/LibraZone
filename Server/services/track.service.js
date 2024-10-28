const models = require("../models/index");
const mongoose = require("mongoose");

class TrackBookService {
  async createTrack(idReader, idBook) {
    if (!idReader) throw new Error("The reader's ID is required");
    if (!idBook) throw new Error("The book's ID is required");

    const readerObj = await models.User.findOne({ _id: idReader });
    const bookObj = await models.Book.findOne({ _id: idBook });
    const record = await models.TrackBookBorrowing.findOne({
      book: idBook,
      reader: idReader,
    });
    if (record) {
      throw new Error("The book is already in the cart.");
    }

    const borrowDate = new Date();
    const returnDate = new Date(borrowDate);
    returnDate.setDate(borrowDate.getDate() + 14);

    const trackData = {
      book: bookObj,
      reader: readerObj,
      // dateBorrowed: borrowDate,
      // dateReturned: returnDate,
    };

    const newTrackBook = new models.TrackBookBorrowing(trackData);
    if (!newTrackBook) throw new Error("Faild to create track book");
    await newTrackBook.save();
    return newTrackBook;
  }

  async confirmBook(idTrackBook, quantityBook) {
    if (!idTrackBook) throw new Error("The track's ID is required");

    const recordBook = await models.TrackBookBorrowing.findById(idTrackBook)
      .populate("book")
      .exec();

    if (recordBook.book.stock < quantityBook) {
      throw new Error("Exceeded quantity");
    }

    const borrowDate = new Date();

    const dataUpdateRecord = {
      state: "Waiting",
      dateBorrowed: borrowDate,
      quantity: quantityBook,
    };

    const confirmedRecord = await models.TrackBookBorrowing.findByIdAndUpdate(
      idTrackBook,
      dataUpdateRecord,
      {
        new: true,
      }
    );

    if (!confirmedRecord) throw new Error("Faild to comfimrm");
    return confirmedRecord;
  }

  async approveBook(idTrackBook) {
    if (!idTrackBook) throw new Error("The track's ID is required");
    const date = new Date();
    const returnDate = new Date(date);
    returnDate.setDate(date.getDate() + 14);
    const dataUpdateTrackBook = {
      dateApproved: date,
      dateReturned: returnDate,
      state: "Approved",
    };
    const approvedBook = await models.TrackBookBorrowing.findByIdAndUpdate(
      idTrackBook,
      dataUpdateTrackBook,
      {
        new: true,
      }
    );
    if (!approvedBook) throw new Error("Faild to approve");
    return approvedBook;
  }

  async delete(recordID) {
    if (!recordID) throw new Error("The track's ID is required");

    // const recordObjId = new mongoose.Types.ObjectId(recordID);
    const deletedRecord = await models.TrackBookBorrowing.findByIdAndDelete(
      recordID
    );
    if (!deletedRecord) throw new Error("Faild to approve");
    return deletedRecord;
  }

  async findRecords() {
    const allTrackingRecords = await models.TrackBookBorrowing.find({
      state: { $in: ["Waiting", "Approved"] },
    })
      .populate({
        path: "book",
        populate: { path: "author" }, // Populate the 'author' field inside 'book'
      })
      .populate("reader");
    if (!allTrackingRecords) throw new Error("Not found");
    return allTrackingRecords;
  }

  async getTrackOfUser(userId) {
    if (!userId) throw new Error("Faild to get user tracking reacords");
    const trackings = await models.TrackBookBorrowing.find({
      reader: userId,
    })
      .populate("book") // Tùy chọn: populate để lấy chi tiết sách
      .populate("reader"); // Tùy chọn: populate để lấy chi tiết người đọc;
    if (!trackings || trackings.length === 0)
      throw new Error("Not found any record");
    // const books = trackings.map((tracking) => ({
    //   book: tracking.book,
    //   state: tracking.state,
    // }));
    return trackings;
  }
}

module.exports = new TrackBookService();
