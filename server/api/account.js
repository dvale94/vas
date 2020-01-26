import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../config/config'

const User = require('../models/user')
const UserSession = require('../models/userSessions')

// input validation
import validateLoginInput from '../validation/login';

const router = new express.Router();

router.post('/signup', signUp);
router.post('/login', login);
router.get('/verify', verify);
router.get('/logout', logout);

function signUp (req, res) {
    const { body } = req;
    const { 
        firstName,
        lastName,
        password,
        } = body;
        let {
            email
        } = body;

        if (!firstName) {
            return res.send({
                success: false,
                message: 'Error: First name cannot be blank.'
            });
        }
        if (!lastName) {
        return res.send({
            success: false,
            message: 'Error: Last name cannot be blank.'
        });
    }
    if (!email) {
        return res.send({
            success: false,
            message: 'Error: Email cannot be blank.'
        });
    }
    if (!password) {
        return res.send({
            success: false,
            message: 'Error: Password cannot be blank'
        });
    }

    email = email.toLowerCase();

    // Steps:
    // 1. Verify email doesn't exist
    // 2. Save
    User.find({
        email: email
    }, (err, previousUsers) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error'
            });
        } else if (previousUsers.length > 0) {
            return res.send({
                success: false,
                message: 'Error: Account already exists.'
            });
        }

        // Save new user
        const newUser = new User();

        newUser.email = email;
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.password = newUser.generateHash(password);
        newUser.save((err, user) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                });
            }
            return res.send({
                success: true,
                message: 'Signed up'
            });
        });
    });
}

function login (req, res) {

    // form validation
    const { errors, isValid } = validateLoginInput(req.body);

    // check validation
	if (!isValid) {
		return res.status(400).json(errors);
	}

    const email = req.body.email;
    const password = req.body.password;

    // find user by email
	User.findOne({ email }).then(user => {
		if (!user) {
			return res.status(404).json({ email: 'Email not found' });
		}
		else {
			// check password
			bcrypt.compare(password, user.password).then(isMatch => {
				if (isMatch) {
					// user matched
					// create JWT Payload
					const payload = {
						id: user.id
					};
					// sign token
					jwt.sign(
						payload,
						config.secretOrKey,
						{
							expiresIn: 86400 // 1 day in seconds
						},
						(err, token) => {
							res.json({
								success: true,
								token: 'Bearer ' + token
							});
						}
					);
				}
				else {
					return res
						.status(400)
						.json({ password: 'Password incorrect' });
				}
			});
		}
	});
}

function verify (req, res) {
    const { query } = req;
    const { token } = query;

    UserSession.find({
        _id: token,
        isDeleted: false
    }, (err, sessions) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error'
            });
        }

        if (sessions.length != 1) {
            return res.send({
                success: false,
                message: 'Error: Invalid'
            });
        } else {
            return res.send({
                success: true,
                message: 'Good'
            });
        }
    });
}

function logout (req, res) {
    const { query } = req;
    //const { token } = query;

    console.log(req.body)

    UserSession.findOneAndUpdate({
        //_id: token,
        isDeleted: false
    }, {
        $set:{
            isDeleted: true,
        }
    }, null, (err, sessions) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error'
            });
        }

        return res.send({
            success: true,
            message: 'Good'
        });
    });
}

export default {router};