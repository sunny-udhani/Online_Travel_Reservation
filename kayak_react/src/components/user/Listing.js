import React, {Component} from 'react';
import { Route, withRouter, Switch, Link, Redirect } from 'react-router-dom';
import HotelSearch from "./HotelSearch";
import CarSearch from "./CarSearch";
import FlightSearch from "./FlightSearch";
import UserProfile from "./UserProfile";
import HotelListing from "./HotelListing";
import {hotelList_Success} from "../../actions/index";
import {connect} from "react-redux";
import * as HotelListingAPI from "../../api/user/API_GetHotels";

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

    render() {
        return (
            <div className="container-fluid">
                <Switch>

                    <Route path="/listing/hotel/:criteria" render={(match) =>{
                        return(
                            <HotelListing {...match} searchHotel={this.searchHotel} />
                        )
                    }}/>

                    <Route path="/listing/flight" render={() => {
                        return(
                            <div>
                                <h1>Flight</h1>
                            </div>
                        )
                    }}/>

                    <Route path="/listing/car" render={() => {
                        return(
                            <div>
                                <h1>Car</h1>
                            </div>
                        )
                    }}/>
                </Switch>
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

export default withRouter(connect(null, mapDispatchToProps)(Listing));