const express = require("express");
const AdminController = require("../controllers/admin.controller");
const adminRouter = express.Router();

adminRouter.get("/:id", AdminController.fetchAdmin);

module.exports = adminRouter;
