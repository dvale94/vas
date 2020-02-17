import React, { Component, Fragment } from 'react';
import MaterialTable from 'material-table';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getVolunteers } from '../../actions/volunteerActions';
import AddVolunteerDialog from './AddVolunteerDialog';
import EditVolunteerDialog from './EditVolunteerDialog'
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


const useStyles = ({
    table: {
      minWidth: 200,
    },
  });


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
                        actionsColumnIndex: -1,
                        headerStyle: {
                            backgroundColor: '#b0bec5',
                            color: '#212121'
                        },
                        searchFieldStyle: {
                            backgroundColor: '#eeeeee',
                        },
                        cellStyle: {
                            width: 250,
                            maxWidth: 700
                          },
                          pageSizeOptions: [10, 20, 50, 100],
                          paging: true,
                          exportButton: true,
                    }}
                    detailPanel={rowData => {
                        return (
                            <div>
                                <Table className={this.props.classes.table} size="small" aria-label="a dense table">
                                <TableHead backgroundColor='red'>
                                <TableRow color="red">
                                <TableCell color="red" align="right"><strong>Panther ID</strong></TableCell>
                                <TableCell align="right"><strong>Major</strong></TableCell>
                                <TableCell align="right"><strong>Car Available</strong></TableCell>
                                <TableCell align="right"><strong>Volunteer Status</strong></TableCell>
                                <TableCell align="right"><strong>MDCPS ID</strong></TableCell>
                                </TableRow>
                                </TableHead>

                                <TableBody >
                                <TableCell component="th" scope="row"> {rowData.pantherID}</TableCell>
                                <TableCell component="th" scope="row"> {rowData.major}</TableCell>
                                <TableCell  scope="row"> {rowData.carAvailable ? 'Yes' : 'No'}</TableCell>
                                <TableCell component="th" scope="row"> {rowData.volunteerStatus ? 'Approved' : 'Not yet Approved'}</TableCell>
                                <TableCell component="th" scope="row"> {rowData.MDCPS_ID}</TableCell>
                                </TableBody>
                                </Table>
                                
                               {/*  <p><strong>PID:</strong> {rowData.pantherID}</p>
                                <p><strong>Major:</strong> {rowData.major}</p>
                                <p><strong>Car Available:</strong> {rowData.carAvailable ? 'Yes' : 'No'}</p>
                                <p><strong>Volunteer Status:</strong> {rowData.volunteerStatus ? 'Approved' : 'Not yet Approved'}</p>
                                <p><strong>MDCPS ID:</strong> {rowData.MDCPS_ID}</p> */}
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
    volunteers: state.volunteers.volunteers,
    errors: state.errors
});

export default connect (
    mapStateToProps,
    { getVolunteers }  
)(withRouter(withStyles(useStyles)(VolunteerTable)));