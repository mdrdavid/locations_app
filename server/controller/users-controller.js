const { v4: uuid } = require('uuid')
const { validationResult } = require('express-validator')

const HttpError = require('../models/http-errors')
const User = require('../models/users')

const getUsers = async (req, res, next) => {
    let users
    try {
        users = await User.find({}, '-password')
    } catch (err) {
        const error = new HttpError('Fetching users failed, please try again')
        return next(error)
    }

    res.json({ users: users.map((user) => user.toObject({ getters: true })) })
}
const signup = async (req, res, next) => {
    const errors = validationResult(req) // check req object to see if there any validation errors
    if (!errors.isEmpty()) {
        console.log(errors)
        return next(
            new HttpError('Invalid inputs passed, please check your data', 422)
        )
    }

    const { name, email, password} = req.body
    let existingUser
    try {
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        const error = new HttpError(
            'Signing up failed, Please try again later',
            500
        )
        return next(error)
    }

    if (existingUser) {
        const error = new HttpError(
            'User exists already, please login instead',
            422
        )
        return next(error)
    }

    const createdUser = new User({
        name,
        email,
        image: 'https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=300',
        password,
        places: [],
    })

    try {
        await createdUser.save() // save a place to the database
    } catch (err) {
        const error = new HttpError(
            'Signing up a user failed, please try again',
            500
        )
        console.log('error', err)
        return next(error) // stop code execution in case of an error
    }

    res.status(201).json({ user: createdUser.toObject({ getters: true }) })
}

const login = async (req, res, next) => {
    const { email, password } = req.body
    let existingUser
    try {
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        const error = new HttpError('Login failed, Please try again later', 500)
        return next(error)
    }

    if (!existingUser || existingUser.password !== password) {
        const error = new HttpError(
            'Invalid credentials, could not log you in',
            401
        )
        return next(error)
    }

    // res.json({ message: 'logged in', user: existingUser.toObject({getters: true}) })
    res.json({ message: 'logged in', userId: existingUser._id })
}

exports.getUsers = getUsers
exports.signup = signup
exports.login = login
