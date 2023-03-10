const { v4: uuid } = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-errors");
const getCoordsForAddress = require("../utils/location");
const Place = require("../models/places");
const User = require("../models/users");
const mongoose = require("mongoose");

let DUMMY_PLACES = [
	{
		id: "p1",
		title: "Empire State Building",
		description: "One of the most famous sky scrapers in the world!",
		imageUrl:
			"https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
		address: "20 W 34th St, New York, NY 10001",
		location: {
			lat: 40.7484405,
			lng: -73.9878584,
		},
		creator: "u1",
	},
	{
		id: "p2",
		title: "Empire State Building",
		description: "One of the most famous sky scrapers in the world!",
		imageUrl:
			"https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
		address: "20 W 34th St, New York, NY 10001",
		location: {
			lat: 40.7484405,
			lng: -73.9878584,
		},
		creator: "u2",
	},
];

const getPlaceById = async (req, res, next) => {
	const placeId = req.params.placeId;
	let place;
	try {
		place = await Place.findById(placeId);
	} catch (err) {
		const error = new HttpError(
			"Something went wrong, could not find a place",
			500
		);
		return next(error);
	}

	// if no place throw error
	if (!place) {
		const error = new HttpError("Couldn't find place with provided id", 404);
		return next(error);
	}
	// convert the response object to normal JS object
	// remove the _ from id by setting getters: true
	res.json({ place: place.toObject({ getters: true }) });
};

const getPlacesByUserId = async (req, res, next) => {
	const userId = req.params.uid;
	let places;
	try {
		places = await Place.find({ creator: userId });
	} catch (err) {
		const error = new HttpError(
			"Fetching places failed, please try again",
			500
		);
		return next(error);
	}

	if (!places || places.length === 0) {
		return next(
			new HttpError("Couldn't find places with provided user id!"),
			404
		);
	}
	res.json({
		places: places.map((place) => place.toObject({ getters: true })),
	}); // {place} => {place:placeID}
};

const createPlace = async (req, res, next) => {
	const errors = validationResult(req); // check req object to see if there any validation errors
	if (!errors.isEmpty()) {
		console.log(errors);
		return next(
			new HttpError("Invalid inputs passed, please check your data~", 422)
		);
	}
	const { title, description, address, creator, imageUrl } = req.body;

	// dynamically extract coordinates from the address
	let coordinates;
	try {
		coordinates = await getCoordsForAddress(address);
	} catch (error) {
		return next(error);
	}

	const createdPlace = new Place({
		title,
		description,
		address,
		location: coordinates,
		image:
			"https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
		creator,
	});

	let user;
	try {
		user = await User.findById(creator);
	} catch (err) {
		const error = new HttpError("Creating place failed, please try again", 500);
		return next(error);
	}
	if (!user) {
		const error = new HttpError("Could not find user for provided Id", 404);
		return next(error);
	}
	console.log(user);
	try {
		// await createdPlace.save(); // save a place to the database
		const session = await mongoose.startSession(); // start a session
		session.startTransaction(); // start a transaction
		await createdPlace.save({ session: session }); // save place
		// add place id to a user
		user.places.push(createdPlace);
		// save the updated user
		await user.save({ session: session });
		// commit the transaction
		await session.commitTransaction();
	} catch (err) {
		const error = new HttpError("Creating place failed, please try again", 500);
		console.log("error", err);
		return next(error); // stop code execution in case of an error
	}
	res.status(201).json({ place: createdPlace });
};

const updatePlace = async (req, res, next) => {
	const errors = validationResult(req); // check req object to see if there any validation errors
	if (!errors.isEmpty()) {
		console.log(errors);
		return next(
			new HttpError("Invalid inputs passed, please check your data!", 422)
		);
	}
	const { title, description } = req.body;
	const placeId = req.params.placeId;

	let place;
	try {
		place = await Place.findById(placeId);
	} catch (err) {
		const error = new HttpError(
			"Something went wrong, could not update place!",
			500
		);
		return next(error);
	}
	place.title = title;
	place.description = description;

	try {
		await place.save();
	} catch (err) {
		const error = new HttpError(
			"Something went wrong, could not update place",
			500
		);
		return next(error);
	}

	res.status(200).json({ place: place.toObject({ getters: true }) });
};

const deletePlace = async (req, res, next) => {
	const placeId = req.params.placeId;
	let place;
	try {
		place = await Place.findById(placeId);
	} catch (err) {
		const error = new HttpError(
			"Something went wrong, could not delete place",
			500
		);
		next(error);
	}

	try {
		await place.remove();
	} catch (err) {
		const error = new HttpError(
			"Something went wrong, could not delete place",
			500
		);
		next(error);
	}
	res.status(200).json({ message: "Place Deleted" });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
