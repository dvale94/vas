import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { blueGrey, blue, grey, yellow } from '@material-ui/core/colors';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';


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
        fontSize: 18,
        fontWeight: 400,
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
                            About
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
                    style={{width: "380px"}}
                    variant="outlined"
                    justify="center">

                        {/* CARD HEADING */}
                        <Box 
                        borderRadius="10px 10px 0px 0px"
                        boxShadow={2}
                        className={this.props.classes.cardHeader}
                        style={{backgroundColor: blueGrey[700]}}
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
                                    FIU CS First Outreach Program 
                                </Typography>
                            </Grid>


                      <Grid style={{paddingLeft: '15px', paddingTop: '10px', paddingRight: '15px', paddingBottom: '15px',}}>
                            
                            <Typography
                            className={this.props.classes.regular}
                            style={{marginBottom: '15px', marginTop: '15px', alignItems: 'left'}}>
                                The <strong>CS First</strong> outreach program started at Florida International University's (FIU) School of Computing and Information Sciences (SCIS) 
                                    in the Spring of 2015, as an attempt to spread the knowledge of coding and Computer Science to elementary and middle schools near FIU. 
                                    Initially, only 2 elementary schools were involved, Sweetwater Elementary and Coral Park Elementary, with the Women in Computer Science (WICS ) 
                                    student organization and an SCIS instructor, Ms. Charters, as the only volunteers and organizers of the outreach.  
                                    Year after year, the outreach program has grown, expanding the number of elementary and middle schools that are served, and recruiting a greater number of FIU student volunteers.
                                    <br/><br/>
                                In the Spring of 2018, FIU's Computer Science student organization called  Upsilon Pi Epsilon (UPE), adopted <strong>CS First</strong> as its main outreach program.  
                                    Through UPE's frequent member meetings each semester, the organization has helped to recruit, train, and manage the volunteers in the outreach, to meet the increasing need for CS education 
                                    in elementary and middle schools, using the multitude of children's resources now available to teach CS, including Code.org' K-5 curriculum, Google's <strong>CS First</strong> curriculum,  and MIT's Scratch curriculum. 
                                    <br/><br/>
                                If you are interested in joining the <strong>CS First</strong> outreach program, go to <a href="https://upe.cs.fiu.edu/google-cs-first/" target="_blank">https://upe.cs.fiu.edu/google-cs-first/</a> to apply.  
                                    Each December, as a celebration of Computer Science Education week, <strong>CS First</strong> works with SCIS to help organize and run a "mini-hackathon" for the children involved with the outreach.  
                                    For more details, please go to  <a href="https://www.cis.fiu.edu/codefest-miami-2017-fiu/" target="_blank">https://www.cis.fiu.edu/codefest-miami-2017-fiu/</a>
                            </Typography>



                         </Grid>
                        </Box>
                    </Box>
                   </Grid>

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
                    style={{width: "380px"}}
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

                      <Grid style={{paddingLeft: '15px', paddingTop: '10px', paddingRight: '15px', paddingBottom: '15px',}}>
                            
                            <Typography
                            className={this.props.classes.regular}
                            style={{marginBottom: '15px', marginTop: '15px', alignItems: 'left'}}>
                                This system was created as a senior project by Aurelien and Daniel at Florida International University (FIU), during the Spring 2020 semester. 
                                It was designed to automate the tracking of FIU students that volunteer each week to teach elementary and middle school students how to code.  
                                <br/><br/>
                                In this first phase, the system gives the administrators of the outreach program the ability to track FIU student volunteers, the teams that they form, 
                                the schools that they visit, and the school personnel associated with each school.  This system also allows FIU student volunteers and school personnel 
                                the ability to see each other's contact information and schedule of school visits, thereby facilitating the communication between all parties.
                                <br/><br/>
                                Many thanks go to Aurelien and Daniel for developing, testing, and deploying the <strong>CS First</strong> Outreach Volunteer System.

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
                    </Box>
                   </Grid>

            
            
            
            </Fragment>
            </div>
        )
    }
}


  export default (withRouter(withStyles(useStyles)(AboutView)));