const mongoose = require("mongoose");

const StudentCommentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  // this comment is for which student's page**
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  createdBy: {
    //user name of coach. set when comment is created
    type: String,
    ref: "Coach",
  },
  createdById: {
    type: mongoose.Schema.Types.ObjectId, //get the object id of....
    ref: "Coach", // user
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("StudentComment", StudentCommentSchema);
