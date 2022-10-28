const cloudinary = require("../middleware/cloudinary");
const CoachComment = require("../models/CoachComment");
const Coach = require("../models/Coach");

module.exports = {
  getProfile: async (req, res) => {
    try {
      if (req.user.id === req.params.id) {
        //if logged in user is same id as query param, display user profile
        const comments = await CoachComment.find({ coach: req.params.id }) // find comments for the coach's page youre on
          .sort({ createdAt: "desc" })
          .lean();
        res.render("coachProfile.ejs", {
          activeUser: req.user,
          user: req.user,
          comments: comments,
        });
      } else {
        // user wants to see another coach's profile
        const coach = await Coach.findById(req.params.id);
        const comments = await CoachComment.find({ coach: req.params.id }) // find comments for the coach's page youre on
          .sort({ createdAt: "desc" })
          .lean();
        res.render("coachProfile.ejs", {
          activeUser: req.user,
          user: coach,
          comments: comments,
        });
      }
    } catch (err) {
      console.log(err);
    }
  },
  getCoaches: async (req, res) => {
    try {
      const coaches = await Coach.find().sort({ coachName: "desc" }).lean();
      res.render("coach.ejs", {
        activeUser: req.user,
        coaches: coaches,
        user: req.user,
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
      res.redirect("/coach/" + req.params.id); // redirect back to the specific post
    } catch (err) {
      console.log(err);
    }
  },
  likeComment: async (req, res) => {
    try {
      await CoachComment.findOneAndUpdate(
        { _id: req.params.commentId }, // find the comment with the ID in the url
        {
          $inc: { likes: 1 }, // increment the likes: by one, $inc comes with mongoose
        }
      );
      console.log("Likes +1");
      res.redirect(`/coach/${req.params.coachId}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
      // Find post by id
      let post = await CoachComment.findById({ _id: req.params.coachId }); //make sure post exists
      // Delete post from db
      await CoachComment.deleteOne({ _id: req.params.commentId }); // delete from db
      console.log("Deleted Post");
      res.redirect(`/coach/${req.params.coachId}`);
    } catch (err) {
      console.log(err);
    }
  },
};
