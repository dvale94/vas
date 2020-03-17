import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import TeamView from '../components/Teams/teamView'

const useStyles = {
    all: {
        backgroundColor: '#fafafa',
        height: '100vh'
    },
    table: {
        marginTop: 20,
        minWidth: 100,
        maxWidth: 1100,
        height: 900
    }
}    

class TeamManagement extends Component{
    
    render(){
        return (
            <div className={this.props.classes.all}>
                <Grid container direction="column" alignItems="center" justify="center">
                    <Grid item className={this.props.classes.table}>
                         <TeamView/> 
                    </Grid>    
                </Grid>
            </div>    
        )
    }
}

export default (withStyles(useStyles)(TeamManagement));