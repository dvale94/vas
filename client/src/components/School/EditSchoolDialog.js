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
import { editSchool } from "../../actions/schoolActions";


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
            server: {}
        }

        this.editSchool = this.editSchool.bind(this);
        this.handleInput = this.handleInput.bind(this);
        
    }
    /* componentDidMount(){
        this.setState({
            schoolName: this.props.schoolName
        });
        console.log(this.state)
    } */

    editSchool() {

        let form = this.state
        delete form.server

        // check if any of the fields are empty, and remove them so it dosen't get sent to the server update
        for (let property in form) {
            if (isEmpty(form[property])) {
                delete form[property];
            }
        } 

        this.props.editSchool(this.props.school._id, form);

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

    updateInfo(school){
        this.schoolName= school.schoolName
    }

    render() {
        

        const { school, open, close} = this.props
        this.updateInfo(school);

        return (
            <ThemeProvider theme={theme}>
            <Dialog
            open={open}
            >
                <DialogTitle >Edit School</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    To edit a school, make the changes and click submit.
                    </DialogContentText>
                    <br></br>
                    School Name: 
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="schoolName"
                        placeholder={school.schoolName}
                        value={this.schoolName}
                        onChange={this.handleInput}
                        type="text"
                        fullWidth
                    />
                    School Code:
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="schoolCode"
                        //placeholder={school.schoolCode}
                        onChange={this.handleInput}
                        type="text"
                        fullWidth
                    />
                    Educational Level:
                    <Select
                    style={{marginBottom : "15px"}}
                    name='level'
                    //placeholder={school.level}
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
                        //placeholder={school.phoneNumber}
                        onChange={this.handleInput}
                        type="text"
                        fullWidth
                    />
                    Address:
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="address"
                        //placeholder={school.address}
                        onChange={this.handleInput}
                        type="text"
                        fullWidth
                    />
                    City:
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="city"
                        //placeholder={school.city}
                        onChange={this.handleInput}
                        type="text"
                        fullWidth
                    />  
                    State:
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="state"
                       // placeholder={school.state}
                        onChange={this.handleInput}
                        type="text"
                        fullWidth
                    />  
                    Zip Code:
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="zipCode"
                        //placeholder={school.zipCode}
                        onChange={this.handleInput}
                        type="text"
                        fullWidth 
                    />                    
                    Is Active: 
                    <Select
                    style={{marginBottom : "15px"}}
                    name='schoolStatus'
                    margin="dense"
                    //defaultValue={school.isActive}
                    onChange={this.handleInput}
                    fullWidth
                    >
                        <MenuItem value={true}>Yes</MenuItem>
                        <MenuItem value={false}>No</MenuItem>
                    </Select>
                    <br></br>   
                </DialogContent>
                <DialogActions>
                    <Button className={this.props.classes.bottomButtons} onClick={this.editSchool}  variant="contained" color="primary">Update</Button>
                    <Button className={this.props.classes.bottomButtons} onClick={close} variant="contained" color="primary">Cancel</Button>
                </DialogActions>
            </Dialog>
            </ThemeProvider>
        );
    }
}

EditSchoolDialog.propTypes = {
    editSchool: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
  };

const mapStateToProps = state => ({
    errors: state.errors
  });

export default connect (
    mapStateToProps,
    { editSchool }  
)(withRouter(withStyles(useStyles)(EditSchoolDialog)));