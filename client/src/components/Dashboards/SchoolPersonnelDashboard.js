import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { blueGrey, blue, grey } from '@material-ui/core/colors';
import { getTeamRequest } from "../../actions/schoolPersonnelRequestActions";

const useStyles = {
    all: {
        backgroundColor: '#fafafa',
        height: '100vh'
    },
    card: {
        marginTop: 10,
        minWidth: '80%',
        maxWidth: 750,
        height: '100%',
        backgroundColor: 'white',
        variant: "outlined",
        justify: "center",
        borderRadius: '3px'
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
        fontWeight: 800,
        color: grey[1000],
        alignItems: 'left',
        justify: 'left',
    },
    title: {
        fontSize: 18,
        fontWeight: 800,
        color: grey[800],
        alignItems: 'right'
    },
    this: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'left',
        minWidth: '80%',
    },
    inforCards: {

    }
}

class SchoolPersonnelDashboard extends Component {

    componentDidMount(){
        this.props.getTeamRequest(this.props.user.schoolCode)
    }

    render() {
        return (
            <Fragment>
                <Grid
                    container
                    style={{marginLeft: '10%'}}
                >
                    <Typography className={this.props.classes.main} style={{marginBottom: '15px'}}>
                        Welcome {this.props.user.firstName} !
                    </Typography>
                </Grid>

                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                >
                    
                    <Box boxShadow= {3} className={this.props.classes.card}>
                        <Grid style={{paddingLeft: '15px', paddingTop: '10px', paddingRight: '15px', paddingBottom: '15px',}}>
                            
                            <Typography
                                className={this.props.classes.title}
                                style={{marginBottom: '15px', alignItems: 'left'}}
                            >
                                Team Info For Your School:
                            </Typography>
                        </Grid>
                    </Box>

                    <Box boxShadow= {3} className={this.props.classes.card}>
                        <Grid style={{paddingLeft: '15px', paddingTop: '10px', paddingRight: '15px', paddingBottom: '15px',}}>
                            
                            <Typography
                                className={this.props.classes.title}
                                style={{marginBottom: '15px', alignItems: 'left'}}
                            >
                                Your School Info:
                            </Typography>
                        </Grid>
                    </Box>

                    <Box boxShadow= {3} className={this.props.classes.card}>
                        <Grid style={{paddingLeft: '15px', paddingTop: '10px', paddingRight: '15px', paddingBottom: '15px',}}>
                            
                            <Typography
                                className={this.props.classes.title}
                                style={{marginBottom: '15px', alignItems: 'left'}}
                            >
                                Administrators Contact Info:
                            </Typography>
                        </Grid>
                    </Box>
                </Grid>
            </Fragment>
        );
    }
}

SchoolPersonnelDashboard.propTypes = {
    getTeamRequest: PropTypes.func.isRequired,

};

const mapStateToProps = state => ({
    user: state.userData.user,
});

export default connect (
    mapStateToProps,
    { getTeamRequest }  
)(withRouter(withStyles(useStyles)(SchoolPersonnelDashboard)));