import React, {Component} from 'react';
import {Route, withRouter, Switch, Link} from 'react-router-dom';
import HotelPage from "./hotel/HotelPage";
import FlightPage from "./flight/FlightPage";
import AdminDashboard from "./AdminDashboard";
import CarPage from "./car/CarPage";
import AdminProfile from "./profile/AdminProfile";
import HostPage from "./host/HostPage";
import UserPage from "./user/UserPage";
import SideNav, {Nav, NavText} from 'react-sidenav';
import * as API from "../../api/admin/API";

class AdminHome extends Component {

    componentWillMount() {
        // API.validateAdminSession().then((response) => {
        //         if (response.status === 200) {
        //
        //         }else{
        //             this.props.handlePageChange("/u");
        //         }
        //     }
        // )
    }

    render() {
        return (
            <div className="list-wrapper">
                <div className="container">
                    <div className="row">
                        <div className="row">
                            <div style={{background: '#2c3e50', color: '#FFF', width: 100}} className="pull-left">
                                <SideNav highlightColor='#E91E63' highlightBgColor='#00bcd4' defaultSelected='sales'>
                                    <Link to="/admin/dashboard">
                                        <Nav id='dashboard'>
                                            <NavText>Dashboard</NavText>
                                        </Nav>
                                    </Link>
                                    <Link to="/admin/hotel">
                                        <Nav id='hotel'>
                                            <NavText>Hotel</NavText>
                                        </Nav>
                                    </Link>
                                    <Link to="/admin/flight">
                                        <Nav id='flight'>
                                            <NavText>Flight</NavText>
                                        </Nav>
                                    </Link>
                                    <Link to="/admin/car">
                                        <Nav id='car'>
                                            <NavText>Car</NavText>
                                        </Nav>
                                    </Link>
                                    <Link to="/admin/host">
                                        <Nav id='host'>
                                            <NavText>Host</NavText>
                                        </Nav>
                                    </Link>
                                    <Link to="/admin/user">
                                        <Nav id='user'>
                                            <NavText>User</NavText>
                                        </Nav>
                                    </Link>
                                    <Link to="/admin/bookings">
                                        <Nav id='booking'>
                                            <NavText>Bookings</NavText>
                                        </Nav>
                                    </Link>
                                    <Link to="/admin/profile">
                                        <Nav id='profile'>
                                            <NavText>Profile</NavText>
                                        </Nav>
                                    </Link>
                                </SideNav>
                            </div>
                        </div>
                        <div className="col-lg-11">
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
                                        handlePageChange={this.props.handlePageChange}
                                        // username={this.state.username}
                                    />
                                )}/>

                                <Route path="/admin/car" render={() => (
                                    <CarPage
                                        // validateUserSession={this.props.validateUserSession}
                                        handleLogout={this.handleLogout}
                                        handlePageChange={this.props.handlePageChange}
                                        // username={this.state.username}
                                    />
                                )}/>

                                <Route path="/admin/host" render={() => (
                                    <HostPage
                                        // validateUserSession={this.props.validateUserSession}
                                        handleLogout={this.handleLogout}
                                        handlePageChange={this.props.handlePageChange}
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
                                        handlePageChange={this.props.handlePageChange}
                                    />
                                }/>
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(AdminHome);