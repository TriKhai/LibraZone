const express = require("express");
const TrackBookController = require("../controllers/track.controller");
const trackRouter = express.Router();

trackRouter.get("/", TrackBookController.getRecords);
trackRouter.get("/:id", TrackBookController.getRecordByUserId);
trackRouter.post("/", TrackBookController.postTrack);
trackRouter.put("/confirm/:id", TrackBookController.confirmRecord);
trackRouter.put("/approved/:id", TrackBookController.approveRecord);
trackRouter.delete("/:id", TrackBookController.confirmReturn);

module.exports = trackRouter;
