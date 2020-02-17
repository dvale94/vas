import React, { Component } from 'react';
import isEmpty from 'is-empty';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { editSchoolPersonnel } from "../../actions/schoolPersonnelActions";
import { useTheme } from '@material-ui/core/styles';

class EditSchoolPersonnelDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            server: {}
        }

        this.editSchoolPersonnel = this.editSchoolPersonnel.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }    

    editSchoolPersonnel() {

        let form = this.state
        delete form.server

        // check if any of the fields are empty, and remove them so it dosen't get sent to the server update
        for (let property in form) {
            if (isEmpty(form[property])) {
                delete form[property];
            }
        } 

        this.props.editSchoolPersonnel(this.props.schoolPersonnel._id,form);

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

        const {schoolPersonnel, open, close} = this.props

        return (
            
            <Dialog
            open={open}
            >
                <DialogTitle >Edit School Personnel</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    To edit a School Personnel, make the changes and click submit.
                    </DialogContentText>
                    <br></br>
                    First Name: 
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="firstName"
                        placeholder={schoolPersonnel.firstName}
                        onChange={this.handleInput}
                        type="text"
                        fullWidth
                    />
                    Last Name:
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="lastName"
                        placeholder={schoolPersonnel.lastName}
                        onChange={this.handleInput}
                        type="text"
                        fullWidth
                    />
                    Email:
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="email"
                        placeholder={schoolPersonnel.email}
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
                        placeholder={schoolPersonnel.phoneNumber}
                        onChange={this.handleInput}
                        type="text"
                        fullWidth
                    />
                    Title:
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="title"
                        placeholder={schoolPersonnel.title}
                        onChange={this.handleInput}
                        type="text"
                        fullWidth
                    />
                    School ID: 
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="schoolID"
                        placeholder={schoolPersonnel.schoolID}
                        onChange={this.handleInput}
                        type="text"
                        fullWidth
                    />
                    <br></br>   
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.editSchoolPersonnel}  variant="contained" color="primary">Submit</Button>
                    <Button onClick={close} variant="contained" color="primary">Cancel</Button>
                </DialogActions>
            </Dialog>

        );
    }
}

EditSchoolPersonnelDialog.propTypes = {
    editSchoolPersonnel: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
  };

const mapStateToProps = state => ({
    errors: state.errors
  });

export default connect (
    mapStateToProps,
    { editSchoolPersonnel }  
)(withRouter(EditSchoolPersonnelDialog));