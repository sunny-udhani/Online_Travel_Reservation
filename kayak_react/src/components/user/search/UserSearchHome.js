import React, {Component} from 'react';
import {connect} from "react-redux"
import {Route, withRouter, Switch, Link} from 'react-router-dom';
import HotelSearch from "./hotel/HotelSearch";
import CarSearch from "./car/CarSearch";
import FlightSearch from "./flight/FlightSearch";
import UserProfile from "../UserProfile";
import {hotelList_Success} from "../../../actions/index";

import Background from "../../../img/main_slide_1.jpg";
import *  as HotelListingAPI from "../../../api/user/API_GetHotels";

import "../../../css/bootstrap.min.css";
import "../../../css/font-awesome.min.css";
import "../../../css/style.css";
import "../../../css/jquery-ui.min.css";
import "../../../css/jquery-ui.structure.min.css";

class UserSearchHome extends Component {

    searchHotel = (searchCriteria) => {
       this.props.searchHotel(searchCriteria);
    };

    handleSubmit = (userdata) => {
    };

    render() {
        return (

            <div>
                <div className="top-baner swiper-animate arrows">
                    <div className="swiper-container main-slider" data-autoplay="5000" data-loop="1" data-speed="900"
                         data-center="0"
                         data-slides-per-view="1">
                        <div className="swiper-wrapper">
                            <div className="swiper-slide active" data-val="0">
                                <div className="clip">
                                    <div className="bg bg-bg-chrome act"
                                         style={{backgroundImage: "url(" + Background + ")"}}/>
                                </div>
                                <div className="vertical-align">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="main-title vert-title">
                                                    <div className="top-weather-info delay-1">
                                                        <p>London</p>
                                                        <img src="../../img/weather_icon.png" alt=""/>
                                                        <span>+30&deg;C</span>
                                                    </div>
                                                    <h1 className="color-white delay-1">amazing santorini <br/> 7 days
                                                        tour
                                                    </h1>
                                                    <p className="color-white-op delay-2">Book a holiday to
                                                        santorini.</p>
                                                    <button className="c-button bg-aqua hv-transparent delay-2"><img
                                                        src="../../img/loc_icon.png" alt=""/><span>view our tours</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide" data-val="1">
                                <div className="clip">
                                    <div className="bg bg-bg-chrome act"
                                         style={{backgroundImage: "url(" + Background + ")"}}>
                                    </div>
                                </div>
                                <div className="vertical-align">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="main-title vert-title">
                                                    <div className="top-weather-info delay-1">
                                                        <p>London</p>
                                                        <img src="../../img/weather_icon.png" alt=""/>
                                                        <span>+30&deg;C</span>
                                                    </div>
                                                    <h1 className="color-white delay-1">amazing santorini<br/> 7 days
                                                        tour
                                                    </h1>
                                                    <p className="color-white-op delay-2">Curabitur nunc erat, consequat
                                                        in
                                                        erat ut,
                                                        congue
                                                        bibendum nulla. Suspendisse id pharetra lacus, et hendrerit mi
                                                        quis
                                                        leo
                                                        elementum.</p>
                                                    <a href="#" className="c-button bg-aqua delay-2"><img
                                                        src="../../img/loc_icon.png"
                                                        alt=""/><span>view our tours</span></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pagination poin-style-1 hidden"></div>
                    </div>
                    <div className="arrow-wrapp m-200">
                        <div className="cont-1170">
                            <div className="swiper-arrow-left sw-arrow"><span className="fa fa-angle-left"></span></div>
                            <div className="swiper-arrow-right sw-arrow"><span className="fa fa-angle-right"></span>
                            </div>
                        </div>
                    </div>
                    <div className="baner-tabs">
                        <div className="text-center">
                            <div className="drop-tabs">
                                <ul className="nav-tabs tpl-tabs tabs-style-1">
                                    <li className="active click-tabs">
                                        <Link to='/u/hotel'>Hotel</Link>
                                    </li>
                                    <li className="click-tabs">
                                        <Link to='/u/flight'>Flight</Link>
                                    </li>
                                    <li className="click-tabs">
                                        <Link to='/u/car'>Car</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="tab-content tpl-tabs-cont section-text t-con-style-1">
                            <div className="tab-pane active in" id="one">
                                <Switch>
                                    <Route exact path="/" render={() =>
                                        <HotelSearch searchHotel={this.searchHotel}
                                            // validateUserSession={this.validateUserSession}
                                            // handleLogout={this.handleLogout}
                                            // username={this.state.username}
                                        />
                                    }/>
                                    <Route exact path="/u" render={() =>
                                        <HotelSearch searchHotel={this.searchHotel}
                                            // validateUserSession={this.validateUserSession}
                                            // handleLogout={this.handleLogout}
                                            // username={this.state.username}
                                        />
                                    }/>

                                    <Route exact path="/u/hotel" render={() => (
                                        <HotelSearch searchHotel={this.searchHotel}/>
                                    )}/>


                                    <Route exact path="/u/flight" render={() => (
                                        <FlightSearch
                                            // validateUserSession={this.validateUserSession}
                                            // handleLogout={this.handleLogout}
                                            // username={this.state.username}
                                        />
                                    )}/>

                                    <Route exact path="/u/car" render={() => (
                                        <CarSearch
                                            // validateUserSession={this.validateUserSession}
                                            // handleLogout={this.handleLogout}
                                            // username={this.state.username}
                                        />
                                    )}/>

                                </Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return {
        hotelList_Success: (email, message) => {
            dispatch(hotelList_Success(email, message))
        }
    };
}


export default withRouter(connect(null, mapDispatchToProps)(UserSearchHome));