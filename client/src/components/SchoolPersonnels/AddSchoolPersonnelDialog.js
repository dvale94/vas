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
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import isEmpty from 'is-empty';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
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
            schoolCode: '',
            isActive: true, 
        }

        this.addSchoolPersonnel = this.addSchoolPersonnel.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.exitDialog = this.exitDialog.bind(this);
    }    

    addSchoolPersonnel() {
        //this.props.clearErrors();
        //this.props.clearSuccess();
        this.props.addSchoolPersonnel(this.state);
    }

    exitDialog() {
        //this.props.clearErrors();
        //this.props.clearSuccess();
        this.props.close();
    }

    handleInput = (e) =>{
        const value = e.target.value
        const name = e.target.name
    
        this.setState({
          [name]: value 
        })

        console.log(this.state)
    }

    /* successMessage() {
        if (!isEmpty(this.props.success.message)) {
            return <Alert severity="success">{this.props.success.message}</Alert> 
        }
    }
 */
   
    render() {

        const { open } = this.props

        return (
            <ThemeProvider theme={theme}>
            <Dialog
            open={open}
            maxWidth="sm"
            >
                <DialogTitle >Add School Personnel</DialogTitle>
             {/*    { this.successMessage() } */}
                <DialogContent>
                    <DialogContentText>
                    To add a School Personnel, fill out the following form and click submit.
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
                        //error={!isEmpty(this.props.errors.firstName)}
                        //helperText={this.props.errors.firstName}
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
                        //error={!isEmpty(this.props.errors.lastName)}
                        //helperText={this.props.errors.lastName}
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
                        //error={!isEmpty(this.props.errors.email)}
                        //helperText={this.props.errors.email}
                    />

                    {/* Password: */} 
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        label="Password"
                        name="Password"
                        placeholder='••••••••••'
                        onChange={this.handleInput}
                        type="password"
                        fullWidth
                        //error={!isEmpty(this.props.errors.password)}
                        //helperText={this.props.errors.password}
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
                        //error={!isEmpty(this.props.errors.phoneNumber)}
                        //helperText={this.props.errors.phoneNumber}
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
                        //error={!isEmpty(this.props.errors.title)}
                        //helperText={this.props.errors.title}
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
                        //error={!isEmpty(this.props.errors.schoolCode)}
                        //helperText={this.props.errors.schoolCode}
                    />

                    {/* isActive: */}
                    <FormControl fullWidth /* error={this.props.errors.isActive} */>
                        <InputLabel fullWidth id="isActive">Is Active</InputLabel>
                        <Select
                        labelId="isActive"
                        name='isActive'
                        margin="dense"
                        onChange={this.handleInput}
                        value={this.state.isActive}
                        fullWidth
                        >
                            <MenuItem value={true}>Yes</MenuItem>
                            <MenuItem value={false}>No</MenuItem>
                        </Select>
                        {<FormHelperText>{this.props.errors.isActive}</FormHelperText>}
                    </FormControl>
                   
                    <br></br>   
                </DialogContent>
                <DialogActions>
                    <Button className={this.props.classes.bottomButtons} onClick={this.addSchoolPersonnel}  variant="contained" color="primary">Add</Button>
                    <Button className={this.props.classes.bottomButtons} onClick={this.exitDialog} variant="contained" color="primary">Exit</Button>
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