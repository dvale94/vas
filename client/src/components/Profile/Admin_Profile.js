import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { blue, blueGrey } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { connect } from "react-redux";
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { createMuiTheme } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import { updateAdmin } from "../../actions/userActions";
import { ThemeProvider } from '@material-ui/core/styles';
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

class Admin_Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editDisabled: true,

            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: ""

        }

        this.updateAdmin = this.updateAdmin.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    componentDidMount() {  
        this.setState({
            firstName: this.props.user.firstName,
            lastName: this.props.user.lastName,
            email: this.props.user.email,
            phoneNumber: this.props.user.phoneNumber,
        });
        console.log(this.props.user)

    }

    updateAdmin() {
        const form = this.state
        this.props.updateAdmin(this.props.user.id, form);
        this.editable();
    }

    handleInput = (e) =>{
        const value = e.target.value
        const name = e.target.name

        this.setState({
        [name]: value 
        })

        console.log(this.state)
    }

    editable = () => {
        this.setState({
            editDisabled: !this.state.editDisabled
        })
    }

  render(){   

    var initials = (this.state.firstName.substring(0, 1) + this.state.lastName.substring(0, 1)).toUpperCase()
  
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
                            {this.props.user.role}
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
                        //value={this.props.admin.firstName}
                        value={this.state.firstName}
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
                        value={this.state.lastName}
                    />
                    {/* Email */}
                    <TextField
                        variant="standard"
                        color= "primary"
                        margin="normal"
                        disabled //={this.state.editDisabled}
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={this.handleInput}
                        value={this.state.email}
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
                        value={this.state.phoneNumber}
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
                    onClick={this.editable && this.updateAdmin}
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
Admin_Profile.propTypes = {
    updateAdmin: PropTypes.func.isRequired,
    getAdmin: PropTypes.func.isRequired,
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
  { updateAdmin }
)(withRouter(withStyles(useStyles)(Admin_Profile)));