import express from 'express';
import schPersonnel from '../models/Users/school_User';


const router = new express.Router();

router.post('/update/:id', updateSchoolPersonnel);
router.get('/', fetchSchoolPersonnels);
router.get('/:id', fetchSchoolPersonnelById);

function updateSchoolPersonnel(request, response) {
	console.log(request.params);
	console.log(request.body);
	schPersonnel.updateOne({_id: request.params.id}, request.body, (err, result) => {
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

export default {router};