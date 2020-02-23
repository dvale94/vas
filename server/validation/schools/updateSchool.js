import validator from 'validator';
import isEmpty from 'is-empty';

function validateUpdateSchoolInput(data) {

    let errors = {};

    // convert empty fields to an empty string so we can use validator functions
	  data.schoolName = !isEmpty(data.schoolName) ? data.schoolName : '';
    data.schoolCode = !isEmpty(data.schoolCode) ? data.schoolCode : '';
    data.level = !isEmpty(data.level) ? data.level : '';
    data.phoneNumber = !isEmpty(data.phoneNumber) ? data.phoneNumber : '';
    data.city = !isEmpty(data.city) ? data.city : '';
    data.address = !isEmpty(data.address) ? data.address : '';
    data.state = !isEmpty(data.state) ? data.state : '';
    data.zipCode = !isEmpty(data.zipCode) ? data.zipCode : '';
    
    // isEmpty validator
	  if (validator.isEmpty(data.schoolName)) {
		errors.schoolName = 'A School name is required';
    } 
    if (validator.isEmpty(data.schoolCode)) {
		errors.schoolCode = 'A School code is required';
    }
    if (validator.isEmpty(data.level)) {
		errors.level = 'An educational level is required';
    } 
    if (validator.isEmpty(data.phoneNumber)) {
		errors.phoneNumber = 'A School phone number is required';
    } 
    if (validator.isEmpty(data.city)) {
		errors.city = 'The school\'s city location is required';
    } 
    if (validator.isEmpty(data.address)) {
		errors.address = 'The school\'s address is required';
    } 
    if (validator.isEmpty(data.state)) {
		errors.state = 'The school\'s state is required';
    } 
    if (validator.isEmpty(data.zipCode)) {
		errors.zipCode = 'The school\'s zip code is required';
    } 

    return {
		errors,
		isValid: isEmpty(errors)
	};
};

export default validateUpdateSchoolInput;