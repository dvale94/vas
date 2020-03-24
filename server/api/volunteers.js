import express from 'express';
import Volunteer from '../models/Users/volunteer_User';
import User from '../models/Users/user_Auth';
const bcrypt = require('bcrypt')

// input validation
import validateUpdateVolunteerInput from '../validation/volunteers/updateVolunteer'

const router = new express.Router();

router.put('/update/:id', updateVolunteer);
router.put('/updateProfile/:id', updateVolunteer_Profile);
router.get('/', fetchVolunteers);
router.get('/:id', fetchVolunteerById);
/* router.get('/getVolunteerInfo/:pid', fetchVolunteerByPID); */
router.get('/getVolunteerInfo/:pids', fetchVolunteerByPID);

function updateVolunteer_Profile(request, response) {
	console.log(request.params);
	console.log(request.body);
	Volunteer.updateOne({_id: request.params.id}, request.body, (err, result) => {
		if (err) {
			console.log(err);
		  } else {
			if (result.n === 1) {
				//response.json('success');
				response.json(request.params)
			
			}
			else {
				response.json('failed')
			}
		  }
	});
}

function updateVolunteer(request, response) {
	let volunteer = {};
	
	let volunteer_req = request.body;

	volunteer = {
		firstName: volunteer_req.firstName,
		lastName: volunteer_req.lastName,
		email: volunteer_req.email.toLowerCase(),
        password: volunteer_req.password,
        phoneNumber: volunteer_req.phoneNumber,
        major: volunteer_req.major,
        isActive: volunteer_req.isActive,
        carAvailable: volunteer_req.carAvailable,
        volunteerStatus: volunteer_req.volunteerStatus,
        MDCPS_ID: volunteer_req.MDCPS_ID,
        pantherID: volunteer_req.pantherID,
        prevEmail: volunteer_req.email.toLowerCase(),
	}

	// Form validation
	const { errors, isValid } = validateUpdateVolunteerInput(volunteer);

	// Check validation
	if (!isValid) {
		return response.status(400).json({success: false, errors});
	}

	const email = volunteer.email.toLowerCase();
	const prevEmail = volunteer.prevEmail.toLowerCase();

	// check if user made changes to email or password to update both auth table and volunteer table
	// if no changes to email or password, only update volunteer table
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
												message: 'Successfully updated volunteer!'
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
							console.log("hello", result)
							if (err) {
								console.log(err);
							} 
							else {
								if (result.n === 1) {
									response.json({
										success: true,
										message: 'Successfully updated volunteer!'
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
												message: 'Successfully updated volunteer!'
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
						message: 'Successfully updated volunteer!'
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
			  const payload = {
				role: 'Volunteer',
				firstName: result.firstName,
				lastName: result.lastName,
				email: result.email,
				phoneNumber: result.phoneNumber,
				pantherID: result.pantherID,
				major: result.major,
				carAvailable: result.carAvailable,
				volunteerStatus: result.volunteerStatus,
				isActive: result.isActive,
				MDCPS_ID: result.MDCPS_ID,
				id: result.id,
			  }
			response.json(payload);
		  }
	});
}

/* function fetchVolunteerByPID(request, response) {

    const pantherID = request.params.pid
  
    console.log("PID: ", pantherID);
  
    Volunteer.find({
        pantherID: pantherID
          }, (err, result) => {
              if (err) {
            console.log(err);
          } else {
            response.json(result);
          }
      });
  } */

  function fetchVolunteerByPID(request, response) {
	  

	const pantherIDs = request.params.pids
	console.log("PIDs: ", pantherIDs);

	var PIDs = pantherIDs.split(',');
	//PIDs = PIDs.map(Number)
	
		 Volunteer.find({
			pantherID: PIDs
			}, (err, result) => {
				if (err) {
				console.log(err);
			} else {
				console.log(result)
				response.json(result);
				/* response.json(result); */
			}
		})
  }

export default {router};