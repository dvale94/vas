import React,{Component,Fragment} from 'react';
import { browserHistory } from 'react-router';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import './App.css';
import Login from './pages/Login'
import NavBar from './components/NavBar/NavBar';
import Dashboard from './pages/Dashboard';
import PropTypes from 'prop-types';

class App extends Component {

  constructor (props) {
    super(props);
    this.forceUpdate = this.forceUpdate.bind(this);
    this.checkLogIn = this.checkLogIn.bind(this);
    this.state = { loggedIn: false}
  }


  componentDidMount() {
		this.checkLogIn()
	}

	componentWillUpdate() {
		this.checkLogIn()
	}

  //if the user is already logged in.
  checkLogIn() {
    if (this.state.loggedIn && localStorage.getItem('token')) {
      this.setState({
        loggedIn: true
      })
    }
  }

	render() {
		return (
			<div className="container">
        <Router history={browserHistory}>
          {/* <Fragment>
            <NavBar/>
            <Redirect from="/" to="/login"/>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/dashboard" component={Dashboard}/>
            </Switch>
          </Fragment> */}
          {/* <Redirect from="/" to="/login"/> */}
          <NavBar/>
          <Switch>
            <Route path="/login" exact component={ () => <Login update={this.forceUpdate}/>} />
            <Route path="/dashboard" component={Dashboard}/> 
          </Switch>
          

        </Router>
			</div>
		);
	}
}


App.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default App;
