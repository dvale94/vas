import express from 'express';

const Team = require('../models/Teams/team')

//input validation
import validateCreateTeamInput from '../validation/teams/createTeam';
import validateUpdateTeamInput from '../validation/teams/updateTeam';

const router = new express.Router();

router.post('/create', createTeam);
router.post('/update/:id', updateTeam);
router.get('/:id', fetchTeamById);
router.get('/getTeamInfo/:pid', fetchTeamByPantherID);
router.get('/', fetchTeams);
router.get('/getTeamInfoSch/:schoolCode', fetchTeamBySchoolCode);


function createTeam (req, res) {
    const { body } = req;
    let { 
        schoolCode,
        semester,
        year,
        startTime,
        endTime,
        volunteerPIs,
        isActive
        } = body;
        
        //deconstruct PIDs into an array
        volunteerPIs = volunteerPIs.split(',')
        
        // form validation
        const { errors, isValid } = validateCreateTeamInput(req.body);
        // check validation
        if (!isValid) {
            return res.status(400).json({success: false, errors});
        }

        const newTeam = new Team;

        newTeam.schoolCode = schoolCode;
        newTeam.semester = semester;
        newTeam.year = year;
        newTeam.dayOfWeek.monday = body['dayOfWeek[monday]'];
        newTeam.dayOfWeek.tuesday = body['dayOfWeek[tuesday]'];
        newTeam.dayOfWeek.wednesday = body['dayOfWeek[wednesday]'];
        newTeam.dayOfWeek.thursday = body['dayOfWeek[thursday]'];
        newTeam.dayOfWeek.friday = body['dayOfWeek[friday]'];
        newTeam.startTime = startTime;
        newTeam.endTime = endTime;
        newTeam.volunteerPIs = volunteerPIs;
        newTeam.isActive = 'true';
        newTeam.timeStamp = Date.now()

        newTeam.save((err, team) => {
            if (err) {
                return res.send({
                    success: false,
                    errors: 'Error: Server error'
                });
            }
            return res.send({
                success: true,
                message: 'Successfully created team!'
            });
        });
      
}

function updateTeam (request, response) {
  console.log(request.params);
    console.log(request.body);
  let { body } = request;
      
      //deconstruct PIDs into an array
      body.volunteerPIs = body.volunteerPIs.split(',')
      
      // form validation
      const { errors, isValid } = validateUpdateTeamInput(request.body);
      // check validation
      if (!isValid) {
          return response.status(400).json({success: false, errors});
      }

      //check if team is being deativated to change timestamp
      if(body.isActive === 'false') {
        body.timeStamp = Date.now()
      }

      Team.updateOne({_id: request.params.id}, body, (err, result) => {
        if (err) {
          console.log(err);
          } else {
          if (result.n === 1) {
            return response.send({
                        success: true,
                        message: 'Successfully updated team!'
                    });
          }
          else {
            response.json('failed')
          }
          }
      });
    
}

function fetchTeams(request, response) {
  const { body } = request;
	Team.find(body, (err, result) => {
		if (err) {
		  console.log(err);
		} else {
		  response.json(result);
		}
	});
}

function fetchTeamById(request, response) {
	Team.findById(request.params.id, (err, result) => {
		if (err) {
			console.log(err);
		  } else {
			response.json(result);
		  }
	});
}

function fetchTeamByPantherID(request, response) {

  const pantherID = request.params.pid

  console.log("PID: ", pantherID);

	Team.find({
    volunteerPIs: pantherID
        }, (err, result) => {
            if (err) {
		  console.log(err);
		} else {
		  response.json(result);
		}
	});
}

function fetchTeamBySchoolCode(request, response) {

  const schoolCode = request.params.schoolCode

  console.log("School Code: ", schoolCode);

	Team.find({
    schoolCode: schoolCode
        }, (err, result) => {
            if (err) {
		  console.log(err);
		} else {
		  response.json(result);
		}
	});
}

export default {router};