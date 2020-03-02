import React, { Component, useState } from 'react';
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
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';



import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';

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
    days: {
        //color: "yellow",
        justify: "center",
        alignItems: "center"
    },
    chip: {
        margin: 2,
      },
};

class AddTeamDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            semester: '',
            year: '',
            schoolCode: '',
            dayOfWeek: {
                monday: false,
                tuesday: false,
                wednesday: false,
                thursday: false,
                friday: false
            },
            startTime: '',
            endTime: '',
            volunteerPIs: [],
            isActive: true,
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
        }

        this.addTeam = this.addTeam.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.exitDialog = this.exitDialog.bind(this);
        
    }


    addTeam() {
        this.props.clearErrors();
        this.props.clearSuccess();

        const form = this.state;
        console.log("SUMBITTING THIS: ", form)
        this.props.addTeam(form);
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
    

    handleChange = (e) => {
        const name = e.target.name
        
        this.setState({
            [name]: !this.state[name]
        })

        this.setState({
            dayOfWeek:{
            ...this.state.dayOfWeek, [name]: !this.state[name]
            }
        })
        console.log(this.state.dayOfWeek)
    }

    //TESTING
    handleChange1 = (e) => {
        console.log(e)
        const options = e.target;
        const value = [];
        //this.state.volunteerPIs.push(options.value);

        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
              value.push(options[i].value);
            }
            //value.push(options[i].value);
          }

        this.setState({
            volunteerPIs: value
        })
        console.log(this.state.volunteerPIs)
    }
    //TESTING
    handleChange2 = (event, key, values) => {
        this.setState({ volunteerPIs: values });
      };
      selectionRenderer = values => {
        // change the default comma separated rendering
        return (
          <span style={{ color: "#ff4081" }}>
            {values.join("; ")}
          </span>
        );
      };
      menuItems(values) {
        return this.props.volunteers.map(name => (
          <MenuItem
            key={name}
            insetChildren={true}
            //checked={values.includes(name)}
            value={name}
            primaryText={name}
          />
        ));
      }

    
    successMessage() {
        if (!isEmpty(this.props.success.message)) {
            return <Alert severity="success">{this.props.success.message}</Alert> 
        }
    }
    
    

    render() {

        const { open } = this.props;
        /* const { values } = this.state.volunteerPIs;
        const floatingLabelText = "Names" +
      (values.length > 1 ? ` (${values.length})` : "");
        
 */
        
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
                    <div className={this.props.classes.days}>
                    <FormControl component="fieldset" error={this.props.errors.dayOfWeek}>
                        <FormLabel component="legend">Days of the week</FormLabel>
                        <FormGroup aria-label="position" row>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                    name="monday"
                                    value={this.state.monday}
                                    onChange={this.handleChange} 
                                    color="primary" />
                                }
                                label="Monday"
                                labelPlacement="bottom"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                    name="tuesday"
                                    value={this.state.tuesday}
                                    onChange={this.handleChange} 
                                    color="primary" />
                                }
                                label="Tuesday"
                                labelPlacement="bottom"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                    name="wednesday"
                                    value={this.state.tuesday}
                                    onChange={this.handleChange} 
                                    color="primary" />
                                }
                                label="Wednesday"
                                labelPlacement="bottom"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                    name="thursday"
                                    value={this.state.tuesday}
                                    onChange={this.handleChange} 
                                    color="primary" />
                                }
                                label="Thursday"
                                labelPlacement="bottom"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                    name="friday"
                                    value={this.state.tuesday}
                                    onChange={this.handleChange} 
                                    color="primary" />
                                }
                                label="Friday"
                                labelPlacement="bottom"
                            />
                             </FormGroup>
                             </FormControl>
                             </div>{<FormHelperText style={{marginBottom : "15px"}}>{this.props.errors.dayOfWeek}</FormHelperText>}

                    {/* Start Time: */}
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="startTime"
                        onChange={this.handleInput}
                        type="time"
                        defaultValue="10:00"
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
                        type="time"
                        defaultValue="11:00"
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

                    
                    {/* <FormControl fullWidth error={this.props.errors.volunteerPIs} >
                        <InputLabel id="volunteerPIs">Volunteers</InputLabel>
                        <Select
                        labelId="volunteerPIs"
                        //name="volunteerPIs"
                        multiple
                        value ={this.state.volunteerPIs}
                        onChange={this.handleChange1}
                        input={<Input />}
                        renderValue={selected => {
                            if (selected.length === 0) {
                            return <em>Placeholder</em>;
                            }

                            return selected.join(', ');
                        }}
                        
                        input={<Input id="select-multiple-chip" />}
                        renderValue={selected => (
                            <div className={this.props.classes.chips}>
                              {selected.map(value => (
                                <Chip key={value.pantherID} value={value.pantherID} className={this.props.classes.chip} />
                              ))}
                            </div>
                          )}
                        //MenuProps={MenuProps}
                        > */}
                           {/*  <MenuItem  disabled value="">
                                <em>Volunteers</em>
                            </MenuItem>
                            {this.props.volunteers.map(name => (
                                <MenuItem key={name.pantherID} value={name.pantherID}>
                                {name.pantherID}
                                </MenuItem>
                            ))} */}
                            {/* {this.props.volunteers.map(volunteer => (
                            <MenuItem key={volunteer.pantherID} value={volunteer.pantherID}>
                            {volunteer.pantherID}
                            </MenuItem>
                        ))} */}
                         {/* {this.props.volunteers.map(name => (
                            <option key={name.pantherID} value={name.pantherID}>
                            {name.pantherID}
                            </option>
                        ))} */}
                        
                       {/*  </Select>
                        {<FormHelperText style={{marginBottom : "15px"}}>{this.props.errors.volunteerPIs}</FormHelperText>}
                </FormControl>
                <Select
                    multiple
                    floatingLabelText={floatingLabelText}
                    value={this.state.volunteers}
                    onChange={this.handleChange2}
                    selectionRenderer={this.selectionRenderer}
                >
                    {this.menuItems(values)}
                </Select> */}


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


