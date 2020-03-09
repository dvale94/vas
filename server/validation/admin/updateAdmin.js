import validator from 'validator';
import isEmpty from 'is-empty';

function validateUpdateAdminInput(data) {

    let errors = {};

    // convert empty fields to an empty string so we can use validator functions
	  data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
    data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.phoneNumber = !isEmpty(data.phoneNumber) ? data.phoneNumber : '';

    
    // first and last name checks
	  if (validator.isEmpty(data.firstName)) {
	    errors.firstName = 'First name is required';
    } 
    if (validator.isEmpty(data.lastName)) {
		errors.lastName = 'Last name is required';
    }

    // email checks
    if (validator.isEmpty(data.email)) {
		errors.email = 'Email is required';
    }
    else if (!validator.isEmail(data.email)) {
		errors.email = 'Invalid Email';
	  }

    // password check
    /* if (validator.isEmpty(data.password)) {
		errors.password = 'Password is required';
    } */

    //phonene number check
    if (validator.isEmpty(data.phoneNumber)) {
		errors.phoneNumber = 'Phone number is required';
    }

    return {
		errors,
		isValid: isEmpty(errors)
	};
};

export default validateUpdateAdminInput;