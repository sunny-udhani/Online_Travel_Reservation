import React, {Component} from 'react';
import { Route, withRouter, Switch, Link } from 'react-router-dom';
import HotelPage from "./hotel/HotelPage";
import FlightPage from "./flight/FlightPage";
import AdminDashboard from "./AdminDashboard";
import CarPage from "./car/CarPage";
import AdminProfile from "./AdminProfile";
import HostPage from "./host/HostPage";
import UserPage from "./user/UserPage";

class AdminHome extends Component {


    handleSubmit = (userdata) => {
    };

    render() {
        return (
            <div className="list-wrapper">
                <div className="container">
                    <div className="row">
                        <br/><hr/>
                        <Link to='/admin/hotel'><span className="glyphicon glyphicon-circle-arrow-right"></span>Hotel</Link>
                        <Link to='/admin/flight'><span className="glyphicon glyphicon-circle-arrow-right"></span>Flight</Link>
                        <Link to='/admin/car'><span className="glyphicon glyphicon-circle-arrow-right"></span>Car</Link>
                        <Link to='/admin/profile'><span className="glyphicon glyphicon-circle-arrow-right"></span>Profile</Link>
                        <Link to='/admin/dashboard'><span className="glyphicon glyphicon-circle-arrow-right"></span>Dashboard</Link>
                        <Link to='/admin/host'><span className="glyphicon glyphicon-circle-arrow-right"></span>Host</Link>
                        <Link to='/admin/user'><span className="glyphicon glyphicon-circle-arrow-right"></span>User</Link>
                        <button className="btn btn-link" onClick={(()=>{this.props.handleLogout()})}>Logout</button>
                        <Switch>
                            <Route exact path="/admin" render={() => {
                                return (
                                    <div>
                                        {this.props.handlePageChange("/admin/dashboard")}
                                    </div>
                                )
                            }}/>

                            <Route path="/admin/dashboard" render={() => (
                                <AdminDashboard
                                    validateUserSession={this.validateUserSession}
                                    handleLogout={this.handleLogout}
                                    handlePageChange={this.props.handlePageChange}
                                    // username={this.state.username}
                                />
                            )}/>

                            <Route path="/admin/hotel" render={() => (
                                <HotelPage
                                    validateUserSession={this.validateUserSession}
                                    handleLogout={this.handleLogout}
                                    handlePageChange={this.props.handlePageChange}
                                    // username={this.state.username}
                                />
                            )}/>

                            <Route path="/admin/flight" render={() => (
                                <FlightPage
                                    // validateUserSession={this.validateUserSession}
                                    handleLogout={this.handleLogout}
                                    handlePageChange = {this.props.handlePageChange}
                                    // username={this.state.username}
                                />
                            )}/>

                            <Route path="/admin/car" render={() => (
                                <CarPage
                                    // validateUserSession={this.props.validateUserSession}
                                    handleLogout={this.handleLogout}
                                    handlePageChange = {this.props.handlePageChange}
                                    // username={this.state.username}
                                />
                            )}/>

                            <Route path="/admin/host" render={() => (
                                <HostPage
                                    // validateUserSession={this.props.validateUserSession}
                                    handleLogout={this.handleLogout}
                                    handlePageChange = {this.props.handlePageChange}
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

                            <Route path="/admin/user" render={() =>
                                <UserPage
                                    handleLogout={this.handleLogout}
                                    handlePageChange = {this.props.handlePageChange}
                                />
                            }/>
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(AdminHome);