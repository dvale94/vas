import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import SchoolPersonnelDashboard from './SchoolPersonnelDashboard';
import isEmpty from 'is-empty';
import { getTeamRequest } from "../../actions/schoolPersonnelRequestActions";

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

class SchoolPersonnelDashboardMM extends Component {

    constructor(props) {
        super(props);
        this.state = {}

        this.getTeamRequest = this.getTeamRequest.bind(this);
    }

    componentDidMount() {
        this.getTeamRequest();
    }

    getTeamRequest() {
        const schoolCode = this.props.user.schoolCode
        this.props.getTeamRequest(schoolCode);
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
                      !isEmpty(this.props.Info.school) &&
                      <SchoolPersonnelDashboard/>}

                    </Grid>
                    
                </Grid>
            
        )
    }
}

// define types
SchoolPersonnelDashboardMM.propTypes = {
    auth: PropTypes.object.isRequired,
    getTeamRequest: PropTypes.func.isRequired
  };
  
  // allows us to get our state from Redux and map it to props
  const mapStateToProps = state => ({
    auth: state.auth,
    user: state.userData.user,
    Info: state.schoolPersonnelRequests,
  });
  
  export default connect (
    mapStateToProps,
    { getTeamRequest }
  )(withRouter(withStyles(useStyles)(SchoolPersonnelDashboardMM)));