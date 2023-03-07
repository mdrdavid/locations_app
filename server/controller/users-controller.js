const { v4: uuid } = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-errors");
const User = require("../models/users");

const DUMMY_USERS = [
	{
		id: "u1",
		name: "Matovu David",
		email: "davidm@sprint.com",
		password: "david",
	},
	{
		id: "u2",
		name: "Namawejje Maggie",
		email: "maggie@gmail.com",
		password: "maggie",
	},
];
const getUsers = (req, res, next) => {
	res.json({ users: DUMMY_USERS });
};
const signup = async (req, res, next) => {
	const errors = validationResult(req); // check req object to see if there any validation errors
	if (!errors.isEmpty()) {
		console.log(errors);
		return next(
			new HttpError("Invalid inputs passed, please check your data", 422)
		);
	}

	const { name, email, password, places } = req.body;
	let existingUser;
	try {
		existingUser = await User.findOne({ email: email });
	} catch (err) {
		const error = new HttpError(
			"Signing up failed, Please try again later",
			500
		);
		return next(error);
	}

	if (existingUser) {
		const error = new HttpError(
			"User exists already, please login instead",
			422
		);
		return next(error);
	}

	const createdUser = new User({
		name,
		email,
		image: "https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=300",
		password,
		places,
	});

	try {
		await createdUser.save(); // save a place to the database
	} catch (err) {
		const error = new HttpError(
			"Signing up a user failed, please try again",
			500
		);
		console.log("error", err);
		return next(error); // stop code execution in case of an error
	}

	res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = (req, res, next) => {
	const { email, password } = req.body;
	const identifiedUser = DUMMY_USERS.find((user) => user.email === email);
	if (!identifiedUser || identifiedUser.password !== password) {
		throw new HttpError(
			"Could not identify user, credentials seem to be wrong",
			401
		); // 401 means authentication failed
	}
	res.json({ message: "logged in" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
