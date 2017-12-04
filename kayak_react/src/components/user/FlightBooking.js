import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from "react-redux"

import {doLogout} from "../../api/user/API_HandleLogout";
import {getFlightDetails} from "../../api/user/API_GetDetailsforPayment";
import {getUserDetails} from "../../api/user/API_GetUserDetails";
import {bookFlight} from "../../api/user/API_BookFlight";
import {insertTravelerDetails} from "../../api/user/API_InsertTravelerDetails";

import Traveler from './Traveler';

import '../../design/css/bootstrap.min.css'
import '../../design/css/jquery-ui.min.css'
import '../../design/css/jquery-ui.structure.min.css'
import '../../design/css/style.css'

class FlightBooking extends Component {

    handleSubmit = (userdata) => {

    };

    state = {
        flightObject: '',
        userDetails: '',
        paymentDetails: '',
        billingAddress: '',

        flightId: this.props.flightId,
        noofpassengers: this.props.flightNoofPassengers,
        flight_class: this.props.fightClass,
        trip_type: this.props.flightTripType,
        fromDate: this.props.flightFromDate,
        toDate: this.props.flightToDate,

        baseprice : 0
    };

    flight_payment = {
        flightId: '',
        noOfPassengers: '',
        flightClass: '',
        tripType: '',
        fromDate: '',
        toDate: '',
        ticketPrice: '',
        totalAmount: '',
        username: '',
        hostId: ''
    };

    base_price = 0;

    visit_flag = false;

    travelers = [];

    traveler_details = [];

    billing_address = {
        username: '',
        street1: '',
        street2: '',
        postalcode: '',
        city: '',
        state: '',
        country: ''
    };

    payment_details = {
        username: '',
        nameoncard: '',
        creditCardnumber: '',
        validThrough: '',
        cvv: ''
    };

    add_travelers = (() => {
        for (let i = 0; i < this.state.noofpassengers; i++) {
            console.log("I --- " + i);

            if (this.visit_flag === true) {

                this.traveler_details.push({
                    first_name: '',
                    last_name: '',
                    email: '',
                    phonenumber: ''
                });

                this.travelers.push(
                    <div>
                        <div className="col-sm-12">
                            <hr/>

                            <h5><strong className="color-red-3">Traveler</strong>
                                <small>(primary contact must be an adult)</small>
                            </h5>
                            <br/>

                            <div className="col-sm-6">
                                <h6>First Name</h6>
                                <input type="text"
                                       className="form-control input-sm"
                                       id=""
                                       onChange={
                                           (event) => {
                                               this.traveler_details[i].first_name = event.target.value
                                           }
                                       }
                                />
                            </div>
                            <div className="col-sm-6">
                                <h6>Lastname</h6>
                                <input type="text"
                                       className="form-control input-sm"
                                       id=""
                                       onChange={
                                           (event) => {
                                               this.traveler_details[i].last_name = event.target.value
                                           }
                                       }
                                />
                            </div>
                        </div>

                        <div className="col-sm-12">
                            <div className="col-sm-6">
                                <h6>Email Address</h6>
                                <input type="text"
                                       className="form-control input-sm"
                                       id=""
                                       onChange={
                                           (event) => {
                                               this.traveler_details[i].email = event.target.value
                                           }
                                       }
                                />
                            </div>
                            <div className="col-sm-6">
                                <h6>Phone Number</h6>
                                <input type="text"
                                       className="form-control input-sm"
                                       id=""
                                       onChange={
                                           (event) => {
                                               this.traveler_details[i].phonenumber = event.target.value
                                           }
                                       }
                                />
                            </div>
                        </div>
                    </div>
                )
            }
        }

        return(
            <div>
                {this.travelers}
            </div>
        )
    });

