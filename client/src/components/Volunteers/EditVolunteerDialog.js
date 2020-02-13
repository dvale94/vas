import React, { Component } from 'react';
import isEmpty from 'is-empty';
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
import { editVolunteer } from "../../actions/volunteerActions";
import { useTheme } from '@material-ui/core/styles';

class EditVolunteerDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            server: {}
        }

        this.editVolunteer = this.editVolunteer.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }    

    editVolunteer() {

        let form = this.state
        delete form.server

        // check if any of the fields are empty, and remove them so it dosen't get sent to the server update
        for (let property in form) {
            if (isEmpty(form[property])) {
                delete form[property];
            }
        } 

        this.props.editVolunteer(this.props.volunteer._id,form);

        this.props.close()
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
          <div style={{color: "red"}}>
              {error}
            </div>
        )
    };

    render() {

        const theme = useTheme();
        const {volunteer, open, close} = this.props

        return (
            
            <Dialog
            open={open}
            >
                <DialogTitle >Edit Volunteer</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    To edit a volunteer, make the changes and click submit.
                    </DialogContentText>
                    <br></br>
                    First Name: 
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="firstName"
                        placeholder={volunteer.firstName}
                        onChange={this.handleInput}
                        type="text"
                        fullWidth
                    />
                    Last Name:
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="lastName"
                        placeholder={volunteer.lastName}
                        onChange={this.handleInput}
                        type="text"
                        fullWidth
                    />
                    Email:
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="email"
                        placeholder={volunteer.email}
                        onChange={this.handleInput}
                        type="text"
                        fullWidth
                    />
                    Password:
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="password"
                        placeholder='**********'
                        onChange={this.handleInput}
                        type="password"
                        fullWidth 
                    />
                    Phone Number:
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="phoneNumber"
                        placeholder={volunteer.phoneNumber}
                        onChange={this.handleInput}
                        type="text"
                        fullWidth
                    />
                    Major:
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="major"
                        placeholder={volunteer.major}
                        onChange={this.handleInput}
                        type="text"
                        fullWidth
                    />
                    Volunteer Status: 
                    <Select
                    style={{marginBottom : "15px"}}
                    name='volunteerStatus'
                    defaultValue={volunteer.volunteerStatus}
                    margin="dense"
                    onChange={this.handleInput}
                    fullWidth
                    >
                        <MenuItem value={true}>Yes</MenuItem>
                        <MenuItem value={false}>No</MenuItem>
                    </Select> 
                    Is Active: 
                    <Select
                    style={{marginBottom : "15px"}}
                    name='isActive'
                    defaultValue={volunteer.isActive}
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
                    defaultValue={volunteer.carAvailable}
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
                        placeholder={volunteer.pantherID.toString()}
                        onChange={this.handleInput}
                        type="text"
                        fullWidth 
                    />
                    MDCPS ID:
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="MDCPS_ID"
                        placeholder={volunteer.MDCPS_ID}
                        onChange={this.handleInput}
                        type="text"
                        fullWidth 
                    />
                    <br></br>   
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.editVolunteer}  variant="contained" color="primary">Submit</Button>
                    <Button onClick={close} variant="contained" color="primary">Cancel</Button>
                </DialogActions>
            </Dialog>

        );
    }
}

EditVolunteerDialog.propTypes = {
    editVolunteer: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
  };

const mapStateToProps = state => ({
    errors: state.errors
  });

export default connect (
    mapStateToProps,
    { editVolunteer }  
)(withRouter(EditVolunteerDialog));