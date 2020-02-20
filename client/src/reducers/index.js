import { combineReducers } from 'redux';
import authReducer from './authReducers';
import errorReducer from './errorReducers';
import volunteerReducer from './volunteerReducers';
import userReducer from './userReducer';
import schoolReducer from './schoolReducer'
import schoolPersonnelReducer from './schoolPersonnelReducers';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  volunteers: volunteerReducer,
  userData: userReducer,
  schoolData: schoolReducer,
  schoolPersonnels: schoolPersonnelReducer,
});