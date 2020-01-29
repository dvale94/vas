import React,{Component,Fragment} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import { Provider } from "react-redux";
import store from "./store";
import './App.css';
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import Login from './pages/Login'
import NavBar from './components/NavBar';
import Dashboard from './pages/Dashboard';
import PrivateRoute from "./components/PrivateRoute";

// check for token to keep user logged in
if (localStorage.jwt) {

    // set auth token header 
    const token = localStorage.jwt;
    setAuthToken(token);

    // decode token and get user info and expiration
    const decoded = jwt_decode(token);

    // set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));

    // check for expired token
    // to get in milliseconds divide by 1000
    const currentTime = Date.now() / 1000; 
    if (decoded.exp < currentTime) {

        // logout user
        store.dispatch(logoutUser());

        // redirect to login
        window.location.href = "./";
    }
}

class App extends Component {

	render() {
		return (
      <Provider store={store}>
        <BrowserRouter>
          <div className='.App'>
            <Fragment>
              <NavBar/>
              <Switch>
                <Route exact path='/' component={Login}/>
                <Route path='/login' component={Login}/>
                <PrivateRoute path="/dashboard" component={Dashboard} />
              </Switch>
            </Fragment>
            </div>  
        </BrowserRouter>
      </Provider>  
		);
	}
}

export default App;
