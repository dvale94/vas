import React, { Component, Fragment } from 'react';
import MaterialTable from 'material-table';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getVolunteers } from '../../actions/volunteerActions';
import AddVolunteerDialog from './AddVolunteerDialog';
import EditVolunteerDialog from './EditVolunteerDialog'

class VolunteerTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedVolunteer: {},
            addVolunteerDialog: false,
            editVolunteerDialog: false
        }

        this.toggleAddVolunteerDialog= this.toggleAddVolunteerDialog.bind(this);
        this.toggleEditVolunteerDialog= this.toggleEditVolunteerDialog.bind(this);
    }

    componentDidMount() {
        this.props.getVolunteers();
    }

    toggleAddVolunteerDialog() {
        this.setState(prevState => ({
            addVolunteerDialog: !prevState.addVolunteerDialog
        }));
    }

    toggleEditVolunteerDialog() {
        this.setState(prevState => ({
            editVolunteerDialog: !prevState.editVolunteerDialog
        }));
    }

    render() {
        return (
            <Fragment>
                <MaterialTable
                    title="Volunteers"
                    columns={
                        [
                            { title: 'First Name', field: 'firstName' },
                            { title: 'Last Name', field: 'lastName' },
                            { title: 'Email', field: 'email'},
                            { title: 'Phone #', field: 'phoneNumber'}
                        ]
                    }
                    data={this.props.volunteers}
                    actions={[
                        {
                        icon: 'person_add',
                        tooltip: 'Add Volunteer',
                        isFreeAction: true,
                        onClick: this.toggleAddVolunteerDialog
                        },
                        {
                            icon: 'edit',
                            tooltip: 'Edit Volunteer',
                            onClick: (event, rowData) => {this.setState({selectedVolunteer: rowData}); this.toggleEditVolunteerDialog()}
                        }
                    ]}
                    options={{
                        actionsColumnIndex: -1
                    }}
                    detailPanel={rowData => {
                        return (
                            <div>
                                <p><strong>PID:</strong> {rowData.pantherID}</p>
                                <p><strong>Major:</strong> {rowData.major}</p>
                                <p><strong>MDCPS ID:</strong> {rowData.MDCPS_ID}</p>
                                <p><strong>Volunteer Status:</strong> {rowData.volunteerStatus ? 'active' : 'inactive'}</p>
                                <p><strong>Car Available:</strong> {rowData.carAvailable ? 'yes' : 'no'}</p>
                            </div>
                        )
                    }}
                />
                {this.state.editVolunteerDialog && <EditVolunteerDialog open={this.state.editVolunteerDialog} close={this.toggleEditVolunteerDialog} volunteer={this.state.selectedVolunteer}/>}
                {this.state.addVolunteerDialog && <AddVolunteerDialog open={this.state.addVolunteerDialog} close={this.toggleAddVolunteerDialog}/>}
            </Fragment>
        );
    }
}

VolunteerTable.propTypes = {
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
)(withRouter((VolunteerTable)));