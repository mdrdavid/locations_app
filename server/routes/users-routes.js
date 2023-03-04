const express = require("express");
const { check } = require("express-validator");

const usersController = require("../controller/users-controller");
const router = express.Router();

router.get("/", usersController.getUsers);
router.post(
	"/signup",
	[
		check("name").not().isEmpty(), // check if name is not empty
		check("email").normalizeEmail().isEmail(), // make sure that David@gmail => david@gmail and checks to make sure it is an email
		check("password").isLength({ min: 6 }), // password must be not less than six characters
	],
	usersController.signup
);
router.post("/login", usersController.login);

module.exports = router;
