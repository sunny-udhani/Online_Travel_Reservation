import React, {Component} from 'react';
import {connect} from "react-redux"
import {Route, withRouter, Switch, Link} from 'react-router-dom';
import UserSearchHome from "./search/UserSearchHome";
import UserProfile from "./UserProfile";
import HotelListing from "./listing/hotel/HotelListing";
import {hotelList_Success} from "../../actions";
import SwipeImageBackground from "./swipeImageBackground";

import Background from "../../img/main_slide_1.jpg";
import *  as HotelListingAPI from "../../api/user/API_GetHotels";
import *  as FlightListingAPI from "../../api/user/API_GetFlights";
import Payment from './HotelList/Preferences/Payment';

import * as LogAPI from "../../api/user/API_Logging";


import * as AlertConfig from "../../alertConfig";

import "../../css/bootstrap.min.css";
import "../../css/font-awesome.min.css";
import "../../css/style.css";
import "../../css/jquery-ui.min.css";
import "../../css/jquery-ui.structure.min.css";

import HotelSearch from "./search/hotel/HotelSearch";
import FlightSearch from "./search/flight/FlightSearch";
import CarSearch from "./search/car/CarSearch";

class UserHome extends Component {

    componentWillMount() {
        let click = {
            pageClick: {
                userId: "anonymous",
                pageName: "UserHome",
                date: new Date().getDate(),
                month: new Date().getMonth(),
                year: 1900 + new Date().getYear(),
                timeStamp: new Date().toLocaleTimeString()
            }
        };
        console.log(click);
        LogAPI.logClicksPerPage(click)
            .then(res => {
                console.log(`Logged ${click} status: ${res.status}`);
            })
            .catch(err => console.log(err));
    }

    // searchHotel = (searchCriteria) => {
    //     HotelListingAPI.getHotels(searchCriteria)
    //         .then(res => {
    //             console.log(res.status);
    //             if (res.status === 200) {
    //                 res.json()
    //                     .then(data => {
    //                         console.log(data);
    //                         this.props.hotelList_Success(data);
    //                     });
    //             } else {
    //                 console.log("error in getting list");
    //             }
    //         })
    //         .catch(err => {
    //             console.log("error");
    //             console.log(err);
    //         });
    // };

    listHotel = (searchCriteria) => {

        this.props.handlePageChange("/listing/hotel/" + searchCriteria);

    };

    listFlights = (searchCriteria) => {

        this.props.handlePageChange("/listing/flight/" + searchCriteria);

    };

    listCars = (searchCriteria) => {

        this.props.handlePageChange("/listing/cars/" + searchCriteria);

    };

    render() {
        let hotelsvg =
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="17" fill="black" viewBox="0 0 25 17">
                <path d="M2 14.77h21v2H2z"></path>
                <path
                    d="M6 7.07V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1.07h1V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1.07h2V0H4v7.07h2zM21 8.67H4a4.06 4.06 0 0 0-4 4.07v2.43h25v-2.43a4.06 4.06 0 0 0-4-4.07z"></path>
            </svg>

        let flightssvg = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black"
                              viewBox="0 0 20 20">
            <path
                d="M16.79 7.83l-3.93 3.93 4.51 7.05.76-.76-1.34-10.22M12.24 3.15L1.62 1.76l-.75.76 7.32 4.69 4.05-4.06"></path>
            <path
                d="M10.73 11.94l1.3-1.3 4.28-4.28 2.8-2.8s1.54-2.12.46-3.17-3.17.47-3.17.47l-2.62 2.62-4.4 4.4L8 9.24a20 20 0 0 0-2.23 3.2l-4.67-.89L0 12.62l3.79 2.65.92.92L7.41 20l1.07-1.1-.91-4.76a20.06 20.06 0 0 0 3.16-2.2z"></path>
        </svg>
        let carssvg = <svg xmlns="http://www.w3.org/2000/svg" width="32" height="16" fill="black"
                           viewBox="0 0 32 17">
            <path d="M10.6 2.77L.61 1.2V0h9.99v2.77"></path>
            <path fill="none" d="M12 1.84v3.33l8.14.11C18.29 3.56 16 1.87 14.72 1.84c-.96-.03-2.72 0-2.72 0z"></path>
            <path
                d="M31 7.77c-.87-1.6-8.41-2.52-8.41-2.52S17.3.46 14.53 0H6.37h1.5A7.73 7.73 0 0 0 3 1.59a18.47 18.47 0 0 0-3 4.23v3.83c0 3.86 1.55 4.49 2.53 4.52v-.13A3.76 3.76 0 1 1 10 14v.07l9-.01a3.76 3.76 0 0 1 7.52 0h.79a7 7 0 0 0 3.9-.93A28.38 28.38 0 0 0 31 7.77zm-19-2.6V1.84h2.72c1.3 0 3.56 1.72 5.42 3.45z"></path>
            <circle cx="22.71" cy="14.04" r="2.36"></circle>
            <circle cx="6.28" cy="14.04" r="2.36"></circle>
        </svg>
        let stylish = {
            marginTop: "-98px"
        }
        return (
            <div>
                <div className="top-baner swiper-animate arrows">
                    <div className="swiper-container main-slider" data-autoplay="5000" data-loop="1" data-speed="900"
                         data-center="0"
                         data-slides-per-view="1">
                        <div className="swiper-wrapper" style={stylish}>
                            <div className="swiper-slide active" data-val="0">
                                <div className="clip">
                                    <div className="bg bg-bg-chrome act"
                                    />
                                </div>

                                <div className="vertical-align">
                                    <div className="container">
                                        <div className="row">
                                            <h2 className="search100">Search 100 Travel sites at once
                                            </h2></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pagination poin-style-1 hidden"></div>
                    </div>
                    <div className="arrow-wrapp m-200">
                        <div className="cont-1170">
                            {/*<div className="swiper-arrow-left sw-arrow"><span className="fa fa-angle-left"></span></div>*/}
                            {/*<div className="swiper-arrow-right sw-arrow"><span className="fa fa-angle-right"></span>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                    <div className="baner-tabs">
                        <div className="text-center">
                            <div className="drop-tabs">
                                <ul className="nav-tabs tpl-tabs tabs-style-1">
                                    <li className="active click-tabs">
                                        <Link to='/u/hotel'>{hotelsvg}Hotel</Link>
                                    </li>
                                    <li className="click-tabs">
                                        <Link to='/u/flight'>{flightssvg}Flight</Link>
                                    </li>
                                    <li className="click-tabs">
                                        <Link to='/u/cars'>{carssvg}Car</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="tab-content tpl-tabs-cont section-text t-con-style-1">
                            <div className="tab-pane active in" id="one">
                                <Switch>

                                    <Route exact path="/u" render={() =>
                                        <HotelSearch listHotel={this.listHotel}
                                            // validateUserSession={this.validateUserSession}
                                            // handleLogout={this.handleLogout}
                                            // username={this.state.username}
                                        />
                                    }/>

                                    <Route path="/u/hotel" render={() => (
                                        <HotelSearch listHotel={this.listHotel}/>
                                    )}/>


                                    <Route path="/u/flight" render={() => (
                                        <FlightSearch
                                            listFlight={this.listFlights}
                                            // validateUserSession={this.validateUserSession}
                                            // handleLogout={this.handleLogout}
                                            // username={this.state.username}
                                        />
                                    )}/>


                                    <Route path="/u/cars" render={() => (
                                        <CarSearch
                                            listCars={this.listCars}
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

export default withRouter(connect(null, mapDispatchToProps)(UserHome));