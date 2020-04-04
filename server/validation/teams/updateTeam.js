import validator from 'validator';
import isEmpty from 'is-empty';

function validateUpdateTeamInput(data) {
    let errors = {};

    // convert empty fields to an empty string so we can use validator functions
	  data.schoolCode = !isEmpty(data.schoolCode) ? data.schoolCode : '';
    data.semester = !isEmpty(data.semester) ? data.semester : '';
    data.year = !isEmpty(data.year) ? data.year : '';
    data.startTime = !isEmpty(data.startTime) ? data.startTime : '';
    data.endTime = !isEmpty(data.endTime) ? data.endTime : '';
    data.volunteerPIs = !isEmpty(data.volunteerPIs) ? data.volunteerPIs : '';
    data.closureNotes = !isEmpty(data.closureNotes) ? data.closureNotes : '';

	  if (validator.isEmpty(data.schoolCode)) {
	    errors.schoolCode = 'A school is required to create a team';
    } 
    if (validator.isEmpty(data.semester)) {
		  errors.semester = 'A semester is required';
    }
    if (validator.isEmpty(data.year)) {
		  errors.year = 'A year is required';
    }

    const dayOfWeek = (data['dayOfWeek[monday]'] === 'false'
                    && data['dayOfWeek[tuesday]'] === 'false'
                    && data['dayOfWeek[wednesday]'] === 'false'
                    && data['dayOfWeek[thursday]'] === 'false'
                    && data['dayOfWeek[friday]'] === 'false' )
    if (dayOfWeek) {
		  errors.dayOfWeek = 'At least one day of the week is required';
    }
    
    if (validator.isEmpty(data.startTime)) {
		  errors.startTime = 'A start time is required';
    }
    if (validator.isEmpty(data.endTime)) {
		  errors.endTime = 'An end time is required';
    }
    if (data.volunteerPIs.length == 0) {
		errors.volunteerPIs = 'At least one volunteer is required to create a team';
    } 

    if (data.isActive === 'false' && validator.isEmpty(data.closureNotes)) {
      errors.closureNotes = 'You must provide a reason for setting team to inactive'
    }
    

    return {
		errors,
		isValid: isEmpty(errors)
	};
};

export default validateUpdateTeamInput;