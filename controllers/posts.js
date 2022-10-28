const cloudinary = require("../middleware/cloudinary");
const GeneralPost = require("../models/GeneralPost");
const Coach = require("../models/Coach");

module.exports = {
  getFeed: async (req, res) => {
    try {
      const posts = await GeneralPost.find().sort({ createdAt: "desc" }).lean();

      res.render("generalPosts.ejs", {
        posts: posts,
        user: req.user,
        activeUser: req.user,
      });
    } catch (err) {
      console.log(err);
    }
  },
  addComment: async (req, res) => {
    try {
      await GeneralPost.create({
        comment: req.body.comment, // coming from the form
        likes: 0,
        createdBy: req.user.coachName, //userName of the logged in coach that made comment
        createdById: req.user.id, // req.user is passed in through passport when user in logged in
      });
      console.log("Comment has been added!");
      res.redirect("/general"); // redirect back to the specific post
    } catch (err) {
      console.log(err);
    }
  },
  likePost: async (req, res) => {
    try {
      await GeneralPost.findOneAndUpdate(
        { _id: req.params.id }, // find the comment with the ID in the url
        {
          $inc: { likes: 1 }, // increment the likes: by one, $inc comes with mongoose
        }
      );
      console.log("Likes +1");
      res.redirect(`/general`);
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await GeneralPost.findById({ _id: req.params.id }); //make sure post exists
      // Delete post from db
      await GeneralPost.deleteOne({ _id: req.params.id }); // delete from db
      console.log("Deleted Post");
      res.redirect("/general");
    } catch (err) {
      console.log(err);
    }
  },
};
