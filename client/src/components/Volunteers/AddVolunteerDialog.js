import React, { Component } from 'react';
import isEmpty from 'is-empty';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
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
import { clearErrors } from '../../actions/server/errorActions'
import { addVolunteer } from "../../actions/volunteerActions";

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
        this.exitDialog = this.exitDialog.bind(this);
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

    exitDialog() {
        this.props.clearErrors();
        this.props.close();
    }

    render() {

        const {open} = this.props

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
                    <TextField 
                        label="First Name"
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="firstName"
                        onChange={this.handleInput}
                        type="text"
                        fullWidth
                        error={!isEmpty(this.props.errors.firstName)}
                        helperText={this.props.errors.firstName}
                    />
                    
                    <TextField
                        label="Last Name"
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="lastName"
                        onChange={this.handleInput}
                        type="text"
                        fullWidth
                        error={!isEmpty(this.props.errors.lastName)}
                        helperText={this.props.errors.lastName}
                    />
                    
                    <TextField 
                        label="Email"
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="email"
                        onChange={this.handleInput}
                        type="text"
                        fullWidth
                        error={!isEmpty(this.props.errors.email)}
                        helperText={this.props.errors.email}
                    />
                    
                    <TextField 
                        label="Password"
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="password"
                        onChange={this.handleInput}
                        type="password"
                        fullWidth
                        error={!isEmpty(this.props.errors.password)}
                        helperText={this.props.errors.password}
                    />
                   
                    <TextField 
                        label="Phone Number"
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="phoneNumber"
                        onChange={this.handleInput}
                        type="text"
                        fullWidth
                        error={!isEmpty(this.props.errors.phoneNumber)}
                        helperText={this.props.errors.phoneNumber}
                    />
                    
                    <TextField 
                        label="Major"
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="major"
                        onChange={this.handleInput}
                        type="text"
                        fullWidth
                        error={!isEmpty(this.props.errors.major)}
                        helperText={this.props.errors.major}
                    />  

                    <TextField 
                        label="Panther ID"
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="pantherID"
                        onChange={this.handleInput}
                        type="text"
                        fullWidth 
                        error={!isEmpty(this.props.errors.pantherID)}
                        helperText={this.props.errors.pantherID}
                    />

                    <FormControl fullWidth style={{marginBottom : "15px"}} margin='dense'>
                        <InputLabel id="car-available">Car Available</InputLabel>
                        <Select
                            labelId='car-available'
                            name='carAvailable'
                            onChange={this.handleInput}
                            defaultValue={''}
                        >
                            <MenuItem  value={true}>Yes</MenuItem >
                            <MenuItem  value={false}>No</MenuItem >
                        </Select>
                    </FormControl>

                    <FormControl fullWidth style={{marginBottom : "15px"}} margin='dense'>
                        <InputLabel id="volunteer-status">Volunteer Status</InputLabel>
                        <Select
                            labelId='volunteer-status'
                            name='volunteerStatus'
                            onChange={this.handleInput}
                            defaultValue={''}
                        >
                            <MenuItem value={true}>Approved</MenuItem>
                            <MenuItem  value={false}>Not yet Approved</MenuItem>
                        </Select>
                    </FormControl>
                    
                    <TextField 
                        label="MDCPS ID"
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="MDCPS_ID"
                        onChange={this.handleInput}
                        type="text"
                        fullWidth 
                        error={!isEmpty(this.props.errors.MDCPS_ID)}
                        helperText={this.props.errors.MDCPS_ID}
                    />
                    <br></br>   
                </DialogContent>
                <DialogActions>
                    <Button className={this.props.classes.bottomButtons} onClick={this.addVolunteer}  variant="contained" color="primary">Add</Button>
                    <Button className={this.props.classes.bottomButtons} onClick={this.exitDialog} variant="contained" color="primary">Exit</Button>
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