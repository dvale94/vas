import React, { Component } from 'react';
import isEmpty from 'is-empty';
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
import { editVolunteer } from "../../actions/volunteerActions";



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

class EditVolunteerDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {}

        this.editVolunteer = this.editVolunteer.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.exitDialog = this.exitDialog.bind(this);
    }    

    componentDidMount() {
        this.setState({
            firstName: this.props.volunteer.firstName,
            lastName: this.props.volunteer.lastName,
            email: this.props.volunteer.email,
            password: '',
            phoneNumber: this.props.volunteer.phoneNumber,
            major: this.props.volunteer.major,
            isActive: this.props.volunteer.isActive,
            carAvailable: this.props.volunteer.carAvailable,
            volunteerStatus: this.props.volunteer.volunteerStatus,
            MDCPS_ID: this.props.volunteer.MDCPS_ID,
            pantherID: this.props.volunteer.pantherID,
            prevEmail: this.props.volunteer.email,
        })
    }

    editVolunteer() {
        this.props.clearErrors();

        let form = this.state

        // check if any of the fields are empty, and remove them so it dosen't get sent to the server update
        for (let property in form) {
            if (isEmpty(form[property])) {
                delete form[property];
            }
        } 

        this.props.editVolunteer(this.props.volunteer._id, form);
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
                <DialogTitle >Edit Volunteer</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    To edit a volunteer, make the changes and click submit.
                    </DialogContentText>
                    <br></br>
                    <TextField 
                        label="First Name"
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="firstName"
                        defaultValue={this.state.firstName}
                        onChange={this.handleInput}
                        type="text"
                        fullWidth
                        error={this.props.errors.firstName}
                        helperText={this.props.errors.firstName}
                    />

                    <TextField 
                        label="Last Name"
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="lastName"
                        defaultValue={this.state.lastName}
                        onChange={this.handleInput}
                        type="text"
                        fullWidth
                        error={this.props.errors.lastName}
                        helperText={this.props.errors.lastName}
                    />

                    <TextField 
                        label="Email"
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="email"
                        defaultValue={this.state.email}
                        onChange={this.handleInput}
                        type="text"
                        fullWidth
                        error={this.props.errors.email}
                        helperText={this.props.errors.email}
                    />
                    
                    <TextField 
                        label="Password"
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="password"
                        defaultValue='••••••••••'
                        onChange={this.handleInput}
                        type="password"
                        fullWidth 
                        error={this.props.errors.password}
                        helperText={this.props.errors.password}
                    />
                    
                    <TextField 
                        label="Phone Number"
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="phoneNumber"
                        defaultValue={this.state.phoneNumber}
                        onChange={this.handleInput}
                        type="text"
                        fullWidth
                        error={this.props.errors.phoneNumber}
                        helperText={this.props.errors.phoneNumber}
                    />
                    
                    <TextField 
                        label="Major:"
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="major"
                        defaultValue={this.state.major}
                        onChange={this.handleInput}
                        type="text"
                        fullWidth
                        error={this.props.errors.major}
                        helperText={this.props.errors.major}
                    /> 
                    
                    <TextField 
                        label="Panther ID"
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="pantherID"
                        defaultValue={this.state.pantherID}
                        onChange={this.handleInput}
                        type="text"
                        fullWidth 
                        error={this.props.errors.pantherID}
                        helperText={this.props.errors.pantherID}
                    />
                    Is Active: 
                    <Select
                    style={{marginBottom : "15px"}}
                    name='isActive'
                    defaultValue={this.state.isActive}
                    margin="dense"
                    onChange={this.handleInput}
                    fullWidth
                    >
                        <MenuItem value={true}>Yes</MenuItem>
                        <MenuItem value={false}>No</MenuItem>
                    </Select>                  
                    Car Available:
                    <Select
                    style={{marginBottom : "15px"}}
                    name='carAvailable'
                    defaultValue={this.state.carAvailable}
                    margin="dense"
                    onChange={this.handleInput}
                    fullWidth
                    >
                        <MenuItem value={true}>Yes</MenuItem>
                        <MenuItem value={false}>No</MenuItem>
                    </Select>
                    
                    Volunteer Status: 
                    <Select
                    style={{marginBottom : "15px"}}
                    name='volunteerStatus'
                    defaultValue={this.state.volunteerStatus}
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
                        defaultValue={this.state.MDCPS_ID}
                        onChange={this.handleInput}
                        type="text"
                        fullWidth 
                    />

                    <br></br>   
                </DialogContent>
                <DialogActions>
                    <Button className={this.props.classes.bottomButtons} onClick={this.editVolunteer}  variant="contained" color="primary">Update</Button>
                    <Button className={this.props.classes.bottomButtons} onClick={this.exitDialog} variant="contained" color="primary">Exit</Button>
                </DialogActions>
            </Dialog>
            </ThemeProvider>
        );
    }
}

EditVolunteerDialog.propTypes = {
    editVolunteer: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
  };

const mapStateToProps = state => ({
    errors: state.errors
  });

export default connect (
    mapStateToProps,
    { editVolunteer, clearErrors }  
)(withRouter(withStyles(useStyles)(EditVolunteerDialog)));