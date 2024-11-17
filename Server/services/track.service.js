const models = require("../models/index");
const mongoose = require("mongoose");

class TrackBookService {
  async createTrack(idReader, idBook) {
    if (!idReader) throw new Error("The reader's ID is required");
    if (!idBook) throw new Error("The book's ID is required");

    const readerObj = await models.User.findOne({ _id: idReader });
    const bookObj = await models.Book.findOne({ _id: idBook });
    const record = await models.TrackBookBorrowing.find({
      book: idBook,
      reader: idReader,
    });
    console.log(record);

    if (record) {
      const isCheck = record.some(
        (item) =>
          item.state === "Order" ||
          item.state === "Waiting" ||
          item.state === "Approved"
      );

      if (isCheck) throw new Error("The book is already in the cart.");
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

    // Kiểm tra thông tin yêu cầu mượn sách
    const trackBook = await models.TrackBookBorrowing.findById(
      idTrackBook
    ).populate("book");
    if (!trackBook) throw new Error("Track book record not found");

    const book = trackBook.book;

    // Kiểm tra tồn kho
    if (book.stock < trackBook.quantity) {
      throw new Error("Not enough books available for borrowing");
    }

    // Cập nhật số lượng sách (trừ đi số lượng mượn)
    const updatedBook = await models.Book.findByIdAndUpdate(
      book._id,
      { $inc: { stock: -trackBook.quantity } },
      { new: true }
    );

    if (!updatedBook) throw new Error("Failed to update book stock");

    // Cập nhật trạng thái yêu cầu mượn sách
    const date = new Date();
    const returnDate = new Date(date);
    returnDate.setDate(date.getDate() + 14);

    const dataUpdateTrackBook = {
      dateApproved: date,
      dueDate: returnDate,
      state: "Approved",
    };

    const approvedBook = await models.TrackBookBorrowing.findByIdAndUpdate(
      idTrackBook,
      dataUpdateTrackBook,
      { new: true }
    );

    if (!approvedBook)
      throw new Error("Failed to approve the book borrowing request");

    return approvedBook;
  }

  async returnBook(recordID) {
    if (!recordID) throw new Error("The track's ID is required");

    // Lấy thông tin yêu cầu mượn sách
    const trackBook = await models.TrackBookBorrowing.findById(
      recordID
    ).populate("book");
    if (!trackBook) throw new Error("Track book record not found");

    const book = trackBook.book;

    // Cập nhật trạng thái yêu cầu mượn thành "Returned" và lưu ngày trả
    const date = new Date();
    const updatedData = {
      dateReturned: date,
      state: "Borrowed",
    };

    const updatedTrackBook = await models.TrackBookBorrowing.findByIdAndUpdate(
      recordID,
      updatedData,
      { new: true }
    );

    if (!updatedTrackBook)
      throw new Error("Failed to update the track book record");

    // Tăng số lượng sách trong kho
    const updatedBook = await models.Book.findByIdAndUpdate(
      book._id,
      { $inc: { stock: trackBook.quantity } },
      { new: true }
    );

    if (!updatedBook) throw new Error("Failed to update book stock");

    // Trả về thông tin yêu cầu mượn đã cập nhật
    return updatedTrackBook;
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
      state: { $in: ["Waiting", "Approved", "Borrowed"] },
    })
      .populate({
        path: "book",
        populate: [
          { path: "author" }, // Populate chi tiết tác giả
          { path: "publisher" }, // Populate chi tiết nhà xuất bản
        ],
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
      .populate({
        path: "book",
        populate: [
          { path: "author" }, // Populate chi tiết tác giả
          { path: "publisher" }, // Populate chi tiết nhà xuất bản
        ],
      })
      .populate("reader"); // Tùy chọn: populate để lấy chi tiết người đọc;
    if (!trackings || trackings.length === 0)
      throw new Error("Not found any record");
    // const books = trackings.map((tracking) => ({
    //   book: tracking.book,
    //   state: tracking.state,
    // }));
    return trackings;
  }

  async getRecordBorrowed(userId) {
    if (!userId) throw new Error("Faild to get user tracking reacords");
    const records = await models.TrackBookBorrowing.find({
      reader: userId,
      state: "Borrowed",
    })
      .populate({
        path: "book",
        populate: [
          { path: "author" }, // Populate chi tiết tác giả
          { path: "publisher" }, // Populate chi tiết nhà xuất bản
        ],
      })
      .populate("reader"); // Tùy chọn: populate để lấy chi tiết người đọc;
    if (!records || records.length === 0)
      throw new Error("Not found any record");
    // const books = trackings.map((tracking) => ({
    //   book: tracking.book,
    //   state: tracking.state,
    // }));
    // console.log(records);
    return records;
  }
}

module.exports = new TrackBookService();
