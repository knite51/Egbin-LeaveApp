import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import './HomeStyle.css'
import Header from '../header/Header';

class Home extends Component { 
    render() {
        return (
            <div>
                <Header />
     
              <div className="jumbotron">
                <h1 className="display-4 pull-left">Time Off Management</h1>
                    <div className="float-right mr-3"> 
                        {/* <img width="100px" alt="clock-time" src="https://st4.depositphotos.com/4323461/20704/v/1600/depositphotos_207042472-stock-illustration-man-wants-to-stop-the.jpg" />
                        <span className="fa fa-calendar fa-5x" ></span> */}
                    </div>
                <h1 className="lead mt-lead">Request  Leave For Different Purpose Such As Maternity Leave, Vacation , Medical Care etc.</h1>
                <hr className="my-4" />
                <p>Tested And Trusted Time Off Application</p>
                <p className="lead">
                    <Link className="btn btn-primary btn-lg" to="/register">Sign Up</Link>
                </p>
            </div>
            <div className="container mb-10">    
                <h2 className="text-primary text-center mb-5">Reasons To Take Leave</h2>
                <div className="row text-center features">
                
                    <div className="col-md-4">
                        <img alt="vacation"
                            src='https://i.imgur.com/OxYt7e0.png' />
                        <h5 className="mt-3">Travel With Friend And Family</h5>
                    </div>

                    <div className="col-md-4">
                   <img src="https://previews.123rf.com/images/emilystudio/emilystudio1705/emilystudio170500098/77924682-cartoon-pregnant-women.jpg" 
                   alt="paternity" />
                        <h5 className="mt-3">Paternity Leave</h5>
                     
                    </div>
                    <div className="col-md-4">
                    <img alt="medicare"
                            src='http://planmyhealth.in/Healthyblog/wp-content/uploads/2018/11/camp-4-500x500.png' />
                        <h5 className="mt-3">Medical Checkup</h5>
     
                     
                    </div>
                    <div className="col-md-4">
                    <img alt="medicare"
                            src='https://i.imgur.com/1ctoTjX.png' />
                        <h5 className="mt-3">Attend Meetups</h5>
     
                     
                    </div>
                    <div className="col-md-4">
                    <img alt="medicare"
                            src='https://images-na.ssl-images-amazon.com/images/I/61NWvT8vUoL._SX466_.jpg' />
                        <h5 className="mt-3">Marriage Purpose</h5>                 
                    </div>
                    <div className="col-md-4">
                    <img alt="medicare"
                            src='https://previews.123rf.com/images/lenm/lenm1107/lenm110700267/9991433-illustration-of-friends-having-a-beach-party.jpg' />
                        <h5 className="mt-3">Special Occassions</h5>
     
                     
                    </div>
                </div>
            </div>
        </div>
        )
    }

}
export default Home;