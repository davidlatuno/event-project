var db = require("../models");
var passport = require("../config/passport");

function sendMessage() {
    var accountSid = 'ACd8e51c3388f3e1d5df5cf6f0a9f0bd73'; // Your Account SID from www.twilio.com/console
    var authToken = 'b7fde894c4a9f5e2be1877930468e51a';   // Your Auth Token from www.twilio.com/console

    var twilio = require('twilio');
    var client = new twilio(accountSid, authToken);

    client.messages.create({
        body: 'Welcome to EventSMS! If you want, we will send you a daily message with an event you may be intereseted in. If you dont want this feature, reply NO',
        to: '+16197883033',  // Text this number
        from: '+16193832471' // From a valid Twilio number
    })
        .then((message) => console.log(message.sid));

}

module.exports = function (app) {

    app.post("/api/login", passport.authenticate("local"), function (req, res) {
        // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
        // So we're sending the user back the route to the members page because the redirect will happen on the front end
        // They won't get this or even be able to access this page if they aren't authed
        //res.render("profile");
        db.User.findOne(
            {
                where:
                    { email: req.body.email }
            }).then(function (data) {
                res.json("/profile/" + data.id);
            }).catch(function (err) {
                console.log(err);
                res.status(401).json(err);

            });
    });


    app.post("/api/signup", function (req, res) {
        console.log(req.body);
        db.User.create(req.body).then(function () {
            sendMessage();
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
        db.User.findAll(
            {
                where:
                    { id: req.params.id }
            }).then(function (data) {
                res.json(data);
            })
    })

};
