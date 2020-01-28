import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import { Link } from "react-router-dom";

const theme = createMuiTheme({
    palette: {
      primary: {
          main: "#455a64"
      },
    }
  });

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    display: 'felx',
    minHeight: 45,
    maxHeight:64,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: 'white',
  },
  lgin: {
    color: 'white !important'
  },
  link: {
    textDecoration: 'none'
  }
}));

export default function NavBar() {
  
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar className={classes.toolbar}>
          <Link to='/' className={classes.link}>
            <Typography className={classes.title} variant='h5'>
            Volunteer Attendance System
            </Typography>
          </Link>
          <Button className={classes.login} >
              Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
    </ThemeProvider>
  );
}

