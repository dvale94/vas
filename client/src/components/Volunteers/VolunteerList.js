import React, { Component, Fragment } from 'react';
import isEmpty from 'is-empty';
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
   
    renderVolunteers = () => {

        let list

        list = this.props.volunteers.map(
            (volunteer) => {
                return <VolunteerInfo key={volunteer.id} info={volunteer}/>
            }
        );

        return list
    }

    render() {
        return (
            <Fragment>
                <h3>Volunteer List</h3>
                <List>
                    {isEmpty(this.props.volunteers) ? '' : this.renderVolunteers()}
                </List>
            </Fragment>
        );
    }
}

VolunteerList.propTypes = {
    getVolunteers: PropTypes.func.isRequired,
    volunteers: PropTypes.array.isRequired,
    errors: PropTypes.object.isRequired
  };

const mapStateToProps = state => ({
    volunteers: state.data.volunteers,
    errors: state.errors
  });

export default connect (
    mapStateToProps,
    { getVolunteers }  
)(withRouter(VolunteerList));