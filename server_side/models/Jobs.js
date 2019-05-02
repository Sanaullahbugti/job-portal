const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jobSchema = new Schema({
  title: String,
  description: String,
  salary:Number,
  level:String,
  appliedBy: [
    {
      type: Schema.ObjectId,
      ref: "Student"
    }
  ],
  postedBy: {
    type: Schema.ObjectId,
    ref: "Company"
  }
});

module.exports = mongoose.model("Jobs", jobSchema);
