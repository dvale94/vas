import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { blueGrey, blue, grey, yellow } from '@material-ui/core/colors';
import EventIcon from '@material-ui/icons/Event';

const useStyles = {
    all: {
        backgroundColor: '#fafafa',
        height: '100vh'
    },
    cardHeader: {
        height: 60,
    },
    card: {
        marginTop: 10,
        minWidth: '60%',
        maxWidth: 500,
        height: 400,
        backgroundColor: 'white',
        marginBottom: '20px',
        'overflow-x': 'hidden'
    },
    custom: {
        justify: 'center',
        minWidth: '300px',
        maxWidth: '50%',
    },
    buttons: {
        backgroundColor: blueGrey[700],
        color: "white",
        fontWeight: "bold",
        '&:hover': {
            backgroundColor: blue[500],
        }
    },
    main: {
        fontSize: 30,
        fontWeight: 800,
        color: grey[1000],
        alignItems: 'left',
        justify: 'left',
    },
    cardTitle: {
        fontSize: "20px",
        fontWeight: 800,
        alignItems: 'right'
    },
    title: {
        fontSize: 18,
        fontWeight: 800,
        color: grey[800],
        alignItems: 'right'
    },
    this: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'left',
        minWidth: '80%',
      },
    subHeading: {
        fontSize: 15,
        alignItems: 'left'
    },
    body: {
        fontSize: 13,
        alignItems: 'right',
    },
}


class AdminCalendar extends Component {

