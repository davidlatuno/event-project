var express = require("express");
var router = express.Router();
var path = require("path");
var yelp = require('yelp-fusion');
var request = require("request");
var client = yelp.client("D8cX5oZx77c-eDtSQ3azibBQ-9Hxja6-AGJasBnodqgJfJ5sHAaUBzZWoKp1epqANaWwopf9l_Er0D6IaRTZruXgcUZwFRER47NAObo6KEC2j-xLk0I8M5QTUUPhWnYx");
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

router.post("/yelp", function (req, res) {
    console.log(req.body.event)
    client.search({
        term: req.body.event,
        location: '92101',
        field: "radius",
        instance: "25 miles"
    }).then(response => {
        // console.log(response.jsonBody.businesses);
        res.json(response.jsonBody.businesses)
    }).catch(e => {
        console.log(e);
    });
})

router.post("/meetup", function (req, res) {
    console.log(req.body.event);
    var y = ''
    categories.forEach(findIndex);
    console.log(y);
    request("https://api.meetup.com/find/groups?key=1b18621c415e4a69b21d2c503a5914&photo-host=public&radius=30&category=" + y + "&page=10", function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var body = JSON.parse(body)
            res.json(body);
        }
    });

    function findIndex(key, index) {
        if (req.body.event === key.name) {
            return y = (key.id)
        }
    }
})

router.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../views/index.html"));
});

module.exports = router;
