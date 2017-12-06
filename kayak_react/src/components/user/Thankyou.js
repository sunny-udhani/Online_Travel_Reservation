import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from "react-redux"

import '../../design/css/bootstrap.min.css'
import '../../design/css/jquery-ui.min.css'
import '../../design/css/jquery-ui.structure.min.css'
import '../../design/css/style.css'
import {logOnDivHover} from "../../api/user/API_Logging";
import * as LogAPI from "../../api/user/API_Logging";

class Thankyou extends Component {

    handleSubmit = (userdata) => {

    };

    showBooking = (() => {
        if (this.props.booking_state.operation === 'flight') {
            return (
                <div>
                    <h5><strong
                        className="color-red-3">{this.props.booking_state.flightObject.flightOperator}</strong>
                    </h5>
                    <h4><b>{this.props.booking_state.flightObject.origin}
                        to {this.props.booking_state.flightObject.destination}</b></h4>
                    <h5>{this.props.booking_state.flightObject.flightOperator} - <span
                        className="color-red-3"> {this.props.flightTripType} - {this.props.flightClass}
                        - Adults : {this.props.flightNoofPassengers}</span>
                    </h5>


                    <div className="fi_block">
                        <div className="flight-icon col-xs-4 col10">
                            <img className="fi_icon"
                                 src="https://cdn4.iconfinder.com/data/icons/aiga-symbol-signs/444/aiga_departingflights-512.png"
                                 height="25" width="25"
                                 alt=""/>
                            <div className="fi_content">

                                <div className="fi_title color-dark-2"><h5>Depart</h5>
                                </div>
                                <div className="fi_title color-dark-2">
                                    {this.props.booking_state.flightObject.departureTime}
                                    <br/>
                                    {this.props.booking_state.flightObject.departureDate}

                                </div>
                            </div>
                        </div>

                        <div className="flight-icon col-xs-4 col10">
                            <img className="fi_icon"
                                 src="https://cdn4.iconfinder.com/data/icons/aiga-symbol-signs/444/aiga_departingflights-512.png"
                                 height="25" width="25"
                                 alt=""/>
                            <div className="fi_content">

                                <div className="fi_title color-dark-2"><h5>Arrive</h5>
                                </div>
                                <div className="fi_title color-dark-2">
                                    {this.props.booking_state.flightObject.arrivalTime}
                                    <br/>
                                    {this.props.booking_state.flightObject.arrivalDate}
                                </div>
                            </div>
                        </div>
                        <div className="flight-icon col-xs-4 col10">
                        </div>
                    </div>

                    <div className="col-sm-12">

                        <h4><strong className="color-red-3">FARE DETAILS</strong></h4>
                        <br/>


                        <div className="col-sm-2">
                            <h6>Adults</h6>
                        </div>


                        <div className="col-sm-2">
                            <h6>Base</h6>
                        </div>

                        <div className="col-sm-2">
                            <h6>Taxes & Fees</h6>
                        </div>

                        <div className="col-sm-4">
                            <h6>Per Traveller</h6>
                        </div>

                        <div className="2">
                            <h6>Total</h6>
                        </div>
                    </div>

                    <div className="col-sm-12">

                        <div className="col-sm-2">
                            <h6><span
                                className="color-red-3">{this.props.booking_state.noofpassengers}</span>
                            </h6>
                        </div>

                        <div className="col-sm-2">
                            <h6><span
                                className="color-red-3">{(this.props.booking_state.baseprice).toFixed(2)}</span>
                            </h6>
                        </div>

                        <div className="col-sm-2">
                            <h6><span
                                className="color-red-3">{(this.props.booking_state.baseprice * 0.09).toFixed(2)}</span>
                            </h6>
                        </div>

                        <div className="col-sm-4">
                            <h6><span
                                className="color-red-3">{(this.props.booking_state.baseprice * 1.09).toFixed(2)}</span>
                            </h6>
                        </div>

                        <div className="col-sm-2">
                            <h4><strong><span
                                className="color-red-3">{(this.props.booking_state.baseprice * this.props.booking_state.noofpassengers * 1.09).toFixed(2)}</span>
                            </strong></h4>
                        </div>
                    </div>
                </div>
            )
        }

        else if (this.props.booking_state.operation === 'hotel') {
            return (
                <div>
                    <h4><b>{this.props.booking_state.hotelObject.hotelName}</b></h4>
                    <h6>{this.props.booking_state.hotelObject.hotelAddress}
                        <br/>
                        <span className="color-red-3"> {this.props.booking_state.hotelObject.city} - {this.props.booking_state.hotelObject.state}</span>

                        <br/>
                        Adults : <span className="color-red-3">{this.props.booking_state.noofpeople}</span> <small>for room type <span className="color-red-3">{this.props.booking_state.roomType}</span></small>
                    </h6>

                    <div className="fi_block">
                        <div className="flight-icon col-xs-4 col10">
                            <img className="fi_icon"
                                 src="https://cdn.ndtv.com/tech/images/oyorooms_thumb.JPG"
                                 height="40" width="40"
                                 alt=""/>
                            <div className="fi_content">

                                <div className="fi_title color-dark-2"><h6>From</h6>
                                </div>


                                <div className="fi_title color-dark-2">
                                    <h4>{this.props.booking_state.fromDate}</h4>

                                </div>
                            </div>
                        </div>
                        <div className="flight-icon col-xs-4 col10">
                            <img className="fi_icon"
                                 src="https://cdn.ndtv.com/tech/images/oyorooms_thumb.JPG"
                                 height="40" width="40"
                                 alt=""/>
                            <div className="fi_content">

                                <div className="fi_title color-dark-2"><h6>To</h6>
                                </div>
                                <div className="fi_title color-dark-2">
                                    <h4>{this.props.booking_state.toDate}</h4>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-12">

                        <h4><strong className="color-red-3">FARE DETAILS</strong></h4>
                        <br/>


                        <div className="col-sm-2">
                            <h6>Guests</h6>
                        </div>


                        <div className="col-sm-2">
                            <h6>Base</h6>
                        </div>

                        <div className="col-sm-3">
                            <h6>Taxes & Fees</h6>
                        </div>

                        <div className="col-sm-2">
                            <h6>Per Guest</h6>
                        </div>

                        <div className="col-sm-1">

                        </div>

                        <div className="col-sm-2">
                            <h6>Final Price</h6>
                        </div>
                    </div>

                    <div className="col-sm-12">

                        <div className="col-sm-2">
                            <h5><span
                                className="color-red-3">{this.props.booking_state.noofpeople}</span>
                            </h5>
                        </div>

                        <div className="col-sm-2">
                            <h5><span
                                className="color-red-3">{(this.props.booking_state.base_price).toFixed(2)}</span>
                            </h5>
                        </div>

                        <div className="col-sm-3">
                            <h5><span
                                className="color-red-3">{(this.props.booking_state.base_price * 0.09).toFixed(2)}</span>
                            </h5>
                        </div>

                        <div className="col-sm-2">
                            <h5><span
                                className="color-red-3">{(this.props.booking_state.base_price * 1.09).toFixed(2)}</span>
                            </h5>
                        </div>
                        <div className="col-sm-1">

                        </div>
                        <div className="col-sm-2">
                            <h4><strong><span
                                className="color-red-3">{(this.props.booking_state.base_price * this.props.booking_state.noofpeople * 1.09).toFixed(2)}</span>
                            </strong></h4>
                        </div>
                    </div>

                </div>
            )
        }

        else if (this.props.booking_state.operation === 'car') {
            return (
                <div>
                    <h4 className="color-grey-3">You will drive <strong
                        className="color-red-3">{this.props.booking_state.carObject.carMake} {this.props.booking_state.carObject.carName}</strong>
                    </h4>

                    <br/>
                    <h5>
                        <b>{this.props.booking_state.carObject.carType}</b>{this.props.booking_state.carObject.carModel}
                    </h5>

                    <h6>
                        <br/>
                        <span className="color-red-3"> {this.props.booking_state.carObject.city}
                            - {this.props.booking_state.carObject.state}
                            - {this.props.booking_state.carObject.zipCode}</span>

                        <br/>
                        Days : <span
                        className="color-red-3">{this.props.booking_state.noofdays}</span>

                        <br/>
                        <small>capacity <span
                            className="color-red-3">{this.props.booking_state.carObject.capacity}</span></small>
                    </h6>

                    <div className="fi_block">
                        <div className="flight-icon col-xs-4 col10">
                            <img className="fi_icon"
                                 src="https://cdn.ndtv.com/tech/images/oyorooms_thumb.JPG"
                                 height="40" width="40"
                                 alt=""/>
                            <div className="fi_content">

                                <div className="fi_title color-dark-2"><h6>From</h6>
                                </div>


                                <div className="fi_title color-dark-2">
                                    <h4>{this.props.booking_state.fromDate}</h4>

                                </div>
                            </div>
                        </div>
                        <div className="flight-icon col-xs-4 col10">
                            <img className="fi_icon"
                                 src="https://cdn.ndtv.com/tech/images/oyorooms_thumb.JPG"
                                 height="40" width="40"
                                 alt=""/>
                            <div className="fi_content">

                                <div className="fi_title color-dark-2"><h6>To</h6>
                                </div>
                                <div className="fi_title color-dark-2">
                                    <h4>{this.props.booking_state.toDate}</h4>

                                </div>
                            </div>
                        </div>
                        <div className="flight-icon col-xs-4 col10">
                            {/*space for image*/}
                        </div>
                    </div>

                    <div className="col-sm-12">

                        <h4><strong className="color-red-3">FARE DETAILS</strong></h4>
                        <br/>


                        <div className="col-sm-2">
                            <h6>No. of Days</h6>
                        </div>


                        <div className="col-sm-2">
                            <h6>Base</h6>
                        </div>

                        <div className="col-sm-2">
                            <h6>Taxes & Fees</h6>
                        </div>

                        <div className="col-sm-4">
                            <h6>Per Day</h6>
                        </div>

                        <div className="2">
                            <h6>Total</h6>
                        </div>
                    </div>

                    <div className="col-sm-12">

                        <div className="col-sm-2">
                            <h4><span
                                className="color-red-3">{this.props.booking_state.noofdays}</span>
                            </h4>
                        </div>

                        <div className="col-sm-2">
                            <h4><span
                                className="color-red-3">{this.props.booking_state.carObject.price}</span>
                            </h4>
                        </div>

                        <div className="col-sm-2">
                            <h4><span
                                className="color-red-3">{(this.props.booking_state.carObject.price * 0.09).toFixed(2)}</span>
                            </h4>
                        </div>

                        <div className="col-sm-4">
                            <h4><span
                                className="color-red-3">{(this.props.booking_state.carObject.price * 1.09).toFixed(2)}</span>
                            </h4>
                        </div>

                        <div className="col-sm-2">
                            <h4><strong><span
                                className="color-red-3">{(this.props.booking_state.carObject.price * this.props.booking_state.noofdays * 1.09).toFixed(2)}</span>
                            </strong></h4>
                        </div>
                    </div>


                </div>
            )
        }
    });

