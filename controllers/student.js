const cloudinary = require("../middleware/cloudinary");
const Student = require("../models/Student");

module.exports = {
  getStudents: async (req, res) => {
    try {
      const students = await Student.find()
        .sort({ studentName: "desc" })
        .lean();
      res.render("student.ejs", {
        students: students,
        user: req.user,
      });
    } catch (err) {
      console.log(err);
    }
  },
  getStudentProfile: {},
  addStudent: async (req, res) => {
    try {
      await Student.create({
        studentName: req.body.studentName,
        discipline: req.body.discipline,
        studentRank: req.body.studentRank,
      });
      console.log("student has been created");
      res.redirect("/student");
    } catch (err) {
      console.log(err);
    }
  },
};
