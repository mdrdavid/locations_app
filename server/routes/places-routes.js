// import express from "express"
const express = require("express");

const HttpError = require("../models/http-errors");

const router = express.Router();

const DUMMY_PLACES = [
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

router.get("/:placeId", (req, res, next) => {
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
});

router.get("/user/:uid", (req, res, next) => {
	const userId = req.params.uid;
	const place = DUMMY_PLACES.find((p) => {
		return p.creator === userId;
	});

	if (!place) {
		// const error = new Error("Couldn't find place with provided user id")
		// error.code =404
		return next(
			new HttpError("Couldn't find place with provided user id"),
			404
		);
		// return res.status(404).json({message:"Couldn't find place with provided user id"})
	}
	res.json({ place }); // {place} => {place:placeID}
});

console.log("Get Request in places");

module.exports = router;
