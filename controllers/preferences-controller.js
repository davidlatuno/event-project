var db = require("../models");

module.exports = function (app) {
    app.post("/api/preferences", function(req, res){
        db.Preference.create(req.body).then(function(data){
            console.log(data);
            res.end();
        })
    })

}