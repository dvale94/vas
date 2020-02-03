import validator from 'validator';
import isEmpty from 'is-empty';

function validateLoginInput(data) {

    let errors = {};

    // convert empty fields to an empty string so we can use validator functions
	data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    
    // email checks
	if (validator.isEmpty(data.email)) {
		errors.email = 'Email field is required';
    } 
    else if (!validator.isEmail(data.email)) {
        errors.password = 'Email and/or Password invalid';
    }

    // password checks
	if (validator.isEmpty(data.password)) {
		errors.password = 'Password field is required\n';
    }
    
    
    return {
		errors,
		isValid: isEmpty(errors)
	};
};

export default validateLoginInput;