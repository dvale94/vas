import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import VolunteerDashboard from './VolunteerDashboard';
import isEmpty from 'is-empty';
import { getTeamRequest } from "../../actions/volunteerRequestActions";

const useStyles = {
    all: {
        backgroundColor: '#fafafa',
        height: '100vh'
    },
    cell: {
        marginTop: 20,
        minWidth: 200,
        width: '95%',
        height: 900,
    }
}

class VolunteerDashboardMM extends Component {

    constructor(props) {
        super(props);
        this.state = {}

        this.getTeamRequest = this.getTeamRequest.bind(this);
    }

    componentDidMount() {
        this.getTeamRequest();
    }

    getTeamRequest() {
        const pantherID = this.props.user.pantherID
        this.props.getTeamRequest(pantherID);
    }
    
    render() {
        return (
                
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center">

                    <Grid item className={this.props.classes.cell}>

                    { !isEmpty(this.props.Info.teams) &&
                      !isEmpty(this.props.Info.volunteers) && 
                      !isEmpty(this.props.Info.schools) &&
                      <VolunteerDashboard/>}

                    </Grid>
                    
                </Grid>
            
        )
    }
}

// define types
VolunteerDashboardMM.propTypes = {
    auth: PropTypes.object.isRequired,
    getTeamRequest: PropTypes.func.isRequired
  };
  
  // allows us to get our state from Redux and map it to props
  const mapStateToProps = state => ({
    auth: state.auth,
    user: state.userData.user,
    Info: state.volunteerRequests,
  });
  
  export default connect (
    mapStateToProps,
    { getTeamRequest }
  )(withRouter(withStyles(useStyles)(VolunteerDashboardMM)));