import React,{Component,Fragment} from 'react';
import {BrowserRouter, Route,Switch} from 'react-router-dom'
import './App.css';
import Login from './pages/Login'

class App extends Component {

	render() {
		return (
			<div className="container">
        <BrowserRouter>
          <Fragment>

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
