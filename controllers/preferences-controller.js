var db = require("../models");

module.exports = function (app) {
    app.post("/api/preferences", function(req, res){
        db.Preference.create(req.body).then(function(data){
            console.log(data);
            res.end();
        })
    });
    app.get("/api/preferences/:id", function(req, res){
        db.Preference.findAll({where: {UserId: req.params.id}}).then(function(preferences){
            res.json(preferences);
        })
    })

}