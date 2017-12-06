import React, {Component} from 'react';
import {connect} from "react-redux";
import { Route, withRouter, Switch, Link, Redirect } from 'react-router-dom';

import FlightBooking from "./FlightBooking";
import HotelBooking from "./HotelBooking";
import CarBooking from "./CarBooking";
import Thankyou from "./Thankyou";
import {doLogout} from "../../api/user/API_HandleLogout";

import '../../design/css/bootstrap.min.css'
import '../../design/css/jquery-ui.min.css'
import '../../design/css/jquery-ui.structure.min.css'
import '../../design/css/style.css'
import * as LogAPI from "../../api/user/API_Logging";

class UserPaymentPage extends Component {


    handleSubmit = (userdata) => {
    };

    componentWillMount(){
        let click = {
            pageClick:{
                userId: "anonymous",
                pageName: "UserPaymentPage",
                date: new Date().getDate(),
                month: new Date().getMonth(),
                year: 1900+new Date().getYear(),
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

    componentDidMount() {
        //
    };

    handleSignOut = () => {
        doLogout()
            .then((status) => {
                if (status === 200) {
                    console.log("Logout Successful");
                    this.props.history.push("/");
                }
            });
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