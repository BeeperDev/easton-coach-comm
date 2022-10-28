const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const coachController = require("../controllers/coach");

router.get("/", coachController.getCoaches);
router.get("/:id", coachController.getProfile);
router.post("/addComment/:id", coachController.addComment);
router.put("/likeComment/:coachId/:commentId", coachController.likeComment);
router.delete(
  "/deleteComment/:coachId/:commentId",
  coachController.deleteComment
);

module.exports = router;
