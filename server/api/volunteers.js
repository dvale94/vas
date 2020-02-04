import express from 'express';
import Volunteer from '../models/Users/volunteer_User';

const router = new express.Router();

router.post('/update/:id', updateVolunteer);
router.get('/:id', fetchVolunteerById);
router.get('/', fetchVolunteers);

function updateVolunteer(request, response) {
	console.log(request.params);
	console.log(request.body);
	Volunteer.updateOne({_id: request.params.id}, request.body, (err, result) => {
		if (err) {
			console.log(err);
		  } else {
			if (result.n === 1) {
				response.json('success');
			}
			else {
				response.json('failed')
			}
		  }
	});
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