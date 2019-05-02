const MongoClient = require("mongodb");
const express = require("express");
const mongoose = require('mongoose')
const cors = require("cors");
var bodyParser = require("body-parser");
const app = express();
const Jobs =require('./models/Jobs')
app.use(cors());
var url = "mongodb://127.0.0.1:27017";
app.use(bodyParser());
app.use(bodyParser.urlencoded());

var arr = [];
var dbo = null;
// MongoClient.connect(url, (err, db) => {
//   console.log("connected succesfully!!!");
//   dbo = db.db("job_portal");
// });
mongoose.connect('mongodb://127.0.0.1:27017/job_portal');
const db = mongoose.connection;
db.on("error",()=>{
  console.log("Connection error ");
});
db.once("open",()=>{
  console.log("connection built ");
});
Jobs.find({"salary":"100000"},(err,jobs)=>{
  console.log("Jobs",jobs);
})
app.listen(4000, () => {
  console.log("app is running on port 4000");
});
