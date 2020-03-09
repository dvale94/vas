// This component is the equivalent to VolunteerTable etx...

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
import { blueGrey, blue } from '@material-ui/core/colors';
import { getTeams } from '../../actions/teamActions';
import { getSchools } from '../../actions/schoolActions';
import { getVolunteers } from '../../actions/volunteerActions';
import AddTeamDialog from './AddTeamDialog';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

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
        height: 172
    },
    card: {
        marginTop: 10,
        minWidth: 300,
        maxWidth: 450,
        height: 150
    },
    title: {
        fontSize: 14,
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
  });


class TeamView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTeam: {},
            addTeamDialog: false,
            //editSchoolDialog: false
            filteredTeams: []
        }

        this.toggleAddTeamDialog= this.toggleAddTeamDialog.bind(this);
        //this.toggleEditSchoolDialog= this.toggleEditSchoolDialog.bind(this);
        //this.clearErrors = this.clearErrors.bind(this);
        this.teamDisplay = this.teamDisplay.bind(this);
    }

    componentDidMount() {
        this.props.getTeams();
        this.props.getSchools();
        this.props.getVolunteers();

        //Default select options to current semester and year
        this.setState({
            semester: 'Spring',
            year: '2020'
        })
    }

    toggleAddTeamDialog() {
        this.setState(prevState => ({
            addTeamDialog: !prevState.addTeamDialog
        }));
    }

    teamDisplay() {

        let teams = this.props.teams.filter( team => team.semester === this.state.semester && team.year === this.state.year)

        this.setState({
            filteredTeams: teams
        })
    }

    /* toggleEditSchoolDialog() {
        this.setState(prevState => ({
            editSchoolDialog: !prevState.editSchoolDialog
        }));
    } */

    handleInput = (e) =>{
        const value = e.target.value
        const name = e.target.name

        this.setState({
          [name]: value 
        })

        console.log(this.state)
    }

    setColor(text) {
        if (text == true) {
            return "primary";
        }
        else if (text == false) {
            return "secondary";
        }
        else {
            return "textPrimary";
        }
    }

    render() {
        return (
            //<ThemeProvider theme={theme}>
            <Fragment>
                <Button className={this.props.classes.buttons} onClick={this.toggleAddTeamDialog}  variant="contained" color="primary">Create Team</Button>
        
                {this.state.addTeamDialog && <AddTeamDialog open={this.state.addTeamDialog} close={this.toggleAddTeamDialog}/>}

                <Grid container wrap="nowrap" spacing={5} justify="center">
                    <Grid item xs={12} sm={6}>
                {/* Semester */}
                <FormControl fullWidth style={{marginBottom : "15px"}} margin='dense'>
                    <InputLabel id='semester'>Semester</InputLabel>
                    <Select
                        labelId='semester'
                        name='semester'
                        /* style={theme.palette.blue} */
                        color="primary"
/*                         color={theme.palette.blue}
 */                        onChange={this.handleInput}
                        value={this.state.semester}
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
                        onChange={this.handleInput}
                        value={this.state.year}
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
                </Grid>

                <Button className={this.props.classes.buttons} onClick={this.teamDisplay}  variant="contained" color="primary">Display Teams</Button>

                <br></br><br></br>

                <MaterialTable
                    title="Teams"
                    columns={
                        [
                            { title: 'Year', field: 'year' },
                            { title: 'Semester', field: 'semester' }
                        ]
                    }
                    data={this.state.filteredTeams}
                    actions={[
                        {
                        icon: 'edit',
                        tooltip: 'Edit Team',
                        onClick: (event, rowData) => {this.setState({selectedTeam: rowData});}
                        }
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
                            width: 250,
                            maxWidth: 700
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
                                className={this.props.classes.card} 
                                variant="outlined"
                                justify="center">
                                    <CardContent>
                                    {/* School Code */}
                                    <Typography className={this.props.classes.subHeading} color="textPrimary" variant="h6" display="inline" >
                                        School Code: &nbsp;
                                    </Typography>
                                    <Typography className={this.props.classes.body} color="textPrimary" variant="body1" display="inline" gutterBottom>
                                        {rowData.schoolCode}<br/>
                                    </Typography>

                                    {/* Start Time */}
                                    <Typography className={this.props.classes.subHeading} color="textPrimary" variant="h6" display="inline" >
                                        Start Time: &nbsp;
                                    </Typography>
                                    <Typography className={this.props.classes.body} color="textPrimary" variant="body1" display="inline" gutterBottom>
                                        {rowData.startTime}<br/>
                                    </Typography>

                                    {/* End Time */}
                                    <Typography className={this.props.classes.subHeading} color="textPrimary" variant="h6" display="inline" >
                                        End Time: &nbsp;
                                    </Typography>
                                    <Typography className={this.props.classes.body} color="textPrimary" variant="body1" display="inline" gutterBottom>
                                        {rowData.endTime}<br/>
                                    </Typography>

                                     {/* is Active*/}
                                     <Typography className={this.props.classes.subHeading} color="textPrimary" variant="h6" display="inline" >
                                        Activation status: &nbsp;
                                    </Typography>
                                    <Typography className={this.props.classes.body} variant="h6" display="inline" color={this.setColor(rowData.isActive)} gutterBottom>
                                        {rowData.isActive ? 'Active' : 'Not Active'}<br/>
                                    </Typography>



                                        </CardContent>
                                </Card>
                            </Grid>
                            </div>
                            </ThemeProvider>

                        )


                    }}
                />
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
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    teams: state.teamData.teams,
    schools: state.schoolData.schools,
    volunteers: state.volunteers.volunteers,
    errors: state.errors
});

export default connect (
    mapStateToProps,
    { getTeams, getSchools, getVolunteers }  
)(withRouter(withStyles(useStyles)(TeamView)));