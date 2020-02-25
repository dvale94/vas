import express from 'express';

const Team = require('../models/Teams/team')

const router = new express.Router();

router.post('/create', createTeam);
//router.post('/update/:id', updateSchool);
//router.get('/:id', fetchSchoolById);
//router.get('/', fetchSchools);

function createTeam (req, res) {

    const { body } = req;
    const { 
        semester,
        year,
        dayOfWeek,
        startTime,
        endTime,
        volunteerPIs,
        isActive
        } = body;


        /* // form validation
        const { errors, isValid } = validateCreateSchoolInput(req.body);
        // check validation
        if (!isValid) {
            return res.status(400).json({success: false, errors});
        } */

        const newTeam = new Team;

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

export default {router};