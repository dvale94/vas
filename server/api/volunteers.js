import express from 'express';
import Volunteer from '../models/Users/volunteer_User';
import User from '../models/Users/user_Auth';
const bcrypt = require('bcrypt')

// input validation
import validateUpdateVolunteerInput from '../validation/volunteers/updateVolunteer'

const router = new express.Router();

router.post('/update/:id', updateVolunteer);
router.get('/:id', fetchVolunteerById);
router.get('/', fetchVolunteers);

function updateVolunteer(request, response) {
	let volunteer = {};
	
	volunteer = request.body;

	// Form validation
	const { errors, isValid } = validateUpdateVolunteerInput(volunteer);

	// Check validation
	if (!isValid) {
		return response.status(400).json({success: false, errors});
	}

	const email = volunteer.email.toLowerCase();
	const prevEmail = volunteer.prevEmail.toLowerCase();

	// check if user made changes to email or password to update both auth table and volunteer table
	// if not changes to email or password, only update volunteer table
	if ((prevEmail != email) || !(volunteer.password === '')) {
		
		// both email and password
		if ((prevEmail != email) && !(volunteer.password === '')) {
			User.find({email: email}, 
				(err, previousUsers) => {
					if (err) {
						return response.send({
							success: false,
							errors: {server: 'Server errors'}
						});
					} 
					else if (previousUsers.length > 0) {
						return response.send({
							success: false,
							errors: {email: 'Email already exists'}
						});
					}

					let password = bcrypt.hashSync(volunteer.password, bcrypt.genSaltSync(8), null);
					
					User.updateOne({email: prevEmail}, {email: email, password: password}, (err, result) => {

						if (err) {
							console.log(err);
						} else {
							if (result.n === 1) {
								delete volunteer.prevEmail;

								Volunteer.updateOne({_id: request.params.id}, volunteer, (err, result) => {

									if (err) {
										console.log(err);
									} else {
										if (result.n === 1) {
											response.json({
												success: true,
												message: 'Volunteer updated'
											});
										}
										else {
											response.json({
												success: false,
												errors: {server: 'Server error'}
											})
										}
									}
								});
							}
							else {
								response.json({
									success: false,
									errors: {server: 'Server error'}
								})
							}
						}
					});
			});
		}
				
		//password
		if ((prevEmail === email) && !(volunteer.password === '')) {
			
			let password = bcrypt.hashSync(volunteer.password, bcrypt.genSaltSync(8), null);
					
			User.updateOne({email: prevEmail}, {password: password}, (err, result) => {

				if (err) {
					console.log(err);
				} 
				else {
					if (result.n === 1) {
						delete volunteer.prevEmail;

						Volunteer.updateOne({_id: request.params.id}, volunteer, (err, result) => {

							if (err) {
								console.log(err);
							} 
							else {
								if (result.n === 1) {
									response.json({
										success: true,
										message: 'Volunteer updated'
									});
								}
								else {
									response.json({
										success: false,
										errors: {server: 'Server error'}
									})
								}
							}
						});
					}
					else {
						response.json({
							success: false,
							errors: {server: 'Server error'}
						})
					}
				}
			});
		}
				
		//email
		if ((prevEmail != email) && (volunteer.password === '')) {
			User.find({email: email}, 
				(err, previousUsers) => {
					if (err) {
						return response.send({
							success: false,
							errors: {server: 'Server errors'}
						});
					} 
					else if (previousUsers.length > 0) {
						return response.send({
							success: false,
							errors: {email: 'Email already exists'}
						});
					}
					
					User.updateOne({email: prevEmail}, {email: email}, (err, result) => {

						if (err) {
							console.log(err);
						} 
						else {
							if (result.n === 1) {
								delete volunteer.prevEmail;

								Volunteer.updateOne({_id: request.params.id}, volunteer, (err, result) => {

									if (err) {
										console.log(err);
									} else {
										if (result.n === 1) {
											response.json({
												success: true,
												message: 'Volunteer updated'
											});
										}
										else {
											response.json({
												success: false,
												errors: {server: 'Server error'}
											})
										}
									}
								});
							}
							else {
								response.json({
									success: false,
									errors: {server: 'Server error'}
								})
							}
						}
					});
			});
		}
	}
	else {

		delete volunteer.prevEmail;

		Volunteer.updateOne({_id: request.params.id}, volunteer, (err, result) => {

			if (err) {
				console.log(err);
			} else {
				if (result.n === 1) {
					response.json({
						success: true,
						message: 'Volunteer updated'
					});
				}
				else {
					response.json({
						success: false,
						errors: {server: 'Server error'}
					})
				}
			}
		});
	}
}

function fetchVolunteers(request, response) {
	Volunteer.find({}, (err, result) => {
		if (err) {
		  console.log(err);
		} else {
		  response.json(result);
		}
	});
}

function fetchVolunteerById(request, response) {
	Volunteer.findById(request.params.id, (err, result) => {
		if (err) {
			console.log(err);
		  } else {
			response.json(result);
		  }
	});
}

export default {router};