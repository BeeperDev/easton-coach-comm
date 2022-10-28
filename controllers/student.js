const cloudinary = require("../middleware/cloudinary");
const Student = require("../models/Student");
const StudentComment = require("../models/StudentComment");

module.exports = {
  getStudents: async (req, res) => {
    try {
      const students = await Student.find()
        .sort({ studentName: "desc" })
        .lean();
      res.render("student.ejs", {
        activeUser: req.user,
        students: students,
        user: req.user,
      });
    } catch (err) {
      console.log(err);
    }
  },
  getStudentProfile: async (req, res) => {
    try {
      const student = await Student.findById(req.params.id);
      const comments = await StudentComment.find({ student: req.params.id })
        .sort({ createdAt: "desc" })
        .lean();
      res.render("studentProfile.ejs", {
        activeUser: req.user,
        student: student,
        comments: comments,
      });
    } catch (err) {
      console.log(err);
    }
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
  addComment: async (req, res) => {
    try {
      await StudentComment.create({
        comment: req.body.comment, // coming from the form
        likes: 0,
        student: req.params.id, // :id was passed in the route (url)
        createdBy: req.user.coachName, //userName of the logged in coach that made comment
        createdById: req.user.id, // req.user is passed in through passport when user in logged in
      });
      console.log("Comment has been added!");
      res.redirect("/student/" + req.params.id); // redirect back to the specific student
    } catch (err) {
      console.log(err);
    }
  },
  addPhoto: async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);

      await Student.updateOne(
        { _id: req.params.id },
        {
          $set: {
            image: result.secure_url, // cloudinary response
            cloudinaryId: result.public_id, // cloudinary respone
          },
        }
      );
      console.log("image added to student model");
      res.redirect(`/student/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  likeComment: async (req, res) => {
    try {
      await StudentComment.findOneAndUpdate(
        { _id: req.params.commentId }, // find the comment with the ID in the url
        {
          $inc: { likes: 1 }, // increment the likes: by one, $inc comes with mongoose
        }
      );
      console.log("Likes +1");
      res.redirect(`/student/${req.params.studentId}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
      // Find post by id
      let post = await StudentComment.findById({ _id: req.params.studentId }); //make sure post exists
      // Delete post from db
      await StudentComment.deleteOne({ _id: req.params.commentId }); // delete from db
      console.log("Deleted Post");
      res.redirect(`/student/${req.params.studentId}`);
    } catch (err) {
      console.log(err);
    }
  },
};
