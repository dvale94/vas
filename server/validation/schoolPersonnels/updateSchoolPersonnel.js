import validator from 'validator';
import isEmpty from 'is-empty';

function validateUpdateSchoolPersonnelInput(data) {

    let errors = {};

    // convert empty fields to an empty string so we can use validator functions
	data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
    data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.phoneNumber = !isEmpty(data.phoneNumber) ? data.phoneNumber : '';
    data.schoolCode = !isEmpty(data.schoolCode) ? data.schoolCode : '';
    data.title = !isEmpty(data.title) ? data.title : '';
    
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
    

    //phonene number check
    if (validator.isEmpty(data.phoneNumber)) {
		errors.phoneNumber = 'Phone number is required';
    }


    // School Code checks
    if (validator.isEmpty(data.schoolCode)) {
		errors.schoolCode = 'School Code is required';
    }
    
    
    // title check
    if (validator.isEmpty(data.title)) {
		errors.title = 'Title is required';
    } 

    return {
		errors,
		isValid: isEmpty(errors)
	};
};

export default validateUpdateSchoolPersonnelInput;