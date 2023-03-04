const { v4: uuid } = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-errors");

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
const signup = (req, res, next) => {
	const errors = validationResult(req); // check req object to see if there any validation errors
	if (!errors.isEmpty()) {
		console.log(errors);
		throw new HttpError("Invalid inputs passed, please check your data", 422);
	}
	const { name, email, password } = req.body;
	const hasUser = DUMMY_USERS.find((user) => user.email === email);
	if (hasUser) {
		throw new HttpError("Could not create user, email already exists", 422); // 422 means invalid user inputs
	}
	const createdUser = {
		id: uuid(),
		name: name,
		email: email,
		password: password,
	};
	DUMMY_USERS.push(createdUser);
	res.status(201).json({ user: createdUser });
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
