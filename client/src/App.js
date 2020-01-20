import React,{Component,Fragment} from 'react';
import {BrowserRouter, Route,Switch} from 'react-router-dom'
import './App.css';
import Login from './pages/Login'
import NavBar from './components/NavBar';

class App extends Component {

	render() {
		return (
			<div className="container">
        <BrowserRouter>
          <Fragment>
            <NavBar/>
            <Switch>
              <Route exact path="/" component={Login} />
            </Switch>
          </Fragment>
        </BrowserRouter>
			</div>
		);
	}
}

export default App;
