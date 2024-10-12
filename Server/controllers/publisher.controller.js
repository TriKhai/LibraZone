const PublisherService = require("../services/publisher.service");

class PublisherController {
  async createPublisher(req, res) {
    try {
      const publisherPayload = req.body;
      const reqFile = req.file;
      const newPublisher = await PublisherService.createPublisher(
        publisherPayload,
        reqFile
      );
      res.status(201).send(newPublisher);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }

  async getAllPublisher(req, res) {
    try {
      const publisherList = await PublisherService.findAllPublisher();
      res.status(200).send(publisherList);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }

  async deletePublisher(req, res) {
    const idPublisher = req.params.id;

    try {
      const deletedPublisher = await PublisherService.deletePublisher(
        idPublisher
      );

      res
        .status(200)
        .send(`Delete publisher successfully: ${deletedPublisher}`); // Trả về thông tin sách đã bị xóa
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Faild to delete publisher" });
    }
  }

  async putPublisher(req, res) {
    const idPublisher = req.params.id;
    const dataPublisher = req.body;

    try {
      const updatedPublisher = await PublisherService.updatePublisher(
        idPublisher,
        dataPublisher
      );

      res
        .status(200)
        .json(`Update publisher successfully: ${updatedPublisher}`);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Faild to update publisher" });
    }
  }
}

module.exports = new PublisherController();
