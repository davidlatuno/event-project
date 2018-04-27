var express = require("express");
var router = express.Router();
var path = require("path");

<<<<<<< HEAD
router.get("/signup", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/signup.html"));
})

router.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/login.html"));
})

router.get("/profile", function(req, res) {
    res.render(path.join(__dirname, "../views/profile"));
})

=======
router.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/index.html"));
});
router.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/login.html"));
});
router.get("/signup", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/signup.html"));
});
router.get("/profile", function(req, res) {
    res.render(path.join(__dirname, "../views/profile"));
});
>>>>>>> 1b03bcb3ca5b0850c49af8ace0a7e6f422fd955a
router.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/index.html"));
});

module.exports = router;