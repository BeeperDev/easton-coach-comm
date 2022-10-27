const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const studentController = require("../controllers/student");

router.get("/", studentController.getStudents);
router.get("/:id", studentController.getStudentProfile);
router.post("/addStudent", studentController.addStudent);
router.post("/addComment/:id", studentController.addComment);
router.put("/addPhoto/:id", upload.single("file"), studentController.addPhoto);
router.put("/likeComment/:studentId/:commentId", studentController.likeComment);
// router.delete("/deleteComment/:id", studentController.deleteComment);

module.exports = router;
