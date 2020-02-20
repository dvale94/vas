import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

import Admin_Profile from '../components/Profile/Admin_Profile'
import Volunteer_Profile from '../components/Profile/Volunteer_Profile'
import SchoolPersonnel_Profile from '../components/Profile/SchoolPersonnel_Profile'



class Profile extends Component{
    render(){
        const { user } = this.props.auth;
        return (
            <div>
                { user.role == "Admin" && <Admin_Profile/>}
                { user.role == "Volunteer" && <Volunteer_Profile/>}
                { user.role == "School Personnel" && <SchoolPersonnel_Profile/>}
            </div>

        )
    }
}

// define types
Profile.propTypes = {
    classes: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  
  // allows us to get our state from Redux and map it to props
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });
  
  export default connect (
    mapStateToProps,
  )(withRouter(Profile));