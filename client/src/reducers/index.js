import { combineReducers } from 'redux';
import authReducer from './authReducers';
import errorReducer from './errorReducers';
import volunteerReducer from './volunteerReducers';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  data: volunteerReducer
});