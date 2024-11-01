//import thư viện, đối tượng, khai báo biến
const express = require("express");
const path = require("path");
// const mongodb = require("mongodb");
const mongoose = require("mongoose");

const config = require("./config/config");
const app = express();

// const models = require("./models/index");
const router = require("./routers/index");
//
const PORT = config.app.port;
const Mongo_URI = config.db.uri;

// Sử dụng kiểu json
app.use(express.json());

// Cài đặt static file
const publicPathDirectory = path.join(__dirname, "public");
app.use("/public", express.static(publicPathDirectory));

//
// app.get("/", (req, res) => {
//   res.send(config.db.uri);
// });
app.get("/", (req, res) => {
  res.json({
    code: 0,
    msg: "OK",
    data: "hello world",
  });
});
// function run server
const runServer = async () => {
  try {
    // connect database
    await mongoose.connect(Mongo_URI);
    console.log("Connected to MongoDB");

    // router
    app.use("/api/v1", router);

    // run server
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error run server", error);
  }
};

runServer();