    componentWillMount() {
        let click = {
            pageClick: {
                userId: "anonymous",
                pageName: "SuccesfulPayment",
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
        console.log("In Thankyou component will mount");
    };

    render() {
        return (
            <div className="container">
                <hr/>
                <h3>Thank you ! Your payment is successful :)</h3>
                <div>
                    <div className="container">
                        <div className="row list-wrapper  bg-grey-2">
                            <div className="col-md-12">
                                <div className="list-content clearfix">
                                    <div className="list-item-entry">
                                        <div className="hotel-item style-10 bg-white">
                                            <div className="table-view">

                                                <div className="title hotel-middle cell-view">
                                                    <h3>Thank you ! Your payment is successful :)</h3>

                                                    <br/>

                                                    <h4>The booking details are</h4>

                                                    {this.showBooking()}

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>


        );
    }
}

//if you need anything from state to use here
function mapStateToProps(state) {
    return {
        booking_state: state.booking_state,

        flightId: state.flightId,
        flightClass: state.flightClass,
        flightTripType: state.flightTripType,
        flightNoofPassengers: state.flightNoOfPassengers,
        flightFromDate: state.flightFromDate,
        flightToDate: state.flightToDate
    };
}

export default withRouter(connect(mapStateToProps, null)(Thankyou));