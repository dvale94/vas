import validator from 'validator';
import isEmpty from 'is-empty';

function validateLoginInput(data) {

    let errors = {};

    // convert empty fields to an empty string so we can use validator functions
	data.email = !isEmpty(data.username) ? data.username : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    
    // email checks
	if (Validator.isEmpty(data.email)) {
		errors.email = 'Email field is required';
    } 
    else if (!validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    // password checks
	if (Validator.isEmpty(data.password)) {
		errors.password = 'Password field is required';
    }
    
    return {
		errors,
		isValid: isEmpty(errors)
	};
}

export default validateLoginInput();