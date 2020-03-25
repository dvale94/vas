import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AdminDashboard from '../components/Dashboards/AdminDashboard';
import VolunteerDashboard from '../components/Dashboards/VolunteerDashboard';
import SchoolPersonnelDashboard from '../components/Dashboards/SchoolPersonnelDashboard';
import isEmpty from 'is-empty';

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
        
        //backgroundColor: 'grey',
        
    }
}

class Dashboard extends Component{
    
    render(){
        const { auth } = this.props;
        return (
            <div className={this.props.classes.all}
                style={{backgroundImage: 'url(' + require('../images/FIU_1_10.png') + ')',
                backgroundPosition: 'center',
                backgroundSize: 'cover' }}>
                
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center">

                    <Grid item className={this.props.classes.cell}>
                    { auth.role === "Admin" && <AdminDashboard/>}
                    { !isEmpty(this.props.user) && auth.role === "Volunteer" && <VolunteerDashboard/>}
                    { !isEmpty(this.props.user) && auth.role === "School Personnel" && <SchoolPersonnelDashboard/>}
                    </Grid>
                    
                </Grid>
            </div>
            
        )
    }
}

// define types
Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
  };
  
  // allows us to get our state from Redux and map it to props
  const mapStateToProps = state => ({
    auth: state.auth,
    user: state.userData.user,
  });
  
  export default connect (
    mapStateToProps,
  )(withRouter(withStyles(useStyles)(Dashboard)));