import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { blueGrey, blue, grey } from '@material-ui/core/colors';
import { getTeamRequest } from "../../actions/volunteerRequestActions";

const useStyles = {
    all: {
        backgroundColor: '#fafafa',
        height: '100vh'
    },
    card: {
        marginTop: 10,
        minWidth: '80%',
        maxWidth: 750,
        height: 300,
        backgroundColor: 'white'
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
        fontSize: 36,
        fontWeight: 800,
        color: grey[1000],
        alignItems: 'left',
        justify: 'left',
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
        alignItems: 'right'
    },
    body: {
        fontSize: 13,
        alignItems: 'right'
    },
}


class VolunteerDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {}

        this.getTeamRequest = this.getTeamRequest.bind(this);
    }
    componentDidMount(){
        this.getTeamRequest()
    }


    getTeamRequest() {
        const pantherID = this.props.user.pantherID
        //console.log("SEND THIS: ", pantherID)
        this.props.getTeamRequest(pantherID);
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


    render(){
        const Info = this.props.Info
        return (
            
            <Fragment>
            
            <Grid
                container
                style={{marginLeft: '10%'}}>
                     <Typography
                        className={this.props.classes.main}
                        style={{marginBottom: '15px'}}>
                            Welcome {this.props.user.firstName} !
                    </Typography>
                    </Grid>

{Info.teams.map( team => {

        return ( <p>{team}</p>&&
                        <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justify="center"
                        key={team._id}>
                            

                            <Box 
                            borderRadius="3px"
                            boxShadow={3}
                            className={this.props.classes.card} 
                            variant="outlined"
                            justify="center">
                                <Grid style={{paddingLeft: '15px', paddingTop: '10px', paddingRight: '15px', paddingBottom: '15px',}}>
                                    
                                    <Typography
                                    className={this.props.classes.title}
                                    style={{marginBottom: '15px', alignItems: 'left'}}>
                                        Your Team Information:
                                    </Typography>


                                            {/* School */}
                                            <Typography className={this.props.classes.subHeading} color="textPrimary" variant="h6" display="inline" >
                                                School: &nbsp;
                                            </Typography>
                                            <Typography className={this.props.classes.body} color="textPrimary" variant="body1" display="inline" gutterBottom>
                                                {Info.schools.map( school =>{
                                                    if (team.schoolCode === school.schoolCode){
                                                        return (school.schoolName)
                                                    }
                                                })}
                                                <br/>
                                            </Typography>

                                            {/* Volunteering Date/Time */}
                                            <Typography className={this.props.classes.subHeading} color="textPrimary" variant="h6" display="inline" >
                                                Schedule: &nbsp;
                                            </Typography>
                                            <Typography className={this.props.classes.body} color="textPrimary" variant="body1" display="inline" gutterBottom>
                                            {this.displayDays(team.dayOfWeek)} from <strong>{team.startTime}</strong> to <strong>{team.endTime}</strong><br/>
                                            </Typography>
                                            
                                            {/* End Time */}
                                           {/*  <Typography className={this.props.classes.subHeading} color="textPrimary" variant="h6" display="inline" >
                                                End Time: &nbsp;
                                            </Typography>
                                            <Typography className={this.props.classes.body} color="textPrimary" variant="body1" display="inline" gutterBottom>
                                                {team.endTime}<br/>
                                            </Typography> */}



                                </Grid>
                            </Box>
                    </Grid>)
                    })}
            
            
            
            
            </Fragment>
        )
    }
}

VolunteerDashboard.propTypes = {
    getTeamRequest: PropTypes.func.isRequired,
  };

const mapStateToProps = state => ({
    user: state.userData.user,
    Info: state.volunteerRequests,
    errors: state.errors,
    success: state.success
  });


  export default connect (
    mapStateToProps,
    { getTeamRequest }  
)(withRouter(withStyles(useStyles)(VolunteerDashboard)));