// import express from "express"
const express = require("express");
const { check } = require("express-validator");

const placesController = require("../controller/places-controller");
const router = express.Router();

router.get("/:placeId", placesController.getPlaceById);

router.get("/user/:uid", placesController.getPlacesByUserId);
router.post(
	"/",
	[
		check("title").not().isEmpty(), // check if title is not empty
		check("description").isLength({ min: 5 }), // description should have a min length of 5 characters
		check("address").not().isEmpty(), // check if address is not empty
	],
	placesController.createPlace
);
router.patch(
	"/:placeId",
	[
		check("title").not().isEmpty(), // check if title is not empty
		check("description").isLength({ min: 5 }), // description should have a min length of 5 characters
	],
	placesController.updatePlace
);
router.delete("/:placeId", placesController.deletePlace);

console.log("Get Request in places");

module.exports = router;
