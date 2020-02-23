import { combineReducers } from 'redux';
import authReducer from './authReducers';
import errorReducer from './server/errorReducers';
import volunteerReducer from './volunteerReducers';
import userReducer from './userReducer';
import schoolReducer from './schoolReducer'
import schoolPersonnelReducer from './schoolPersonnelReducers';
import successReducer from './server/successReducers';

export default combineReducers({
  auth: authReducer,
  userData: userReducer,
  volunteers: volunteerReducer,
  schoolPersonnels: schoolPersonnelReducer,
  schoolData: schoolReducer,
  errors: errorReducer,
  success: successReducer
});