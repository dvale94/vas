import React, { Component } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const useStyles = {
    root: {
       minWidth: 100,
       marginTop: "10px",
       display: 'flex',
       flexDirection: 'column',
       alignItems: 'center',
       paddingLeft: 30,
       paddingRight: 30
    },
    alert:{
        minWidth: 10,
        maxWidth: 500
    }
};


class AccessDenied extends Component {
    render() {
        return (
            <div className={this.props.classes.root}>
                 <Grid container direction="column"alignItems="center" justify="center">

                     <div className={this.props.classes.alert}>
                        <Alert severity="error" >
                            <AlertTitle>Error</AlertTitle>
                                Sorry, you are not allowed to access this page. 
                        </Alert>
                        </div>

                </Grid>
            </div>
        );
    }
}

export default withStyles(useStyles)(AccessDenied);