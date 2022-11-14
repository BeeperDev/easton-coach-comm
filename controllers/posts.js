const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");

module.exports = {
  getProfile: async (req, res) => {
    try {
      // Since we have a session each request contains the logged-in users info: req.user
      // console.log(req.user) to see everything
      //grabbing just the posts of the logged-in user
      const posts = await Post.find({ user: req.user.id }); //using id of logged in user, find all their posts
      res.render("profile.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      //also get comments

      res.render("post.ejs", {
        post: post,
        user: req.user,
      }); //req.user is user that is currently logged in
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path); // takes file and puts it on their server, it sends back a bunch on info (result)

      await Post.create({
        // use POST model to create a new doc in db
        title: req.body.title, // form input had name of 'title'
        image: result.secure_url, // cloudinary response
        cloudinaryId: result.public_id, // cloudinary response
        caption: req.body.caption, // form input had name of 'caption'
        likes: 0,
        user: req.user.id, // grab user id from logged in user bc we have session
      });
      console.log("Post has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        //use post model
        { _id: req.params.id }, // find the post with the ID in the url
        {
          $inc: { likes: 1 }, // increment the likes: by one, $inc comes with mongoose
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id }); //make sure post exists
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId); // delete from cloudinary using the cloudinaryId: in posts collection
      // Delete post from db
      await Post.remove({ _id: req.params.id }); // delete from db
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
