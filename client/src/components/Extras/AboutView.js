import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { blueGrey, blue, grey, yellow } from '@material-ui/core/colors';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import { Link } from "react-router-dom";

const useStyles = {
    all: {
        backgroundColor: '#fafafa',
        height: '100vh'
    },
    cardHeader: {
        height: 60,
        backgroundColor: blue[500]
    },
    cardHeaderNames: {
        height: 60,
        backgroundColor: blueGrey[600]
    },
    card: {
        marginTop: 10,
        minWidth: "80%",
        maxwidth: 100,
        height: 600,
        backgroundColor: '#fafafa',
        marginBottom: '20px',
        'overflow-x': 'hidden'
    },
    cardTitle: {
        fontSize: "20px",
        fontWeight: 800,
        color: 'white'
    },
    title: {
        fontSize: 20,
        fontWeight: 800,
        color: grey[800],
    },
    regular: {
        fontSize: 16,
        //fontWeight: 800,
        color: grey[800],
    },
    names: {
        fontSize: 20,
        fontWeight: 600,
        marginTop: '14px',
        color: 'white'
        //color: grey[800],
    },
    center: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 10,
      },
      main: {
        fontSize: 30,
        fontWeight: 800,
        color: grey[1000],
        alignItems: 'left',
        justify: 'left',
    },
}

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}


class AboutView extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    



    render(){
        return (
            <div style={{marginTop: '10px'}}>
            <Fragment>

            <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            >

                    <Typography
                        className={this.props.classes.main}
                        display="inline"
                        style={{marginBottom: '5px'}}>
                            Project Credits 
                    </Typography>

            </Grid>

                <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center">
                    
                    {/* CARD */}
                    <Box 
                    borderRadius="10px"
                    boxShadow={3}
                    className={this.props.classes.card} 
                    variant="outlined"
                    justify="center">

                        {/* CARD HEADING */}
                        <Box 
                        borderRadius="10px 10px 0px 0px"
                        boxShadow={2}
                        className={this.props.classes.cardHeader}
                        variant="outlined"
                        justify="center">

                            <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="center">

                                <Typography
                                className={this.props.classes.cardTitle}
                                style={{marginTop: '14px'}}>
                                    Version 1 
                                </Typography>
                            </Grid>


                      {/* HERE */}
                      <Grid style={{paddingLeft: '15px', paddingTop: '10px', paddingRight: '15px', paddingBottom: '15px',}}>
                            
                            <Typography
                            className={this.props.classes.regular}
                            style={{marginBottom: '15px', marginTop: '15px', alignItems: 'left'}}>
                                This first iteration of this project was started as part of FIU's Computer Science Senior Project.
                            </Typography>
                            <Typography
                            className={this.props.classes.title}
                            style={{marginBottom: '15px', marginTop: '15px', alignItems: 'left'}}>
                                Developers:
                            </Typography>

                            <Grid
                            container
                            direction="row"
                            justify="space-evenly"
                            alignItems="center"
                            spacing={3}
                            >

                                <Grid container item xs={12} sm={6}
                                direction="column"
                                justify="center"
                                alignItems="center" >


                                    <Box
                                    boxShadow={1}
                                    borderRadius="10px"
                                    style={{backgroundColor:'white', width: "100%"}}>

                                        {/* CARD HEADING */}
                                        <Box 
                                        borderRadius="10px 10px 0px 0px"
                                        boxShadow={2}
                                        className={this.props.classes.cardHeaderNames}
                                        variant="outlined"
                                        justify="center">

                                        <div className={this.props.classes.center}>
                                        <Typography className={this.props.classes.names}>
                                            Aurelien Meray
                                        </Typography>
                                        </div>

                                        </Box>
                                        <List className={this.props.classes.root}>
                                            <ListItemLink href="https://github.com/AurelienMeray">
                                                <ListItemAvatar>
                                                <Avatar>
                                                    <GitHubIcon />
                                                </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary="Github" secondary="/AurelienMeray" />
                                                {/* </a> */}
                                            </ListItemLink>
                                            <Divider />
                                            <ListItemLink href="https://www.linkedin.com/in/aurelienmeray/">
                                                <ListItemAvatar>
                                                <Avatar>
                                                    <LinkedInIcon />
                                                </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary="LinkedIn" secondary="/aurelienmeray" />
                                            </ListItemLink>
                                        </List>
                                    </Box>


                                </Grid>

                                <Grid container item xs={12} sm={6}
                                direction="column"
                                justify="center"
                                alignItems="center" >


                                    <Box
                                    boxShadow={1}
                                    borderRadius="10px"
                                    style={{backgroundColor:'white', width: "100%"}}>

                                        {/* CARD HEADING */}
                                        <Box 
                                        borderRadius="10px 10px 0px 0px"
                                        boxShadow={2}
                                        className={this.props.classes.cardHeaderNames}
                                        variant="outlined"
                                        justify="center">

                                        <div className={this.props.classes.center}>
                                        <Typography className={this.props.classes.names}>
                                            Daniel Valencia
                                        </Typography>
                                        </div>

                                        </Box>
                                        <List className={this.props.classes.root}>
                                            <ListItemLink href="https://github.com/dvale94">
                                                <ListItemAvatar>
                                                <Avatar>
                                                    <GitHubIcon />
                                                </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary="Github" secondary="/dvale94" />
                                                {/* </a> */}
                                            </ListItemLink>
                                            <Divider />
                                            <ListItemLink href="https://www.linkedin.com/in/daniel-valencia1994/">
                                                <ListItemAvatar>
                                                <Avatar>
                                                    <LinkedInIcon />
                                                </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary="LinkedIn" secondary="/daniel-valencia1994" />
                                            </ListItemLink>
                                        </List>
                                    </Box>


                                </Grid>

                                </Grid>
                                </Grid>










                        </Box>





                        <Grid style={{paddingLeft: '15px', paddingTop: '10px', paddingRight: '15px', paddingBottom: '15px',}}>
                                

                        </Grid>
                    </Box>
                   </Grid>

            
            
            
            </Fragment>
            </div>
        )
    }
}


  export default (withRouter(withStyles(useStyles)(AboutView)));