var express = require("express");
var router = express.Router();
var path = require("path");
var db = require("./../models");


router.get("/signup", function (req, res) {
    res.sendFile(path.join(__dirname, "../views/signup.html"));
})

router.get("/login", function (req, res) {
    res.sendFile(path.join(__dirname, "../views/login.html"));
})

router.get("/profile/:id", function (req, res) {
    db.User.findOne({
        where:
            { 
                id: req.params.id }
        }).then(function (data) {
            // res.json(data);
            // console.log(data);
            res.render("profile", { user: data });
        });

});

router.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../views/index.html"));
});

module.exports = router;
