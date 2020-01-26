import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockRoundedIcon from '@material-ui/icons/LockRounded';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { blueGrey, blue } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { api } from '../api/ApiProvider'
import './LoginForm.css';


// Login Styling
const theme = createMuiTheme({
    palette: {
      primary: blue,
    }
  });

const useStyles = {
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: blueGrey[500],
    '&:hover': {
        backgroundColor: blue[500],
    }
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: blueGrey[700],
    color: "white",
    fontWeight: "bold",
    '&:hover': {
        backgroundColor: blue[500],
    }
  },
};
// Login Styling END

class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      submitted: false,
      loginError: '',
      server: {}
    };
  }  


  handleInput = (e) =>{
    const value = e.target.value
    const name = e.target.name

    this.setState({
      [name]: value 
    })
  }


  submitLogin = async (e) =>{
    e.preventDefault()

    api.login(this.state, (result) => {
      let response = JSON.parse(result);
      console.log(result)
      console.log(response)

      this.setState(
        {
          submitted: true, 
          server: response,
          loginError: response
        }
      )

      if(response.success) {

        localStorage.setItem('token', response.token)
      }
    });
  }

  inputError = (error) => {
    return (
      <div className="logIn-input-message">
          ^ {error}
        </div>
    )
  };

  render(){   
    
    return (
      <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={this.props.classes.paper} >
          <Avatar className={this.props.classes.avatar} >
          <LockRoundedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            VAS Login
          </Typography>
          <form className={this.props.classes.form} onSubmit={this.submitLogin.bind(this)} noValidate>
            <div>
            <TextField
              variant="outlined"
              color= "primary"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={this.handleInput}
              value={this.state.email}
            />
            {this.state.server.hasOwnProperty("emailError") && this.inputError(this.state.server.emailError)}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={this.handleInput}
              value={this.state.password}
            />
            {this.state.server.hasOwnProperty("passwordError") && this.inputError(this.state.server.passwordError)}
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={this.props.classes.submit}
              
            >
              Login
            </Button>
          </form>
        </div>
      </Container>
      </ThemeProvider>
      
    );
  }
}

LoginForm.propTypes = {
	classes: PropTypes.object.isRequired,
};


export default withStyles(useStyles)(LoginForm);