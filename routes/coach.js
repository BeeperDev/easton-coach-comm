const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const coachController = require("../controllers/coach");
const { ensureAuth } = require("../middleware/auth");

router.get("/", coachController.getCoaches);
router.get("/:id", coachController.getProfile);
router.post("/addComment/:id", coachController.addComment);

module.exports = router;
