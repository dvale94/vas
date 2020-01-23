import express from 'express';

const User = require('../models/user')
const router = new express.Router();

router.post('/signup', signUp);

//module.exports = (app) => {

function signUp (req, res) {


    //app.post('/account/singup', (req, res, next) => {
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
                message: 'Error: email cannot be blank.'
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

export default {router};