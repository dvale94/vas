import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { blueGrey, blue, grey } from '@material-ui/core/colors';

const useStyles = {
    all: {
        backgroundColor: '#fafafa',
        height: '100vh'
    },
    card: {
        marginTop: 10,
        minWidth: '80%',
        maxWidth: 750,
        height: '100%',
        backgroundColor: 'white'
    },
    buttons: {
        backgroundColor: blueGrey[700],
        color: "white",
        fontWeight: "bold",
        '&:hover': {
            backgroundColor: blue[500],
        }
    },
    main: {
        fontSize: 36,
        fontWeight: 800,
        color: grey[1000],
        alignItems: 'left',
        justify: 'left',
    },
    title: {
        fontSize: 18,
        fontWeight: 800,
        color: grey[800],
        alignItems: 'right'
    },
    this: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'left',
        minWidth: '80%',
      },
}

class AdminDashboard extends Component {
    
    // LINKS
    redirect_to_AdminManagement = () =>{
        this.props.history.push("/admin-management"); 
    }
    redirect_to_VolunteerManagement = () =>{
        this.props.history.push("/volunteer-management"); 
    }
    redirect_to_SchoolManagement = () =>{
        this.props.history.push("/schoolmanagement"); 
    }
    redirect_to_SchoolPersonnelManagement = () =>{
        this.props.history.push("/school-personnel-management"); 
    }
    redirect_to_TeamManagement = () =>{
        this.props.history.push("/team-management"); 
    }


    render(){
        return (
            <Fragment>
            {/* <div className={this.props.classes.this}> */}
            
            <Grid
                container
                style={{marginLeft: '10%'}}>
                     <Typography
                        className={this.props.classes.main}
                        style={{marginBottom: '15px'}}>
                            Dashboard
                    </Typography>
                    </Grid>
                    {/* </div> */}
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center">
                    

                    <Box 
                    borderRadius="3px"
                    boxShadow={3}
                    className={this.props.classes.card} 
                    variant="outlined"
                    justify="center">
                        <Grid style={{paddingLeft: '15px', paddingTop: '10px', paddingRight: '15px', paddingBottom: '15px',}}>
                            
                            <Typography
                            className={this.props.classes.title}
                            style={{marginBottom: '15px', alignItems: 'left'}}>
                                Administrator Management Tools:
                            </Typography>

                            <Grid
                            container
                            direction="row"
                            justify="space-evenly"
                            alignItems="center"
                            spacing={3}
                            >

                                <Grid container item xs >
                                    <Button
                                    className={this.props.classes.buttons}
                                    onClick={this.redirect_to_AdminManagement}
                                    variant="contained" 
                                    color="primary"
                                    size='medium'
                                    fullWidth>
                                        Admins
                                    </Button>
                                </Grid>

                                <Grid container item xs >
                                    <Button
                                    className={this.props.classes.buttons}
                                    onClick={this.redirect_to_VolunteerManagement}
                                    variant="contained" 
                                    color="primary"
                                    size='medium'
                                    fullWidth>
                                        Volunteers
                                    </Button>
                                </Grid>

                                <Grid container item xs >
                                    <Button
                                    className={this.props.classes.buttons}
                                    onClick={this.redirect_to_SchoolPersonnelManagement}
                                    variant="contained" 
                                    color="primary"
                                    //style={{width: '90%'}}
                                    fullWidth
                                    size='medium'
                                    >
                                        School Personnel
                                    </Button>
                                </Grid>

                                <Grid container item xs >
                                    <Button
                                    className={this.props.classes.buttons}
                                    onClick={this.redirect_to_SchoolManagement}
                                    variant="contained" 
                                    color="primary"
                                    size='medium'
                                    fullWidth>
                                        Schools
                                    </Button>
                                </Grid>

                                <Grid container item xs >
                                    <Button
                                    className={this.props.classes.buttons}
                                    onClick={this.redirect_to_TeamManagement}
                                    variant="contained" 
                                    color="primary"
                                    size='medium'
                                    fullWidth>
                                        Teams
                                    </Button>
                                </Grid>

                        </Grid>


                        </Grid>
                    </Box>
            </Grid>
            
            
            
            
            </Fragment>
        )
    }
}

export default (withRouter(withStyles(useStyles)(AdminDashboard)));