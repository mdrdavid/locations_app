const { v4: uuid } = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-errors");
const getCoordsForAddress = require("../utils/location");

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

const getPlaceById = (req, res, next) => {
	const placeId = req.params.placeId;
	const place = DUMMY_PLACES.find((p) => {
		return p.id === placeId;
	});

	if (!place) {
		throw new HttpError("Couldn't find place with provided id", 404);
		// error.code =404
		// throw error
		// return res.status(404).json({message:"Couldn't find place with provided id"})
	}
	res.json({ place }); // {place} => {place:placeID}
};

const getPlacesByUserId = (req, res, next) => {
	const userId = req.params.uid;
	const places = DUMMY_PLACES.filter((p) => {
		return p.creator === userId;
	});

	if (!places || places.length === 0) {
		// const error = new Error("Couldn't find place with provided user id")
		// error.code =404
		return next(
			new HttpError("Couldn't find places with provided user id"),
			404
		);
		// return res.status(404).json({message:"Couldn't find place with provided user id"})
	}
	res.json({ places }); // {place} => {place:placeID}
};

const createPlace = async (req, res, next) => {
	const errors = validationResult(req); // check req object to see if there any validation errors
	if (!errors.isEmpty()) {
		console.log(errors);
		// throw new HttpError("Invalid inputs passed, please check your data", 422);
		return next(
			new HttpError("Invalid inputs passed, please check your data", 422)
		);
	}
	// const { title, description, address, coordinates, creator, imageUrl } =
	// 	req.body;
	const { title, description, address, creator, imageUrl } = req.body;

	// dynamically extract coordinates from the address
	let coordinates;
	try {
		coordinates = await getCoordsForAddress(address);
	} catch (error) {
		return next(error);
	}
	const createdPlace = {
		id: uuid(),
		title: title,
		description: description,
		address: address,
		location: coordinates,
		creator: creator,
		imageUrl: imageUrl,
	};
	DUMMY_PLACES.push(createdPlace);
	res.status(201).json({ place: createdPlace });
};

const updatePlace = (req, res, next) => {
	const errors = validationResult(req); // check req object to see if there any validation errors
	if (!errors.isEmpty()) {
		console.log(errors);
		throw new HttpError("Invalid inputs passed, please check your data", 422);
	}
	const { title, description } = req.body;
	const placeId = req.params.placeId;
	const updatedPlace = {
		...DUMMY_PLACES.find((place) => place.id === placeId),
	};
	const placeIndex = DUMMY_PLACES.findIndex((place) => place.id === placeId);
	(updatedPlace.title = title), (updatedPlace.description = description);
	// update the index
	DUMMY_PLACES[placeIndex] = updatedPlace;

	res.status(200).json({ place: updatedPlace });
};

const deletePlace = (req, res, next) => {
	const placeId = req.params.placeId;
	if (!DUMMY_PLACES.find((place) => place.id === placeId)) {
		throw new HttpError("Could not find place for that id", 404);
	}
	DUMMY_PLACES = DUMMY_PLACES.filter((place) => place.id !== placeId);
	res.status(200).json({ message: "Place Deleted" });
};
exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
