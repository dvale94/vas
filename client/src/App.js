import React,{Component,Fragment} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import { Provider } from "react-redux";
import store from "./store";
import './App.css';
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { logoutUser, setAuth } from "./actions/authActions"
import { getAdmin, getVolunteer, getSchoolPersonnel } from "./actions/userActions"
import Login from './pages/Login'
import NavBar from './components/AppBar/NavBar';
import Footer from './components/AppBar/Footer';
import Dashboard from './pages/Dashboard';
import VolunteerManagement from './pages/VolunteerManagement'
import Profile from './pages/Profile'
import SchoolManagement from './pages/SchoolManagement';
import PrivateRoute from "./components/Routes/PrivateRoute";
import AdminRoute from './components/Routes/AdminRoute'
import SchoolPersonnelManagement from './pages/SchoolPersonnelManagement';
import TeamManagement from './pages/TeamManagement';
import AdminManagement from './pages/AdminManagement';
import About from './pages/About'

// check for token to keep user logged in
if (localStorage.jwt) {

    // set auth token header 
    const token = localStorage.jwt;
    setAuthToken(token);

    // decode token and get user info and expiration
    const decoded = jwt_decode(token);

    // set user
    store.dispatch(setAuth(decoded));
    if (decoded.role === "Admin") {
      store.dispatch(getAdmin(decoded.id))
    }
    if (decoded.role === "Volunteer") {
      store.dispatch(getVolunteer(decoded.id))
    }
    if (decoded.role === "School Personnel") {
      store.dispatch(getSchoolPersonnel(decoded.id))
    }
    //store.dispatch(setCurrentUser(decoded));

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
              <Footer/>
              
              <Switch>
              
                <Route exact path='/' component={Login}/>
                <Route path='/login' component={Login}/>
                <Route path='/about' component={About}/>
                <PrivateRoute path="/dashboard" component={Dashboard}/>
                <AdminRoute path="/volunteer-management" component={VolunteerManagement}/>
                <AdminRoute path="/school-personnel-management" component={SchoolPersonnelManagement}/>
                <PrivateRoute path="/profile" component={Profile}/>
                <AdminRoute path="/schoolmanagement" component={SchoolManagement}/>
                <AdminRoute path="/team-management" component={TeamManagement}/>
                <AdminRoute path="/admin-management" component={AdminManagement}/>
                
              </Switch>
            </Fragment>
            </div>  
        </BrowserRouter>
      </Provider> 
		);
	}
}

export default App;
