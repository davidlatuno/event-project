var express = require("express");
var router = express.Router();
var path = require("path");

router.get("/signup", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/signup.html"));
})

router.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/login.html"));
})

router.get("/profile", function(req, res) {
    res.render(path.join(__dirname, "../views/profile"));
});

router.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/index.html"));
});

module.exports = router;