const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const studentController = require("../controllers/student");

router.get("/", studentController.getStudents);
router.post("/addStudent", studentController.addStudent);

module.exports = router;
