import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';

class VolunteerInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {

        const {
            firstName, 
            lastName, 
            email,
            phoneNumber,
            pantherID,
            major,
            carAvailable,
            MDPSPS_ID} = this.props.info;

        return (
            <ListItem>
                <Grid container>
                    <Grid item xs={4}>
                        <p>
                            Name: {firstName} {lastName}
                        </p>
                    </Grid>

                    <Grid item xs={4}>
                        <p>
                            Email: {email}
                        </p>
                        <p>
                            Phone Number: {phoneNumber}
                        </p>
                        <p>
                            PID: {pantherID}
                        </p>
                    </Grid>

                    <Grid item xs={4}>
                        <p>
                            Major: {major}
                        </p>
                        <p>    
                            Car Available: {carAvailable ? "Yes" : "No"}
                        </p>
                        <p>
                            MDCPS ID: {MDPSPS_ID}
                        </p>
                    </Grid>
                </Grid>    
            </ListItem>
        );
    }
}

export default VolunteerInfo;