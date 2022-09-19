const mongoose = require("mongoose");

const GeneralPostSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  createdBy: {
    type: String,
    ref: "Coach",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdById: {
    type: mongoose.Schema.Types.ObjectId, //get the object id of....
    ref: "Coach", // user
  },
});

// MongoDB collection names here - will give lowercase plural of name

module.exports = mongoose.model("GeneralPost", GeneralPostSchema);
