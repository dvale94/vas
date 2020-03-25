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
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { clearErrors } from '../../actions/server/errorActions'
import { addAdmin } from "../../actions/adminActions";
import { clearSuccess } from '../../actions/server/successActions'
import Alert from '@material-ui/lab/Alert';

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

class AddAdminDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            phoneNumber: '',
            major: '',
            isActive: true,
            carAvailable: false,
            volunteerStatus: true,
            MDCPS_ID: '',
            pantherID: ''
        }

        this.addAdmin = this.addAdmin.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.exitDialog = this.exitDialog.bind(this);
    }    


    addAdmin() {
        this.props.clearErrors();
        this.props.clearSuccess();
        this.props.addAdmin(this.state)
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
        this.props.clearSuccess();
        this.props.close();
    }

    successMessage() {
        if (!isEmpty(this.props.success.message)) {
            return <Alert severity="success">{this.props.success.message}</Alert> 
        }
    }

    render() {

        const {open} = this.props

        return (
            <ThemeProvider theme={theme}>
            <Dialog
            open={open}
            >
                <DialogTitle >Add Admin</DialogTitle>
                { this.successMessage() }
                <DialogContent>
                    <DialogContentText>
                    To add an administrator, fill out the following form and click submit.
                    </DialogContentText>
                    <br></br>
                    <TextField 
                        label="First Name"
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="firstName"
                        onChange={this.handleInput}
                        type="text"
                        fullWidth
                        error={!isEmpty(this.props.errors.firstName)}
                        helperText={this.props.errors.firstName}
                    />
                    
                    <TextField
                        label="Last Name"
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="lastName"
                        onChange={this.handleInput}
                        type="text"
                        fullWidth
                        error={!isEmpty(this.props.errors.lastName)}
                        helperText={this.props.errors.lastName}
                    />
                    
                    <TextField 
                        label="Email"
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="email"
                        onChange={this.handleInput}
                        type="text"
                        fullWidth
                        error={!isEmpty(this.props.errors.email)}
                        helperText={this.props.errors.email}
                    />
                    
                    <TextField 
                        label="Password"
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="password"
                        onChange={this.handleInput}
                        type="password"
                        fullWidth
                        error={!isEmpty(this.props.errors.password)}
                        helperText={this.props.errors.password}
                    />
                   
                    <TextField 
                        label="Phone Number"
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="phoneNumber"
                        onChange={this.handleInput}
                        type="text"
                        fullWidth
                        error={!isEmpty(this.props.errors.phoneNumber)}
                        helperText={this.props.errors.phoneNumber}
                    />
                    
                    
                    <br></br>   
                </DialogContent>
                <DialogActions>
                    <Button className={this.props.classes.bottomButtons} onClick={this.exitDialog} variant="contained" color="primary">Cancel</Button>
                    <Button className={this.props.classes.bottomButtons} onClick={this.addAdmin}  variant="contained" color="primary">Add</Button>
                </DialogActions>
            </Dialog>
            </ThemeProvider>
        );
    }
}

AddAdminDialog.propTypes = {
    addAdmin: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    clearSuccess: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    success: PropTypes.object.isRequired
  };

const mapStateToProps = state => ({
    errors: state.errors,
    success: state.success
  });

export default connect (
    mapStateToProps,
    { addAdmin, clearErrors, clearSuccess }  
)(withRouter(withStyles(useStyles)(AddAdminDialog)));