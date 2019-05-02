const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
var bodyParser = require("body-parser");
const app = express();
const Jobs = require("./models/Jobs");
app.use(cors());
var url = "mongodb://127.0.0.1:27017";
app.use(bodyParser());
app.use(bodyParser.urlencoded());
mongoose.connect("mongodb://127.0.0.1:27017/job_portal");
const db = mongoose.connection;
db.on("error", () => {
  console.log("Connection error ");
});
db.once("open", () => {
  console.log("connection built ");
});

app.get("/getall", (req, res) => {
  Jobs.find().toArray((err, result) => {
    res.send(result);
  });
});
