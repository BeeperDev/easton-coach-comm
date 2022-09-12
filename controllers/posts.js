const cloudinary = require("../middleware/cloudinary");
const GeneralPost = require("../models/GeneralPost");
const CoachComment = require("../models/CoachComment");
const Coach = require("../models/Coach");

module.exports = {
  getFeed: async (req, res) => {
    try {
      const posts = await GeneralPost.find().sort({ createdAt: "desc" }).lean();
      const coaches = await Coach.find({ user: req.user.id });

      res.render("generalPosts.ejs", {
        generalPost: posts,
        user: req.user,
        activeUser: req.user,
      });
    } catch (err) {
      console.log(err);
    }
  },
};
