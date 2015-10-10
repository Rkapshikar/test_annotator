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
        roomProvider.findAll(  
            function(err, rooms) {
                if (err) {
                    res.send(err);
                }
                rooms.sort(function(obj1, obj2) {
                    return obj1.roomID - obj2.roomID;
                });
                res.json({ "length" : length, "data" : rooms });
            }
        );
    })

    /* Add new annotation to database */
    .post(function(req, res) {
        updated = true;
        for (var count = 0; count < req.body.length ; count++) {
            var room = req.body[count];
            var newRoom = 
            {
                "video" : data.video,
                "roomID" : data.roomID,
                "annotation" : data.annotation
            };

            roomProvider.update(
                newRoom,
                function(err, rooms) {
                    if (err) {
                        res.send(err);
                    }
                    res.json(rooms);
                }
            );

        }
    });

    /* Delete game data for specific game type */
    .delete(function(req, res) {
        roomProvider.delete(req.params.roomID,
            function(err, room) {
                if (err) {
                    res.send(err);
                }
                roomProvider.findAll( function(err, rooms) {
                    if (err) {
                        res.send(err);
                    }
                    res.json(rooms);
                });
            }
        );
    });