// This component is the equivalent to VolunteerTable etx...

import React, { Component, Fragment } from 'react';
import MaterialTable from 'material-table';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { green, red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { blueGrey, blue } from '@material-ui/core/colors';
import { getTeams } from '../../actions/teamActions';
import { getSchools } from '../../actions/schoolActions';
import { getVolunteers } from '../../actions/volunteerActions';
import AddTeamDialog from './AddTeamDialog';
//import EditSchoolDialog from './EditSchoolDialog'

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
    },
    buttons: {
        backgroundColor: blueGrey[700],
        color: "white",
        fontWeight: "bold",
        '&:hover': {
            backgroundColor: blue[500],
        }
    },
  });


class TeamView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTeam: {},
            addTeamDialog: false,
            //editSchoolDialog: false
        }

        this.toggleAddTeamDialog= this.toggleAddTeamDialog.bind(this);
        //this.toggleEditSchoolDialog= this.toggleEditSchoolDialog.bind(this);
        //this.clearErrors = this.clearErrors.bind(this);
    }

    componentDidMount() {
        this.props.getTeams();
        this.props.getSchools();
        this.props.getVolunteers();
    }

    toggleAddTeamDialog() {
        this.setState(prevState => ({
            addTeamDialog: !prevState.addTeamDialog
        }));
    }

    /* toggleEditSchoolDialog() {
        this.setState(prevState => ({
            editSchoolDialog: !prevState.editSchoolDialog
        }));
    } */

    setColor(text) {
        if (text == true) {
            return "primary";
        }
        else if (text == false) {
            return "secondary";
        }
        else {
            return "textPrimary";
        }
    }

    render() {
        return (
            <Fragment>
            <Button className={this.props.classes.buttons} onClick={this.toggleAddTeamDialog}  variant="contained" color="primary">Create Team</Button>
        
            {this.state.addTeamDialog && <AddTeamDialog open={this.state.addTeamDialog} close={this.toggleAddTeamDialog}/>}
            </Fragment>
        );
    }
}

TeamView.propTypes = {
    getTeams: PropTypes.func.isRequired,
    getVolunteers: PropTypes.func.isRequired,
    teams: PropTypes.array.isRequired,
    schools: PropTypes.array.isRequired,
    volunteers: PropTypes.array.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    teams: state.teamData.teams,
    schools: state.schoolData.schools,
    volunteers: state.volunteers.volunteers,
    errors: state.errors
});

export default connect (
    mapStateToProps,
    { getTeams, getSchools, getVolunteers }  
)(withRouter(withStyles(useStyles)(TeamView)));