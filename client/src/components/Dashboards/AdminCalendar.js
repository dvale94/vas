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
        height: 200,
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


    render(){
        const Info =  ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
        return (
            
            <Fragment>

                    {Info.map( day => {

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
                                                    style={{backgroundColor: blue[500]}}
                                                    variant="outlined"
                                                    justify="center">

                                                        <Grid
                                                        container
                                                        direction="row"
                                                        justify="left"
                                                        alignItems="center"
                                                        style={{marginLeft: '15px', verticalAlign: 'middle'}}>

                                                            <Typography
                                                                className={this.props.classes.cardTitle}
                                                                //noWrap
                                                                style={{ marginTop: '14px', textAlign: 'center' }}>
                                                                    {day}
                                                                    
                                                            </Typography>
                                                        </Grid>
                                                    </Box>





                                                    <Grid style={{paddingLeft: '15px', paddingTop: '10px', paddingRight: '15px', paddingBottom: '15px',}}>

                                                         {/* SCHOOL */}
                                                        <Typography
                                                            className={this.props.classes.title}
                                                            style={{marginBottom: '1px', alignItems: 'left'}}>
                                                                School Information:
                                                        </Typography>


                                                                {/* Adress */}
                                                                <Typography className={this.props.classes.subHeading} color="textPrimary" variant="h6" display="inline" >
                                                                    Address: &nbsp;
                                                                </Typography>
                                                                <Typography className={this.props.classes.body} color="textPrimary" variant="body1" display="inline" gutterBottom>
                                                                    hello1
                                                                    <br/>
                                                                </Typography>

                                                                {/* Phone Number */}
                                                                <Typography className={this.props.classes.subHeading} color="textPrimary" variant="h6" display="inline" >
                                                                    Phone: &nbsp;
                                                                </Typography>
                                                                <Typography className={this.props.classes.body} color="textPrimary" variant="body1" display="inline" gutterBottom >
                                                                    hello2
                                                                    <br/>
                                                                </Typography>

                                                                {/* Personnel */}
                                                                <Typography className={this.props.classes.subHeading} color="textPrimary" variant="h6" display="inline" >
                                                                    Personnel: &nbsp; <br/>
                                                                </Typography>
                                                                

                                                                


                                                                
                                                        <Typography
                                                            className={this.props.classes.title}
                                                            style={{marginBottom: '1px', alignItems: 'left', marginTop: '1px'}}>
                                                            Team Information:
                                                        </Typography>

                                                                {/* Schedule */}
                                                                <Typography className={this.props.classes.subHeading} color="textPrimary" variant="h6" display="inline" >
                                                                    Meeting days: &nbsp;
                                                                </Typography>
                                                                <Typography className={this.props.classes.body} color="textPrimary" variant="body1" display="inline" gutterBottom>
                                                                    hello3
                                                                </Typography>
                                                                <Typography className={this.props.classes.subHeading} color="textPrimary" variant="h6" display="inline" >
                                                                    Time: &nbsp;
                                                                </Typography>
                                                                <Typography className={this.props.classes.body} color="textPrimary" variant="body1" display="inline" gutterBottom>
                                                                    hello4
                                                                </Typography>

                                                                {/* Team members */}
                                                                <Typography className={this.props.classes.subHeading} color="textPrimary" variant="h6" display="inline" >
                                                                    Team Members: &nbsp; <br/>
                                                                </Typography>
                                                                




                                                    </Grid>
                                                </Box>
                                        </Grid>)
                    })}
            
            
            
            </Fragment>
        )
    }
}

AdminCalendar.propTypes = {
  };

const mapStateToProps = state => ({
    user: state.userData.user,
    errors: state.errors,
    success: state.success
  });


  export default connect (
    mapStateToProps,
    {  }  
)(withRouter(withStyles(useStyles)(AdminCalendar)));