const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const placeSchema = new Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	image: { type: String, required: true },
	address: { type: String, required: true },
	location: {
		lat: { type: Number, required: true },
		lng: { type: Number, required: true },
	},
	//create a connection to user model
	creator: { type: mongoose.Types.ObjectId, required:true, ref: "User"}, // Id from db
	// creator: { type: String, required: true },
});

module.exports = mongoose.model("Place", placeSchema);
