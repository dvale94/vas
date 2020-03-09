import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../config/config'

const User = require('../models/Users/user_Auth')
const Admin = require('../models/Users/admin_User')
const Volunteer = require('../models/Users/volunteer_User')
const schPersonnel = require('../models/Users/school_User')

// input validation
import validateLoginInput from '../validation/login';
import validateCreateVolunteerInput from '../validation/volunteers/createVolunteer';
import validateCreateSchoolPersonnelInput from '../validation/schoolPersonnels/createSchoolPersonnel';
import validateCreateAdminInput from '../validation/admin/createAdmin';


const router = new express.Router();

router.post('/admin/signup', adminSignUp);
router.post('/volunteer/signup', volunteerSignUp);
router.post('/school-personnel/signup', schoolPersonnelSignUp);
router.post('/login', login);

function adminSignUp (req, res) {
    const { body } = req;
    const { 
        firstName,
        lastName,
        password,
        phoneNumber,
        } = body;
        let {
            email
        } = body;

        // Form validation
	const { errors, isValid } = validateCreateAdminInput(req.body);

	// Check validation
	if (!isValid) {
		return res.status(400).json({success: false, errors});
	}

    email = email.toLowerCase();

    // Steps:
    // 1. Verify email doesn't exist
    // 2. Save to both collections
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

        // Save new user to admin collection
        const newAdmin = new Admin();

        newAdmin.firstName = firstName;
        newAdmin.lastName = lastName;
        newAdmin.email = email;
        newAdmin.phoneNumber = phoneNumber;
        newAdmin.isActive = 'true';
        
        newAdmin.save((err, admin) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                });
            }
            return res.send({
                success: true,
                message: 'Successfully created administrator!'
            });
        });

        //Save new user to user auth collection
        const newUser = new User();

        newUser.email = email;
        newUser.password = newUser.generateHash(password);
        newUser.role = 'Admin'
        
        newUser.save((err, user) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                });
            }
        });
    });
}

function volunteerSignUp (req, res) {
    const { body } = req;
    const { 
        firstName,
        lastName,
        password,
        phoneNumber,
        pantherID,
        major,
        isActive,
        carAvailable,
        volunteerStatus,
        MDCPS_ID
        } = body;
        let {
            email
        } = body;

    // Form validation
	const { errors, isValid } = validateCreateVolunteerInput(req.body);

	// Check validation
	if (!isValid) {
		return res.status(400).json({success: false, errors});
	}

    email = email.toLowerCase();

    // Steps:
    // 1. Verify email doesn't exist
    // 2. Save to both collections
    User.find({
        email: email
    }, (err, previousUsers) => {
        if (err) {
            return res.send({
                success: false,
                errors: {server: 'Server errors'}
            });
        } else if (previousUsers.length > 0) {
            return res.send({
                success: false,
                errors: {email: 'Account already exists'}
            });
        }

        // Save new user to volunteer collection
        const newVolunteer = new Volunteer();

        newVolunteer.firstName = firstName;
        newVolunteer.lastName = lastName;
        newVolunteer.email = email;
        newVolunteer.phoneNumber = phoneNumber;
        newVolunteer.pantherID = pantherID;
        newVolunteer.major = major;
        newVolunteer.carAvailable = carAvailable;
        newVolunteer.volunteerStatus = volunteerStatus;
        newVolunteer.isActive = true;
        newVolunteer.MDCPS_ID = MDCPS_ID;

        newVolunteer.save((err, volunteer) => {
            if (err) {
                return res.send({
                    success: false,
                    errors: err
                });
            }
            return res.send({
                success: true,
                message: 'Successfully created volunteer!'
            });
        });

        //Save new user to user auth collection
        const newUser = new User();

        newUser.email = email;
        newUser.password = newUser.generateHash(password);
        newUser.role = 'Volunteer'
        
        newUser.save((err, user) => {
            if (err) {
                return res.send({
                    success: false,
                    message: {server: 'Server errors'}
                });
            }
        });
    });
}

