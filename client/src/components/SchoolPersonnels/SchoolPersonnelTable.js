import React, { Component, Fragment } from 'react';
import MaterialTable from 'material-table';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getSchoolPersonnels } from '../../actions/schoolPersonnelActions';
import AddSchoolPersonnelDialog from './AddSchoolPersonnelDialog';
import EditSchoolPersonnelDialog from './EditSchoolPersonnelDialog'

class SchoolPersonnelTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedSchoolPersonnel: {},
            addSchoolPersonnelDialog: false,
            editSchoolPeronnelDialog: false
        }

        this.toggleAddSchoolPersonnelDialog= this.toggleAddSchoolPersonnelDialog.bind(this);
        this.toggleEditSchoolPersonnelDialog= this.toggleEditSchoolPersonnelDialog.bind(this);
    }

    componentDidMount() {
        this.props.getSchoolPersonnels();
    }

    toggleAddSchoolPersonnelDialog() {
        this.setState(prevState => ({
            addSchoolPersonnelDialog: !prevState.addSchoolPersonnelDialog
        }));
    }

    toggleEditSchoolPersonnelDialog() {
        this.setState(prevState => ({
            editSchoolPersonnelDialog: !prevState.editSchoolPersonnelDialog
        }));
    }

    render() {
        return (
            <Fragment>
                <MaterialTable
                    title="School Personnels"
                    columns={
                        [
                            { title: 'First Name', field: 'firstName' },
                            { title: 'Last Name', field: 'lastName' },
                            { title: 'Email', field: 'email'}
                        ]
                    }
                    data={this.props.schoolPersonnels}
                    actions={[
                        {
                        icon: 'person_add',
                        tooltip: 'Add School Personnel',
                        isFreeAction: true,
                        onClick: this.toggleAddSchoolPersonnelDialog
                        },
                        {
                        icon: 'edit',
                        tooltip: 'Edit School Personnel',
                        onClick: (event, rowData) => {this.setState({selectedSchoolPersonnel: rowData}); this.toggleEditSchoolPersonnelDialog()}
                        }
                    ]}
                    options={{
                        actionsColumnIndex: -1,
                        headerStyle: {
                            backgroundColor: '#b0bec5',
                            color: '#212121'
                          },
                        cellStyle: {
                            width: 250,
                            maxWidth: 700
                          },
                          searchFieldStyle: {
                            backgroundColor: '#eeeeee',
                        },
                          pageSizeOptions: [10, 20, 50, 100],
                          pageSize: 10,
                          paging: true,
                          exportButton: true,
                    }}
                    detailPanel={rowData => {
                        return (
                            <div>
                                <p><strong>Phone #:</strong> {rowData.phoneNumber}</p>
                                <p><strong>Title:</strong> {rowData.title}</p>
                                <p><strong>School ID:</strong> {rowData.schoolID}</p>
                            </div>
                        )
                    }}
                />
                {this.state.editSchoolPersonnelDialog && <EditSchoolPersonnelDialog open={this.state.editSchoolPersonnelDialog} close={this.toggleEditSchoolPersonnelDialog} schoolPersonnel={this.state.selectedSchoolPersonnel}/>}
                {this.state.addSchoolPersonnelDialog && <AddSchoolPersonnelDialog open={this.state.addSchoolPersonnelDialog} close={this.toggleAddSchoolPersonnelDialog}/>}
            </Fragment>
        );
    }
}

SchoolPersonnelTable.propTypes = {
    getSchoolPersonnels: PropTypes.func.isRequired,
    schoolPersonnels: PropTypes.array.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    schoolPersonnels: state.schoolPersonnels.schoolPersonnels,
    errors: state.errors
});

export default connect (
    mapStateToProps,
    { getSchoolPersonnels }  
)(withRouter((SchoolPersonnelTable)));