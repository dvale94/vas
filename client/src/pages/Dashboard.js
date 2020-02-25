import React, { Component } from 'react';
import Button from '@material-ui/core/Button';


class Dashboard extends Component{
    
    //TEMPORARY REMOVE LATER
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
            <div>

            {/*TEMPORARY REMOVE LATER*/}
                <br></br>
                <strong>Temporary Shortcuts:</strong>
                <br></br>
                <br></br>
                <Button
                    type="submit"
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
                    size="small"
                    variant="contained"
                    onClick={this.redirect_to_SchoolManagement}
                    //
                >
                    School Management
                </Button>
                <p>       </p>
                <Button
                    type="submit"
                    size="small"
                    variant="contained"
                    onClick={this.redirect_to_SchoolPersonnelManagement}
                    //
                >
                    School Personnel Management
                </Button>
                <p>       </p>
                <Button
                    type="submit"
                    size="small"
                    variant="contained"
                    onClick={this.redirect_to_TeamManagement}
                    //
                >
                    Team Management
                </Button>



            
            </div>
        )
    }
}

export default Dashboard;