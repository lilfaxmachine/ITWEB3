var express = require("express");
var router = express.Router();
var scoreController = require("../controllers/scoreController");

var jwt = require("express-jwt");
var auth = jwt({
  secret: process.env.JWTSECRET,
  userProperty: "payload",
  algorithms: ["sha1", "RS256", "HS256"],
});

/* GET home page. */
router.post("/score", scoreController.postScore);

module.exports = router;
