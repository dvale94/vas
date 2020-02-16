import { combineReducers } from 'redux';
import authReducer from './authReducers';
import errorReducer from './errorReducers';
import volunteerReducer from './volunteerReducers';
import adminReducer from './adminReducer';
import schoolReducer from './schoolReducer'

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  volunteerData: volunteerReducer,
  adminData: adminReducer,
  schoolData: schoolReducer,
});