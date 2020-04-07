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
import './LoginForm.css';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import Alert from '@material-ui/lab/Alert';

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
  logo: {
    height: '80px',
    marginBottom: '0px'
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
        errors: {}
        };
    }  

    componentDidMount() {
      // If logged in and user navigates to Login page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }

    //Supress depricated warning use UNSAFE_
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
        // push user to dashboard when they login
        this.props.history.push("/dashboard"); 
        }
        if (nextProps.errors) {
        this.setState({
            errors: nextProps.errors
        });
        }
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
        

        const userData = {
        email: this.state.email,
        password: this.state.password
        };

        //redirect is handled within loginUser()
        this.props.loginUser(userData); 
    }

    inputError = (error) => {
        return (
        <Alert severity="error">{error}</Alert>
        )
    };

  render(){   
    return (
      <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={this.props.classes.paper}>

            <img
            className={this.props.classes.logo}
            src ={require("../../images/VAS_shadow.png")}
            alt = "logo"
            />

          <Typography component="h1" variant="h5">
            Login
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
            {this.state.errors.hasOwnProperty("email") && this.inputError(this.state.errors.email)}
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
            {this.state.errors.hasOwnProperty("password") && this.inputError(this.state.errors.password)}
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

// define types
LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

// allows us to get our state from Redux and map it to props
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect (
  mapStateToProps,
  { loginUser }  
)(withRouter(withStyles(useStyles)(LoginForm)));