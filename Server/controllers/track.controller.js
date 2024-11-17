const TrackBookService = require("../services/track.service");

class TrackBookController {
  async postTrack(req, res) {
    try {
      const userId = req.body.userId;
      const bookId = req.body.bookId;
      const newTrackBook = await TrackBookService.createTrack(userId, bookId);
      res.status(201).send(newTrackBook);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }

  async getBorrowedRecord(req, res) {
    try {
      const userId = req.params.id;
      const newTrackBook = await TrackBookService.getRecordBorrowed(userId);
      res.status(201).send(newTrackBook);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }

  async confirmRecord(req, res) {
    try {
      const idTrackBook = req.params.id;
      const { quantity } = req.body;
      // console.log("quantity", quantity);
      const confirmRecord = await TrackBookService.confirmBook(
        idTrackBook,
        quantity
      );
      console.log(confirmRecord);
      res.status(200).send(confirmRecord);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }

  async approveRecord(req, res) {
    try {
      const idTrackBook = req.params.id;
      const approvedTrackBook = await TrackBookService.approveBook(idTrackBook);
      res.status(200).send(approvedTrackBook);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }

  async confirmReturn(req, res) {
    try {
      const recordID = req.params.id;
      console.log(recordID);
      const deletedRecord = await TrackBookService.returnBook(recordID);
      res.status(200).send(deletedRecord);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }

  // async confirmReturn(req, res) {
  //   try {
  //     const recordID = req.params.id;
  //     const deletedRecord = await TrackBookService.delete(recordID);
  //     res.status(200).send(deletedRecord);
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).send(error);
  //   }
  // }

  async cancelRecord(req, res) {
    try {
      const recordID = req.params.id;
      const deletedRecord = await TrackBookService.delete(recordID);
      res.status(200).send(deletedRecord);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }

  async getRecords(req, res) {
    try {
      const allTrackingRecord = await TrackBookService.findRecords();
      // console.log(allTrackingRecord);
      res.status(200).send(allTrackingRecord);
    } catch (error) {
      console.log(error);
      res.status(404).send(error);
    }
  }

  async getRecordByUserId(req, res) {
    try {
      const userId = req.params.id;
      const trackings = await TrackBookService.getTrackOfUser(userId);
      res.status(200).send(trackings);
    } catch (error) {
      console.log(error);
      res.status(404).send(error);
    }
  }
}

module.exports = new TrackBookController();
