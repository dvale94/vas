import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { blueGrey, blue, grey } from '@material-ui/core/colors';
import isEmpty from 'is-empty';

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
        minWidth: '50%',
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
        color: 'white',
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

class SchoolPersonnelDashboard extends Component {

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

    displayTeamMembers(volunteers) {

        if (!isEmpty(volunteers)) {

            return (
                volunteers.map( volunteer => {

                    return ( 
                        <Fragment>
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
                })
            )
        } 
        else {
            return (    
                <Typography className={this.props.classes.body} color="textPrimary" variant="body1" display="inline" gutterBottom>
                    &nbsp; &#8226; &nbsp; There are no team memembers at this time.<br/>
                </Typography>
            )
        }

    }

    displaySchoolPersonnel(personnels) {

        if (!isEmpty(personnels)) {

            return (
                personnels.map( personnel => {

                    return ( 
                        <Fragment>
                            <Typography className={this.props.classes.body} color="textPrimary" variant="body1" display="inline" gutterBottom>
                                &nbsp; &#8226; &nbsp; { personnel.firstName + "  " + personnel.lastName + " - "}
                            </Typography>
                            <Typography className={this.props.classes.body} style={{fontStyle: 'italic', color: '#2196f3'}} color="textPrimary" variant="body1" display="inline" gutterBottom>
                                { personnel.title } <br/>
                            </Typography>
                            <Typography className={this.props.classes.body} color="textPrimary" variant="body1" display="inline" gutterBottom>
                                &nbsp; &nbsp; &nbsp; &#9702; &nbsp;{ personnel.phoneNumber } <br/>
                                &nbsp; &nbsp; &nbsp; &#9702; &nbsp;{ personnel.email } <br/>
                            </Typography>
                        </Fragment>
                    )
                })
            )
        } 
        else {
            return (    
                <Typography className={this.props.classes.body} color="textPrimary" variant="body1" display="inline" gutterBottom>
                    &nbsp; &#8226; &nbsp; There are no active personnel assigned to this school at this moment.<br/>
                </Typography>
            )
        }

    }

    displayAdmins() {

        let admins = []

        admins = this.props.Info.admins.filter( admin => admin.isActive)
        console.log(admins)

        if (!isEmpty(admins)) {

            return (
                admins.map( admin => {

                    return ( 
                        <Fragment>
                            <Typography className={this.props.classes.body} color="textPrimary" variant="body1" display="inline" gutterBottom>
                                &nbsp; &#8226; &nbsp; { admin.firstName + "  " + admin.lastName } <br/>
                            </Typography>
                            <Typography className={this.props.classes.body} color="textPrimary" variant="body1" display="inline" gutterBottom>
                                &nbsp; &nbsp; &nbsp; &#9702; &nbsp;{ admin.phoneNumber } <br/>
                                &nbsp; &nbsp; &nbsp; &#9702; &nbsp;{ admin.email } <br/>
                            </Typography>
                        </Fragment>
                    )
                })
            )
        } 
        else {
            return (    
                <Typography className={this.props.classes.body} color="textPrimary" variant="body1" display="inline" gutterBottom>
                    &nbsp; &#8226; &nbsp; There are no active Admins at this moment.<br/>
                </Typography>
            )
       }

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

    render() {
        const Info = this.props.Info;
        let count = 1;
        return (
            <Fragment>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    <Typography className={this.props.classes.main} display="inline" style={{marginBottom: '5px'}}>
                            Welcome {this.props.user.firstName} !
                    </Typography>

                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                        className={this.props.classes.custom} 
                    >
                        <Typography className={this.props.classes.subHeading} color="textPrimary" align='center' variant="h6" display="inline" style={{marginBottom: '10px'}}  >
                            Below is the information of the team(s) assigned to your school. &nbsp;
                        </Typography>
                    </Grid>
                </Grid>

                {Info.teams.map( team => {
                    return ( <p>{team}</p> &&

                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justify="center"
                        key={team._id}
                    >
                    
                        {/* CARD */}
                        <Box 
                            borderRadius="10px"
                            boxShadow={3}
                            className={this.props.classes.card} 
                            variant="outlined"
                            justify="center"
                        >

                            {/* CARD HEADING */}
                            <Box 
                                borderRadius="10px 10px 0px 0px"
                                boxShadow={2}
                                className={this.props.classes.cardHeader}
                                style={{backgroundColor: blue[500]}}
                                variant="outlined"
                                justify="center"
                            >

                                <Grid
                                    container
                                    direction="row"
                                    justify="left"
                                    alignItems="center"
                                    style={{marginLeft: '15px', verticalAlign: 'middle'}}
                                >
                                
                                    <Typography className={this.props.classes.cardTitle} style={{ marginTop: '14px', textAlign: 'center' }}>
                                        Team                           
                                    </Typography>
                                </Grid>
                            </Box>

                            <Grid style={{paddingLeft: '15px', paddingTop: '10px', paddingRight: '15px', paddingBottom: '15px',}}>

                                <Typography
                                    className={this.props.classes.title}
                                    style={{marginBottom: '1px', alignItems: 'left', marginTop: '1px'}}
                                >
                                    Team Information:
                                </Typography>

                                {/* Schedule */}
                                <Typography className={this.props.classes.subHeading} color="textPrimary" variant="h6" display="inline" >
                                    Meeting days: &nbsp;
                                </Typography>
                                <Typography className={this.props.classes.body} color="textPrimary" variant="body1" display="inline" gutterBottom>
                                    {this.displayDays(team.dayOfWeek)} <br/>
                                </Typography>
                                <Typography className={this.props.classes.subHeading} color="textPrimary" variant="h6" display="inline" >
                                    Time: &nbsp;
                                </Typography>
                                <Typography className={this.props.classes.body} color="textPrimary" variant="body1" display="inline" gutterBottom>
                                    From <strong>{this.convertTime(team.startTime)}</strong> to <strong>{this.convertTime(team.endTime)}</strong><br/>
                                </Typography>
                                {/* Team members */}
                                <Typography className={this.props.classes.subHeading} color="textPrimary" variant="h6" display="inline" >
                                    Team Members: &nbsp; <br/>
                                </Typography>
                                {this.displayTeamMembers(Info.volunteers)}<br/>
                            </Grid>
                        </Box>
                    </Grid>)
                })}

                {/*  SCHOOL CARD */}
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                >
                                                
                    {/* CARD */}
                    <Box 
                        borderRadius="10px"
                        boxShadow={3}
                        className={this.props.classes.card} 
                        variant="outlined"
                        justify="center"
                    >

                        {/* CARD HEADING */}
                        <Box 
                            borderRadius="10px 10px 0px 0px"
                            boxShadow={2}
                            className={this.props.classes.cardHeader}
                            style={{backgroundColor: blueGrey[700]}}
                            variant="outlined"
                            justify="center"
                        >

                            <Grid
                                container
                                direction="row"
                                justify="left"
                                alignItems="center"
                                style={{marginLeft: '15px', verticalAlign: 'middle'}}
                            >

                                    <Typography
                                        className={this.props.classes.cardTitle}
                                        style={{ marginTop: '14px', textAlign: 'center' }}>
                                            Your School Info        
                                    </Typography>
                            </Grid>
                        </Box>


                        <Grid style={{paddingLeft: '15px', paddingTop: '10px', paddingRight: '15px', paddingBottom: '15px',}}>
                            {/* Name */}
                            <Typography className={this.props.classes.subHeading} color="textPrimary" variant="h6" display="inline" >
                                Name: &nbsp;
                            </Typography>
                            <Typography className={this.props.classes.body} color="textPrimary" variant="body1" display="inline" gutterBottom>
                                {Info.school[0].schoolName + " " + Info.school[0].level}
                                <br/>
                            </Typography>

                            {/* Adress */}
                            <Typography className={this.props.classes.subHeading} color="textPrimary" variant="h6" display="inline" >
                                Address: &nbsp;
                            </Typography>
                            <Typography className={this.props.classes.body} color="textPrimary" variant="body1" display="inline" gutterBottom>
                                {Info.school[0].address + ",  " + Info.school[0].city + ",  " + Info.school[0].state + "   " + Info.school[0].zipCode}
                                <br/>
                            </Typography>

                            {/* Phone Number */}
                            <Typography className={this.props.classes.subHeading} color="textPrimary" variant="h6" display="inline" >
                                Phone: &nbsp;
                            </Typography>
                            <Typography className={this.props.classes.body} color="textPrimary" variant="body1" display="inline" gutterBottom >
                                {Info.school[0].phoneNumber}
                                <br/>
                            </Typography>

                            {/* Personnel */}
                            <Typography className={this.props.classes.subHeading} color="textPrimary" variant="h6" display="inline" >
                                Personnel: &nbsp; <br/>
                            </Typography>
                            {this.displaySchoolPersonnel(Info.school_personnels)}<br/>

                        </Grid>
                    </Box>
                </Grid>

                {/*  ADMIN CARD */}
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                >
                                                
                    {/* CARD */}
                    <Box 
                        borderRadius="10px"
                        boxShadow={3}
                        className={this.props.classes.card} 
                        variant="outlined"
                        justify="center"
                    >

                        {/* CARD HEADING */}
                        <Box 
                            borderRadius="10px 10px 0px 0px"
                            boxShadow={2}
                            className={this.props.classes.cardHeader}
                            style={{backgroundColor: blueGrey[700]}}
                            variant="outlined"
                            justify="center"
                        >

                            <Grid
                                container
                                direction="row"
                                justify="left"
                                alignItems="center"
                                style={{marginLeft: '15px', verticalAlign: 'middle'}}
                            >

                                    <Typography
                                        className={this.props.classes.cardTitle}
                                        style={{ marginTop: '14px', textAlign: 'center' }}>
                                            Administrators         
                                    </Typography>
                            </Grid>
                        </Box>


                        <Grid style={{paddingLeft: '15px', paddingTop: '10px', paddingRight: '15px', paddingBottom: '15px',}}>

                            {/* Admins */}
                            <Typography
                                className={this.props.classes.body}
                                display="inline"
                                style={{marginBottom: '1px', alignItems: 'left'}}
                            >
                                Have any concerns or questions? You may contact any of the administrators listed below. <br/><br/>
                            </Typography>
                            
                            {/* Team members */}
                            <Typography className={this.props.classes.subHeading} color="textPrimary" variant="h6" display="inline" >
                                    Admin contact information: &nbsp; <br/>
                            </Typography>
                            {this.displayAdmins()}<br/>
                        </Grid>
                    </Box>
                </Grid>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    user: state.userData.user,
    Info: state.schoolPersonnelRequests
});

export default connect (
    mapStateToProps  
)(withRouter(withStyles(useStyles)(SchoolPersonnelDashboard)));