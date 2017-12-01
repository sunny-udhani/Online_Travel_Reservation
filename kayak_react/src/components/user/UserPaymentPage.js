import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from "react-redux"

import {doLogout} from "../../api/user/API_HandleLogout";
import {getFlightDetails} from "../../api/user/API_GetDetailsforPayment";
import {getUserDetails} from "../../api/user/API_GetUserDetails";

import Traveler from './Traveler';

import '../../design/css/bootstrap.min.css'
import '../../design/css/jquery-ui.min.css'
import '../../design/css/jquery-ui.structure.min.css'
import '../../design/css/style.css'

class UserPaymentPage extends Component {

    handleSubmit = (userdata) => {

    };

    state = {
        flightObject: '',
        userDetails: '',
        paymentDetails: '',
        billingAddress: '',

        noofpassengers: 3,
        flight_class: 'economy',
        base_price: 0
    };

    flight_payment = {
        flightId : '',
        noofpassengers : '',
        flightClass: '',
        tripType: '',
        fromDate: '',
        toDate: '',
        ticketPrice: '',
        totalAmount: ''
    };

    componentWillMount() {
        console.log("1");
        let flightId = {
            id: "5a1e4ee9c83193799bf06ff4"
        };

        getFlightDetails(flightId)
            .then(res => {
                if (res.status === 200) {

                    console.log(this);
                    console.log("10");

                    res.json()
                        .then(data => {
                            console.log("11");
                            console.log(data);
                            this.setState({
                                ...this.state,
                                flightObject: data
                            });

                            if (this.state.flight_class === 'business') {
                                this.setState({
                                    base_price: this.state.flightObject.classes[0].price
                                });
                            }
                            else if (this.state.flight_class === 'firstclass') {
                                this.setState({
                                    base_price: this.state.flightObject.classes[1].price
                                });
                            }
                            else if (this.state.flight_class === 'economy') {
                                this.setState({
                                    base_price: this.state.flightObject.classes[2].price
                                });
                            }
                            // API call to get user details
                            getUserDetails()
                                .then(res => {
                                    if (res.status === 200) {

                                        console.log("start - userDetails");

                                        res.json()
                                            .then(userdata => {
                                                console.log("17");
                                                console.log(userdata);

                                                console.log("18");

                                                this.setState({
                                                    userDetails: userdata.userDetails[0],
                                                    paymentDetails: userdata.paymentDetails[0],
                                                    billingAddress: userdata.billingAddress[0]
                                                });

                                                console.log(this.state);
                                                console.log(this.state.userDetails);
                                                console.log(this.state.paymentDetails);
                                                console.log(this.state.billingAddress);

                                                //Setting all values of flight_payment state

                                            });
                                    } else {
                                        console.log("error in getting list");
                                    }
                                });

                            //this.props.hotelList_Success(data);
                        });
                } else {
                    console.log("error in getting list");
                }
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

                                                                <div className="fi_title color-dark-2"><h4>Depart</h4>
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

                                                                <div className="fi_title color-dark-2">Arrive</div>
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
                                                                className="color-red-3">{this.state.base_price}</span>
                                                            </h6>
                                                        </div>

                                                        <div className="col-sm-2">
                                                            <h6><span
                                                                className="color-red-3">{this.state.base_price * 0.09}</span>
                                                            </h6>
                                                        </div>

                                                        <div className="col-sm-4">
                                                            <h6><span
                                                                className="color-red-3">{this.state.base_price * 1.09}</span>
                                                            </h6>
                                                        </div>

                                                        <div className="col-sm-2">
                                                            <h6><span
                                                                className="color-red-3">{this.state.base_price * this.state.noofpassengers * 1.09}</span>
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


                                                    <Traveler noofpassengers = {this.state.noofpassengers}/>

                                                    <div className="col-sm-12">
                                                        <hr/>

                                                        <h5><strong className="color-red-3">Traveler</strong>
                                                            <small>(primary contact must be an adult)</small>
                                                        </h5>
                                                        <br/>

                                                        <div className="col-sm-6">
                                                            <h6>First Name</h6>
                                                            <input type="text" name=""
                                                                   className="form-control input-sm"
                                                                   id="" value={this.state.userDetails.firstName}/>
                                                        </div>

                                                        <div className="col-sm-6">
                                                            <h6>Middle Name</h6>
                                                            <input type="text" name=""
                                                                   className="form-control input-sm"
                                                                   id="" value=""/>
                                                        </div>
                                                    </div>


                                                    <div className="col-sm-12">
                                                        <div className="col-sm-6">
                                                            <h6>Lastname</h6>
                                                            <input type="text" name="" className="form-control input-sm"
                                                                   id="" value={this.state.userDetails.lastName}/>
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-12">
                                                        <div className="col-sm-6">
                                                            <h6>Email Address</h6>
                                                            <input type="text" name="" className="form-control input-sm"
                                                                   id=""
                                                                   value={this.state.userDetails.username}/>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <h6>Phone Number</h6>
                                                            <input type="" name="" className="form-control input-sm"
                                                                   id="" value={this.state.userDetails.phoneNumber}/>
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-12">
                                                        <div className="col-sm-6">
                                                            <h6>Carrier</h6>
                                                            <input type="" name="" className="form-control input-sm"
                                                                   id=""
                                                                   value={this.state.flightObject.flightOperator}/>
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-12">

                                                        <hr/>

                                                        <h5><strong className="color-red-3">Secure flight information
                                                            required by the airline</strong>
                                                        </h5>

                                                        <br/>

                                                        <div className="col-sm-8">
                                                            <h6>Date of Birth</h6>

                                                            <input type="" name="" className="form-control input-sm"
                                                                   id=""
                                                                   value={this.state.userDetails.dateofbirth}/>

                                                        </div>
                                                        <div className="col-sm-4">
                                                            <h6>Gender</h6>
                                                            <input type="" name="" className="form-control input-sm"
                                                                   id="" value={this.state.userDetails.gender}/>
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

                                                    <h6>
                                                        <div className="radio">
                                                            <label><input type="radio" name="optradio"/>
                                                                <strong>Yes</strong>
                                                                <small>
                                                                    <br/>1. 100% Trip Cancellation and Trip Interruption
                                                                    Protection reimburses for cancellations due to
                                                                    reasons like covered illness, injury and more
                                                                    <br/>2. $20,000 Emergency Medical Coverage
                                                                    <br/>3. $100,000 Emergency Medical Transportation
                                                                    <br/>4. Travel Delay provides reimbursement for
                                                                    meals and accommodation expenses when a trip is
                                                                    delayed
                                                                    <br/>5. 24/7 Live Emergency Hotline Help offers a
                                                                    broad range of services in the event of a travel or
                                                                    medical emergency including: medical referral and
                                                                    monitoring, legal assistance, arrangement of medical
                                                                    evacuations or repatriations and pre-trip assistance
                                                                    <br/>6. Concierge provides information about your
                                                                    destination before you travel and can help you
                                                                    select restaurants, reserve golf tee times or secure
                                                                    tickets to local events
                                                                    <br/>7. Protect your travel investment with valuable
                                                                    Allianz Travel Insurance.
                                                                </small>
                                                            </label>
                                                        </div>
                                                        <div className="radio">
                                                            <label><input type="radio" name="optradio"/>
                                                                No,
                                                                <small> I understand by declining protection I am
                                                                    responsible for all cancellation fees and delay
                                                                    expenses.
                                                                    <br/>Recommended by AGA Service Company, the
                                                                    licensed producer and administrator of this plan.
                                                                    <br/>Insurance benefits are underwritten by either
                                                                    BCS Insurance Company or Jefferson Insurance
                                                                    Company, depending on insured's state of residence.
                                                                    Terms, conditions and exclusions apply.
                                                                </small>
                                                            </label>
                                                        </div>
                                                    </h6>

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
                                                                   defaultValue={this.state.billingAddress.street1}/>
                                                        </div>

                                                        <div className="col-sm-6">
                                                            <h6>Street
                                                                <small>Line 2</small>
                                                            </h6>
                                                            <input type="text" name=""
                                                                   className="form-control input-sm"
                                                                   id=""
                                                                   defaultValue={this.state.billingAddress.street2}/>
                                                        </div>
                                                    </div>


                                                    <div className="col-sm-12">
                                                        <div className="col-sm-6">
                                                            <h6>Postal Code</h6>
                                                            <input type="text" name="" className="form-control input-sm"
                                                                   id=""
                                                                   defaultValue={this.state.billingAddress.postalcode}/>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <h6>City</h6>
                                                            <input type="text" name="" className="form-control input-sm"
                                                                   id=""
                                                                   defaultValue={this.state.billingAddress.city}/>
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-12">
                                                        <div className="col-sm-6">
                                                            <h6>State/Region</h6>
                                                            <input type="text" name="" className="form-control input-sm"
                                                                   id=""
                                                                   defaultValue={this.state.billingAddress.state}/>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <h6>Country</h6>
                                                            <input type="text" name="" className="form-control input-sm"
                                                                   id=""
                                                                   defaultValue={this.state.billingAddress.country}/>
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
                                                                   defaultValue={this.state.paymentDetails.nameoncard}/>
                                                        </div>

                                                        <div className="col-sm-6">
                                                            <h6>Card Number</h6>
                                                            <input type="text" name=""
                                                                   className="form-control input-sm"
                                                                   id=""
                                                                   defaultValue={this.state.paymentDetails.creditCardNumber}/>
                                                        </div>
                                                    </div>


                                                    <div className="col-sm-8">
                                                        <div className="col-sm-6">
                                                            <h6>Good Thru</h6>
                                                            <input type="date" name="" className="form-control input-sm"
                                                                   id="validThrough"
                                                                   defaultValue={this.state.paymentDetails.validThrough}/>

                                                        </div>
                                                        <div className="col-sm-2">
                                                            <h6>CVV</h6>
                                                            <input type="" name="" className="form-control input-sm"
                                                                   id=""
                                                                   defaultValue={this.state.paymentDetails.cvv}/>
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
                                                                <label><input type="checkbox" value=""/><strong>Email me KAYAK's deals</strong></label>
                                                            </h6>
                                                        </div>
                                                    </div>


                                                    <div className="col-sm-12">
                                                        <button
                                                            className="btn-block btn-success btn-group-sm"
                                                            type="button" onClick={this.handleBooking}>
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
        username: state.username
    };
}

//if you need to push something to state, use action -> reducer
function mapDispatchToProps(dispatch) {
    return {};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserPaymentPage));