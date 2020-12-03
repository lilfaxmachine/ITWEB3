var express = require("express");
var router = express.Router();
var authController = require("../controllers/authController");

/* GET home page. */
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/test", authController.loginTest);

module.exports = router;
