import React, { Component, Fragment } from 'react';
import MaterialTable from 'material-table';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getSchools } from '../../actions/schoolActions';
import AddSchoolDialog from './AddSchoolDialog';
import EditSchoolDialog from './EditSchoolDialog'
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


class SchoolTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedSchool: {},
            addSchoolDialog: false,
            editSchoolDialog: false
        }

        this.toggleAddSchoolDialog= this.toggleAddSchoolDialog.bind(this);
        this.toggleEditSchoolDialog= this.toggleEditSchoolDialog.bind(this);
    }

    componentDidMount() {
        this.props.getSchools();
    }

    toggleAddSchoolDialog() {
        this.setState(prevState => ({
            addSchoolDialog: !prevState.addSchoolDialog
        }));
    }

    toggleEditSchoolDialog() {
        this.setState(prevState => ({
            editSchoolDialog: !prevState.editSchoolDialog
        }));
    }

    render() {
        return (
            <Fragment>
                <MaterialTable
                    title="Schools"
                    columns={
                        [
                            { title: 'School Name', field: 'schoolName' },
                            { title: 'Level', field: 'level' },
                            { title: 'Phone #', field: 'phoneNumber'},
                            { title: 'City', field: 'city'},
                        ]
                    }
                    data={this.props.schools}
                    actions={[
                        {
                        icon: 'person_add',
                        tooltip: 'Add School',
                        isFreeAction: true,
                        onClick: this.toggleAddSchoolDialog
                        },
                        {
                            icon: 'edit',
                            tooltip: 'Edit School',
                            onClick: (event, rowData) => {this.setState({selectedSchool: rowData}); this.toggleEditSchoolDialog()}
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
                          pageSize: 20,
                          paging: true,
                          exportButton: true,
                    }}
                    detailPanel={rowData => {
                        return (
                            <div>
                                <Table className={this.props.classes.table} size="small" aria-label="a dense table">
                                <TableHead backgroundColor='red'>
                                <TableRow color="red">
                                <TableCell color="red" align="right"><strong>School Code</strong></TableCell>
                                <TableCell align="right"><strong>Address</strong></TableCell>
                                <TableCell align="right"><strong>State</strong></TableCell>
                                <TableCell align="right"><strong>Zip Code</strong></TableCell>
                                <TableCell align="right"><strong>Activation status</strong></TableCell>
                                </TableRow>
                                </TableHead>

                                <TableBody >
                                <TableCell component="th" scope="row"> {rowData.schoolCode}</TableCell>
                                <TableCell component="th" scope="row"> {rowData.address}</TableCell>
                                <TableCell component="th" scope="row"> {rowData.state}</TableCell>
                                <TableCell component="th" scope="row"> {rowData.zipCode}</TableCell>
                                <TableCell  scope="row"> {rowData.isActive ? 'Active' : 'Not Active'}</TableCell>
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
                {this.state.editSchoolDialog && <EditSchoolDialog open={this.state.editSchoolDialog} close={this.toggleEditSchoolDialog} school={this.state.selectedSchool}/>}
                {this.state.addSchoolDialog && <AddSchoolDialog open={this.state.addSchoolDialog} close={this.toggleAddSchoolDialog}/>}
            </Fragment>
        );
    }
}

SchoolTable.propTypes = {
    getSchools: PropTypes.func.isRequired,
    schools: PropTypes.array.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    schools: state.schoolData.schools,
    errors: state.errors
});

export default connect (
    mapStateToProps,
    { getSchools }  
)(withRouter(withStyles(useStyles)(SchoolTable)));