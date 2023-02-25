// import express from "express"
const express = require("express");

const placesController = require("../controller/places-controller")
const router = express.Router();



router.get("/:placeId", placesController.getPlaceById);

router.get("/user/:uid", placesController.getPlacesByUserId);
router.post("/", placesController.createPlace);
router.patch("/:placeId", placesController.updatePlace);
router.delete("/:placeId", placesController.deletePlace);

console.log("Get Request in places");

module.exports = router;
