var express = require("express");
var router = express.Router();
var path = require("path");
var yelp = require('yelp-fusion');
var request = require("request");
var client = yelp.client("D8cX5oZx77c-eDtSQ3azibBQ-9Hxja6-AGJasBnodqgJfJ5sHAaUBzZWoKp1epqANaWwopf9l_Er0D6IaRTZruXgcUZwFRER47NAObo6KEC2j-xLk0I8M5QTUUPhWnYx");
var db = require("./../models");

var categories = [
    {
        "name": "Arts & Culture",
        "sort_name": "Arts & Culture",
        "id": 1,
        "shortname": "Arts"
    },
    {
        "name": "Book Clubs",
        "sort_name": "Book Clubs",
        "id": 18,
        "shortname": "Book Clubs"
    },
    {
        "name": "Career & Business",
        "sort_name": "Career & Business",
        "id": 2,
        "shortname": "Business"
    },
    {
        "name": "Cars & Motorcycles",
        "sort_name": "Cars & Motorcycles",
        "id": 3,
        "shortname": "Auto"
    },
    {
        "name": "Community & Environment",
        "sort_name": "Community & Environment",
        "id": 4,
        "shortname": "Community"
    },
    {
        "name": "Dancing",
        "sort_name": "Dancing",
        "id": 5,
        "shortname": "Dancing"
    },
    {
        "name": "Education & Learning",
        "sort_name": "Education & Learning",
        "id": 6,
        "shortname": "Education"
    },
    {
        "name": "Fashion & Beauty",
        "sort_name": "Fashion & Beauty",
        "id": 8,
        "shortname": "Fashion"
    },
    {
        "name": "Fitness",
        "sort_name": "Fitness",
        "id": 9,
        "shortname": "Fitness"
    },
    {
        "name": "Food & Drink",
        "sort_name": "Food & Drink",
        "id": 10,
        "shortname": "Food & Drink"
    },
    {
        "name": "Games",
        "sort_name": "Games",
        "id": 11,
        "shortname": "Games"
    },
    {
        "name": "Movements & Politics",
        "sort_name": "Movements & Politics",
        "id": 13,
        "shortname": "Movements"
    },
    {
        "name": "Health & Wellbeing",
        "sort_name": "Health & Wellbeing",
        "id": 14,
        "shortname": "Well-being"
    },
    {
        "name": "Hobbies & Crafts",
        "sort_name": "Hobbies & Crafts",
        "id": 15,
        "shortname": "Crafts"
    },
    {
        "name": "Language & Ethnic Identity",
        "sort_name": "Language & Ethnic Identity",
        "id": 16,
        "shortname": "Languages"
    },
    {
        "name": "LGBT",
        "sort_name": "LGBT",
        "id": 12,
        "shortname": "LGBT"
    },
    {
        "name": "Lifestyle",
        "sort_name": "Lifestyle",
        "id": 17,
        "shortname": "Lifestyle"
    },
    {
        "name": "Movies & Film",
        "sort_name": "Movies & Film",
        "id": 20,
        "shortname": "Films"
    },
    {
        "name": "Music",
        "sort_name": "Music",
        "id": 21,
        "shortname": "Music"
    },
    {
        "name": "New Age & Spirituality",
        "sort_name": "New Age & Spirituality",
        "id": 22,
        "shortname": "Spirituality"
    }
]

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
