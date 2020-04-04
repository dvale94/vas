import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AdminDashboard from './AdminDashboard';
import isEmpty from 'is-empty';

const useStyles = {
    cell: {
        marginTop: 20,
        minWidth: 200,
        width: '87%'
    }
}

class AdminDashboardMM extends Component {
    
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        let dateInfo = this.set_Semester_Year()

        this.setState({
            semester: dateInfo[0].toString(),
            year: dateInfo[1].toString()
        })
    }

    set_Semester_Year() {
        let semester, year = '';
        const date = new Date();

        if (date.getMonth() > 6) {
            semester = 'Fall'
        } else {
            semester = 'Spring'
        }
        
        year = date.getFullYear()

        return ([semester, year]);

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

                    { !isEmpty(this.state) && <AdminDashboard semesterYear= {this.state}/> }

                    </Grid>
                    
                </Grid>
        )
    }
}

export default (withRouter(withStyles(useStyles)(AdminDashboardMM)));