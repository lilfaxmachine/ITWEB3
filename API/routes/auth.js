var express = require("express");
var router = express.Router();
var authController = require("../controllers/authController");

var jwt = require("express-jwt");
var auth = jwt({
  secret: process.env.JWTSECRET,
  userProperty: "payload",
  algorithms: ["sha1", "RS256", "HS256"],
});

/* GET home page. */
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/test", auth, authController.loginTest);

module.exports = router;
