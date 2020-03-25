import express from 'express';
import schPersonnel from '../models/Users/school_User';
import User from '../models/Users/user_Auth';
const bcrypt = require('bcrypt')

// input validation
import validateUpdateSchoolPersonnelInput from '../validation/schoolPersonnels/updateSchoolPersonnel'

const router = new express.Router();

router.post('/update/:id', updateSchoolPersonnel);
router.get('/', fetchSchoolPersonnels);
router.get('/:id', fetchSchoolPersonnelById);
router.get('/getPersonnelInfo/:codes', fetchSchoolPersonnelByCode);

function updateSchoolPersonnel(request, response) {
	let schoolPersonnel = {}

	schoolPersonnel = request.body

	// Form validation
	const { errors, isValid } = validateUpdateSchoolPersonnelInput(schoolPersonnel);

	// Check validation
	if (!isValid) {
		return response.status(400).json({success: false, errors});
	}

	const email = schoolPersonnel.email.toLowerCase();
	const prevEmail = schoolPersonnel.prevEmail.toLowerCase();

	// check if user made changes to email or password to update both auth table and school personnel table
	// if no changes to email or password, only update school personnel table
	if ((prevEmail != email) || !(schoolPersonnel.password === '')) {
		
		// both email and password
		if ((prevEmail != email) && !(schoolPersonnel.password === '')) {
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

					let password = bcrypt.hashSync(schoolPersonnel.password, bcrypt.genSaltSync(8), null);
					
					User.updateOne({email: prevEmail}, {email: email, password: password}, (err, result) => {

						if (err) {
							console.log(err);
						} else {
							if (result.n === 1) {
								delete schoolPersonnel.prevEmail;

								schPersonnel.updateOne({_id: request.params.id}, schoolPersonnel, (err, result) => {

									if (err) {
										console.log(err);
									} else {
										if (result.n === 1) {
											response.json({
												success: true,
												message: 'Successfully updated school personnel!'
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
		if ((prevEmail === email) && !(schoolPersonnel.password === '')) {
			
			let password = bcrypt.hashSync(schoolPersonnel.password, bcrypt.genSaltSync(8), null);
					
			User.updateOne({email: prevEmail}, {password: password}, (err, result) => {

				if (err) {
					console.log(err);
				} 
				else {
					if (result.n === 1) {
						delete schoolPersonnel.prevEmail;

						schPersonnel.updateOne({_id: request.params.id}, schoolPersonnel, (err, result) => {
							if (err) {
								console.log(err);
							} 
							else {
								if (result.n === 1) {
									response.json({
										success: true,
										message: 'Successfully updated school personnel!'
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
		if ((prevEmail != email) && (schoolPersonnel.password === '')) {
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
								delete schoolPersonnel.prevEmail;

								schPersonnel.updateOne({_id: request.params.id}, schoolPersonnel, (err, result) => {

									if (err) {
										console.log(err);
									} else {
										if (result.n === 1) {
											response.json({
												success: true,
												message: 'Successfully updated school personnel!'
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

		delete schoolPersonnel.prevEmail;

		schPersonnel.updateOne({_id: request.params.id}, schoolPersonnel, (err, result) => {

			if (err) {
				console.log(err);
			} else {
				if (result.n === 1) {
					response.json({
						success: true,
						message: 'Successfully updated school personnel!'
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

function fetchSchoolPersonnels(request, response) {
	schPersonnel.find({}, (err, result) => {
		if (err) {
		  console.log(err);
		} else {
		  response.json(result);
		}
	});
}

function fetchSchoolPersonnelById(request, response) {
	schPersonnel.findById(request.params.id, (err, result) => {
		if (err) {
			console.log(err);
		  } else {
			response.json(result);
		  }
	});
}

function fetchSchoolPersonnelByCode(request, response) {

    const schoolCodes = request.params.codes
    console.log("CODEs: ", schoolCodes);

    var CODES = schoolCodes.split(',');
  
    schPersonnel.find({
        schoolCode: CODES
          }, (err, result) => {
              if (err) {
            console.log(err);
          } else {
            response.json(result);
          }
      });
  }

export default {router};