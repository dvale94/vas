import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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
import { addVolunteer } from "../../actions/volunteerActions";

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
            carAvailable: false,
            volunteerStatus: true,
            MDCPS_ID: '',
            pantherID: '',
            server: {}
        }

        this.addVolunteer = this.addVolunteer.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }    

    addVolunteer() {
        this.props.addVolunteer(this.state);

        this.props.close()
    }

    handleInput = (e) =>{
        const value = e.target.value
        const name = e.target.name
    
        this.setState({
          [name]: value 
        })

        console.log(this.state)
    }

    inputError = (error) => {
        return (
          <div style={{color: "red"}}>
              {error}
            </div>
        )
    };

    render() {

        const {open, close} = this.props

        return (
            
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
                    Last Name:
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="lastName"
                        onChange={this.handleInput}
                        type="text"
                        fullWidth
                    />
                    Email:
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="email"
                        onChange={this.handleInput}
                        type="text"
                        fullWidth
                    />
                    Password:
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="password"
                        onChange={this.handleInput}
                        type="password"
                        fullWidth
                    />
                    Phone Number:
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="phoneNumber"
                        onChange={this.handleInput}
                        type="text"
                        fullWidth
                    />
                    Major:
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="major"
                        onChange={this.handleInput}
                        type="text"
                        fullWidth
                    />
                    Volunteer Status: 
                    <Select
                    style={{marginBottom : "15px"}}
                    name='volunteerStatus'
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
                    margin="dense"
                    onChange={this.handleInput}
                    fullWidth
                    >
                        <MenuItem value={true}>Yes</MenuItem>
                        <MenuItem value={false}>No</MenuItem>
                    </Select>
                    Panther ID:
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="pantherID"
                        onChange={this.handleInput}
                        type="text"
                        fullWidth 
                    />
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
                    <Button onClick={this.addVolunteer}  variant="contained" color="primary">Submit</Button>
                    <Button onClick={close} variant="contained" color="primary">Cancel</Button>
                </DialogActions>
            </Dialog>

        );
    }
}

AddVolunteerDialog.propTypes = {
    addVolunteer: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
  };

const mapStateToProps = state => ({
    errors: state.errors
  });

export default connect (
    mapStateToProps,
    { addVolunteer }  
)(withRouter(AddVolunteerDialog));