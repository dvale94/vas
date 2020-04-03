import { combineReducers } from 'redux';
import authReducer from './authReducers';
import errorReducer from './server/errorReducers';
import volunteerReducer from './volunteerReducers';
import userReducer from './userReducer';
import schoolReducer from './schoolReducer'
import schoolPersonnelReducer from './schoolPersonnelReducers';
import successReducer from './server/successReducers';
import teamReducer from './teamReducer'
import adminReducer from './adminReducers';
import volunteerRequestReducer from './volunteerRequestReducer';
import schoolPersonnelRequestReducer from './schoolPersonnelRequestReducers'
import calendarReducer from './calendarReducer'

export default combineReducers({
  auth: authReducer,
  userData: userReducer,
  volunteers: volunteerReducer,
  schoolPersonnels: schoolPersonnelReducer,
  schoolData: schoolReducer,
  teamData: teamReducer,
  adminData: adminReducer,
  errors: errorReducer,
  success: successReducer,
  volunteerRequests: volunteerRequestReducer,
  schoolPersonnelRequests: schoolPersonnelRequestReducer,
  calendar: calendarReducer
});