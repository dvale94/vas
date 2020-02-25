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
import { clearErrors } from '../../actions/server/errorActions'
import { clearSuccess } from '../../actions/server/successActions'
import { addTeam } from "../../actions/teamActions";
import Alert from '@material-ui/lab/Alert';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import isEmpty from 'is-empty';
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

class AddTeamDialog extends Component {
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
        }

        this.addTeam = this.addTeam.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.exitDialog = this.exitDialog.bind(this);
    }


    addTeam() {
        this.props.clearErrors();
        this.props.clearSuccess();
        this.props.addTeam(this.state);
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

        console.log(this.state)
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
                <DialogTitle >Create Team</DialogTitle>
                { this.successMessage() }
                <DialogContent>
                    <DialogContentText>
                    To create a team, fill out the following form and click CREATE.
                    </DialogContentText>
                    <br></br>

                    {/* Semester: */}
                    <FormControl error={this.props.errors.semester}>
                        <InputLabel id="semester">Semester</InputLabel>
                        <Select
                        style={{width: "210px", marginRight: "50px"}}
                        labelId="semester"
                        name='semester'
                        margin="dense"
                        onChange={this.handleInput}
                        >
                            <MenuItem value={"Spring"}>Spring</MenuItem>
                            <MenuItem value={"Fall"}>Fall</MenuItem>
                        </Select>
                        {<FormHelperText style={{marginBottom : "15px"}}>{this.props.errors.semester}</FormHelperText>}
                    </FormControl>

                    {/* Year: */}
                    <FormControl error={this.props.errors.year}>
                        <InputLabel id="year">Year</InputLabel>
                        <Select
                        style={{width: "210px", marginRight: "50px"}}
                        labelId="year"
                        name='year'
                        margin="dense"
                        onChange={this.handleInput}
                        >
                            <MenuItem value={"2020"}>2020</MenuItem>
                            <MenuItem value={"2021"}>2021</MenuItem>
                            <MenuItem value={"2022"}>2022</MenuItem>
                            <MenuItem value={"2023"}>2023</MenuItem>
                            <MenuItem value={"2024"}>2024</MenuItem>
                            <MenuItem value={"2025"}>2025</MenuItem>
                            <MenuItem value={"2026"}>2026</MenuItem>
                            <MenuItem value={"2027"}>2027</MenuItem>
                            <MenuItem value={"2028"}>2028</MenuItem>
                            <MenuItem value={"2029"}>2029</MenuItem>
                            <MenuItem value={"2030"}>2030</MenuItem>
                        </Select>
                        {<FormHelperText style={{marginBottom : "15px"}}>{this.props.errors.year}</FormHelperText>}
                    </FormControl>

                    {/* School list: */}
                    <FormControl fullWidth error={this.props.errors.schoolCode}>
                        <InputLabel id="schoolCode">Associated School</InputLabel>
                        <Select
                        labelId="schoolCode"
                        name='schoolCode'
                        margin="dense"
                        onChange={this.handleInput}
                        >
                            {this.props.schools.map( school => (
                                <MenuItem value={school.schoolCode}>{school.schoolCode} - {school.schoolName}</MenuItem>
                            ))}
                        </Select>
                        {<FormHelperText style={{marginBottom : "15px"}}>{this.props.errors.schoolCode}</FormHelperText>}
                    </FormControl>

                    {/* Day of the week: */}
                    <FormControl fullWidth error={this.props.errors.dayOfWeek}>
                        <InputLabel id="dayOfWeek">Days of the week</InputLabel>
                        <Select
                        labelId="dayOfWeek"
                        name='dayOfWeek'
                        margin="dense"
                        onChange={this.handleInput}
                        >
                            <MenuItem value={"Monday"}>Monday</MenuItem>
                            <MenuItem value={"Tuesday"}>Tuesday</MenuItem>
                            <MenuItem value={"Wednesday"}>Wednesday</MenuItem>
                            <MenuItem value={"Thursday"}>Thursday</MenuItem>
                            <MenuItem value={"Friday"}>Friday</MenuItem>
                        </Select>
                        {<FormHelperText style={{marginBottom : "15px"}}>{this.props.errors.dayOfWeek}</FormHelperText>}
                    </FormControl>

                    {/* Start Time: */}
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="startTime"
                        onChange={this.handleInput}
                        type="text"
                        fullWidth
                        label="Start Time"
                        error={this.props.errors.startTime}
                        helperText={this.props.errors.startTime}
                    />

                    {/* End Time: */}
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="endTime"
                        onChange={this.handleInput}
                        type="text"
                        fullWidth
                        label="End Time"
                        error={this.props.errors.endTime}
                        helperText={this.props.errors.endTime}
                    />

                    {/* Volunteer list: */}
                    <FormControl fullWidth error={this.props.errors.volunteerPIs}>
                        <InputLabel id="volunteerPIs">Volunteers</InputLabel>
                        <Select
                        labelId="volunteerPIs"
                        name='volunteerPIs'
                        margin="dense"
                        onChange={this.handleInput}
                        >
                            {this.props.volunteers.map( volunteer => (
                                <MenuItem value={volunteer.pantherID}>{volunteer.firstName} {volunteer.lastName} - {volunteer.pantherID}</MenuItem>
                            ))}
                        </Select>
                        {<FormHelperText style={{marginBottom : "15px"}}>{this.props.errors.volunteerPIs}</FormHelperText>}
                    </FormControl>

                    <br></br>
                </DialogContent>
                <DialogActions>
                    <Button className={this.props.classes.bottomButtons} onClick={this.addTeam}  variant="contained" color="primary">Create</Button>
                    <Button className={this.props.classes.bottomButtons} onClick={this.exitDialog} variant="contained" color="primary">Exit</Button>
                </DialogActions>
            </Dialog>
            </ThemeProvider>
        );
    }
}

AddTeamDialog.propTypes = {
    addTeams: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    clearSuccess: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    success: PropTypes.object.isRequired
  };

const mapStateToProps = state => ({
    errors: state.errors,
    success: state.success,
    teams: state.teamData.teams,
    schools: state.schoolData.schools,
    volunteers: state.volunteers.volunteers
  });

export default connect (
    mapStateToProps,
    { addTeam, clearErrors, clearSuccess}
)(withRouter(withStyles(useStyles)(AddTeamDialog)));