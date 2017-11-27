import React, {Component} from 'react';
import {Route, withRouter, Switch, Link} from 'react-router-dom';

import Login from '../Login'
import SignUp from '../SignUp'
import UserHome from './UserHome'
import UserProfile from './UserProfile'
import FlightSearch from './FlightSearch'
import HotelSearch from './HotelSearch'
import CarSearch from './CarSearch'

import '../../design/css/bootstrap.min.css'
import '../../design/css/jquery-ui.min.css'
import '../../design/css/jquery-ui.structure.min.css'
import '../../design/css/style.css'
import '../../design/css/modal.css'
import '../../design/css/myacc.css'



class Home extends Component {

    constructor() {
        super();
        this.state = {
            signupForm: <SignUp />,
            signinForm: <Login />,
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

    render() {
        return (
            <div className="container">

                <header className="color-1 hovered menu-3">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="nav">
                                    <a href="index.html" className="logo">
                                        <img src="https://a1.r9cdn.net/rimg/provider-logos/common/socialmedia/kayak-logo.png?width=440&height=220&crop=false"
                                             style={{height: "30%", width: "70%"}}/>
                                    </a>

                                    <div className="nav-menu-icon">
                                        <a href="#"><i></i></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-9">
                                <nav className="menu">
                                    <ul>
                                        <li className="type-1 active">
                                            <Link to='/u/hotel'>Hotel</Link>
                                        </li>
                                        <li className="type-1">
                                            <Link to='/u/flight'>Flight</Link>

                                        </li>
                                        <li className="type-1">
                                            <Link to='/u/car'>Car</Link>

                                        </li>
                                        <li className="type-1"><a href="#">My Account<span
                                            className="fa fa-angle-down"></span></a>
                                            <ul className="dropmenu">
                                                <li><a href = "#" onClick={this.renderSignupForm.bind(this)}>Sign Up</a></li>
                                                <li><a href = "#" onClick={this.renderSigninForm.bind(this)}>Sign In</a></li>
                                                <li><a href="car_block.html">Trips</a></li>
                                                <li><a href="car_detail.html">Watchlist</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </nav>
                            </div>

                        </div>
                    </div>
                </header>

                <div className="myacc-dropdown">
                    {this.state.showSigninForm ? this.state.signinForm : ''}
                    {this.state.showSignupForm ? this.state.signupForm : ''}
                </div>
            </div>

        );
    }
}

export default withRouter(Home);