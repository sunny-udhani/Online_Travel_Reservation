import React, {Component} from 'react';
import { Route, withRouter, Switch, Link } from 'react-router-dom';
// import * as API from '../api/user/API_SignIn';
import Login from "./Login";
import SignUp from "./SignUp";
import Message from "./Message";
import HotelSearch from "./HotelSearch";
import CarSearch from "./CarSearch";
import FlightSearch from "./FlightSearch";
import Welcome from "./Welcome";
import UserProfile from "./UserProfile";
import AdminHome from "../admin/AdminHome";

class UserHome extends Component {


    handleSubmit = (userdata) => {
    };

    render() {
        return (

            <div className="container-fluid">
                    User
                <hr/>
                <Link to='/u/hotel'><span className="glyphicon glyphicon-circle-arrow-right"></span>Hotel</Link>
                <Link to='/u/flight'><span className="glyphicon glyphicon-circle-arrow-right"></span>Flight</Link>
                <Link to='/u/car'><span className="glyphicon glyphicon-circle-arrow-right"></span>Car</Link>
                <Link to='/u/userprofile'><span className="glyphicon glyphicon-circle-arrow-right"></span>Profile</Link>
                <Link to='/admin'><span className="glyphicon glyphicon-circle-arrow-right"></span>Admin</Link>
                <button value='admin' onclick={(()=>{this.props.history.push("/admin")})}/>
                <Switch>
                    <Route exact path="/" render={() =>
                        <FlightSearch
                            // validateUserSession={this.validateUserSession}
                            // handleLogout={this.handleLogout}
                            // username={this.state.username}
                        />
                    }/>
                    <Route exact path="/u" render={() =>
                        <FlightSearch
                            // validateUserSession={this.validateUserSession}
                            // handleLogout={this.handleLogout}
                            // username={this.state.username}
                        />
                    }/>

                    {/*<Route path="/u/login" render={() =>
                            <Login handleSubmit={this.handleSubmit} invalidateUserSession={this.invalidateUserSession}/>
                    }/>*/}

{/*
                    <Route path="/welcome" render={() => (
                        <Welcome validateUserSession={this.validateUserSession} handleLogout={this.handleLogout}
                                 username={this.state.username}/>
                    )}/>
*/}

                    <Route path="/u/hotel" render={() => (
                        <HotelSearch
                            // validateUserSession={this.validateUserSession}
                            // handleLogout={this.handleLogout}
                            // username={this.state.username}
                        />
                    )}/>

                    <Route path="/u/hotel/:hotelsearch" render={() => (
                        {/*<hotelListing
                            // validateUserSession={this.validateUserSession}
                            // handleLogout={this.handleLogout}
                            // username={this.state.username}
                        />*/}
                    )}/>

                    <Route path="/u/flight" render={() => (
                        <FlightSearch
                            // validateUserSession={this.validateUserSession}
                            // handleLogout={this.handleLogout}
                            // username={this.state.username}
                        />
                    )}/>

                    <Route path="/u/flight/:flightsearch" render={() => (
                        {/*<FlightListing
                            // validateUserSession={this.validateUserSession}
                            // handleLogout={this.handleLogout}
                            // username={this.state.username}
                        />*/}
                    )}/>

                    <Route path="/u/car" render={() => (
                        <CarSearch
                            // validateUserSession={this.validateUserSession}
                            // handleLogout={this.handleLogout}
                            // username={this.state.username}
                        />
                    )}/>

                    <Route path="/u/car/:carsearch" render={() => (
                        {/*<CarListing
                            // validateUserSession={this.validateUserSession}
                            // handleLogout={this.handleLogout}
                            // username={this.state.username}
                        />*/}
                    )}/>

                    <Route path="/u/userprofile" render={() => (
                        <UserProfile
                            // validateUserSession={this.validateUserSession}
                            // handleLogout={this.handleLogout}
                            // username={this.state.username}
                        />
                    )}/>
                </Switch>
            </div>
        );
    }
}

export default withRouter(UserHome);