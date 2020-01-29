import React, { Component } from 'react';
import LoginForm from '../components/Login/LoginForm';

class Login extends Component{
    constructor(props) {
        super(props);

    }
    render(){
        return (
            <div>
                <LoginForm update={this.props.update}/>
            </div>
        )
    }
}

export default Login;