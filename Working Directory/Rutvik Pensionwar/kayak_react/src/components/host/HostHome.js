import React, {Component} from 'react';
import { Route, withRouter, Switch, Link } from 'react-router-dom';
import HotelPage from "./HotelPage";
import FlightPage from "./FlightPage";
import CarPage from "./CarPage";
import HostProfile from "./HostProfile";

class HostHome extends Component {


    handleSubmit = (userdata) => {
    };

    render() {
        return (
            <div className="container-fluid">
                //Host<br/><hr/>
                <Link to='/admin/hotel'><span className="glyphicon glyphicon-circle-arrow-right"></span>Hotel</Link>
                <Link to='/admin/flight'><span className="glyphicon glyphicon-circle-arrow-right"></span>Flight</Link>
                <Link to='/admin/car'><span className="glyphicon glyphicon-circle-arrow-right"></span>Car</Link>
                <Link to='/admin/profile'><span className="glyphicon glyphicon-circle-arrow-right"></span>Profile</Link>
                <Switch>

                    <Route exact path="/host" render={() => {
                        return(
                            <div>
                                Host Home
                            </div>
                        )
                    }}/>

                    <Route path="/host/hotel" render={() => (
                        <HotelPage
                            validateUserSession={this.validateUserSession}
                            handleLogout={this.handleLogout}
                            // username={this.state.username}
                        />
                    )}/>

                    <Route path="/host/flight" render={() => (
                        <FlightPage
                            validateUserSession={this.validateUserSession}
                            handleLogout={this.handleLogout}
                            // username={this.state.username}
                        />
                    )}/>

                    <Route path="/host/car" render={() => (
                        <CarPage
                            validateUserSession={this.validateUserSession}
                            handleLogout={this.handleLogout}
                            // username={this.state.username}
                        />
                    )}/>

                    <Route path="/host/profile" render={() =>
                        <HostProfile
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

export default withRouter(HostHome);