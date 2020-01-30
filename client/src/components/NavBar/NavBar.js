import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#455a64"
        },
    }
});

const useStyles = {
  root: {
    flexGrow: 1,
  },
  toolbar: {
    display: 'felx',
    minHeight: 50,
    maxHeight:64,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: 'white',
  },
  logout: {
    color: 'white !important'
  },
  link: {
    textDecoration: 'none'
  }
};



class NavBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
    loggedIn: false,
    };
}  



  submitLogout = async (e) =>{
    e.preventDefault()
  
    this.props.logoutUser(); 
    this.props.history.push("/login"); 
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      return this.setState({
        loggedIn: true
      })
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      return this.setState({
        loggedIn: true
      })
    }
  }

  

render(){
  return (
    <ThemeProvider theme={theme}>
    <div className={this.props.classes.root} >
      <AppBar position='static'>
        <Toolbar className={this.props.classes.toolbar}>
          <Link to='/' className={this.props.classes.link}>
            <Typography className={this.props.classes.title} variant='h5'>
            Volunteer Attendance System
            </Typography>
          </Link>
          {this.state.loggedIn && <Button className={this.props.classes.logout} onClick={this.submitLogout}  >
              Logout
          </Button>}
        </Toolbar>
      </AppBar>
    </div>
    </ThemeProvider>
  );
}
}

// define types
NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

// allows us to get our state from Redux and map it to props
const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect (
  mapStateToProps,
  { logoutUser }  
)(withRouter(withStyles(useStyles)(NavBar)));