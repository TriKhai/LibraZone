const express = require("express");
const AdminController = require("../controllers/admin.controller");
const { authenticate } = require("../midleware/authenticate");
const { authorize } = require("../midleware/authorize");
const adminRouter = express.Router();

adminRouter.get(
  "/:id",
  authenticate,
  authorize(["admin"]),
  AdminController.fetchAdmin
);

module.exports = adminRouter;
