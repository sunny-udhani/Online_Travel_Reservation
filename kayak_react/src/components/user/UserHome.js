import React, {Component} from 'react';
import { Route, withRouter, Switch, Link } from 'react-router-dom';
import HotelSearch from "./HotelSearch";
import CarSearch from "./CarSearch";
import FlightSearch from "./FlightSearch";
import UserProfile from "./UserProfile";

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