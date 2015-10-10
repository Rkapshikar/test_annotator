var url = require( "url" );
var queryString = require( "querystring" );

var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
    count();
    next();
});


router.route('/annotate')
    /* Get all game data */
    .get(function(req, res) {
        dataProvider.findAll(  
            function(err, datas) {
                if (err) {
                    res.send(err);
                }
                datas.sort(function(obj1, obj2) {
                    return obj1.game - obj2.game;
                });
                res.json({ "length" : length, "data" : datas });
            }
        );
    })

    /* Add new game data to database */
    .post(function(req, res) {
        updated = true;
        for (var count = 0; count < req.body.length ; count++) {
            var data = req.body[count];
            var newData = 
            {
                "id" : data.id,
                "game" : data.game,
                "gameData" : data.gameData
            };

            annotation.create(
                newData,
                function(err, datas) {
                    if (err) {
                        res.send(err);
                    }
                    res.json(datas);
                }
            );

        }
    })

module.exports = router;
