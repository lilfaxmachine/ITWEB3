const { scoreSchema } = require("../models/schemas");
const mongoose = require("mongoose");
const Scores = mongoose.model("scores", scoreSchema);

module.exports.postScore = function (req, res) {
  //comment in when auth is activated
  //User.findById(req.payload._id, (err, user) => {
  const score = new Scores();
  score.score = req.body.score;
  score.username = req.body.email;
  score.save(function (err, score) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.status(200).json({ message: score.score });
    }
  });
  //});
};
