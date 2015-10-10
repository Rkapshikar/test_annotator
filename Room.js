/*
 * Mongoose model for game data
 */

var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://localhost:27017/datacollection');

var schema = mongoose.Schema;

/* Room format */
var Room = new mongoose.Schema({
	"video" : String,
	"roomID" : String,
	"annotation" : [{
		"timeStampStart" = Number,
		"timeStampEnd" = Number,
		"comment" : String}]
});


db.model('Room', Room);
var Room = db.model('Room');

/* What is exported from this file */
RoomProvider = function(){};

/* Find all Annotations sorted by roomID*/
RoomProvider.prototype.findAll = function(callback) {
	Room.find()
		.sort("roomID")
		.exec(function(err, rooms) {
			if (!err) {
				callback(null, rooms);
			}
		});
};

/* Find all annotations for specific room */
RoomProvider.prototype.find = function(id, callback) {
	Room.find({ "roomID" : id },
		{}, 
		function(err, Room) {
			if (!err) {
				callback(null, Room[0]);
			}
		}
	);
};

/* Update room */
RoomProvider.prototype.update = function(info, callback) {

	Room.findByIdAndUpdate(
        info._id,
        {$push: {"annotation": info.annotation}},
        {safe: true, upsert: true, new : true},
        function(err, model) {
            console.log(err);
        }
    );
};


/* Delete all  data for one roomID */
RoomProvider.prototype.delete = function(id, callback) {
	Room.remove({ "roomID" : id },
		function(err, object) {
			if (!err) {
				callback();
			}
		}
	);
};

/* Count number of roomID objects */
RoomProvider.prototype.count = function(criteria, callback) {
	Room.count(criteria,
		function(err, numberOfDocs) {
			if (!err) {
				callback(null, numberOfDocs);
			}
		}
	);
};

exports.RoomProvider = RoomProvider;