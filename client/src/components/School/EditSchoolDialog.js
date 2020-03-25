import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import isEmpty from 'is-empty';
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
import { clearSuccess } from '../../actions/server/successActions'
import { editSchool } from "../../actions/schoolActions";
import Alert from '@material-ui/lab/Alert';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';


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

class EditSchoolDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {}

        this.editSchool = this.editSchool.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.exitDialog = this.exitDialog.bind(this);
        
    }
    componentDidMount(){
        this.setState({
            schoolName: this.props.school.schoolName,
            schoolCode: this.props.school.schoolCode,
            level: this.props.school.level,
            phoneNumber: this.props.school.phoneNumber,
            address: this.props.school.address,
            city: this.props.school.city,
            state: this.props.school.state,
            zipCode:this.props.school.zipCode,
            isActive: this.props.school.isActive,
        });
        console.log(this.state)
    }

    editSchool() {
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

        this.props.editSchool(this.props.school._id, form);

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
            >
                <DialogTitle >Edit School</DialogTitle>
                { this.successMessage() }
                <DialogContent>
                    <DialogContentText>
                    To edit a school, make the changes and click submit.
                    </DialogContentText>
                    <br></br>

                    {/* School Name: */} 
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="schoolName"
                        onChange={this.handleInput}
                        value={this.state.schoolName}
                        type="text"
                        fullWidth
                        label="School Name"
                        error={!isEmpty(this.props.errors.schoolName)}
                        helperText={this.props.errors.schoolName}
                    />

                     {/* School Code: */}
                     <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="schoolCode"
                        onChange={this.handleInput}
                        value={this.state.schoolCode}
                        type="text"
                        fullWidth
                        label="School Code"
                        error={this.props.errors.schoolCode}
                        helperText={this.props.errors.schoolCode}
                    />

                    {/* Educational Level: */}
                    <FormControl fullWidth error={this.props.errors.level}>
                        <InputLabel id="level">Educational Level</InputLabel>
                        <Select
                        labelId="level"
                        name='level'
                        margin="dense"
                        onChange={this.handleInput}
                        value={this.state.level}
                        >
                            <MenuItem value={"Elementary School"}>Elementary School</MenuItem>
                            <MenuItem value={"Middle School"}>Middle School</MenuItem>
                            <MenuItem value={"High School"}>High School</MenuItem>
                            <MenuItem value={"K-8"}>K-8</MenuItem>
                        </Select>
                        {<FormHelperText>{this.props.errors.level}</FormHelperText>}
                    </FormControl>

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
                        error={this.props.errors.phoneNumber}
                        helperText={this.props.errors.phoneNumber}
                    />

                     {/* Address: */}
                     <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="address"
                        onChange={this.handleInput}
                        value={this.state.address}
                        type="text"
                        fullWidth
                        label="Address"
                        error={this.props.errors.address}
                        helperText={this.props.errors.address}
                    />

                    {/* City: */}
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="city"
                        onChange={this.handleInput}
                        value={this.state.city}
                        type="text"
                        fullWidth
                        label="City"
                        error={this.props.errors.city}
                        helperText={this.props.errors.city}
                    /> 

                   {/*  State: */}
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="state"
                        onChange={this.handleInput}
                        value={this.state.state}
                        type="text"
                        fullWidth
                        label="State"
                        error={this.props.errors.state}
                        helperText={this.props.errors.state}
                    /> 

                    {/* Zip Code: */}
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="zipCode"
                        onChange={this.handleInput}
                        value={this.state.zipCode}
                        type="text"
                        fullWidth
                        label="Zip Code"
                        error={this.props.errors.zipCode}
                        helperText={this.props.errors.zipCode}
                    />  

                    {/* isActive: */}
                    <FormControl fullWidth error={this.props.errors.isActive}>
                        <InputLabel id="isActive">Is Active</InputLabel>
                        <Select
                        labelId="isActive"
                        name='isActive'
                        margin="dense"
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
                    <Button className={this.props.classes.bottomButtons} onClick={this.editSchool}  variant="contained" color="primary">Update</Button>
                </DialogActions>
            </Dialog>
            </ThemeProvider>
        );
    }
}

EditSchoolDialog.propTypes = {
    editSchool: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    clearSuccess: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    success: PropTypes.object.isRequired
  };

const mapStateToProps = state => ({
    errors: state.errors,
    success: state.success,
  });

export default connect (
    mapStateToProps,
    { editSchool, clearErrors, clearSuccess }  
)(withRouter(withStyles(useStyles)(EditSchoolDialog)));