    componentWillMount() {

        let flightId = {
            id: this.state.flightId
        };

        console.log(flightId);
        console.log(this.state.flightId);
        console.log(this.props.flightId);
        getFlightDetails(flightId)
            .then(res => {
                if (res.status === 200) {
                    res.json()
                        .then(data => {

                            console.log("Length : " + data.classes.length);
                            console.log("Sample : " + data.classes[0].classType);

                            for (let j = 0; j < data.classes.length; j++) {
                                if (this.state.flight_class === data.classes[j].classType) {
                                    this.setState({
                                        ...this.state,
                                        baseprice: data.classes[j].price
                                    });
                                }
                            }

                            console.log("Base price : " + this.state.baseprice);

                            this.visit_flag = true;
                            console.log(this.visit_flag);
                            getUserDetails()
                                .then(res => {
                                    if (res.status === 200) {

                                        res.json()
                                            .then(userdata => {

                                                console.log(userdata);
                                                console.log(userdata.paymentDetails);

                                                this.setState({
                                                    ...this.state,
                                                    flightObject: data,
                                                    userDetails: userdata.userDetails[0],
                                                    paymentDetails: ( userdata.paymentDetails === undefined || userdata.paymentDetails.length === 0) ? null : userdata.paymentDetails[0],
                                                    billingAddress: (userdata.billingAddress === undefined || userdata.billingAddress.length === 0) ? null : userdata.billingAddress[0]
                                                });


                                                if (userdata.paymentDetails !== undefined) {
                                                    this.payment_details.nameoncard = userdata.paymentDetails.nameoncard;
                                                    this.payment_details.username = userdata.paymentDetails.username;
                                                    this.payment_details.creditCardnumber = userdata.paymentDetails.creditCardNumber;
                                                    this.payment_details.validThrough = userdata.paymentDetails.validThrough;
                                                    this.payment_details.cvv = userdata.paymentDetails.cvv;
                                                }

                                                console.log(this.state);

                                                //Setting all values of flight_payment state
                                                this.flight_payment.flightId = this.state.flightId;
                                                this.flight_payment.noOfPassengers = this.state.noofpassengers;
                                                this.flight_payment.flightClass = this.state.flight_class;
                                                this.flight_payment.tripType = this.state.trip_type;
                                                this.flight_payment.fromDate = this.state.fromDate;
                                                this.flight_payment.toDate = this.state.toDate;
                                                this.flight_payment.ticketPrice = this.state.baseprice;
                                                this.flight_payment.totalAmount = this.base_price * this.state.noofpassengers * 1.09;
                                                this.flight_payment.username = this.state.userDetails.username;

                                                console.log("Host ID : " + this.state.flightObject.hostId);
                                                this.flight_payment.hostId = this.state.flightObject.hostId;

                                            });

                                    } else {
                                        console.log("error in getting list");
                                    }
                                });
                            // console.log("AAaj");
                            //this.props.hotelList_Success(data);
                        });
                } else {
                    console.log("error in getting list");
                }
            });
    };

