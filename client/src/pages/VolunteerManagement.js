import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import VolunteerList from '../components/Volunteers/VolunteerList'

class VolunteerManagement extends Component{
    
    render(){
        return (
            <Grid container>
                <Grid item xs={6}>
                    <VolunteerList/>
                </Grid>
                <Grid item xs={6}>
                    <VolunteerList/>
                </Grid>
            </Grid>
        )
    }
}

export default VolunteerManagement;