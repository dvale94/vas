import { CLEAR_SUCCESS } from '../types';

// clear errors
export const clearSuccess = () => dispatch => {
    dispatch({
        type: CLEAR_SUCCESS,
        payload: {}
    })
};