import express from 'express';
import Admin from '../models/Users/admin_User';

const router = new express.Router();

router.put('/update/:id', updateAdmin);
router.get('/:id', fetchAdminById);


function updateAdmin(request, response) {
	console.log(request.params);
	console.log(request.body);
	Admin.updateOne({_id: request.params.id}, request.body, (err, result) => {
		if (err) {
			console.log(err);
		  } else {
			if (result.n === 1) {
                //response.json({ message: 'success' });
                //response.json('Changes saved!');
                response.json(request.params)
			}
			else {
				response.json('failed')
			}
          }
 
          
	});
}

function fetchAdminById(request, response) {
	Admin.findById(request.params.id, (err, result) => {
		if (err) {
			console.log(err);
		  } else {
            response.json(result);
		  }
	});
}

export default {router};