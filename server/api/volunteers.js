import express from 'express';
import Volunteer from '../models/Users/volunteer_User';
import User from '../models/Users/user_Auth';
const bcrypt = require('bcrypt')

// input validation
import validateUpdateVolunteerInput from '../validation/volunteers/updateVolunteer'

const router = new express.Router();

router.put('/update/:id', updateVolunteer);
router.get('/', fetchVolunteers);
router.get('/:id', fetchVolunteerById);

function updateVolunteer(request, response) {
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

export default {router};