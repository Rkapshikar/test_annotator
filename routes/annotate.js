// var url = require( "url" );
// var queryString = require( "querystring" );

var express = require('express');
var router = express.Router();

var roomProvider = require('../models/RoomProvider');
var roomProvider = new RoomProvider();

router.use(function(req, res, next) {
    count();
    next();
});

var count = function() {
    roomProvider.count({}, 
        function(err, numberOfDocs) {
            length = numberOfDocs;
        }
    );
};

router.route('/')
    /* Get all game data */
    .get(function(req, res) {
        roomProvider.find(req.params.roomID,   
            function(err, rooms) {
                if (err) {
                    res.send(err);
                }
                rooms.annotations.sort(function(obj1, obj2) {
                    return obj1.timeStampStart - obj2.timeStampStart;
                });
                res.json({ "length" : length, "data" : rooms });
            }
        );
    })

    /* Add new game data to database */
    .post(function(req, res) {
        updated = true;
        var room = req.body;
        var newData = 
        {
            "video" : req.body.video,
            "roomID" : req.body.roomID,
            "annotation" : req.body.annotation

        };

        console.log(newData);

        roomProvider.update(
            newData,
            function(err, rooms) {
                if (err) {
                    res.send(err);
                }
                res.json(rooms);
            }
        );

        
    })

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

module.exports = router;