import React, { Component } from 'react';
import Button from '@material-ui/core/Button';


class Dashboard extends Component{
    
    //TEMPORARY REMOVE LATER
    redirect_to_VolunteerManagement = () =>{
        this.props.history.push("/volunteermanagement"); 
    }
    redirect_to_SchoolManagement = () =>{
        this.props.history.push("/schoolmanagement"); 
    }


    render(){
        return (
            <div>

            {/*TEMPORARY REMOVE LATER*/}
                <br></br>
                <strong>Temporary Shortcuts:</strong>
                <br></br>
                <br></br>
                <Button
                    type="submit"
                    color=""
                    size="small"
                    variant="contained"
                    onClick={this.redirect_to_VolunteerManagement}
                    //
                >
                    Volunteer Management
                </Button>
                <p>       </p>
                <Button
                    type="submit"
                    color=""
                    size="small"
                    variant="contained"
                    onClick={this.redirect_to_SchoolManagement}
                    //
                >
                    School Management
                </Button>



            
            </div>
        )
    }
}

export default Dashboard;