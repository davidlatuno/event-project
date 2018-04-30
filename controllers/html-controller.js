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

router.get("/profile/:id", checkAuthentication, function (req, res) {

    db.User.findOne({
        where:
            {
                id: req.params.id
            }
    }).then(function (data) {
        console.log(req.session.passport.user);
        // res.json(data);
        // console.log(data);
        if(req.session.passport.user.id === parseInt(req.params.id)) {
            res.render("profile", { user: data });
        } else {
            res.redirect("/login");        
        }
    });


});
function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else {
        res.redirect("/login");
    }
}

router.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../views/index.html"));
});

module.exports = router;
