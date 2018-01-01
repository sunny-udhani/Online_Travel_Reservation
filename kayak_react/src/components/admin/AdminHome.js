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
import {Button} from 'reactstrap';
import HotelBookingsPage from '../admin/booking/hotel/HotelBookingsPage';
import CarBookingsPage from '../admin/booking/car/CarBookingsPage';
import FlightBookingsPage from '../admin/booking/flight/FlightBookingsPage';

class AdminHome extends Component {

    validateSession(){
        API.validateAdminSession().then((response) => {
            /*if (response.status === 200) {
                console.log("Admin Logged Successfully");
            }else {
                this.props.handlePageChange("/u");
            }*/
        })
    }

    componentWillMount() {
       this.validateSession();
    }

    render() {
        return (
            <div className="list-wrapper">
                <div className="container">
                    <div className="row">
                        <div className="row">
                            <div style={{background: '#2c3e50', color: '#FFF', width: 120}} className="pull-left">
                                <SideNav highlightColor='#E91E63' highlightBgColor='#00bcd4' defaultSelected='sales'>
                                    <Nav id='dashboard'>
                                        <NavText style={{align:"center"}}><Button style={{color: '#FFF'}} className="btn btn-link" onClick={(()=>{this.props.handlePageChange("/admin/dashboard")})}>Dashboard</Button></NavText>
                                    </Nav>
                                    <Nav>
                                        <NavText className="text-center">Listing</NavText>
                                        <Nav id='hotel'>
                                            <NavText><Button className="btn btn-link" onClick={(()=>{this.props.handlePageChange("/admin/hotel")})}>Hotel</Button></NavText>
                                        </Nav>
                                        <Nav id='flight'>
                                            <NavText><Button className="btn btn-link" onClick={(()=>{this.props.handlePageChange("/admin/flight")})}>Flight</Button></NavText>
                                        </Nav>
                                        <Nav id='car'>
                                            <NavText><Button className="btn btn-link" onClick={(()=>{this.props.handlePageChange("/admin/car")})}>Car</Button></NavText>
                                        </Nav>
                                    </Nav>
                                    <Nav id='host'>
                                        <NavText className="text-center"><Button style={{color: '#FFF'}} className="btn btn-link" onClick={(()=>{this.props.handlePageChange("/admin/host")})}>Host</Button></NavText>
                                    </Nav>
                                    <Nav id='user'>
                                        <NavText><Button style={{color: '#FFF'}} className="btn btn-link" onClick={(()=>{this.props.handlePageChange("/admin/user")})}>User</Button></NavText>
                                    </Nav>
                                    <Nav id='booking'>
                                        <NavText>Bookings</NavText>
                                        <Nav id="hotel">
                                            <NavText><Button className="btn btn-link" onClick={(()=>{this.props.handlePageChange("/admin/hotelbooking")})}>Hotel</Button></NavText>
                                        </Nav>
                                        <Nav id="flight">
                                            <NavText><Button className="btn btn-link" onClick={(()=>{this.props.handlePageChange("/admin/flightbooking")})}>Flight</Button></NavText>
                                        </Nav>
                                        <Nav id="car">
                                            <NavText><Button className="btn btn-link" onClick={(()=>{this.props.handlePageChange("/admin/carbooking")})}>Car</Button></NavText>
                                        </Nav>
                                    </Nav>
                                    <Nav id='profile'>
                                        <NavText><Button style={{color: '#FFF'}} className="btn btn-link" onClick={(()=>{this.props.handlePageChange("/admin/profile")})}>Profile</Button></NavText>
                                    </Nav>
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
                                        handlePageChange={this.props.handlePageChange}
                                    />
                                }/>

                                <Route path="/admin/user" render={() =>
                                    <UserPage
                                        handleLogout={this.handleLogout}
                                        handlePageChange={this.props.handlePageChange}
                                    />
                                }/>

                                <Route path="/admin/hotelbooking" render={() =>
                                    <HotelBookingsPage
                                        handleLogout={this.handleLogout}
                                        handlePageChange={this.props.handlePageChange}
                                    />
                                }/>

                                <Route path="/admin/flightbooking" render={() =>
                                    <FlightBookingsPage
                                        handleLogout={this.handleLogout}
                                        handlePageChange={this.props.handlePageChange}
                                    />
                                }/>

                                <Route path="/admin/carbooking" render={() =>
                                    <CarBookingsPage
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