function schoolPersonnelSignUp (req, res) {
    const { body } = req;
    const { 
        schoolCode,
        firstName,
        lastName,
        password,
        title,
        phoneNumber,
        } = body;
        let {
            email
        } = body;

    // form validation
    const { errors, isValid } = validateCreateSchoolPersonnelInput(req.body);
    // check validation
    if (!isValid) {
        return res.status(400).json({success: false, errors});
    }  

    email = email.toLowerCase();

    // Steps:
    // 1. Verify email doesn't exist
    // 2. Save to both collections
    User.find({
        email: email
    }, (err, previousUsers) => {
        if (err) {
            return res.send({
                success: false,
                message: {server: 'Server errors'}
            });
        } else if (previousUsers.length > 0) {
            return res.send({
                success: false,
                errors: {email: 'Account already exists'}
            });
        }

        // Save new user to school personnel collection
        const newSchPersonnel = new schPersonnel();

        newSchPersonnel.firstName = firstName;
        newSchPersonnel.lastName = lastName;
        newSchPersonnel.email = email;
        newSchPersonnel.phoneNumber = phoneNumber;
        newSchPersonnel.schoolCode = schoolCode;
        newSchPersonnel.title = title;
        newSchPersonnel.isActive = true
        
        newSchPersonnel.save((err, schPersonnel) => {
            if (err) {
                return res.send({
                    success: false,
                    message: {server: 'Server errors'}
                });
            }
            return res.send({
                success: true,
                message: 'Successfully created school personnel!'
            });
        });

        //Save new user to user auth collection
        const newUser = new User();

        newUser.email = email;
        newUser.password = newUser.generateHash(password);
        newUser.role = 'School Personnel'
        
        newUser.save((err, user) => {
            if (err) {
                return res.send({
                    success: false,
                    message: {server: 'Server errors'}
                });
            }
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

    const email = req.body.email.toLowerCase();
    const password = req.body.password;

    // find user by email
	User.findOne({ email }).then(user => {
		if (!user) {
			// return res.status(404).json({ email: 'Email not found' });
        }
		else {
			// check password
			bcrypt.compare(password, user.password).then(isMatch => {
				if (isMatch) {

                    let payload = {};

                    //retrieve users profile information by role
                    if (user.role === 'Admin') {
                        Admin.findOne({ email }).then(admin => {
                            //create JWT payload
                            payload = {
                                role: 'Admin',
                                id: admin.id,
                                firstName: admin.firstName,
                                lastName: admin.lastName,
                                email: admin.email,
                                phoneNumber: admin.phoneNumber
                            }
                            
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
                        
                        });
                    }
                    else if (user.role === 'Volunteer') {
                        Volunteer.findOne({ email }).then(volunteer => {
                            //create JWT payload
                            payload = {
                                role: 'Volunteer',
                                id: volunteer.id,
                                firstName: volunteer.firstName,
                                lastName: volunteer.lastName,
                                email: volunteer.email,
                                phoneNumber: volunteer.phoneNumber,
                                major: volunteer.major,
                                carAvailable: volunteer.carAvailable,
                                volunteerStatus: volunteer.volunteerStatus,
                                MDCPS_ID: volunteer.MDCPS_ID,
                                pantherID: volunteer.pantherID
                            }

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
                        
                        });
                    }
                    else if (user.role === 'School Personnel') {
                        schPersonnel.findOne({ email }).then(personnel => {
                            //create JWT payload
                            payload = {
                                role: 'School Personnel',
                                id: personnel.id,
                                firstName: personnel.firstName,
                                lastName: personnel.lastName,
                                email: personnel.email,
                                phoneNumber: personnel.phoneNumber,
                                title: personnel.title,
                                schoolCode: personnel.schoolCode
                            }

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
                        
                        });
                    }
				}
				else {
					return res
						.status(400)
						.json({ password: 'Email and/or Password invalid' });
				}
			});
		}
	});
}

export default {router};