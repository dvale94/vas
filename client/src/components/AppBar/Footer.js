import React, { Component, Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import { withRouter } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import InfoIcon from '@material-ui/icons/Info';
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";

import { Link } from "react-router-dom";

import Grid from '@material-ui/core/Grid';


const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#455a64"
        },
        secondary: {
          main: "#fafafa"
        }
    }
});

const useStyles = {
  root: {
    flexGrow: 0,
    width: '100vw'
    
  },
  appBar: {
    top: 'auto',
    bottom: 0,
    opacity: "80%"
  },
  FIU: {
    height: "30px"
  }
};

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="up" in={!trigger}>
      {children}
    </Slide>
  );
}


class Footer extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  redirect_to_AboutPage = () => {
    this.props.history.push("/about"); 
  }

render(){
  const props = this.props;
  return (
    <ThemeProvider theme={theme}>
    <div className={this.props.classes.root} >
    <HideOnScroll {...props}>
    <AppBar position="fixed" color="secondary" className={this.props.classes.appBar}>
        <Toolbar>

        <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center">
        <img
            className={this.props.classes.FIU}
            src ={require("../../images/FIU_hrz_Color.png")}
            alt = "logo"
            />

            </Grid>

           
            <Button onClick={this.redirect_to_AboutPage} startIcon={<InfoIcon />} color="primary" href="#outlined-buttons">
        About
      </Button>
          
        </Toolbar>
      </AppBar>
      </HideOnScroll>
    </div>
    </ThemeProvider>
  );
}
}

export default connect ()(withRouter(withStyles(useStyles)(Footer)));