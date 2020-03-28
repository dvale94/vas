import React, { Component, Fragment } from 'react';
import MaterialTable from 'material-table';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getSchoolPersonnels } from '../../actions/schoolPersonnelActions';
import { getSchools } from '../../actions/schoolActions';
import AddSchoolPersonnelDialog from './AddSchoolPersonnelDialog';
import EditSchoolPersonnelDialog from './EditSchoolPersonnelDialog'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { green, red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
      primary: {main: green[600]}, // For isActive is true
      secondary: {main: red[600]},// For isActive is false
    }
  });

const useStyles = ({
    table: {
      minWidth: 200,
    },
    all: {
        backgroundColor: '#fafafa',
        height: 127
    },
    card: {
        marginTop: 10,
        minWidth: 300,
        maxWidth: 450,
        height: 105
    },
    title: {
        fontSize: 14,
        alignItems: 'right'
    },
    subHeading: {
        fontSize: 15,
        alignItems: 'right'
    },
    body: {
        fontSize: 13,
        alignItems: 'right'
    }
  });


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
        this.props.getSchools();
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

    setColor(text) {
        if (text === true) {
            return "primary";
        }
        else if (text === false) {
            return "secondary";
        }
        else {
            return "textPrimary";
        }
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
                            { title: 'Email', field: 'email'},
                            { title: 'Phone #', field: 'phoneNumber'}
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
                          pageSizeOptions: [4, 10, 20, 50, 100],
                          pageSize: 10,
                          paging: true,
                          exportButton: true,
                    }}
                    detailPanel={rowData => {

                        return (

                            <ThemeProvider theme={theme}>
                            <div className={this.props.classes.all} >
                            <Grid
                            container
                            spacing={0}
                            direction="column"
                            alignItems="center"
                            justify="center">
                                <Card 
                                className={this.props.classes.card} 
                                variant="outlined"
                                justify="center">
                                    <CardContent>
                                    {/* Title */}
                                    <Typography className={this.props.classes.subHeading} color="textPrimary" variant="h6" display="inline" >
                                        Title: &nbsp;
                                    </Typography>
                                    <Typography className={this.props.classes.body} color="textPrimary" variant="body1" display="inline" gutterBottom>
                                        {rowData.title}<br/>
                                    </Typography>

                                    {/* School Code - School Name*/}
                                    <Typography className={this.props.classes.subHeading} color="textPrimary" variant="h6" display="inline" >
                                       Associated School: &nbsp;
                                    </Typography>
                                    <Typography className={this.props.classes.body} color="textPrimary" variant="body1" display="inline" gutterBottom>
                                     {rowData.schoolCode} - &nbsp;
                                        {this.props.schools.map( school => {
                                            if (school.schoolCode === rowData.schoolCode){
                                                return school.schoolName 
                                            }
                                        })}<br/>
                                    </Typography>

                                     {/* is Active*/}
                                     <Typography className={this.props.classes.subHeading} color="textPrimary" variant="h6" display="inline" >
                                        Activation status: &nbsp;
                                    </Typography>
                                    <Typography className={this.props.classes.body} variant="h6" display="inline" color={this.setColor(rowData.isActive)} gutterBottom>
                                        {rowData.isActive ? 'Active' : 'Not Active'}<br/>
                                    </Typography>

                                        </CardContent>
                                </Card>
                            </Grid>
                            </div>
                            </ThemeProvider>

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
    getSchools: PropTypes.func.isRequired,
    schools: PropTypes.array.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    schoolPersonnels: state.schoolPersonnels.schoolPersonnels,
    schools: state.schoolData.schools,
    errors: state.errors
});

export default connect (
    mapStateToProps,
    { getSchoolPersonnels, getSchools }  
)(withRouter(withStyles(useStyles)(SchoolPersonnelTable)));