import React, { Component } from 'react';
import isEmpty from 'is-empty';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
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
import { editAdmin } from "../../actions/adminActions";
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

class EditAdminDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {}

        this.editAdmin = this.editAdmin.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.exitDialog = this.exitDialog.bind(this);
    }    

    componentDidMount() {
        this.setState({
            firstName: this.props.admin.firstName,
            lastName: this.props.admin.lastName,
            email: this.props.admin.email,
            password: '',
            phoneNumber: this.props.admin.phoneNumber,
            isActive: this.props.admin.isActive,
            prevEmail: this.props.admin.email,
        })
    }


    editAdmin() {
        this.props.clearErrors();
        this.props.clearSuccess();

        let form = this.state

        // check if any of the fields are empty, and remove them so it dosen't get sent to the server update
        for (let property in form) {
            if (isEmpty(form[property])) {
                delete form[property];
            }
        } 

        this.props.editAdmin(this.props.admin._id, form);
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
                <DialogTitle >Edit Admin</DialogTitle>
                {this.successMessage()}
                <DialogContent>
                    <DialogContentText>
                    To edit an administrator, make the changes and click submit.
                    </DialogContentText>
                    <br></br>
                    <TextField 
                        label="First Name"
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="firstName"
                        defaultValue={this.state.firstName}
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
                        defaultValue={this.state.lastName}
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
                        defaultValue={this.state.email}
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
                        defaultValue='••••••••••'
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
                        defaultValue={this.state.phoneNumber}
                        onChange={this.handleInput}
                        type="text"
                        fullWidth
                        error={!isEmpty(this.props.errors.phoneNumber)}
                        helperText={this.props.errors.phoneNumber}
                    />

                    <FormControl fullWidth style={{marginBottom : "15px"}} margin='dense'>
                        <InputLabel id="is-active">Is Active</InputLabel>
                        <Select
                            labelId='is-active'
                            name='isActive'
                            onChange={this.handleInput}
                            value={this.state.isActive}
                        >
                            <MenuItem  value={true}>Yes</MenuItem >
                            <MenuItem  value={false}>No</MenuItem >
                        </Select>
                    </FormControl>

                    <br></br>   
                </DialogContent>
                <DialogActions>
                    <Button className={this.props.classes.bottomButtons} onClick={this.exitDialog} variant="contained" color="primary">Cancel</Button>
                    <Button className={this.props.classes.bottomButtons} onClick={this.editAdmin}  variant="contained" color="primary">Update</Button>
                </DialogActions>
            </Dialog>
            </ThemeProvider>
        );
    }
}

EditAdminDialog.propTypes = {
    editAdmin: PropTypes.func.isRequired,
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
    { editAdmin, clearErrors, clearSuccess }  
)(withRouter(withStyles(useStyles)(EditAdminDialog)));