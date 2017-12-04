import React, {Component} from 'react';
import {connect} from "react-redux";
import { Route, withRouter, Switch, Link, Redirect } from 'react-router-dom';

import FlightBooking from "./FlightBooking";
import HotelBooking from "./HotelBooking";
import CarBooking from "./CarBooking";
import Thankyou from "./Thankyou";

class UserPaymentPage extends Component {


    handleSubmit = (userdata) => {
    };


    render() {
        return (
            <div className="container-fluid">
                <Switch>

                    <Route path="/payment/flights" render={(match) =>{
                        return(
                            <FlightBooking />
                        )
                    }}/>

                    <Route path="/payment/hotels" render={(match) =>{
                        return(
                            <HotelBooking />
                        )
                    }}/>

                    <Route path="/payment/cars" render={(match) =>{
                        return(
                            <CarBooking />
                        )
                    }}/>

                    <Route path="/payment/thankyou" render={(match) =>{
                        return(
                            <Thankyou />
                        )
                    }}/>

                </Switch>
            </div>

        );
    }
}

function mapDispatchToProps(dispatch) {
    return {

    };
}

export default withRouter(connect(null, mapDispatchToProps)(UserPaymentPage));