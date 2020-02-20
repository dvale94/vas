import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme } from '@material-ui/core/styles';
import { blueGrey, blue } from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { clearErrors } from '../../actions/errorActions'
import { addVolunteer } from "../../actions/volunteerActions";
import Alert from '@material-ui/lab/Alert';

const theme = createMuiTheme({
    palette: {
      primary: blue,
    }
  });

const useStyles = {
    bottomButtons: {
        backgroundColor: blueGrey[700],
        color: "white",
        fontWeight: "bold",
        '&:hover': {
            backgroundColor: blue[500],
        }
    },
};

class AddVolunteerDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            phoneNumber: '',
            major: '',
            isActive: true,
            carAvailable: false,
            volunteerStatus: true,
            MDCPS_ID: '',
            pantherID: ''
        }

        this.addVolunteer = this.addVolunteer.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }    

    // check if a new volunteer was added successfully to close this pop up
    componentDidUpdate(prevProps) {
        if(prevProps.volunteers.length != this.props.volunteers.length) {
            this.props.close();
        }
    }

    addVolunteer() {
        this.props.clearErrors();
        this.props.addVolunteer(this.state)
    }

    handleInput = (e) =>{
        const value = e.target.value
        const name = e.target.name
    
        this.setState({
          [name]: value 
        })
    }

    inputError = (error) => {
        return (
            <Alert severity="error">{error}</Alert>
          //<div style={{color: "red"}}>
            //  {error}
            //</div>
        )
    };

    render() {

        const {open, close} = this.props

        return (
            <ThemeProvider theme={theme}>
            <Dialog
            open={open}
            >
                <DialogTitle >Add Volunteer</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    To add a volunteer, fill out the following form and click submit.
                    </DialogContentText>
                    <br></br>
                    First Name: 
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="firstName"
                        onChange={this.handleInput}
                        type="text"
                        fullWidth
                    />
                    {this.props.errors.hasOwnProperty("firstName") && this.inputError(this.props.errors.firstName)}
                    Last Name:
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="lastName"
                        onChange={this.handleInput}
                        type="text"
                        fullWidth
                    />
                    {this.props.errors.hasOwnProperty("lastName") && this.inputError(this.props.errors.lastName)}
                    Email:
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="email"
                        onChange={this.handleInput}
                        type="text"
                        fullWidth
                    />
                    {this.props.errors.hasOwnProperty("email") && this.inputError(this.props.errors.email)}
                    Password:
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="password"
                        onChange={this.handleInput}
                        type="password"
                        fullWidth
                    />
                    {this.props.errors.hasOwnProperty("password") && this.inputError(this.props.errors.password)}
                    Phone Number:
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="phoneNumber"
                        onChange={this.handleInput}
                        type="text"
                        fullWidth
                    />
                    {this.props.errors.hasOwnProperty("phoneNumber") && this.inputError(this.props.errors.phoneNumber)}
                    Major:
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="major"
                        onChange={this.handleInput}
                        type="text"
                        fullWidth
                    />  
                    {this.props.errors.hasOwnProperty("major") && this.inputError(this.props.errors.major)}
                    Car Available:
                    <Select
                    style={{marginBottom : "15px"}}
                    name='carAvailable'
                    margin="dense"
                    onChange={this.handleInput}
                    fullWidth
                    >
                        <MenuItem value={true}>Yes</MenuItem>
                        <MenuItem value={false}>No</MenuItem>
                    </Select>
                    {this.props.errors.hasOwnProperty("carAvailable") && this.inputError(this.props.errors.carAvailable)}
                    Panther ID:
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="pantherID"
                        onChange={this.handleInput}
                        type="text"
                        fullWidth 
                    />
                    {this.props.errors.hasOwnProperty("pantherID") && this.inputError(this.props.errors.pantherID)}
                    Volunteer Status: 
                    <Select
                    style={{marginBottom : "15px"}}
                    name='volunteerStatus'
                    margin="dense"
                    onChange={this.handleInput}
                    fullWidth
                    >
                        <MenuItem value={true}>Approved</MenuItem>
                        <MenuItem value={false}>Not yet Approved</MenuItem>
                    </Select>
                    MDCPS ID:
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="MDCPS_ID"
                        onChange={this.handleInput}
                        type="text"
                        fullWidth 
                    />
                    <br></br>   
                </DialogContent>
                <DialogActions>
                    <Button className={this.props.classes.bottomButtons} onClick={this.addVolunteer}  variant="contained" color="primary">Add</Button>
                    <Button className={this.props.classes.bottomButtons} onClick={close} variant="contained" color="primary">Cancel</Button>
                </DialogActions>
            </Dialog>
            </ThemeProvider>
        );
    }
}

AddVolunteerDialog.propTypes = {
    addVolunteer: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    volunteers: PropTypes.array.isRequired
  };

const mapStateToProps = state => ({
    errors: state.errors,
    volunteers: state.volunteers.volunteers
  });

export default connect (
    mapStateToProps,
    { addVolunteer, clearErrors }  
)(withRouter(withStyles(useStyles)(AddVolunteerDialog)));