const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const coachController = require("../controllers/coach");
const { ensureAuth } = require("../middleware/auth");

router.get("/:blahblah", ensureAuth, coachController.getProfile);
router.post("/addComment", coachController.addComment);

module.exports = router;
