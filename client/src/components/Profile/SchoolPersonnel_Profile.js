import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { blue } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { connect } from "react-redux";
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { createMuiTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const theme = createMuiTheme({
    palette: {
      primary: blue,
    }
  });

// Profile Styling
const useStyles = {
    all: {
        backgroundColor: '#fafafa',
        height: '100vh'
    },
    card: {
        marginTop: 10,
        minWidth: 300,
        maxWidth: 450,
        height: 500,
        backgroundColor: 'white'
    },
    paper: {
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 10,
      },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
        alignItems: 'right'
    },
    pos: {
        marginBottom: 12,
    },
    blue: {
        backgroundColor: blue[500],
    },
    Avatar: {
        marginBottom: 5,
    },
    form: {
        width: '100%',
    }
  };
// Login Styling END

class SchoolPersonnel_Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editDisabled: true,
        }
    }

    componentDidMount() {

    }

    //Supress depricated warning use UNSAFE_
    UNSAFE_componentWillReceiveProps(nextProps) {
        
    }

    handleInput = (e) =>{
        const value = e.target.value
        const name = e.target.name

        this.setState({
        [name]: value 
        })
    }

    editable = () => {
        this.setState({
            editDisabled: !this.state.editDisabled
        })
    }


  render(){   
    const user = this.props.user;
    var initials = (user.firstName.substring(0, 1) + user.lastName.substring(0, 1)).toUpperCase()
    
    
    return (
        <div className={this.props.classes.all}
                style={{backgroundImage: 'url(' + require('../../images/FIU_9_10.png') + ')',
                backgroundPosition: 'center',
                backgroundSize: 'cover' }}>
        <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center">
            <Box
            borderRadius= "10px" 
            className={this.props.classes.card} 
            variant="outlined"
            justify="center">
                <CardContent>
                    <Grid
                    className={this.props.classes.Avatar}
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    >
                        <Avatar className={this.props.classes.blue} >{initials}</Avatar>
                    </Grid>
                    <div className={this.props.classes.paper}>
                        <Typography className={this.props.classes.title} color="textPrimary" variant="h4" gutterBottom>
                            {user.role}
                        </Typography>
                    </div>
                    <Typography className={this.props.classes.title} color="textSecondary" variant="h4" gutterBottom>
                        Profile Information
                    </Typography>
                    <form className={this.props.classes.form} noValidate>

                    {/* First Name */}
                    <TextField
                        variant="standard"
                        //color= "primary"
                        margin="normal"
                        disabled={this.state.editDisabled}
                        fullWidth
                        id="email"
                        label="First Name"
                        name="firstName"
                        autoComplete="name"
                        autoFocus
                        onChange={this.handleInput}
                        value={user.firstName}
                    />
                    {/* Last Name */}
                    <TextField
                        variant="standard"
                        color= "primary"
                        margin="normal"
                        disabled={this.state.editDisabled}
                        fullWidth
                        id="email"
                        label="Last Name"
                        name="lastName"
                        autoComplete="name"
                        autoFocus
                        onChange={this.handleInput}
                        value={user.lastName}
                    />
                    {/* Email */}
                    <TextField
                        variant="standard"
                        color= "primary"
                        margin="normal"
                        disabled={this.state.editDisabled}
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={this.handleInput}
                        value={user.email}
                    />
                    {/* Phone Number */}
                    <TextField
                        variant="standard"
                        color= "primary"
                        margin="normal"
                        disabled={this.state.editDisabled}
                        fullWidth
                        id="phoneNumber"
                        label="Phone Number"
                        name="phoneNumber"
                        autoComplete="tel"
                        autoFocus
                        onChange={this.handleInput}
                        value={user.phoneNumber}
                    />
                     {/* Title */}
                     <TextField
                        variant="standard"
                        color= "primary"
                        margin="normal"
                        disabled={this.state.editDisabled}
                        fullWidth
                        id="title"
                        label="Title"
                        name="title"
                        autoComplete="name"
                        autoFocus
                        onChange={this.handleInput}
                        value={user.title}
                    />
                    </form>
                </CardContent>
            </Box>
        </Grid>
        </div>
      
    );
  }
}

// define types
SchoolPersonnel_Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

// allows us to get our state from Redux and map it to props
const mapStateToProps = state => ({
  auth: state.auth,
  user: state.userData.user,
  errors: state.errors
});

export default connect (
  mapStateToProps,
)(withRouter(withStyles(useStyles)(SchoolPersonnel_Profile)));