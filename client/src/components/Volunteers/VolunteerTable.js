import React, { Component, Fragment } from 'react';
import MaterialTable from 'material-table';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getVolunteers } from '../../actions/volunteerActions';
import AddVolunteerDialog from './AddVolunteerDialog';
import EditVolunteerDialog from './EditVolunteerDialog'
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
        height: 192
    },
    card: {
        marginTop: 10,
        minWidth: 300,
        maxWidth: 450,
        height: 170
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
                                    {/* PantherID */}
                                    <Typography className={this.props.classes.subHeading} color="textPrimary" variant="h6" display="inline" >
                                        Panther ID: &nbsp;
                                    </Typography>
                                    <Typography className={this.props.classes.body} color="textPrimary" variant="body1" display="inline" gutterBottom>
                                        {rowData.pantherID}<br/>
                                    </Typography>

                                    {/* Major */}
                                    <Typography className={this.props.classes.subHeading} color="textPrimary" variant="h6" display="inline" >
                                        Major: &nbsp;
                                    </Typography>
                                    <Typography className={this.props.classes.body} color="textPrimary" variant="body1" display="inline" gutterBottom>
                                        {rowData.major}<br/>
                                    </Typography>

                                    {/* Car Available */}
                                    <Typography className={this.props.classes.subHeading} color="textPrimary" variant="h6" display="inline" >
                                        Car Available: &nbsp;
                                    </Typography>
                                    <Typography className={this.props.classes.body} color="textPrimary" variant="body1" display="inline" gutterBottom>
                                        {rowData.carAvailable ? "Yes": "No"}<br/>
                                    </Typography>

                                    {/* Volunteer Status */}
                                    <Typography className={this.props.classes.subHeading} color="textPrimary" variant="h6" display="inline" >
                                        Volunteer Status: &nbsp;
                                    </Typography>
                                    <Typography className={this.props.classes.body} color="textPrimary" variant="body1" display="inline" gutterBottom>
                                        {rowData.volunteerStatus ? "Approved": "Not yet Approved"}<br/>
                                    </Typography>

                                    {/* MDCPS ID */}
                                    <Typography className={this.props.classes.subHeading} color="textPrimary" variant="h6" display="inline" >
                                        MDCPS ID: &nbsp;
                                    </Typography>
                                    <Typography className={this.props.classes.body} color="textPrimary" variant="body1" display="inline" gutterBottom>
                                        {rowData.MDCPS_ID ? rowData.MDCPS_ID : "NA"}<br/>
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