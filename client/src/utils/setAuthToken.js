import request from 'request';

const setAuthToken = token => {
  if (token) {
    // Apply authorization token to every request if logged in
    request.defaults({
        headers: {Authorization: token}
    })
  } 
  else {
    // Delete auth header

    // ERROR is i leave this and Logout
    //delete request.headers.Authorization
  }
};

export default setAuthToken;