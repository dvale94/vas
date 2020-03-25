import React, { Component } from 'react';
import isEmpty from 'is-empty';
import Button from '@material-ui/core/Button';
import { createMuiTheme } from '@material-ui/core/styles';
import { blueGrey, blue } from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Alert from '@material-ui/lab/Alert';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { clearErrors } from '../../actions/server/errorActions'
import { clearSuccess } from '../../actions/server/successActions'

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

class EditSchoolPersonnelDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {}

        this.editSchoolPersonnel = this.editSchoolPersonnel.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.exitDialog = this.exitDialog.bind(this);
    }

    componentDidMount(){
        this.setState({
            firstName: this.props.schoolPersonnel.firstName,
            lastName: this.props.schoolPersonnel.lastName,
            email: this.props.schoolPersonnel.email,
            password: this.props.schoolPersonnel.password,
            phoneNumber: this.props.schoolPersonnel.phoneNumber,
            title: this.props.schoolPersonnel.title,
            schoolCode: this.props.schoolPersonnel.schoolCode,
            isActive: this.props.schoolPersonnel.isActive,
            prevEmail: this.props.schoolPersonnel.email
        });
    }

    editSchoolPersonnel() {
        this.props.clearErrors();
        this.props.clearSuccess();
        
        let form = this.state
        delete form.server

        // check if any of the fields are empty, and remove them so it dosen't get sent to the server update
        for (let property in form) {
            if (isEmpty(form[property])) {
                delete form[property];
            }
        } 

        this.props.editSchoolPersonnel(this.props.schoolPersonnel._id,form);
    }

    exitDialog() {
        this.props.clearErrors();
        this.props.clearSuccess();
        this.props.close();
    }

    handleInput = (e) =>{
        const value = e.target.value
        const name = e.target.name
    
        this.setState({
          [name]: value 
        })

    }

    successMessage() {
        if (!isEmpty(this.props.success.message)) {
            return <Alert severity="success">{this.props.success.message}</Alert> 
        }
    }


    render() {

        const { open } = this.props

        return (
            <ThemeProvider theme={theme}>
            <Dialog
            open={open}
            maxWidth="sm"
            >
                <DialogTitle >Edit School Personnel</DialogTitle>
                { this.successMessage() }
                <DialogContent>
                    <DialogContentText>
                    To edit a School Personnel, make the changes and click submit.
                    </DialogContentText>
                    <br></br>

                    {/* First Name: */} 
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="firstName"
                        onChange={this.handleInput}
                        value={this.state.firstName}
                        type="text"
                        fullWidth
                        label="First Name"
                        error={!isEmpty(this.props.errors.firstName)}
                        helperText={this.props.errors.firstName}
                    />

                    {/* Last Name: */} 
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="lastName"
                        onChange={this.handleInput}
                        value={this.state.lastName}
                        type="text"
                        fullWidth
                        label="Last Name"
                        error={!isEmpty(this.props.errors.lastName)}
                        helperText={this.props.errors.lastName}
                    />

                    {/* Email: */} 
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="email"
                        onChange={this.handleInput}
                        value={this.state.email}
                        type="text"
                        fullWidth
                        label="Email"
                        error={!isEmpty(this.props.errors.email)}
                        helperText={this.props.errors.email}
                    />

                    {/* Password: */} 
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        label="Password"
                        name="password"
                        defaultValue='••••••••••'
                        onChange={this.handleInput}
                        type="password"
                        fullWidth
                        error={!isEmpty(this.props.errors.password)}
                        helperText={this.props.errors.password}
                    />

                     {/* Phone Number: */} 
                     <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="phoneNumber"
                        onChange={this.handleInput}
                        value={this.state.phoneNumber}
                        type="text"
                        fullWidth
                        label="Phone Number"
                        error={!isEmpty(this.props.errors.phoneNumber)}
                        helperText={this.props.errors.phoneNumber}
                    />

                     {/* Title: */} 
                     <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="title"
                        onChange={this.handleInput}
                        value={this.state.title}
                        type="text"
                        fullWidth
                        label="Title"
                        error={!isEmpty(this.props.errors.title)}
                        helperText={this.props.errors.title}
                    />

                      {/* School list: */}
                    <FormControl fullWidth error={this.props.errors.schoolCode}>
                        <InputLabel id="schoolCode">Associated School</InputLabel>
                        <Select
                        labelId="schoolCode"
                        name='schoolCode'
                        margin="dense"
                        style={{marginBottom : "15px"}}
                        onChange={this.handleInput}
                        value={this.state.schoolCode}
                        >
                            {this.props.schools.map( school => (
                                <MenuItem value={school.schoolCode}>{school.schoolCode} - {school.schoolName}</MenuItem>
                            ))}
                        </Select>
                        {<FormHelperText>{this.props.errors.schoolCode}</FormHelperText>}
                    </FormControl>

                    {/* isActive: */}
                    <FormControl fullWidth error={this.props.errors.isActive}>
                        <InputLabel id="isActive">Is Active</InputLabel>
                        <Select
                        labelId="isActive"
                        name='isActive'
                        margin="dense"
                        style={{marginBottom : "15px"}}
                        onChange={this.handleInput}
                        value={this.state.isActive}
                        >
                            <MenuItem value={true}>Yes</MenuItem>
                            <MenuItem value={false}>No</MenuItem>
                        </Select>
                        {<FormHelperText>{this.props.errors.isActive}</FormHelperText>}
                    </FormControl>

                    <br></br>   
                </DialogContent>
                <DialogActions>
                    <Button className={this.props.classes.bottomButtons} onClick={this.exitDialog} variant="contained" color="primary">Cancel</Button>
                    <Button className={this.props.classes.bottomButtons} onClick={this.editSchoolPersonnel}  variant="contained" color="primary">Update</Button>
                </DialogActions>
            </Dialog>
            </ThemeProvider>
        );
    }
}

EditSchoolPersonnelDialog.propTypes = {
    editSchoolPersonnel: PropTypes.func.isRequired,
    schools: PropTypes.array.isRequired,
    clearErrors: PropTypes.func.isRequired,
    clearSuccess: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    success: PropTypes.object.isRequired
  };

const mapStateToProps = state => ({
    errors: state.errors,
    schools: state.schoolData.schools,
    success: state.success
  });

export default connect (
    mapStateToProps,
    { editSchoolPersonnel, clearErrors, clearSuccess }  
)(withRouter(withStyles(useStyles)(EditSchoolPersonnelDialog)));