    handleFlightBooking(userdata) {
        console.log("In handleFlightBooking");

        console.log(userdata);

        bookFlight(userdata)
            .then((res) => {
                console.log(res.status);
                console.log(userdata.username);
                if (res.status === 200) {
                    console.log("success");

                    let payload = {
                        bookingType: "flight",
                        userdata: userdata,
                        traveler_details: this.traveler_details,
                        billing_address: this.billing_address,
                        payment_details: this.payment_details
                    };

                    //independent API to insert traveler details, billing address, and payment details
                    insertTravelerDetails(payload)
                        .then((res) => {

                            if (res.status === 200) {
                                console.log("success");
                            }
                            else {
                                console.log("validation");
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
                else {
                    console.log("validation");
                }
            })
            .catch((err) => {
                console.log(err);
            });
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
            <div className="container">
                <header className="color-1 hovered menu-3">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="nav">
                                    <a href="index.html" className="logo">
                                        <img
                                            src="https://a1.r9cdn.net/rimg/provider-logos/common/socialmedia/kayak-logo.png?width=440&height=220&crop=false"
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

                                        <li className="type-1"><a href="#">Hotels<span
                                            className="fa fa-angle-down"></span></a>
                                        </li>
                                        <li className="type-1"><a href="#">Flights<span
                                            className="fa fa-angle-down"></span></a>
                                        </li>
                                        <li className="type-1"><a href="#">Cars<span
                                            className="fa fa-angle-down"></span></a>
                                        </li>
                                        <li className="type-1"><a href="#">My Account<span
                                            className="fa fa-angle-down"></span></a>
                                            <ul className="dropmenu">
                                                <li><a href="#">Account Preferences {this.props.username} </a></li>
                                                <li><a href="car_block.html">Trips</a></li>
                                                <li><a href="car_detail.html">Watchlist</a></li>
                                                <li><a onClick={this.handleSignOut}>Sign Out</a></li>

                                            </ul>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </header>

                <br/>

                <hr/>

                <div>
                    <div className="container">
                        <div className="row list-wrapper  bg-grey-2">
                            <div className="col-md-8">
                                <div className="list-content clearfix">
                                    <div className="list-item-entry">
                                        <div className="hotel-item style-10 bg-white">
                                            <div className="table-view">

                                                <div className="title hotel-middle cell-view">
                                                    <h5 className="color-grey-3">You are flying</h5>
                                                    <h5><strong
                                                        className="color-red-3">{this.state.flightObject.flightOperator}</strong>
                                                    </h5>
                                                    <h4><b>{this.state.flightObject.origin}
                                                        to {this.state.flightObject.destination}</b></h4>
                                                    <h5>{this.state.flightObject.flightOperator} - <span
                                                        className="color-red-3"> One Way - Economy -  Adults : 3</span>
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
                                                                    {this.state.flightObject.departureTime}
                                                                    <br/>
                                                                    {this.state.flightObject.departureDate}

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flight-icon col-xs-4 col10">
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
                                                                    {this.state.flightObject.arrivalTime}
                                                                    <br/>
                                                                    {this.state.flightObject.arrivalDate}

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <br/><br/>
                                                    {/*<button className="btn btn-primary" onClick={() => {*/}
                                                    {/*this.props.history.push("/UserPaymentDetails");*/}
                                                    {/*}}>*/}
                                                    {/*View more ...*/}
                                                    {/*</button>*/}
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="list-content clearfix">
                                    <div className="list-item-entry">
                                        <div className="bg-grey-2">
                                            <div className="table-view">
                                                <div className="title hotel-middle cell-view">
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
                                                                className="color-red-3">{this.state.noofpassengers}</span>
                                                            </h6>
                                                        </div>

                                                        <div className="col-sm-2">
                                                            <h6><span
                                                                className="color-red-3">{(this.state.baseprice).toFixed(2)}</span>
                                                            </h6>
                                                        </div>

                                                        <div className="col-sm-2">
                                                            <h6><span
                                                                className="color-red-3">{(this.state.baseprice * 0.09).toFixed(2)}</span>
                                                            </h6>
                                                        </div>

                                                        <div className="col-sm-4">
                                                            <h6><span
                                                                className="color-red-3">{(this.state.baseprice * 1.09).toFixed(2)}</span>
                                                            </h6>
                                                        </div>

                                                        <div className="col-sm-2">
                                                            <h6><span
                                                                className="color-red-3">{(this.state.baseprice * this.state.noofpassengers * 1.09).toFixed(2)}</span>
                                                            </h6>
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-12">

                                                        <hr/>

                                                        <h4><strong className="color-red-3">Enter Traveler Details (must
                                                            be an adult)</strong></h4>

                                                        <div className="help-contact">
                                                            <h6>Logged in as :
                                                                <span
                                                                    className="color-red-3"> {this.state.userDetails.username}</span>
                                                            </h6>
                                                        </div>
                                                    </div>

                                                    {
                                                        this.add_travelers()
                                                    }

                                                    <div className="col-sm-12">

                                                        <hr/>

                                                        <h5><strong className="color-red-3">Secure flight information
                                                            required by the airline</strong>
                                                        </h5>

                                                        <br/>

                                                        <div className="col-sm-8">
                                                            <h6>Date of Birth</h6>

                                                            <input type="text"
                                                                   name=""
                                                                   className="form-control input-sm"
                                                                   id=""
                                                                   // placeholder={this.state.userDetails.dateofbirth}
                                                            />

                                                        </div>
                                                        <div className="col-sm-4">
                                                            <h6>Gender</h6>
                                                            <input type="text"
                                                                   name=""
                                                                   className="form-control input-sm"
                                                                   id=""
                                                                   // placeholder={this.state.userDetails.gender}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-12">
                                                        <hr/>
                                                        <h5><strong className="color-red-3">Travel Options</strong>
                                                            <small>(optional)</small>
                                                        </h5>
                                                        <h6>
                                                            <small>Recommended: Trip Protection</small>
                                                        </h6>
                                                    </div>

                                                    <div className="col-sm-12">
                                                        <div className="radio">
                                                            <h6>
                                                                <label><input type="radio" name="optradio"/>
                                                                    <strong>Yes</strong>
                                                                    <small>
                                                                        <br/>1. 100% Trip Cancellation and Trip
                                                                        Interruption
                                                                        Protection reimburses for cancellations due to
                                                                        reasons like covered illness, injury and more
                                                                        <br/>2. $20,000 Emergency Medical Coverage
                                                                        <br/>3. $100,000 Emergency Medical
                                                                        Transportation
                                                                        <br/>4. Travel Delay provides reimbursement for
                                                                        meals and accommodation expenses when a trip is
                                                                        delayed
                                                                        <br/>5. 24/7 Live Emergency Hotline Help offers
                                                                        a
                                                                        broad range of services in the event of a travel
                                                                        or
                                                                        medical emergency including: medical referral
                                                                        and
                                                                        monitoring, legal assistance, arrangement of
                                                                        medical
                                                                        evacuations or repatriations and pre-trip
                                                                        assistance
                                                                        <br/>6. Concierge provides information about
                                                                        your
                                                                        destination before you travel and can help you
                                                                        select restaurants, reserve golf tee times or
                                                                        secure
                                                                        tickets to local events
                                                                        <br/>7. Protect your travel investment with
                                                                        valuable
                                                                        Allianz Travel Insurance.
                                                                    </small>
                                                                </label>
                                                            </h6>
                                                        </div>
                                                        <div className="radio">
                                                            <h6>
                                                                <label><input type="radio" name="optradio"/>
                                                                    No,
                                                                    <small> I understand by declining protection I am
                                                                        responsible for all cancellation fees and delay
                                                                        expenses.
                                                                        <br/>Recommended by AGA Service Company, the
                                                                        licensed producer and administrator of this
                                                                        plan.
                                                                        <br/>Insurance benefits are underwritten by
                                                                        either
                                                                        BCS Insurance Company or Jefferson Insurance
                                                                        Company, depending on insured's state of
                                                                        residence.
                                                                        Terms, conditions and exclusions apply.
                                                                    </small>
                                                                </label>
                                                            </h6>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-12">
                                                        <hr/>
                                                        <h5><strong className="color-red-3">Enter Billing
                                                            Information</strong></h5>
                                                        <h6>
                                                            <small>Billing Address</small>
                                                        </h6>
                                                        <br/>

                                                        <div className="col-sm-6">
                                                            <h6>Street
                                                                <small>Line 1</small>
                                                            </h6>
                                                            <input type="text" name=""
                                                                   className="form-control input-sm"
                                                                   id=""
                                                                   // placeholder={this.state.billingAddress.street1}
                                                                   onChange={
                                                                       (event) => {
                                                                           this.billing_address.street1 = event.target.value
                                                                       }
                                                                   }
                                                            />
                                                        </div>

                                                        <div className="col-sm-6">
                                                            <h6>Street
                                                                <small>Line 2</small>
                                                            </h6>
                                                            <input type="text" name=""
                                                                   className="form-control input-sm"
                                                                   id=""
                                                                   // placeholder={this.state.billingAddress.street2}
                                                                   onChange={
                                                                       (event) => {
                                                                           this.billing_address.street2 = event.target.value
                                                                       }
                                                                   }
                                                            />
                                                        </div>
                                                    </div>


                                                    <div className="col-sm-12">
                                                        <div className="col-sm-6">
                                                            <h6>Postal Code</h6>
                                                            <input type="text" name="" className="form-control input-sm"
                                                                   id=""
                                                                   // placeholder={this.state.billingAddress.postalcode}
                                                                   onChange={
                                                                       (event) => {
                                                                           this.billing_address.postalcode = event.target.value
                                                                       }
                                                                   }
                                                            />
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <h6>City</h6>
                                                            <input type="text" name="" className="form-control input-sm"
                                                                   id=""
                                                                   // placeholder={this.state.billingAddress.city}
                                                                   onChange={
                                                                       (event) => {
                                                                           this.billing_address.city = event.target.value
                                                                       }
                                                                   }
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-12">
                                                        <div className="col-sm-6">
                                                            <h6>State/Region</h6>
                                                            <input type="text" name="" className="form-control input-sm"
                                                                   id=""
                                                                   // placeholder={this.state.billingAddress.state}
                                                                   onChange={
                                                                       (event) => {
                                                                           this.billing_address.state = event.target.value
                                                                       }
                                                                   }
                                                            />
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <h6>Country</h6>
                                                            <input type="text" name="" className="form-control input-sm"
                                                                   id=""
                                                                   // placeholder={this.state.billingAddress.country}
                                                                   onChange={
                                                                       (event) => {
                                                                           this.billing_address.country = event.target.value
                                                                       }
                                                                   }
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-12">
                                                        <hr/>
                                                        <h5><strong className="color-red-3">Card Details</strong></h5>
                                                        <br/>

                                                        <div className="col-sm-6">
                                                            <h6>Name on Card</h6>
                                                            <input type="text" name=""
                                                                   className="form-control input-sm"
                                                                   id=""
                                                                   // placeholder={this.state.paymentDetails.nameoncard}
                                                                   onChange={
                                                                       (event) => {
                                                                           this.payment_details.nameoncard = event.target.value
                                                                       }
                                                                   }

                                                            />
                                                        </div>

                                                        <div className="col-sm-6">
                                                            <h6>Card Number</h6>
                                                            <input type="text" name=""
                                                                   className="form-control input-sm"
                                                                   id=""
                                                                   // placeholder={this.state.paymentDetails.creditCardNumber}
                                                                   onChange={
                                                                       (event) => {
                                                                           this.payment_details.creditCardnumber = event.target.value
                                                                       }
                                                                   }
                                                            />
                                                        </div>
                                                    </div>


                                                    <div className="col-sm-8">
                                                        <div className="col-sm-6">
                                                            <h6>Valid Through</h6>
                                                            <input type="date" name="" className="form-control input-sm"
                                                                   id="validThrough"
                                                                   // placeholder={this.state.paymentDetails.validThrough}
                                                                   onChange={
                                                                       (event) => {
                                                                           this.payment_details.validThrough = event.target.value
                                                                       }
                                                                   }
                                                            />

                                                        </div>
                                                        <div className="col-sm-2">
                                                            <h6>CVV</h6>
                                                            <input type="" name="" className="form-control input-sm"
                                                                   id=""
                                                                   // placeholder={this.state.paymentDetails.cvv}
                                                                   onChange={
                                                                       (event) => {
                                                                           this.payment_details.cvv = event.target.value
                                                                       }
                                                                   }
                                                            />
                                                        </div>
                                                    </div>


                                                    <div className="col-sm-12">
                                                        <hr/>
                                                        <h5><strong className="color-red-3">Review Policies and Terms &
                                                            Conditions</strong>
                                                            <small>(optional)</small>
                                                        </h5>
                                                        <br/>

                                                        <h6>Cancellation and Change Policy Information</h6>
                                                        <h6>
                                                            <small>
                                                                Policy Information goes here
                                                            </small>
                                                        </h6>

                                                        <br/>

                                                        <h6>Additional Terms & Conditions</h6>
                                                        <h6>
                                                            <small>
                                                                Terms and Conditions goes here
                                                            </small>
                                                        </h6>

                                                        <br/>

                                                        <h5>By clicking <strong>"Book"</strong> you agree to the
                                                            airline's fare rules and KAYAK's Terms and Conditions and
                                                            Privacy Policy. JustFly's Terms of Use and Privacy Policy
                                                            also apply.
                                                        </h5>

                                                        <div className="checkbox">
                                                            <h6>
                                                                <label><input type="checkbox"/><strong>Email me KAYAK's
                                                                    deals</strong></label>
                                                            </h6>
                                                        </div>
                                                    </div>


                                                    <div className="col-sm-12">
                                                        <button
                                                            className="btn-block btn-success btn-group-sm"
                                                            type="button"
                                                            onClick={() => this.handleFlightBooking(this.flight_payment)}>
                                                            BOOK
                                                        </button>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="list-content clearfix">
                                    <div className="list-item-entry">
                                        <div className="hotel-item style-10 bg-white">
                                            <div className="table-view">

                                                <div className="title hotel-middle cell-view">
                                                    <h4 className="">Summary</h4>
                                                    <hr/>
                                                    <h6><strong className="">Etihad Airways - One Way - Economy - Adults
                                                        : 3</strong></h6>
                                                    <h6>Depart Wed 11/22: SFO > LHR 1:35p – 3:55p <br/>Flight 669 Flight
                                                        7</h6>
                                                    <h6>Return Thu 11/23: LHR > SFO 10:30p – 12:05p <br/> Flight 8
                                                        Flight 668</h6>

                                                    <br/><br/>
                                                    <h4>Costing</h4>
                                                    <hr/>
                                                    <h6>1 Adult, Economy</h6>
                                                    <h6>Taxes, Fees and Surcharges</h6>

                                                    <hr/>
                                                    <h5><strong>TOTAL</strong></h5>
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
        flightId: state.flightId,
        fightClass: state.flightClass,
        flightTripType: state.flightTripType,
        flightNoofPassengers: state.flightNoofPassengers,
        flightFromDate: state.flightFromDate,
        flightToDate: state.flightToDate
    };
}

//if you need to push something to state, use action -> reducer
// function mapDispatchToProps(dispatch) {
//     return {};
// }

export default withRouter(connect(mapStateToProps, null)(FlightBooking));