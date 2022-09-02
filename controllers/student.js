const cloudinary = require("../middleware/cloudinary");
const Student = require("../models/Student");

module.exports = {
  getStudents: (req, res) => {
    res.render("student.ejs");
  },
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
