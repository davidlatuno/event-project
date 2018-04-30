var db = require("../models");
var passport = require("../config/passport");

module.exports = function (app) {

    app.post("/api/login", passport.authenticate("local", { failureFlash: 'Invalid username or password.' }), function (req, res) {
        // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
        // So we're sending the user back the route to the members page because the redirect will happen on the front end
        // They won't get this or even be able to access this page if they aren't authed
        //res.render("profile");
        db.User.findOne(
            {
                where:
                    { email: req.body.email }
            }).then(function (data) {
                console.log(data);
                res.json("/profile/"+data.id);
            }).catch(function (err) {
                console.log(err);
                res.status(401).json(err);
 
            }); 
    });


    app.post("/api/signup", function (req, res) {
        console.log(req.body);
        db.User.create(req.body).then(function () {
            res.send("/login");
        }).catch(function (err) {
            console.log(err);
            res.json(err);
            // res.status(422).json(err.errors[0].message);
        });
    });

    app.put("/api/users/:id", function (req, res) {
        db.User.update(req.body, {
            where: {
                id: req.params.id
            }
        }).then(function (data) {
            res.json(data)
        });
    })
    app.get("/api/users", function (req, res) {
        db.User.findAll({}).then(function (data) {
            res.json(data);
        })
    })
    app.get("/api/users/:id", function (req, res) {
        db.User.findOne(
            {
                where:
                    { email: req.params.id }
            }).then(function (data) {
                res.json(data);
            })
    })

};
