// This component is the equivalent to VolunteerTable etc..

import React, { Component, Fragment } from 'react';
import MaterialTable from 'material-table';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { green, red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { blueGrey, blue, grey } from '@material-ui/core/colors';
import { getTeams } from '../../actions/teamActions';
import { getSchools } from '../../actions/schoolActions';
import { getVolunteers } from '../../actions/volunteerActions';
import { getSchoolPersonnels } from '../../actions/schoolPersonnelActions';
import AddTeamDialog from './AddTeamDialog';
import EditTeamDialog from './EditTeamDialog';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Box from '@material-ui/core/Box';
import SyncIcon from '@material-ui/icons/Sync';
import AddIcon from '@material-ui/icons/Add';
import isEmpty from 'is-empty';

  const theme = createMuiTheme({
    palette: {
      primary: {main: green[600]}, // For isActive is true
      secondary: {main: red[600]},// For isActive is false
      blue: {main: '#2196f3'},
    }
  });

const useStyles = ({
    table: {
      minWidth: 200,
    },
    all: {
        backgroundColor: '#fafafa',
        height: 280
    },
    card_details: {
        marginTop: 10,
        minWidth: 300,
        maxWidth: 750,
        height: 255,
        overflow: 'auto'
    },
    title: {
        fontSize: 18,
        fontWeight: 800,
        color: grey[800],
        alignItems: 'right'
    },
    subHeading: {
        fontSize: 15,
        alignItems: 'right'
    },
    body: {
        fontSize: 13,
        alignItems: 'right'
    },
    buttons: {
        backgroundColor: blueGrey[700],
        color: "white",
        fontWeight: "bold",
        '&:hover': {
            backgroundColor: blue[500],
        }
    },
    paper: {
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 10,
      },
      card: {
        marginTop: 10,
        minWidth: 800,
        maxWidth: 1000,
        height: 210,
        backgroundColor: 'white'
    },
    here: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justify: 'right',
    }
  });


