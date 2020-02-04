import React, { Component, Fragment } from 'react';
import List from '@material-ui/core/List';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { getVolunteers } from "../../actions/getData";
import VolunteerInfo from './VolunteerInfo'


class VolunteerList extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }

        this.renderVolunteers = this.renderVolunteers.bind(this);
    }

    componentDidMount() {
        this.props.getVolunteers();
    }

    renderVolunteers = ()=>{
        let volunteers;
    
        volunteers = this.props.volunteers.map(
            (volunteer)=>{
                return <VolunteerInfo key={volunteer.id} info={volunteer}/>
            }
        )
         
        return volunteers
    }

    render() {
        return (
            <Fragment>
                <h3>Volunteer List</h3>
                <List>
                    {this.props.volunteers ? this.renderVolunteers() : ''}
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