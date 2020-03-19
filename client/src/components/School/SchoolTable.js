import React, { Component, Fragment } from 'react';
import MaterialTable from 'material-table';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getSchools } from '../../actions/schoolActions';
import AddSchoolDialog from './AddSchoolDialog';
import EditSchoolDialog from './EditSchoolDialog'
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
        height: 172
    },
    card: {
        marginTop: 10,
        minWidth: 300,
        maxWidth: 450,
        height: 150
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


class SchoolTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedSchool: {},
            addSchoolDialog: false,
            editSchoolDialog: false
        }

        this.toggleAddSchoolDialog = this.toggleAddSchoolDialog.bind(this);
        this.toggleEditSchoolDialog = this.toggleEditSchoolDialog.bind(this);
        //this.clearErrors = this.clearErrors.bind(this);
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
                        onClick: (this.toggleAddSchoolDialog)/* (this.clearErrors, this.toggleAddSchoolDialog) */
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
                        rowStyle:{
                            height: 1
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
                                    {/* School Code */}
                                    <Typography className={this.props.classes.subHeading} color="textPrimary" variant="h6" display="inline" >
                                        School Code: &nbsp;
                                    </Typography>
                                    <Typography className={this.props.classes.body} color="textPrimary" variant="body1" display="inline" gutterBottom>
                                        {rowData.schoolCode}<br/>
                                    </Typography>

                                    {/* School Address */}
                                    <Typography className={this.props.classes.subHeading} color="textPrimary" variant="h6" display="inline" >
                                        Address: &nbsp;
                                    </Typography>
                                    <Typography className={this.props.classes.body} color="textPrimary" variant="body1" display="inline" gutterBottom>
                                        {rowData.address}<br/>
                                    </Typography>

                                    {/* City, State*/}
                                    <Typography className={this.props.classes.subHeading} color="textPrimary" variant="h6" display="inline" >
                                        City/State: &nbsp;
                                    </Typography>
                                    <Typography className={this.props.classes.body} color="textPrimary" variant="body1" display="inline" gutterBottom>
                                        {rowData.city},  {rowData.state}<br/>
                                    </Typography>

                                    {/* Zip Code*/}
                                    <Typography className={this.props.classes.subHeading} color="textPrimary" variant="h6" display="inline" >
                                        Zip Code: &nbsp;
                                    </Typography>
                                    <Typography className={this.props.classes.body} color="textPrimary" variant="body1" display="inline" gutterBottom>
                                        {rowData.zipCode}<br/>
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