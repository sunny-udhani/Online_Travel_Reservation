import React, {Component} from 'react';
import { Route, withRouter, Switch, Link, Redirect } from 'react-router-dom';
import HotelSearch from "./HotelSearch";
import CarSearch from "./CarSearch";
import FlightSearch from "./FlightSearch";
import UserProfile from "./UserProfile";
import HotelListing from "./HotelListing";
import {hotelList_Success, flightList_Success} from "../../actions/index";
import {connect} from "react-redux";
import * as HotelListingAPI from "../../api/user/API_GetHotels";
import * as FlightListingAPI from "../../api/user/API_GetFlights";
import FlightListing from "./FlightListing";
import CarListing from "./CarListing";

class Listing extends Component {


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

    render() {
        return (
            <div className="container-fluid">
                <Switch>

                    <Route path="/listing/hotel/:criteria" render={(match) =>{
                        return(
                            <HotelListing {...match} searchHotel={this.searchHotel} />
                        )
                    }}/>

                    <Route path="/listing/flight/:criteria" render={(match) => {
                        return(
                            <FlightListing {...match} searchFlights={this.searchFlights} />
                        )
                    }}/>

                    <Route path="/listing/car" render={(match) => {
                        return(
                            <CarListing {...match} searchCars={this.searchCars} />
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
        }
    };
}

export default withRouter(connect(null, mapDispatchToProps)(Listing));