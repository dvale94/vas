import React, { Component, Fragment } from 'react';
import { Grid } from '@material-ui/core';
import List from '@material-ui/core/List';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { getVolunteers } from "../../actions/getData";
import VolunteerInfo from './VolunteerInfo'

// renderVolunteers = ()=>{
//     let volunteers;

//     volunteers = .map(
//                 (volunteer)=>{
//                     return <VolunteerInfo key={volunteer.id} />
//                 }
//             )
     
//     return volunteers
// }


class VolunteerList extends Component {
    render() {
        return (
            <Fragment>
                <h3>Volunteer List</h3>
                <List>
                     <VolunteerInfo/>
                </List>
            </Fragment>
        );
    }
}

VolunteerList.propTypes = {
    getVolunteers: PropTypes.func.isRequired,
    volunteers: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };

const mapStateToProps = state => ({
    volunteers: state.volunteers,
    errors: state.errors
  });

export default connect (
    mapStateToProps,
    { getVolunteers }  
)(withRouter(VolunteerList));