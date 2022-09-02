const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
  },
  discipline: {
    type: String,
    required: true,
  },
  studentRank: {
    type: String,
    required: true,
  },
  promote: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
    require: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Student", StudentSchema);
