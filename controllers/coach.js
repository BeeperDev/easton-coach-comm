const cloudinary = require("../middleware/cloudinary");
const CoachComment = require("../models/CoachComment");
const Coach = require("../models/Coach");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const comments = await CoachComment.find({ coach: req.params.id }) // find comments for the coach's page youre on
        .sort({ createdAt: "desc" })
        .lean();
      res.render("coachProfile.ejs", {
        user: req.user,
        comments: comments,
      });
    } catch (err) {
      console.log(err);
    }
  },
  addComment: async (req, res) => {
    try {
      await CoachComment.create({
        comment: req.body.comment, // coming from the form
        likes: 0,
        coach: req.params.id, // :id was passed in the route (url)
        createdBy: req.user.coachName, //userName of the person that made comment
        createdById: req.user.id, // req.user is passed in through passport when user in logged in
      });
      console.log("Comment has been added!");
      console.log(req.params.id);
      console.log(req.user.coachName);
      res.redirect("/coach/" + req.params.id); // redirect back to the specific post
    } catch (err) {
      console.log(err);
    }
  },
};
