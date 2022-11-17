const mongoose = require("mongoose");

const CoachCommentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  // this comment is for which coach**
  coachPage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Coach",
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

module.exports = mongoose.model("CoachComment", CoachCommentSchema);
