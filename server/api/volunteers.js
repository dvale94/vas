import express from 'express';
import Volunteer from '../models/Users/volunteer_User';

const router = new express.Router();

router.post('/update/:id', updateVolunteer);
router.get('/:id', fetchVolunteerById);
router.get('/', fetchVolunteers);

function updateVolunteer(request, response) {
	Volunteer.update(request.params.id, request.body, (result) => {
		response.json({
			success: result != null,
			results: result,
		});
	});
}

function fetchVolunteers(request, response) {
	Volunteer.fetchAll(Object.assign({}, request.body, request.query), (result) => {
		response.json({
			success: result != null,
			results: result,
		});
	});
}

function fetchVolunteerById(request, response) {
	Volunteer.fetchById(request.params.id, (result) => {
		response.json({
			success: result != null,
			results: result,
		});
	});
}

export default {router};