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
import { addSchool } from "../../actions/schoolActions";


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
            city: false,
            state: true,
            zipCode: '',
            isActive: true,
            server: {}
        }

        this.addSchool = this.addSchool.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }    

    addSchool() {
        this.props.addSchool(this.state);
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
            <ThemeProvider theme={theme}>
            <Dialog
            open={open}
            >
                <DialogTitle >Add School</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    To add a school, fill out the following form and click submit.
                    </DialogContentText>
                    <br></br>
                    School Name: 
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="schoolName"
                        onChange={this.handleInput}
                        type="text"
                        fullWidth
                    />
                    School Code:
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="schoolCode"
                        onChange={this.handleInput}
                        type="text"
                        fullWidth
                    />
                    Educational Level:
                    <Select
                    style={{marginBottom : "15px"}}
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
                    Phone Number:
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="phoneNumber"
                        onChange={this.handleInput}
                        type="text"
                        fullWidth
                    />
                    Address:
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="address"
                        onChange={this.handleInput}
                        type="text"
                        fullWidth
                    />
                    City:
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="city"
                        onChange={this.handleInput}
                        type="text"
                        fullWidth
                    />  
                    State:
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="state"
                        onChange={this.handleInput}
                        type="text"
                        fullWidth
                    />  
                    Zip Code:
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="zipCode"
                        onChange={this.handleInput}
                        type="text"
                        fullWidth 
                    />                    
                    Is Active: 
                    <Select
                    style={{marginBottom : "15px"}}
                    name='schoolStatus'
                    margin="dense"
                    onChange={this.handleInput}
                    fullWidth
                    >
                        <MenuItem value={true}>Yes</MenuItem>
                        <MenuItem value={false}>No</MenuItem>
                    </Select>
                    <br></br>   
                </DialogContent>
                <DialogActions>
                    <Button className={this.props.classes.bottomButtons} onClick={this.addSchool}  variant="contained" color="primary">Submit</Button>
                    <Button className={this.props.classes.bottomButtons} onClick={close} variant="contained" color="primary">Cancel</Button>
                </DialogActions>
            </Dialog>
            </ThemeProvider>
        );
    }
}

AddSchoolDialog.propTypes = {
    addSchool: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
  };

const mapStateToProps = state => ({
    errors: state.errors
  });

export default connect (
    mapStateToProps,
    { addSchool }  
)(withRouter(withStyles(useStyles)(AddSchoolDialog)));