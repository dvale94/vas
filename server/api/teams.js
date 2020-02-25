import express from 'express';

const Team = require('../models/Teams/team')

//input validation
import validateCreateTeamInput from '../validation/teams/createTeam';

const router = new express.Router();

router.post('/create', createTeam);
//router.post('/update/:id', updateSchool);
router.get('/:id', fetchTeamById);
router.get('/', fetchTeams);

function createTeam (req, res) {

    const { body } = req;
    const { 
        schoolCode,
        semester,
        year,
        dayOfWeek,
        startTime,
        endTime,
        volunteerPIs,
        isActive
        } = body;


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
        newTeam.dayOfWeek = dayOfWeek;
        newTeam.startTime = startTime;
        newTeam.endTime = endTime;
        newTeam.volunteerPIs = volunteerPIs;
        newTeam.isActive = 'true';

        newTeam.save((err, team) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                });
            }
            return res.send({
                success: true,
                message: 'Successfully created team!'
            });
        });
      
}

function fetchTeams(request, response) {
	Team.find({}, (err, result) => {
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

export default {router};