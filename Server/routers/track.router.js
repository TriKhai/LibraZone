const express = require("express");
const TrackBookController = require("../controllers/track.controller");
const trackRouter = express.Router();
const { authenticate } = require("../midleware/authenticate");
const { authorize } = require("../midleware/authorize");

trackRouter.get("/", authenticate, TrackBookController.getRecords);
trackRouter.get(
  "/borrowed-book/:id",
  authenticate,
  TrackBookController.getBorrowedRecord
);
trackRouter.get("/:id", authenticate, TrackBookController.getRecordByUserId);
trackRouter.post("/", authenticate, TrackBookController.postTrack);
trackRouter.put(
  "/confirm/:id",
  authenticate,
  TrackBookController.confirmRecord
);
trackRouter.put(
  "/approved/:id",
  authenticate,
  authorize(["admin"]),
  TrackBookController.approveRecord
);
trackRouter.put(
  "/returned/:id",
  authenticate,
  authorize(["admin"]),
  TrackBookController.confirmReturn
);
// trackRouter.delete("/:id", TrackBookController.confirmReturn);
trackRouter.delete(
  "/cancel/:id",
  authenticate,
  TrackBookController.cancelRecord
);

module.exports = trackRouter;
