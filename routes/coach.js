const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const coachController = require("../controllers/coach");

router.get("/", coachController.getCoaches);
router.get("/:id", coachController.getProfile);
router.post("/addComment/:id", coachController.addComment);

module.exports = router;
