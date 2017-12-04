import React, {Component} from 'react';
import {Route, withRouter, Switch, Link, Redirect} from 'react-router-dom';
import HotelSearch from "../search/hotel/HotelSearch";
import CarSearch from "../search/car/CarSearch";
import FlightSearch from "../search/flight/FlightSearch";
import UserProfile from "../UserProfile";
import HotelListing from "./hotel/HotelListing";
import {hotelList_Success, flightList_Success} from "../../../actions/index";
import {connect} from "react-redux";
import * as HotelListingAPI from "../../../api/user/API_GetHotels";
import * as FlightListingAPI from "../../../api/user/API_GetFlights";
import * as CarListingAPI from "../../../api/user/API_GetCars";
import FlightListing from "./flight/FlightListing";
import CarListing from "./car/CarListing";
import {carList_Success} from "../../../actions/index";

class Listing extends Component {

    constructor(props) {

        super(props);

        this.handlePageChange = this.handlePageChange.bind(this);

    }

    handleSubmit = (userdata) => {
    };

    searchHotel = (searchCriteria) => {
        HotelListingAPI.getHotels(searchCriteria)
            .then(res => {
                console.log(res.status);
                if (res.status === 200) {
                    res.json()
                        .then(data => {
                            console.log(data);
                            this.props.hotelList_Success(data);
                        });
                } else {
                    console.log("error in getting list");
                }
            })
            .catch(err => {
                console.log("error");
                console.log(err);
            });
    };

    searchFlights = (searchCriteria) => {
        FlightListingAPI.getFlights(searchCriteria)
            .then(res => {
                console.log(res.status);
                if (res.status === 200) {
                    res.json()
                        .then(data => {
                            console.log(data);
                            this.props.flightList_Success(data);
                        });
                } else {
                    console.log("error in getting list");
                }
            })
            .catch(err => {
                console.log("error");
                console.log(err);
            });
    };

    searchCars = (searchCriteria) => {
        CarListingAPI.getCars(searchCriteria)
            .then(res => {
                console.log(res.status);
                if (res.status === 200) {
                    res.json()
                        .then(data => {
                            console.log(data);
                            this.props.carList_Success(data);
                        });
                } else {
                    console.log("error in getting list");
                }
            })
            .catch(err => {
                console.log("error");
                console.log(err);
            });
    };

    handlePageChange(page) {
        console.log(this);
        this.props.handlePageChange(page);
    }

    render() {
        return (
            <div className="container-fluid">
                <Switch>

                    <Route path="/listing/hotel/:criteria" render={(match) => {
                        return (
                            <HotelListing {...match} searchHotel={this.searchHotel}
                                          handlePageChange={this.handlePageChange}/>
                        )
                    }}/>

                    <Route path="/listing/flight/:criteria" render={(match) => {
                        return (
                            <FlightListing {...match} searchFlights={this.searchFlights}
                                           handlePageChange={this.handlePageChange}/>
                        )
                    }}/>

                    <Route path="/listing/cars/:criteria" render={(match) => {
                        return (
                            <CarListing {...match} searchCars={this.searchCars}
                                        handlePageChange={this.handlePageChange}/>
                        )
                    }}/>
                </Switch>
            </div>

        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        hotelList_Success: (data) => {
            dispatch(hotelList_Success(data))
        },
        flightList_Success: (data) => {
            dispatch(flightList_Success(data))
        },
        carList_Success: (data) => {
            dispatch(carList_Success(data))
        },
    };
}

export default withRouter(connect(null, mapDispatchToProps)(Listing));