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
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { addSchoolPersonnel } from "../../actions/schoolPersonnelActions";

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

class AddSchoolPersonnelDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            phoneNumber: '',
            title: '',
            schoolID: '',
            server: {}
        }

        this.addSchoolPersonnel = this.addSchoolPersonnel.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }    

    addSchoolPersonnel() {
        this.props.addSchoolPersonnel(this.state);

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
                <DialogTitle >Add School Personnel</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    To add a School Personnel, fill out the following form and click submit.
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
                    Title:
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="title"
                        onChange={this.handleInput}
                        type="text"
                        fullWidth
                    />
                    School ID: 
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="schoolID"
                        onChange={this.handleInput}
                        type="text"
                        fullWidth
                    />
                    <br></br>   
                </DialogContent>
                <DialogActions>
                    <Button className={this.props.classes.bottomButtons} onClick={this.addSchoolPersonnel}  variant="contained" color="primary">Add</Button>
                    <Button className={this.props.classes.bottomButtons} onClick={close} variant="contained" color="primary">Cancel</Button>
                </DialogActions>
            </Dialog>
            </ThemeProvider>
        );
    }
}

AddSchoolPersonnelDialog.propTypes = {
    addSchoolPersonnel: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
  };

const mapStateToProps = state => ({
    errors: state.errors
  });

export default connect (
    mapStateToProps,
    { addSchoolPersonnel }  
)(withRouter(withStyles(useStyles)(AddSchoolPersonnelDialog)));