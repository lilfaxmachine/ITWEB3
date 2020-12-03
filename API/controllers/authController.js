const { userSchema } = require("../models/schemas");
const mongoose = require("mongoose");
const User = mongoose.model("User", userSchema);
var bcrypt = require("bcryptjs");

module.exports.register = function (req, res) {
  if (!req.body.email || !req.body.password) {
    res.status(400).json({ message: "All fields required" });
    return;
  }
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      console.log("hash: ", hash);
      console.log("password: ", req.body.password);
      console.log("email: ", req.body.email);
      const user = new User();
      user.password = hash;
      user.workouts = [];
      user.email = req.body.email;
      user.save(function (err, user) {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          res.status(200).json("Created");
        }
      });
    });
  });
};

module.exports.login = function (req, res) {
  if (!req.body.email || !req.body.password) {
    res.status(400).json({ message: "All fields required" });
    return;
  }
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err || user == null) {
      res.status(400).json({ message: "Invalid username or password" });
      return;
    }
    if (user.verifyPassword(req.body.password)) {
      token = user.generateJwt();
      res.status(200).json({ token: token });
      return;
    } else {
      res.status(400).json({ message: "Invalid username or password" });
      return;
    }
  });
};

module.exports.loginTest = function (req, res) {
  res.status(200).json("Hej");
};