    constructor(props) {
        super(props);
        this.state = {}
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



    setColor(text) {
        if (text === true) {
            return "#43a047";
        }
        else if (text === false) {
            return "#e53935";
        }
        else {
            return "textPrimary";
        }
    }

    setCalendarColor(dayOfWeek) {
        const day = dayOfWeek.substring(0, dayOfWeek.length - 1).toLowerCase()
        var today  = new Date();
        var weekday = new Array(7);

        weekday[1] = "monday";
        weekday[2] = "tuesday";
        weekday[3] = "wednesday";
        weekday[4] = "thursday";
        weekday[5] = "friday";

        weekday = weekday[today.getDay()]

        if (weekday === day){
            return [yellow[600], "black"];
        } else {
            return [blue[500], "white"];
        }
    }

    displayTeams(dayOfWeek) {
        const day = dayOfWeek.substring(0, dayOfWeek.length - 1).toLowerCase()
        const teams = this.props.teams;

        // DISPLAYS MESSAGE IF THERE IS NO TEAM ON A PARTICULAR DAY
        if ( day==="monday" && !teams.some(function(o){return o.dayOfWeek.monday===true;})){
            return (this.displayNoDays(day))
        }
        if ( day==="tuesday" && !teams.some(function(o){return o.dayOfWeek.tuesday===true;})){
            return (this.displayNoDays(day))
        }
        if ( day==="wednesday" && !teams.some(function(o){return o.dayOfWeek.wednesday===true;})){
            return (this.displayNoDays(day))
        }
        if ( day==="thursday" && !teams.some(function(o){return o.dayOfWeek.thursday===true;})){
            return (this.displayNoDays(day))
        }
        if ( day==="friday" && !teams.some(function(o){return o.dayOfWeek.friday===true;})){
            return (this.displayNoDays(day))
        }

        return (
            teams.map( team => {
                if (day==="monday" && team.dayOfWeek.monday){
                    return (this.displayInfo(team))
                } else if (day==="tuesday" && team.dayOfWeek.tuesday){
                    return (this.displayInfo(team))
                } else if (day==="wednesday" && team.dayOfWeek.wednesday){
                    return (this.displayInfo(team))
                } else if (day==="thursday" && team.dayOfWeek.thursday){
                    return (this.displayInfo(team))
                } else if (day==="friday" && team.dayOfWeek.friday){
                    return (this.displayInfo(team))
                } 
            })
            
        )
    }

    displayInfo(team) {
        const volunteers = this.props.volunteers;
        const schools = this.props.schools;
        let volunteerList = []

        volunteerList = volunteers.filter( volunteer => team.volunteerPIs.includes((volunteer.pantherID).toString()) && volunteer.isActive)

        return (
            <Fragment>
                <Typography
                    className={this.props.classes.title}
                    style={{marginBottom: '1px', alignItems: 'left', marginTop: '1px'}}>
                    Team:
                </Typography>
                <Typography className={this.props.classes.subHeading} color="textPrimary" variant="h6" display="inline" >
                    School: &nbsp;
                </Typography>

                {schools.map( school =>{
                    if (team.schoolCode === school.schoolCode) {
                        return (
                            <Typography className={this.props.classes.body} color="textPrimary" variant="body1" display="inline" gutterBottom>
                                {school.schoolName + " " + school.level} <br/>
                            </Typography>
                        )
                    }
                })}
                <Typography className={this.props.classes.subHeading} color="textPrimary" variant="h6" display="inline" >
                    Time: &nbsp;
                </Typography>
                <Typography className={this.props.classes.body} color="textPrimary" variant="body1" display="inline" gutterBottom>
                    From <strong>{this.convertTime(team.startTime)}</strong> to <strong>{this.convertTime(team.endTime)}</strong><br/>
                </Typography>
                <Typography className={this.props.classes.subHeading} color="textPrimary" variant="h6" display="inline" >
                    Volunteers: &nbsp; <br/>
                </Typography>
                {volunteerList.map( volunteer => {
                    return ( <Fragment>
                                <Typography className={this.props.classes.body} color="textPrimary" variant="body1" display="inline" gutterBottom>
                                    &nbsp; &#8226; &nbsp; { volunteer.firstName + "  " + volunteer.lastName + " - "}
                                </Typography>
                                <Typography className={this.props.classes.body} style={{fontStyle: 'italic', color:this.setColor(volunteer.carAvailable)}}  variant="body1" display="inline" gutterBottom>
                                {volunteer.carAvailable ? 'Available for carpool' : 'Not Available for carpool'}<br/>
                                </Typography>
                                <Typography className={this.props.classes.body} color="textPrimary" variant="body1" display="inline" gutterBottom>
                                    &nbsp; &nbsp; &nbsp; &#9702; &nbsp;{ volunteer.phoneNumber } <br/>
                                    &nbsp; &nbsp; &nbsp; &#9702; &nbsp;{ volunteer.email } <br/>
                                </Typography>
                            </Fragment>
                            )

                    })}<br/>

            </Fragment>
        )
    }
    displayNoDays(day) {
        return (    
            <Typography className={this.props.classes.body} color="textPrimary" variant="body1" display="inline" gutterBottom>
                &nbsp; &#8226; &nbsp; There are no teams scheduled on {day}s<br/>
            </Typography>
        )
    }


    render(){
        const daysOfWeek =  ['Mondays', 'Tuesdays', 'Wednesdays', 'Thursdays', 'Fridays']
        return (
            <div style={{marginTop: '10px'}}>
            <Fragment>

                    {daysOfWeek.map( day => {

                            return ( <p>{day}</p> &&

                                            <Grid
                                            container
                                            spacing={0}
                                            direction="column"
                                            alignItems="center"
                                            justify="center"
                                            key={day}>
                                                
                                                {/* CARD */}
                                                <Box 
                                                borderRadius="10px"
                                                boxShadow={3}
                                                className={this.props.classes.card} 
                                                variant="outlined"
                                                justify="center">

                                                    {/* CARD HEADING */}
                                                    <Box 
                                                    borderRadius="10px 10px 0px 0px"
                                                    boxShadow={2}
                                                    className={this.props.classes.cardHeader}
                                                    style={{backgroundColor: this.setCalendarColor(day)[0]}}
                                                    variant="outlined"
                                                    justify="center">

                                                        <Grid
                                                        container
                                                        direction="row"
                                                        justify="flex-start"
                                                        alignItems="center"
                                                        style={{marginLeft: '15px', verticalAlign: 'middle'}}>

                                                            <Typography
                                                                className={this.props.classes.cardTitle}
                                                                style={{ marginTop: '14px', textAlign: 'center', color: this.setCalendarColor(day)[1]}}>
                                                                    <EventIcon/> {day}
                                                                    
                                                            </Typography>
                                                        </Grid>
                                                    </Box>





                                                    <Grid style={{paddingLeft: '15px', paddingTop: '10px', paddingRight: '15px', paddingBottom: '15px',}}>
                                                            
                                                        { this.displayTeams(day)}

                                                    </Grid>
                                                </Box>
                                        </Grid>)
                    })}
            
            
            
            </Fragment>
            </div>
        )
    }
}

AdminCalendar.propTypes = {
  };

const mapStateToProps = state => ({
    teams: state.calendar.teams,
    volunteers: state.calendar.volunteers,
    schools: state.calendar.schools,
  });


  export default connect (
    mapStateToProps,
    {  }
)(withRouter(withStyles(useStyles)(AdminCalendar)));