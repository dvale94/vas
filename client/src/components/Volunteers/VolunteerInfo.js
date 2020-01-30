import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';

class VolunteerInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "cassandra",
            lastName: "zuchini",
            email: "cass@test.c'ossdm",
            phoneNumber: "305-151-5685",
            pantherID: "5986866",
            major: "Computer science",
            carAvailable: false,
            MDPSPS_ID : "1234"
        }
    }

    render() {
        return (
            <ListItem>
                <Grid container>
                    <Grid item xs={4}>
                        <p>
                            Name: {this.state.firstName} {this.state.lastName}
                        </p>
                    </Grid>

                    <Grid item xs={4}>
                        <p>
                            Email: {this.state.email}
                        </p>
                        <p>
                            Phone Number: {this.state.phoneNumber}
                        </p>
                        <p>
                            PID: {this.state.pantherID}
                        </p>
                    </Grid>

                    <Grid item xs={4}>
                        <p>
                            Major: {this.state.major}
                        </p>
                        <p>    
                            Car Available: {this.state.carAvailable ? "yes" : "no"}
                        </p>
                        <p>
                            MDCPS ID: {this.state.MDPSPS_ID}
                        </p>
                    </Grid>
                </Grid>    
            </ListItem>
        );
    }
}

export default VolunteerInfo;