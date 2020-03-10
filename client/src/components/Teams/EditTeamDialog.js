import React, { Component, Fragment } from 'react';
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
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import VolunteerPreview from './volunteerPreview'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Popover from '@material-ui/core/Popover';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import { Grid } from '@material-ui/core';


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
        display: 'flex',
        justify: "center",
        alignItems: "center"
    },
    chip: {
        margin: 3,
        color: "white",
        fontSize: 15,
        fontWeight: 500
      },
      list:{
          width: '50'
      },
      root: {
        flexGrow: 1,
      }
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
            startTime: '10:00',
            endTime: '11:00',
            volunteerPIs: [],
            isActive: true,
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            openPreview: false
        }

        this.addTeam = this.addTeam.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.exitDialog = this.exitDialog.bind(this);
        this.toggleVolunteerPreview = this.toggleVolunteerPreview.bind(this);
    }

    componentDidMount() {
        this.setState({
            semester: this.props.team.semester,
            year: this.props.team.year,
            schoolCode: this.props.team.schoolCode,
            startTime: this.props.team.startTime,
            endTime: this.props.team.endTime,
            dayOfWeek: this.props.team.dayOfWeek,
            volunteerPIs: this.props.team.volunteerPIs,
            monday: this.props.team.dayOfWeek.monday,
            tuesday: this.props.team.dayOfWeek.tuesday,
            wednesday: this.props.team.dayOfWeek.wednesday,
            thursday: this.props.team.dayOfWeek.thursday,
            friday: this.props.team.dayOfWeek.friday,
            
        })
    }

    toggleVolunteerPreview() {
        this.setState(prevState => ({
            openPreview: !prevState.openPreview
        }));
        console.log(this.state.openPreview)
    }

    addTeam() {
        this.props.clearErrors();
        this.props.clearSuccess();

        console.log("SUMBITTING THIS: ", this.state)
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

    handleInput_Volunteer = (e) =>{
        
        const value = e.target.value.map(item => item.pantherID)
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

    renderVolunteers() {
        return (this.props.volunteers.map( volunteer => (
            <MenuItem value={volunteer}>
            {/* <ListItem key= {volunteer} value={volunteer} > */}
            <Checkbox color= "primary" checked={this.state.volunteerPIs.includes(volunteer.pantherID)}/>
            <ListItemText primary={volunteer.firstName + " " + volunteer.lastName + " - " + volunteer.pantherID} />
            {/* <IconButton edge="end" aria-label="comments" onClick={()=>this.toggleVolunteerPreview()}>
            {console.log("THIS VOLUNTEER: ", volunteer)}
            <InfoOutlinedIcon />
            <VolunteerPreview open={this.state.openPreview} close={this.toggleVolunteerPreview} info={volunteer}/>
            </IconButton> */}
            {/* </ListItem> */}
            </MenuItem>

            
        )))
    }
    


    successMessage() {
        if (!isEmpty(this.props.success.message)) {
            return <Alert severity="success">{this.props.success.message}</Alert> 
        }
    }
    
    render() {

        const { open } = this.props;
        let arr = [];
        return (
            <ThemeProvider theme={theme}>
            <Dialog
            open={open}
            maxWidth="sm"
            >
                <DialogTitle >Edit Team</DialogTitle>
                { this.successMessage() }
                <DialogContent>
                    <DialogContentText>
                    To edit a team, modify the following form and click UPDATE.
                    </DialogContentText>
                    <br></br>

                    <div className={this.props.classes.root}>
                    <Grid container wrap="nowrap" spacing={5} justify="center">
                        <Grid item xs={12} sm={6}>
                            {/* Semester: */}
                            <FormControl fullWidth error={this.props.errors.semester}>
                                <InputLabel id="semester">Semester</InputLabel>
                                <Select
                                fullWidth
                                labelId="semester"
                                name='semester'
                                margin="dense"
                                defaultValue={this.state.semester}
                                onChange={this.handleInput}
                                >
                                    <MenuItem value={"Spring"}>Spring</MenuItem>
                                    <MenuItem value={"Fall"}>Fall</MenuItem>
                                </Select>
                                {<FormHelperText style={{marginBottom : "15px"}}>{this.props.errors.semester}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                             {/* Year: */}
                            <FormControl fullWidth error={this.props.errors.year}>
                                <InputLabel id="year">Year</InputLabel>
                                <Select
                                fullWidth
                                labelId="year"
                                name='year'
                                margin="dense"
                                defaultValue={this.state.year}
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
                        </Grid>  
                    </Grid>
                    </div>

                    {/* Semester: */}
                    {/* <FormControl error={this.props.errors.semester}>
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
                    </FormControl> */}

                    {/* Year: */}
                   {/*  <FormControl error={this.props.errors.year}>
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
                    </FormControl> */}

                    {/* School list: */}
                    <FormControl fullWidth error={this.props.errors.schoolCode}>
                        <InputLabel id="schoolCode">Associated School</InputLabel>
                        <Select
                        labelId="schoolCode"
                        name='schoolCode'
                        margin="dense"
                        defaultValue={this.state.schoolCode}
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
                                    defaultChecked={this.state.monday}
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
                                    defaultChecked={this.state.tuesday}
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
                                    value={this.state.wednesday}
                                    defaultChecked={this.state.wednesday}
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
                                    value={this.state.thursday}
                                    defaultChecked={this.state.thursday}
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
                                    value={this.state.friday}
                                    defaultChecked={this.state.friday}
                                    onChange={this.handleChange} 
                                    color="primary" />
                                }
                                label="Friday"
                                labelPlacement="bottom"
                            />
                             </FormGroup>
                             <FormHelperText style={{marginBottom : "15px"}}>{this.props.errors.dayOfWeek}</FormHelperText>
                             </FormControl>
                             </div>

                    {/* Start Time: */}
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="startTime"
                        onChange={this.handleInput}
                        type="time"
                        value={this.state.startTime}
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
                        value={this.state.endTime}
                        fullWidth
                        label="End Time"
                        error={this.props.errors.endTime}
                        helperText={this.props.errors.endTime}
                    />

                     {/* Volunteer list: */}
                     <FormControl fullWidth style={{marginBottom : "15px"}} margin='dense' error={this.props.errors.volunteerPIs}>
                        <InputLabel id="volunteers">Volunteer(s)</InputLabel>
                        <Select
                            multiple
                            labelId='volunteers'
                            name='volunteerPIs'
                            onChange={this.handleInput_Volunteer}
                            defaultValue={this.state.volunteerPIs}
                            input={<Input id="select-multiple-chip" />}
                            renderValue={selected => (
                                <div className={this.props.classes.chips}>
                                  {selected.map( value => {
                                     return <Chip color="primary" key={value.pantherID} label={value.firstName + " " + value.lastName} className={this.props.classes.chip} />
                                  })}
                                </div>
                            )}
                        >

                        {/* List of volunteers */}
                         {this.renderVolunteers()}   


                           {/*  {this.props.volunteers.map( volunteer => (
                                //<MenuItem value={volunteer}>
                                <ListItem key= {volunteer} value={volunteer} >
                                <Checkbox color= "primary" checked={this.state.volunteerPIs.includes(volunteer.pantherID)}/>
                                <ListItemText primary={volunteer.firstName + " " + volunteer.lastName + " - " + volunteer.pantherID} />
                                <IconButton key={volunteer} edge="end" aria-label="comments" onClick={()=>this.toggleVolunteerPreview()}>
                                {console.log(volunteer)}
                                <InfoOutlinedIcon />
                                <VolunteerPreview key={volunteer} open={this.state.openPreview} close={this.toggleVolunteerPreview} info={volunteer}/>
                                </IconButton>
                                </ListItem>
                                //</MenuItem>

                                
                            ))} */}





                            {/* {this.openVolunteerCard("hello")} */}
                            {/* {this.popover("Hellooooo")} */}
                            {/* <Popover
                                id="mouse-over-popover"
                                open={open1}
                                onClose={this.handlePopoverClose}
                                >
                                    <Typography className={this.props.classes.typography}>Content </Typography>

                            </Popover>
                                         */}            
                            
                            
                        </Select>
                        <FormHelperText style={{marginBottom : "15px"}}>{this.props.errors.volunteerPIs}</FormHelperText>
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


