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
import { addSchool } from "../../actions/schoolActions";
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

class AddSchoolDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schoolName: '',
            schoolCode: '',
            level: '',
            phoneNumber: '',
            address: '',
            city: '',
            state: '',
            zipCode: '',
            isActive: true,
            server: {},
            error: true
        }

        this.addSchool = this.addSchool.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    componentDidUpdate(prevProps) {
        if(prevProps.schools.length != this.props.schools.length) {
            this.props.close();
        }
    }

    addSchool() {
        this.props.clearErrors();
        this.props.addSchool(this.state);
        //this.props.close()
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
        return ( <Alert severity="error">{error}</Alert> )
        /* return (
          <div style={{color: "red"}}>
              {error}
            </div>
        ) */
    };

    render() {

        const {open, close} = this.props

        return (
            <ThemeProvider theme={theme}>
            <Dialog
            open={open}
            maxWidth="sm"
            >
                <DialogTitle >Add School</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    To add a school, fill out the following form and click submit.
                    </DialogContentText>
                    <br></br>

                    {/* School Name: */} 
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="schoolName"
                        onChange={this.handleInput}
                        type="text"
                        fullWidth
                        label="School Name"
                        error={this.props.errors.schoolName}
                        helperText={this.props.errors.schoolName}
                    />

                    {/* School Code: */}
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="schoolCode"
                        onChange={this.handleInput}
                        type="text"
                        fullWidth
                        label="School Code"
                        error={this.props.errors.schoolCode}
                        helperText={this.props.errors.schoolCode}
                    />

                    {/* Educational Level: */}
                    <FormControl fullWidth error={this.props.errors.level}>
                        <InputLabel fullWidth id="level">Educational Level</InputLabel>
                        <Select
                        labelId="level"
                        name='level'
                        margin="dense"
                        onChange={this.handleInput}
                        fullWidth
                        >
                            <MenuItem value={"Elementary School"}>Elementary School</MenuItem>
                            <MenuItem value={"Middle School"}>Middle School</MenuItem>
                            <MenuItem value={"High School"}>High School</MenuItem>
                            <MenuItem value={"K-8"}>K-8</MenuItem>
                        </Select>
                        <FormHelperText>{this.props.errors.level}</FormHelperText>
                    </FormControl>

                    {/* Phone Number: */}
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="phoneNumber"
                        onChange={this.handleInput}
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
                        type="text"
                        fullWidth
                        label="Zip Code"
                        error={this.props.errors.zipCode}
                        helperText={this.props.errors.zipCode}
                    />

                    <br></br>
                </DialogContent>
                <DialogActions>
                    <Button className={this.props.classes.bottomButtons} onClick={this.addSchool}  variant="contained" color="primary">Add</Button>
                    <Button className={this.props.classes.bottomButtons} onClick={this.props.clearErrors, close} variant="contained" color="primary">Cancel</Button>
                </DialogActions>
            </Dialog>
            </ThemeProvider>
        );
    }
}

AddSchoolDialog.propTypes = {
    addSchool: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
  };

const mapStateToProps = state => ({
    errors: state.errors,
    schools: state.schoolData.schools
  });

export default connect (
    mapStateToProps,
    { addSchool, clearErrors }  
)(withRouter(withStyles(useStyles)(AddSchoolDialog)));