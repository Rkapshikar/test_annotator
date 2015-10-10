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

    /* Delete game data for specific game type */
    .delete(function(req, res) {
        dataProvider.delete(req.params.game,
            function(err, data) {
                if (err) {
                    res.send(err);
                }
                dataProvider.findAll( function(err, datas) {
                    if (err) {
                        res.send(err);
                    }
                    res.json(datas);
                });
            }
        );
    });


http.createServer(
    function (req, res) {

        // parses the request url
        var theUrl = url.parse( req.url );

        // gets the query part of the URL and parses it creating an object
        var queryObj = queryString.parse( theUrl.query );

        // queryObj will contain the data of the query as an object
        // and jsonData will be a property of it
        // so, using JSON.parse will parse the jsonData to create an object
        var obj = JSON.parse( queryObj.jsonData );

        // as the object is created, the live below will print "bar"
        console.log( obj.foo );

    }
).listen(80);