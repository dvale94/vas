import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AdminDashboard from './AdminDashboard';

const useStyles = {
    all: {
        backgroundColor: '#fafafa',
        height: '100vh'
    },
    cell: {
        marginTop: 20,
        minWidth: 200,
        width: '85%'
    }
}

class AdminDashboardMM extends Component {
    
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {

    }


    render(){
        return (
            
            <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center">

                    <Grid item className={this.props.classes.cell}>

                    { <AdminDashboard/> }

                    </Grid>
                    
                </Grid>
        )
    }
}

export default (withRouter(withStyles(useStyles)(AdminDashboardMM)));