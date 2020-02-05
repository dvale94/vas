import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';

class AdminInfo extends Component {
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
            phoneNumber
        } = this.props.info;

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
                        
                    </Grid>
                </Grid>    
            </ListItem>
        );
    }
}

export default AdminInfo;