const cloudinary = require("../middleware/cloudinary");
const GeneralPost = require("../models/GeneralPost");
const CoachComment = require("../models/CoachComment");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await CoachComment.find({ user: req.user.id });
      res.render("coachProfile.ejs", { CoachComments: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const posts = await GeneralPost.find().sort({ createdAt: "desc" }).lean();
      res.render("generalPosts.ejs", { generalPost: posts });
    } catch (err) {
      console.log(err);
    }
  },
};
