import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import VolunteerTable from '../components/Volunteers/VolunteerTable';

const useStyles = {
    all: {
        backgroundColor: '#fafafa',
        height: '100vh'
    }
}    

class VolunteerManagement extends Component{
    
    render(){
        return (
            <div className={this.props.classes.all}>
                <Grid container direction="column" alignItems="center" justify="center">
                    <Grid item>
                        <VolunteerTable/>
                    </Grid>    
                </Grid>
            </div>    
        )
    }
}

export default (withStyles(useStyles)(VolunteerManagement));