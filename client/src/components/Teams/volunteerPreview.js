import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { createMuiTheme } from '@material-ui/core/styles';
import { blueGrey, blue } from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { clearErrors } from '../../actions/server/errorActions'
import { clearSuccess } from '../../actions/server/successActions'
import { addSchool } from "../../actions/schoolActions";
import Alert from '@material-ui/lab/Alert';
import isEmpty from 'is-empty';
import Grid from '@material-ui/core/Grid';
import Popover from '@material-ui/core/Popover';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


const theme = createMuiTheme({
    palette: {
      primary: blue,
    },
    shadows: ["none"]
  });

const useStyles = {
    bottomButtons: {
        backgroundColor: blueGrey[700],
        color: "white",
        fontWeight: "bold",
        '&:hover': {
            backgroundColor: blue[500],
        }
    },
};

class VolunteerPreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schoolName: '',
            schoolCode: '',
            level: '',
            phoneNumber: '',
            address: '',
            city: '',
            state: '',
            zipCode: '',
            isActive: true,
            anchorEl: null
        }

        this.addSchool = this.addSchool.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.exitDialog = this.exitDialog.bind(this);
    }


    addSchool() {
        this.props.clearErrors();
        this.props.clearSuccess();
        this.props.addSchool(this.state);
    }

    exitDialog() {
        this.props.clearErrors();
        this.props.clearSuccess();
        this.props.close();
    }

    handleInput = (e) =>{
        const value = e.target.value
        const name = e.target.name
    
        this.setState({
          [name]: value 
        })

        console.log(this.state)
    }
    
    successMessage() {
        if (!isEmpty(this.props.success.message)) {
            return <Alert severity="success">{this.props.success.message}</Alert> 
        }
    }

    render() {

        const { open } = this.props

        return (
            <ThemeProvider theme={theme}>

            <Popover
                    open={open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'center',
                        horizontal: 'left',
                      }}
                >
                    {/* <Typography className={this.props.classes.typography}>{this.props.volunteer.pantherID}</Typography>
                    <Button className={this.props.classes.bottomButtons} onClick={this.exitDialog} variant="contained" color="primary">Exit</Button> */}
                
                <Grid
                            container
                            spacing={0}
                            direction="column"
                            alignItems="center"
                            justify="center">
                                <Card 
                                className={this.props.classes.card} 
                                variant="outlined"
                                justify="center">
                                    <CardContent>
                                    {/* School Code */}
                                    <Typography className={this.props.classes.subHeading} color="textPrimary" variant="h6" display="inline" >
                                        Volunteer: &nbsp;
                                    </Typography>
                                    <Typography className={this.props.classes.body} color="textPrimary" variant="body1" display="inline" gutterBottom>
                                        {this.props.info.pantherID}<br/>
                                    </Typography>
                                <Button className={this.props.classes.bottomButtons} onClick={this.exitDialog} variant="contained" color="primary">Exit</Button> 

                
                </CardContent>
                </Card>
                </Grid>

                
                
                </Popover>
           {/*  <Dialog
            open={open}
            maxWidth="sm"
            >
                <DialogTitle >Add School</DialogTitle>
                { this.successMessage() }
                <DialogContent>
                    <DialogContentText>
                    To add a school, fill out the following form and click submit.
                    </DialogContentText>
                    <br></br>

                    

                    <br></br>
                </DialogContent>
                <DialogActions>
                    <Button className={this.props.classes.bottomButtons} onClick={this.addSchool}  variant="contained" color="primary">Add</Button>
                    <Button className={this.props.classes.bottomButtons} onClick={this.exitDialog} variant="contained" color="primary">Exit</Button>
                </DialogActions>
            </Dialog> */}
            </ThemeProvider>
        );
    }
}

VolunteerPreview.propTypes = {
    addSchool: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    clearSuccess: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    success: PropTypes.object.isRequired
  };

const mapStateToProps = state => ({
    errors: state.errors,
    success: state.success,
    schools: state.schoolData.schools
  });

export default connect (
    mapStateToProps,
    { addSchool, clearErrors, clearSuccess}
)(withRouter(withStyles(useStyles)(VolunteerPreview)));