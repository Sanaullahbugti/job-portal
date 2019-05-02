const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const studentSchema = new Schema({
  name: String,
  password: String,
  summery: String,
  skills: [String],
  active: Boolean,

});


let StudentModel = mongoose.model("Student", studentSchema);
module.exports = { StudentModel: StudentModel };
