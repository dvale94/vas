import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { blue, blueGrey } from '@material-ui/core/colors';
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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CardActions from '@material-ui/core/CardActions';
import { ThemeProvider } from '@material-ui/core/styles';
import { updateVolunteer_Profile } from "../../actions/userActions";
import FormHelperText from '@material-ui/core/FormHelperText';
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
        height: 880,
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
    },
    Button: {
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 10,
    },
    editButton: {
        backgroundColor: blueGrey[700],
        color: "white",
        fontWeight: "bold",
        '&:hover': {
            backgroundColor: blue[500],
        },
        width: "70px",
        "&:disabled": {
            backgroundColor: blueGrey[100],
            color: "white",
          }
    },
  };
// Login Styling END

class Volunteer_Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editDisabled: true,
            carAvailable: false,
        }
        this.updateVolunteer_Profile = this.updateVolunteer_Profile.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    componentDidMount() {
        this.setState({
            carAvailable: this.props.user.carAvailable,
        })
    }

    //Supress depricated warning use UNSAFE_
    UNSAFE_componentWillReceiveProps(nextProps) {
        
    }

    updateVolunteer_Profile() {
        const form = this.state
        console.log(form)
        this.props.updateVolunteer_Profile(this.props.user.id, form);
        this.editable();
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
    var initials = (user.firstName.substring(0, 1) + user.lastName.substring(0, 1)).toUpperCase();
    
    
    return (
        <ThemeProvider theme={theme}>
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
                        disabled
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
                        disabled
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
                        disabled
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
                        disabled
                        fullWidth
                        id="phoneNumber"
                        label="Phone Number"
                        name="phoneNumber"
                        autoComplete="tel"
                        autoFocus
                        onChange={this.handleInput}
                        value={user.phoneNumber}
                    />
                    {/* Panther ID */}
                    <TextField
                        variant="standard"
                        color= "primary"
                        margin="normal"
                        disabled
                        fullWidth
                        id="Panther ID"
                        label="Panther ID"
                        name="Panther ID"
                        autoComplete="number"
                        autoFocus
                        onChange={this.handleInput}
                        value={user.pantherID}
                    />
                    {/* Major */}
                    <TextField
                        variant="standard"
                        color= "primary"
                        margin="normal"
                        disabled
                        fullWidth
                        id="Major"
                        label="Major"
                        name="Major"
                        autoComplete="name"
                        autoFocus
                        onChange={this.handleInput}
                        value={user.major}
                    />
                    <br></br>
                    <br></br>
                    <FormHelperText>Car Available</FormHelperText>
                    <Select
                    style={{marginBottom : "15px"}}
                    labelId="carLabel"
                    name='carAvailable'
                    disabled={this.state.editDisabled}
                    defaultValue={this.props.user.carAvailable}
                    margin="dense"
                    onChange={this.handleInput}
                    fullWidth
                    >
                        <MenuItem value={true}>Yes</MenuItem>
                        <MenuItem value={false}>No</MenuItem>
                    </Select>
                    
                    {/* Volunteer Status */}
                    <TextField
                        variant="standard"
                        color= "primary"
                        margin="normal"
                        disabled
                        fullWidth
                        id="Volunteer Status"
                        label="Volunteer Status"
                        name="Volunteer Status"
                        autoComplete="name"
                        autoFocus
                        onChange={this.handleInput}
                        value={user.volunteerStatus ? "Approved" : "Not yet approved"}
                    />
                    <TextField
                        variant="standard"
                        color= "primary"
                        margin="normal"
                        disabled
                        fullWidth
                        id="MDCPS_ID"
                        label="MDCPS Volunteer ID"
                        name="MDCPS_ID"
                        autoComplete="name"
                        autoFocus
                        onChange={this.handleInput}
                        value={user.MDCPS_ID}
                    />
                    </form>
                </CardContent>
                <div className={this.props.classes.Button}>
                <CardActions>
                    <Button 
                    className={this.props.classes.editButton}
                    onClick={this.editable} 
                    size="small"
                    disabled={!this.state.editDisabled}
                    endIcon={<EditIcon />}>
                        Edit
                    </Button>
                    <Button 
                    className={this.props.classes.editButton}
                    onClick={this.editable && this.updateVolunteer_Profile}
                    size="small"
                    disabled={this.state.editDisabled}
                    endIcon={<SaveIcon />}>
                        Save
                    </Button>
                </CardActions>
                </div>
            </Box>
        </Grid>
        </div>
        </ThemeProvider>
    );
  }
}

// define types
Volunteer_Profile.propTypes = {
  updateVolunteer_Profile: PropTypes.func.isRequired,
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
  { updateVolunteer_Profile }
)(withRouter(withStyles(useStyles)(Volunteer_Profile)));