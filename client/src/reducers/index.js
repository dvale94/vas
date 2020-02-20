import { combineReducers } from 'redux';
import authReducer from './authReducers';
import errorReducer from './errorReducers';
import volunteerReducer from './volunteerReducers';
import adminReducer from './adminReducer';
import schoolReducer from './schoolReducer'
import schoolPersonnelReducer from './schoolPersonnelReducers';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  volunteers: volunteerReducer,
  adminData: adminReducer,
  schoolData: schoolReducer,
  schoolPersonnels: schoolPersonnelReducer,
});