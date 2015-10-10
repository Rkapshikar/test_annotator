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
	"annotation" : [Annotation]
});

var Annotation = new mongoose.Schema({
	"timeStampStart" = Number,
	"timeStampEnd" = Number,
	"comment" : String
})

db.model('Room', Room);
var Room = db.model('Room');

/* What is exported from this file */
RoomProvider = function(){};

/* Find all Annotations sorted by roomID*/
RoomProvider.prototype.findAll = function(callback) {
	Room.find()
		.sort("roomID")
		.exec(function(err, datas) {
			if (!err) {
				callback(null, datas);
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
RoomProvider.prototype.update = function(roomID, annotation, callback) {
	Room.update({ "roomID" : roomID }, // didn't use save because don't want update by _id
		{$push: {"annotation": annotation},
		{ safe: true, upsert : true },
		function(err, doc) {
			if (!err) {
				callback();
			}
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