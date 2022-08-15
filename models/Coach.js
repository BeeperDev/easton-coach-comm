const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const CoachSchema = new mongoose.Schema({
  coachName: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: String,
  cloudinaryId: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
});

// Password hash middleware.

CoachSchema.pre("save", function save(next) {
  const coach = this;
  if (!coach.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(coach.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      coach.password = hash;
      next();
    });
  });
});

// Helper method for validating coach's password.

CoachSchema.methods.comparePassword = function comparePassword(
  candidatePassword,
  cb
) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

module.exports = mongoose.model("Coach", CoachSchema);
