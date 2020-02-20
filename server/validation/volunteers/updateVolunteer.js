import validator from 'validator';
import isEmpty from 'is-empty';

function validateUpdateVolunteerInput(data) {

    let errors = {};

    // convert empty fields to an empty string so we can use validator functions
	data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
    data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.phoneNumber = !isEmpty(data.phoneNumber) ? data.phoneNumber : '';
    data.pantherID = !isEmpty(data.pantherID) ? data.pantherID : '';
    data.major = !isEmpty(data.major) ? data.major : '';
    data.carAvailable= !isEmpty(data.carAvailable) ? data.carAvailable : '';
    
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


    // panther ID checks
    if (validator.isEmpty(data.pantherID)) {
		errors.pantherID = 'Panther ID is required';
    }
    else if (!validator.isInt(data.pantherID, { allow_leading_zeroes: false })) {
        errors.pantherID = 'Panther ID must be a number'
    }
    else if (data.pantherID.length != 7) {
        errors.pantherID = 'Panther ID must contain 7 numbers'
    }
    
    // major check
    if (validator.isEmpty(data.major)) {
		errors.major = 'Major is required';
    } 

    // car availability check
    if (validator.isEmpty(data.carAvailable)) {
		errors.carAvailable = 'Car avaliability is required';
    } 

    return {
		errors,
		isValid: isEmpty(errors)
	};
};

export default validateUpdateVolunteerInput;