const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, postsController.getPost);

// upload.single(file) is referencing multer which handles uploading the imgs
// enables user to create post with cloudinary for media uploads
router.post("/createPost", upload.single("file"), postsController.createPost);

// enables user to like post. In controller, uses POST model to update likes by one
router.put("/likePost/:id", postsController.likePost);

// enables user to delete post. In controller, uses POST model to delete post from MongoDB collection
router.delete("/deletePost/:id", postsController.deletePost);

module.exports = router;