class TeamView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTeam: {},
            addTeamDialog: false,
            editSchoolDialog: false,
            filteredTeams: [],
            semester: 'Fall',
            year: '2030',
            showTable: false
        }

        this.toggleAddTeamDialog= this.toggleAddTeamDialog.bind(this);
        this.toggleEditTeamDialog= this.toggleEditTeamDialog.bind(this);
        //this.clearErrors = this.clearErrors.bind(this);
        this.teamDisplay = this.teamDisplay.bind(this);
        this.showTable = this.showTable.bind(this);
    }

    componentDidMount() {
        this.props.getTeams();
        this.props.getSchools();
        this.props.getVolunteers();
        this.props.getSchoolPersonnels();
        
        let dateInfo = this.set_Semester_Year()

        this.setState({
            semester: dateInfo[0].toString(),
            year: dateInfo[1].toString()
        })
    }

    set_Semester_Year() {
        let semester, year = '';
        const date = new Date();

        if (date.getMonth() > 6) {
            semester = 'Fall'
        } else {
            semester = 'Spring'
        }
        
        year = date.getFullYear()

        return ([semester, year]);

    }

    toggleAddTeamDialog() {
        if (this.state.addTeamDialog) {
            this.teamDisplay() //Resfresh on detailed view
        }
        this.setState(prevState => ({
            addTeamDialog: !prevState.addTeamDialog
        }));
    }
    toggleEditTeamDialog() {
        if (this.state.editTeamDialog) {
            this.teamDisplay() //Resfresh on detailed view
        }
        this.setState(prevState => ({
            editTeamDialog: !prevState.editTeamDialog
        }));
    }
    showTable() {
        this.setState({
            showTable: true
        });
    }

    teamDisplay() {
        this.showTable()

        // get the teams that match the semester and year
        let teams = this.props.teams.filter( team => team.semester === this.state.semester && team.year === this.state.year)

        // get the name of the school that matches the teams school code
        teams.forEach( team => {
            const school = this.props.schools.find(school => school.schoolCode === team.schoolCode)
            team.schoolName = school.schoolName
        })

        this.setState({
            filteredTeams: teams
        })
    }

    handleInput = (e) =>{
        const value = e.target.value
        const name = e.target.name

        this.setState({
          [name]: value 
        })

        console.log(this.state)
    }

    setColor(text) {
        if (text === true) {
            return "primary";
        }
        else if (text === false) {
            return "secondary";
        }
        else {
            return "textPrimary";
        }
    }

    displayDays(data) {
        let days = []
       
            if (data['monday']) days.push('Mondays') 
            if (data['tuesday']) days.push('Tuesdays ')
            if (data['wednesday']) days.push('Wednesdays')
            if (data['thursday']) days.push('Thursdays')
            if (data['friday']) days.push('Fridays')

        return days.join(', ')
    }

    displayVolunteers(data) {
        let volunteers = []

        // get the volunteers that matches the volunteers PID
        data.forEach( id => {
            const vol = this.props.volunteers.find( volunteer => parseInt(id) === volunteer.pantherID)
            volunteers.push(vol)
        })

        return (
            volunteers.map( volunteer => 
                <div>
                    &nbsp; &#8226; &nbsp;
                    {volunteer.firstName + ' ' + volunteer.lastName} &ensp;-&ensp;
                    {volunteer.email} &ensp;-&ensp;
                    {volunteer.phoneNumber} &ensp;-&ensp;
                    <Typography className={this.props.classes.body} variant="h6" display="inline" color={this.setColor(volunteer.isActive)} gutterBottom>
                        {volunteer.isActive ? 'Active' : 'Not Active'}<br/>
                    </Typography>
                </div>
            )
        )
    }

    displaySchoolPersonnels(data) {
        let personnels = []

        // get the School Personnels that are related to the school code and are active.
        personnels = this.props.schoolPersonnels.filter( personnel => personnel.schoolCode === data && personnel.isActive)
        
        if (!isEmpty(personnels)) {
            return (
                personnels.map( personnel => 
                    <div>
                        &nbsp; &#8226; &nbsp;
                        {personnel.firstName + ' ' + personnel.lastName} &ensp;-&ensp;
                        {personnel.title} &ensp;-&ensp;
                        {personnel.email} &ensp;-&ensp;
                        {personnel.phoneNumber}
                    </div>
                )
            )
        }
        else {
            return (
                <div>
                    &#9642; &nbsp; No active personnel at the moment.
                </div>
            )
        }    
    }

    convertTime(time) {
        // Check correct time format and split into components
        time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    
        if (time.length > 1) { // If time format correct
          time = time.slice(1); // Remove full string match value
          time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
          time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join(''); // return adjusted time or original string
      }

    displayTimeStamp(stamp) {
        let date = new Date(stamp)

        return ((date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear())
    }

    showClosureNotes(notes) {
        return (
            <Fragment>
                <Typography className={this.props.classes.subHeading} color="textPrimary" variant="h6" display="inline" >
                    Closure Notes: &nbsp;
                </Typography>
                <Typography className={this.props.classes.body} color="textPrimary" variant="body1" display="inline" gutterBottom>
                    {notes}<br/>
                </Typography>
            </Fragment>
        )
    }

    render() {
        return (
            <Fragment>
        
                {this.state.addTeamDialog && <AddTeamDialog open={this.state.addTeamDialog} close={this.toggleAddTeamDialog}/>}

                {/* QUERY */}
                <Grid
                container
                spacing={3}
                direction="column"
                alignItems="center"
                justify="space-evenly">
                    <Box 
                    borderRadius="3px"
                    boxShadow={2}
                    className={this.props.classes.card} 
                    variant="outlined"
                    justify="center">
                        
                    <Box style={{paddingTop: '18px', paddingLeft: '50px', paddingRight: '50px'}}>
                    <Grid 
                        container
                        direction="row-reverse"
                        justify="flex-start"
                        alignItems="flex-start">
                        <div className={this.props.classes.here}>
                        <Button
                            className={this.props.classes.buttons}
                            endIcon={<AddIcon />}
                            onClick={this.toggleAddTeamDialog}
                            variant="contained"
                            size="small"
                            color="primary">
                                Create Team
                        </Button>
                        </div>
                    </Grid>
                <Typography className={this.props.classes.title}>Query Teams:</Typography>
                <Grid style={{marginBottom: '-10px'}} container wrap="nowrap" spacing={5} justify="center">
                    <Grid item xs={12} sm={6}>
                
                {/* Semester */}
                <FormControl fullWidth style={{marginBottom : "15px"}} margin='dense'>
                    <InputLabel id='semester'>Semester</InputLabel>
                    <Select
                        labelId='semester'
                        name='semester'
                        value={this.state.semester}
                        onChange={this.handleInput}
                    >
                        <MenuItem value={'Fall'}>Fall</MenuItem>
                        <MenuItem value={'Spring'}>Spring</MenuItem>
                    </Select>
                </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                {/* Year */}
                <FormControl fullWidth style={{marginBottom : "15px"}} margin='dense'>
                    <InputLabel id='year'>Year</InputLabel>
                    <Select
                        labelId='year'
                        name='year'
                        value={this.state.year}
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
                </FormControl>
                
                </Grid>
                </Grid >
                
                <Grid container item xs >
                <Button
                    className={this.props.classes.buttons}
                    endIcon={<SyncIcon />}
                    onClick={this.teamDisplay}
                    variant="contained"
                    fullWidth
                    size="small"
                    color="primary">
                        Display Teams
                </Button>
                </Grid>


                </Box>
                </Box>

                </Grid>
                {/* END QUERY */}





                <br></br><br></br>
    { this.state.showTable &&
                <MaterialTable
                    title="Teams"
                    columns={
                        [
                            { title: 'Semester', field: 'semester'},

                            { title: 'Year', field: 'year' },

                            { title: 'School',
                              field: 'school', 
                              render: rowData => { return (this.props.schools.map(school =>{
                                if (school.schoolCode === rowData.schoolCode) {
                                    return school.schoolName
                                }
                            }))}
                            }
                            
                        ]
                    }
                    data={this.state.filteredTeams}
                    actions={[
                        rowData => ({
                            icon: 'edit',
                            tooltip: 'Edit Team',
                            onClick: (event, rowData) => {this.setState({selectedTeam: rowData}); this.toggleEditTeamDialog()},
                            disabled: rowData.isActive === false
                          })
                    ]}
                    options={{
                        actionsColumnIndex: -1,
                        headerStyle: {
                            backgroundColor: '#b0bec5',
                            color: '#212121'
                        },
                        searchFieldStyle: {
                            backgroundColor: '#eeeeee',
                        },
                        cellStyle: {
                            width: 10,
                            maxWidth: 10
                          },
                          pageSizeOptions: [10, 20, 50, 100],
                          pageSize: 10,
                          paging: true,
                          exportButton: true,
                    }}
                    detailPanel={rowData => { 
                        return (

                            <ThemeProvider theme={theme}>
                            <div className={this.props.classes.all} >
                            <Grid
                            container
                            spacing={0}
                            direction="column"
                            alignItems="center"
                            justify="center">
                                <Card 
                                className={this.props.classes.card_details} 
                                variant="outlined"
                                justify="center">
                                    <CardContent>
                                    {/* School Code */}
                                    <Typography className={this.props.classes.subHeading} color="textPrimary" variant="h6" display="inline" >
                                        Associated School: &nbsp;
                                    </Typography>
                                    <Typography className={this.props.classes.body} color="textPrimary" variant="body1" display="inline" gutterBottom>
                                    {rowData.schoolCode} - &nbsp;
                                        {this.props.schools.map( school => {
                                            if (school.schoolCode === rowData.schoolCode){
                                                return school.schoolName 
                                            }
                                        })}<br/>
                                    </Typography>

                                    {/* Days of week */}
                                    <Typography className={this.props.classes.subHeading} color="textPrimary" variant="h6" display="inline" >
                                        Days: &nbsp;
                                    </Typography>
                                    <Typography className={this.props.classes.body} color="textPrimary" variant="body1" display="inline" gutterBottom>
                                        {this.displayDays(rowData.dayOfWeek)}
                                        <br/>
                                    </Typography>

                                    {/* Start Time */}
                                    <Typography className={this.props.classes.subHeading} color="textPrimary" variant="h6" display="inline" >
                                        Start Time: &nbsp;
                                    </Typography>
                                    <Typography className={this.props.classes.body} color="textPrimary" variant="body1" display="inline" gutterBottom>
                                        {this.convertTime(rowData.startTime)}<br/>
                                    </Typography>

                                    {/* End Time */}
                                    <Typography className={this.props.classes.subHeading} color="textPrimary" variant="h6" display="inline" >
                                        End Time: &nbsp;
                                    </Typography>
                                    <Typography className={this.props.classes.body} color="textPrimary" variant="body1" display="inline" gutterBottom>
                                        {this.convertTime(rowData.endTime)}<br/>
                                    </Typography>

                                    {/* Volunteers */}
                                    <Typography className={this.props.classes.subHeading} color="textPrimary" variant="h6" display="inline" >
                                        Volunteers: &nbsp;
                                    </Typography>
                                    <Typography className={this.props.classes.body} color="textPrimary" variant="body1" display="inline" gutterBottom>
                                        {this.displayVolunteers(rowData.volunteerPIs)}
                                    </Typography>

                                    {/* School Personnels */}
                                    <Typography className={this.props.classes.subHeading} color="textPrimary" variant="h6" display="inline" >
                                        School Personnels: &nbsp;
                                    </Typography>
                                    <Typography className={this.props.classes.body} color="textPrimary" variant="body1" display="inline" gutterBottom>
                                        {this.displaySchoolPersonnels(rowData.schoolCode)}
                                    </Typography>

                                     {/* is Active*/}
                                     <Typography className={this.props.classes.subHeading} color="textPrimary" variant="h6" display="inline" >
                                        Team status: &nbsp;
                                    </Typography>
                                    <Typography className={this.props.classes.body} variant="h6" display="inline" color={this.setColor(rowData.isActive)} gutterBottom>
                                        {rowData.isActive ? 'Active' : 'Not Active'}<br/>
                                    </Typography>

                                    {/* Time Stamp*/}
                                    <Typography className={this.props.classes.subHeading} color="textPrimary" variant="h6" display="inline" >
                                        Time Stamp: &nbsp;
                                    </Typography>
                                    <Typography className={this.props.classes.body} color="textPrimary" variant="body1" display="inline" gutterBottom>
                                        {this.displayTimeStamp(rowData.timeStamp)}<br/>
                                    </Typography>

                                    {!rowData.isActive && this.showClosureNotes(rowData.closureNotes)}

                                    </CardContent>
                                </Card>
                            </Grid>
                            </div>
                            </ThemeProvider>

                        )


                    }}
                />
    }
                {this.state.editTeamDialog && <EditTeamDialog open={this.state.editTeamDialog} close={this.toggleEditTeamDialog} team={this.state.selectedTeam}/>}
            </Fragment>
            //</ThemeProvider>
        );
    }
}

TeamView.propTypes = {
    getTeams: PropTypes.func.isRequired,
    getVolunteers: PropTypes.func.isRequired,
    teams: PropTypes.array.isRequired,
    schools: PropTypes.array.isRequired,
    volunteers: PropTypes.array.isRequired,
    schoolPersonnels: PropTypes.array.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    teams: state.teamData.teams,
    schools: state.schoolData.schools,
    volunteers: state.volunteers.volunteers,
    schoolPersonnels: state.schoolPersonnels.schoolPersonnels,
    errors: state.errors
});

export default connect (
    mapStateToProps,
    { getTeams, getSchools, getVolunteers, getSchoolPersonnels }  
)(withRouter(withStyles(useStyles)(TeamView)));