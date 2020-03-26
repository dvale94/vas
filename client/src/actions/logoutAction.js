import { RESET_STATE } from './types';


// set logged in user
export const resetState = decoded => {
    return {
        type: RESET_STATE,
    };
};