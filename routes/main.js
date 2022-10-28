const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const { ensureAuth } = require("../middleware/auth");

//Main Routes
router.get("/", homeController.getIndex);
router.get("/general", ensureAuth, postsController.getFeed);
router.post("/general/addComment", postsController.addComment);
router.put("/general/likeComment/:id", postsController.likePost);
router.delete("/general/deleteComment/:id", postsController.deletePost);

// routes for use login/signup
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router;
