import React, {Component} from 'react';
import {Route, withRouter, Switch, Link, Redirect} from 'react-router-dom';
import AdminHome from "./admin/AdminHome";
import UserPaymentPage from "./user/UserPaymentPage";
import {connect} from "react-redux"

import Login from "./Login";
import SignUp from "./SignUp";

import '../design/css/home.css'

import * as API from "../api/API";
import {doLogout} from "../api/user/API_HandleLogout";

import UserHome from "./user/UserHome";

import "../css/bootstrap.min.css"
import "../css/font-awesome.min.css"
import "../css/style.css"
import "../css/jquery-ui.min.css"
import "../css/jquery-ui.structure.min.css"
import Listing from "./user/Listing";
import Payment from './user/HotelList/Preferences/Payment';
import Preferences from "./user/HotelList/Preferences/Preferences";
import TripHistory from "./user/HotelList/Preferences/TripHistory";
import Display from './user/HotelList/components/Display.js';
import ProfileIconEditor from './user/HotelList/Preferences/ProfileIconEditor.js';


class Kayak extends Component {

    constructor() {
        super();
        this.state = {
            signupForm: <SignUp/>,
            signinForm: <Login/>,
            showSignupForm: false,
            showSigninForm: false
        };
    }

    renderSigninForm() {
        this.setState({
            showSigninForm: true
        });
    }

    renderSignupForm() {
        this.setState({
            showSignupForm: true
        });
    }

    handleSubmit = (userdata) => {
    };

    handlePageChange = ((page) => {
        this.props.history.push(page);
    });

    componentWillMount() {
        // this.showLoginOption();
    }

    handleSignOut = () => {
        doLogout()
            .then((status) => {
                if (status === 200) {
                    console.log("Logout Successful");
                    this.props.history.push("/");
                }
            });
    };

    showLoginOption = ((item) => {
        console.log(item);
        console.log(this.props.admi);
        API.validateSession().then((response) => {
            if (response.status === 200) {
                let username;
                response.json().then((data) => {
                    username = data.username;
                });
                return (
                    <div>
                        User Email : {this.username}
                    </div>
                )
            }
            // else if(response.status===201){
            //     let username;
            //     response.json().then((data)=>{
            //         username = data.username;
            //     });
            //     return(
            //         <div>
            //             Admin Email : {this.username}
            //         </div>
            //     )
            // }
            else {
                return (
                    <div>
                        <Link to='/login'><span className="glyphicon glyphicon-circle-arrow-right"></span>Login</Link>
                        <Link to='/signup'><span className="glyphicon glyphicon-circle-arrow-right"></span>Sign
                            Up</Link>
                    </div>
                )
            }
        });


    });

    render() {
        let dashboard = '';
       // let profilepicture='';

        if (this.props.isLoggedIn === false) {


            dashboard =
                <ul className="dropmenu">
                    <li><a href="/signup" onClick={this.renderSignupForm.bind(this)}>Sign Up</a></li>
                    <li><a href="/login" onClick={this.renderSigninForm.bind(this)}>Sign In</a></li>
                </ul>

        }
        else {
            dashboard =
                <ul className="dropmenu">
                    <li><a href="#">Account Preferences {this.props.username} </a></li>
                    <li><a href="#" onClick={this.handleSignOut}>Sign Out</a></li>

                </ul>
            /*profilepicture=
                <li><ProfileIconEditor height="50" width="50"/></li>*/

        }


        return (
            <div>
                <div className="container">
                    <header className="color-1 hovered menu-3">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="nav">
                                        <nav className="menu">
                                            <ul>
                                                <li className="type-1 active">
                                                    <Link to="/u/hotel">home<span className="fa fa-angle-down"></span></Link>

                                                </li>
                                                <li className="type-1"><Link to="/u/hotel">Hotels
                                                    <span
                                                        className="fa fa-angle-down"></span></Link>

                                                </li>
                                                <li className="type-1"><Link to="/u/flight">Flights
                                                    <span
                                                        className="fa fa-angle-down"></span></Link>

                                                </li>
                                                <li className="type-1"><Link to="/u/cars">Cars
                                                    <span
                                                        className="fa fa-angle-down"></span></Link>

                                                </li>

                                                {/*Added myAccount Tab*/}
                                                <li className="type-1"><a href="#">My Account<span
                                                    className="fa fa-angle-down"></span></a>

                                                    {dashboard}

                                                </li>
                                                <li><ProfileIconEditor height="50" width="50"/></li>
                                            </ul>

                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                </div>

                <div className="myacc-dropdown">
                    {this.state.showSigninForm ? this.state.signinForm : ''}
                    {this.state.showSignupForm ? this.state.signupForm : ''}
                </div>

                <div className="container">
                    <Switch>
                        <Route exact path="/" render={() => {
                            return(
                               <div>
                                   {this.handlePageChange("/u")}
                               </div>
                            );
                        }}/>

                        <Route path="/payment" render={() =>
                            <UserPaymentPage/>
                        }/>

                        <Route path="/u" render={() =>
                            <UserHome
                                handlePageChange={this.handlePageChange}
                            />
                        }/>

                        <Route path="/listing" render={() =>
                            <Listing/>
                        }/>

                        <Route path="/signup" render={() =>
                            <SignUp
                                handleSubmit={this.handleSubmit}
                                invalidateUserSession={this.invalidateUserSession}/>
                        }/>

                        <Route path="/login" render={() =>
                            <Login
                                handleSubmit={this.handleSubmit}
                                invalidateUserSession={this.invalidateUserSession}
                                handlePageChange={this.handlePageChange}
                            />
                        }/>

                        <Route path="/admin" render={() => (
                            <AdminHome
                                handleLogout={this.handleLogout}
                                handlePageChange={this.handlePageChange}
                            />
                        )}/>

                        <Route path="/hotelroom" render={() => (
                            <Display/>
                        )}/>
                        <Route path="/pref" render={() => (
                            <Preferences/>
                        )}/>
                        <Route path="/payinfo" render={() => (
                            <Payment/>
                        )}/>
                        <Route path="/triphistory" render={() => (
                            <TripHistory/>
                        )}/>

                    </Switch>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {

    return {
        username: state.email,
        isLoggedIn: state.isLoggedIn
    };
}

//if you need to push something to state, use action -> reducer


export default withRouter(connect(mapStateToProps)(Kayak));

