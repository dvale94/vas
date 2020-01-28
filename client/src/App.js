import React,{Component,Fragment} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import { Provider } from "react-redux";
import store from "./store";
import './App.css';
import Login from './pages/Login'
import NavBar from './components/NavBar';
import Dashboard from './pages/Dashboard';

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
                <Route path='/dashboard' component={Dashboard}/>
              </Switch>
            </Fragment>
            </div>  
        </BrowserRouter>
      </Provider>  
		);
	}
}

export default App;
