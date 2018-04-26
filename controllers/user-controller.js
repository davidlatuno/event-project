var db = require("../models");

module.exports = function (app) {

    app.post("/api/users", function (req, res) {
        db.User.create(req.body).then(function (data) {
            res.json(data);
        })
    })

    app.put("/api/users/:id", function (req, res) {
        db.User.update(req.body, {
            where: {
                id: req.params.id
            }
        }).then(function (data) {
            res.json(data)
        });
    })
    app.get("/api/users", function(req, res){
        db.User.findAll({}).then(function (data) {
            res.json(data);
        })
    })
    app.get("/api/users/:id", function (req, res) {
        db.User.findOne(
            {
                where:
                    { id: req.params.id }
            }).then(function (data) {
                res.json(data);
            })
    })

};
