const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const studentController = require("../controllers/student");

router.get("/", studentController.getStudents);
router.get("/:id", studentController.getStudentProfile);
router.post("/addStudent", studentController.addStudent);
router.post("/addComment/:id", studentController.addComment);

module.exports = router;
