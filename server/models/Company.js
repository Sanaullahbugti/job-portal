const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const companySchema = new Schema({
  name: String,
  password: String,
  description: String,
  size: Number,
  jobs: [{
    type: Schema.ObjectId,
    ref: "Jobs"
  }],
  active: Boolean
});

module.exports = mongoose.model("Company", companySchema);
