import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const classes = {
    container: {
        display: 'flex'
    },
    title: {
        flexGrow: 1
    }
}

class NavBar extends Component {

    render() {
        return (
            <div className={classes.container}>
                <AppBar position='static'>
                    <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default NavBar;