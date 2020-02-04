import { combineReducers } from 'redux';
import authReducer from './authReducers';
import errorReducer from './errorReducers';
import dataReducer from './dataReducers';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  data: dataReducer
});