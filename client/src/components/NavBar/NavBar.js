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
import AccountCircle from '@material-ui/icons/AccountCircle';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#455a64"
        },
        secondary: {
          main: "#FFFFFF"
        }
    }
});

const useStyles = {
  root: {
    flexGrow: 0,
    width: '100vw'
    
  },
  toolbar: {
    display: 'felx',
    // minHeight: 50,
    // maxHeight:64,
    //alignItems: 'flex-end',
    justifyContent: 'space-between',
    //paddingTop: theme.spacing(1),
    //paddingBottom: theme.spacing(2),
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
    anchorEl : null,
    open: false
    };
    this.setAnchorEl = this.setAnchorEl.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
    
}  

 handleClose = () => {
  this.setAnchorEl(null);
};

redirect_to_Profile = () =>{
  this.props.history.push("/profile"); 
}

  submitLogout = async (e) =>{
    e.preventDefault()

    // Hides logout button after being clicked
    this.setState({
      loggedIn: false
    });
  
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



  handleClick(event) {
    this.setAnchorEl(event.currentTarget);
}
    setAnchorEl(value){
        this.setState({
            anchorEl: value,
            open: !this.state.open
        })
    }
  handleClose() {
    this.setAnchorEl(null);
}

renderMenu(){
if(this.state.loggedIn){
  return(
  <Menu id="fade-menu" anchorEl={this.state.anchorEl} open={this.state.open} onClose={this.handleClose} TransitionComponent={Fade}>
        <MenuItem onClick={this.handleClose && this.redirect_to_Profile}>Profile</MenuItem>
        <MenuItem onClick={this.handleClose && this.submitLogout}>Logout</MenuItem>
    </Menu>
   )
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

          {this.state.loggedIn &&
          <IconButton aria-owns={this.state.open ? 'fade-menu' : undefined} aria-haspopup="true" onClick={this.handleClick}>
            <AccountCircle className="icon" color="secondary" />
          </IconButton>}
          {this.renderMenu()}

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