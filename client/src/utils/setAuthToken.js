import request from 'request';

const setAuthToken = token => {
  if (token) {
    // Apply authorization token to every request if logged in
    request.headers.Authorization = token;
  } else {
    // Delete auth header
    delete request.headers.Authorization;
  }
};

export default setAuthToken;