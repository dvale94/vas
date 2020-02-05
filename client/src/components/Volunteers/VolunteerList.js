import React, { Component, Fragment } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import { blue, blueGrey } from '@material-ui/core/colors';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import isEmpty from 'is-empty';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { getVolunteers } from "../../actions/volunteerActions";
import VolunteerInfo from './VolunteerInfo'
import AddVolunteerDialog from './AddVolunteerDialog';

const theme = createMuiTheme({
    palette: {
        primary: blue,
    }
});

const useStyles = {
    all: {
        backgroundColor: '#fafafa',
        height: '100vh'
    },
    button: {
        marginTop: theme.spacing(1),
        display: 'flex',
        alignSelf: 'center',
        backgroundColor: blueGrey[700],
        color: "white",
        fontWeight: "bold",
        '&:hover': {
            backgroundColor: blue[500],
        },
        width: "70px",
        "&:disabled": {
            backgroundColor: blueGrey[100],
            color: "white",
          }
    },
    
};


class VolunteerList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            addVolunteerDialog: false
        }

        this.renderVolunteers = this.renderVolunteers.bind(this);
        this.toggleAddVolunteerDialog= this.toggleAddVolunteerDialog.bind(this);
    }

    componentDidMount() {
        this.props.getVolunteers();
    }
   
    // this function returns a new VolunteerInfo compononet for each volunteer 
    renderVolunteers = () => {

        let list

        list = this.props.volunteers.map(
            (volunteer) => {
                return (
                    <Fragment className={this.props.classes.all}>
                        <VolunteerInfo key={volunteer._id} info={volunteer}/>
                        <Divider/>
                    </Fragment>    
                )    
            }
        );

        return list
    }

    toggleAddVolunteerDialog() {
        this.setState(prevState => ({
            addVolunteerDialog: !prevState.addVolunteerDialog
        }));
    }

    render() {
        return (
            <Fragment>
                <List>
                    {isEmpty(this.props.volunteers) ? '' : this.renderVolunteers()}
                </List>

                <Button 
                className={this.props.classes.button} 
                size='small'
                onClick={this.toggleAddVolunteerDialog}
                endIcon={<AddCircleOutlineIcon/>}>
                    ADD
                </Button>    

                {this.state.addVolunteerDialog && <AddVolunteerDialog open={this.state.addVolunteerDialog} close={this.toggleAddVolunteerDialog}/>}

            </Fragment>
        );
    }
}

VolunteerList.propTypes = {
    classes: PropTypes.object.isRequired,
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
)(withRouter(withStyles(useStyles)(VolunteerList)));