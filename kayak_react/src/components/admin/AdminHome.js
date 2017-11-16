import React, {Component} from 'react';
import { Route, withRouter, Switch, Link } from 'react-router-dom';
// import * as API from '../api/user/API_SignIn';
import Login from "./Login";
import SignUp from "./SignUp";
import Message from "./Message";
// import Welcome from "./Welcome";
import HotelPage from "./HotelPage";
import FlightPage from "./FlightPage";
import CarPage from "./CarPage";
import AdminProfile from "./AdminProfile";

class AdminHome extends Component {


    handleSubmit = (userdata) => {
    };

    render() {
        return (
            <div className="container-fluid">
                //Admin<br/><hr/>
                <Link to='/admin/hotel'><span className="glyphicon glyphicon-circle-arrow-right"></span>Hotel</Link>
                <Link to='/admin/flight'><span className="glyphicon glyphicon-circle-arrow-right"></span>Flight</Link>
                <Link to='/admin/car'><span className="glyphicon glyphicon-circle-arrow-right"></span>Car</Link>
                <Link to='/admin/profile'><span className="glyphicon glyphicon-circle-arrow-right"></span>Profile</Link>
                <Switch>

                    <Route exact path="/admin" render={() => <SignUp handleSubmitRegister={this.handleRegister}/>}/>

                    <Route path="/admin/login" render={() => (
                        <div>
                            <Login handleSubmit={this.handleSubmit} invalidateUserSession={this.invalidateUserSession}/>
                        </div>
                    )}/>

                    <Route path="/admin/hotel" render={() => (
                        <HotelPage
                            validateUserSession={this.validateUserSession}
                            handleLogout={this.handleLogout}
                            // username={this.state.username}
                        />
                    )}/>

                    <Route path="/admin/flight" render={() => (
                        <FlightPage
                            validateUserSession={this.validateUserSession}
                            handleLogout={this.handleLogout}
                            // username={this.state.username}
                        />
                    )}/>

                    <Route path="/admin/car" render={() => (
                        <CarPage
                            validateUserSession={this.validateUserSession}
                            handleLogout={this.handleLogout}
                            // username={this.state.username}
                        />
                    )}/>

                    <Route path="/admin/profile" render={() =>
                        <AdminProfile
                            // validateUserSession={this.validateUserSession}
                            // handleLogout={this.handleLogout}
                            // username={this.state.username}
                        />
                    }/>
                </Switch>
            </div>
        );
    }
}

export default withRouter(AdminHome);