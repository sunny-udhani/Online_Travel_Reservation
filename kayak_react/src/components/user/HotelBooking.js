import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from "react-redux"

import {booking_success} from "../../actions";

import {doLogout} from "../../api/user/API_HandleLogout";
import {getHotelDetails} from "../../api/user/API_GetDetailsforPayment";
import {getUserDetails} from "../../api/user/API_GetUserDetails";
import {bookHotel} from "../../api/user/API_BookHotel";
import {insertTravelerDetails} from "../../api/user/API_InsertTravelerDetails";

import AlertContainer from 'react-alert';
import {alertOptions, showAlert} from "../../alertConfig";

import Traveler from './Traveler';

import '../../design/css/bootstrap.min.css'
import '../../design/css/jquery-ui.min.css'
import '../../design/css/jquery-ui.structure.min.css'
import '../../design/css/style.css'

class HotelBooking extends Component {

    handleSubmit = (userdata) => {

    };

    state = {
        operation: 'hotel',
        hotelObject: '',
        userDetails: '',
        paymentDetails: '',
        billingAddress: '',

        hotelId: this.props.hotelId,
        roomType: this.props.hotelRoomType,
        fromDate: this.props.hotelFromDate,
        toDate: this.props.hotelToDate,
        noofpeople: this.props.hotelNoOfPeople,

        base_price: 0
    };

    hotel_payment = {
        hotelId: '',
        noOfPeople: '',
        roomType: '',
        fromDate: '',
        toDate: '',
        ticketPrice: '',
        totalAmount: '',
        username: '',
        hostId: ''
    };

    travelers = {};

    componentWillMount() {
        console.log("1");
        let hotelId = {
            id: this.state.hotelId
        };

        console.log("Number of people : " + this.props.hotelNoOfPeople);
        getHotelDetails(hotelId)
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
                                hotelObject: data
                            });

                            if (this.state.roomType === 'delux') {
                                this.setState({
                                    base_price: this.state.hotelObject.rooms[0].roomPrice
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
                                                this.hotel_payment.hotelId = this.state.hotelId;
                                                this.hotel_payment.noOfPeople = this.state.noofpeople;
                                                this.hotel_payment.roomType = this.state.roomType;
                                                this.hotel_payment.fromDate = this.state.fromDate;
                                                this.hotel_payment.toDate = this.state.toDate;
                                                this.hotel_payment.ticketPrice = this.state.base_price;
                                                this.hotel_payment.totalAmount = this.state.base_price * this.state.noofpeople * 1.09;
                                                this.hotel_payment.username = this.state.userDetails.username;
                                                this.hotel_payment.hostId = this.state.hotelObject.hostId;
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

    traveler_details = {
        first_name: '',
        last_name: '',
        email: '',
        phonenumber: ''
    };

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

    validate_creditcardnumber(inputNum) {
        var digit, digits, flag, sum, _i, _len;
        flag = true;
        sum = 0;
        digits = (inputNum + '').split('').reverse();
        for (_i = 0, _len = digits.length; _i < _len; _i++) {
            digit = digits[_i];
            digit = parseInt(digit, 10);
            if ((flag = !flag)) {
                digit *= 2;
            }
            if (digit > 9) {
                digit -= 9;
            }
            sum += digit;
        }
        return sum % 10 === 0;
    };


    handleHotelBooking(userdata) {
        console.log("In handleFlightBooking");
        console.log(userdata);

        //let ccpattern = /^4\d{12}$|^4\d{15}$|^5[1-5]\d{14}$/;

        let ccPattern = /^(?=.{16}$)(?=.*[0-9])/;
        let ccEntry = parseInt(this.payment_details.creditCardnumber);


        let emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let emailEntry = this.traveler_details.email;

        let mobilePattern = /^[1-9]\d{9}$/;
        let mobileEntry = parseInt(this.traveler_details.phonenumber);

        let postalPattern = /^[1-9]\d{4}$/;
        let postalEntry = parseInt(this.billing_address.postalcode);

        let statePattern = /^(AL|Alabama|alabama|AK|Alaska|alaska|AZ|Arizona|arizona|AR|Arkansas|arkansas|CA|California|california|CO|Colorado|colorado|CT|Connecticut|connecticut|DE|Delaware|delaware|FL|Florida|florida|GA|Georgia|georgia|HI|Hawaii|hawaii|ID|Idaho|idaho|IL|Illinois|illinois|IN|Indiana|indiana|IA|Iowa|iowa|KS|Kansas|kansas|KY|Kentucky|kentucky|LA|Louisiana|louisiana|ME|Maine|maine|MD|Maryland|maryland|MA|Massachusetts|massachusetts|MI|Michigan|michigan|MN|Minnesota|minnesota|MS|Mississippi|mississippi|MO|Missouri|missouri|MT|Montana|montana|NE|Nebraska|nebraska|NV|Nevada|nevada|NH|New Hampshire|new hampshire|NJ|New Jersey|new jersey|NM|New Mexico|new mexico|NY|New York|new york|NC|North Carolina|new carolina|ND|North Dakota|north dakota|OH|Ohio|ohio|OK|Oklahoma|oklahoma|OR|Oregon|oregon|PA|Pennsylvania|pennsylvania|RI|Rhode Island|rhode island|SC|South Carolina|south carolina|SD|South Dakota|south dakota|TN|Tennessee|tennessee|TX|Texas|texas|UT|Utah|utah|VT|Vermont|vermont|VA|Virginia|virginia|WA|Washington|washington|WV|West Virginia|west virginia|WI|Wisconsin|wisconsin|WY|Wyoming|wyoming)$/;
        let stateEntry = this.billing_address.state;

        if (statePattern.test(stateEntry)) {
            if (postalPattern.test(postalEntry)) {
                if (mobilePattern.test(mobileEntry)) {
                    if (emailPattern.test(emailEntry)) {
                        if (ccPattern.test(ccEntry)) {
                            if (this.validate_creditcardnumber(ccEntry)) {
                                //console.log("Validating cc details 2 :" + this.validate_creditcardnumber(ccEntry));

                                bookHotel(userdata)
                                    .then((res) => {
                                        console.log(res.status);
                                        console.log(userdata.username);
                                        if (res.status === 200) {
                                            console.log("success");

                                            let payload = {
                                                bookingType: "hotel",
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

                                                        this.props.bookingSuccess(this.state, "booking_success");
                                                        this.props.history.push("/payment/thankyou");

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
                                    })

                            }
                            else {
                                showAlert("Enter a valid CC number", "error", this);
                            }
                        }
                        else {
                            showAlert("Verify the length of the CC number", "error", this);
                        }
                    }
                    else {
                        showAlert("Enter a valid email address", "error", this);
                    }
                }
                else {
                    showAlert("Enter a valid phonenumber", "error", this);
                }
            }
            else {
                showAlert("Enter a valid postal code", "error", this);
            }
        }
        else {
            showAlert("Enter a valid state/region", "error", this);
        }
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
                                                    <h5 className="color-grey-3">You are booking this hotel with <strong
                                                        className="color-red-3">KAYAK.com</strong></h5>


                                                    <h4><b>{this.state.hotelObject.hotelName}</b></h4>
                                                    <h6>{this.state.hotelObject.hotelAddress}
                                                        <br/>
                                                        <span className="color-red-3"> {this.state.hotelObject.city}
                                                            - {this.state.hotelObject.state}</span>

                                                        <br/>
                                                        Adults : <span
                                                            className="color-red-3">{this.props.hotelNoOfPeople}</span>
                                                        <small>for room type <span
                                                            className="color-red-3">{this.state.roomType}</span></small>
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
                                                                    <h4>{this.state.fromDate}</h4>

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
                                                                    <h4>{this.state.toDate}</h4>

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flight-icon col-xs-4 col10">
                                                            {/*space for image*/}
                                                        </div>
                                                    </div>
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

                                                        <div className="3">
                                                            <h6>Final Price</h6>
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-12">

                                                        <div className="col-sm-2">
                                                            <h4><span
                                                                className="color-red-3">{this.state.noofpeople}</span>
                                                            </h4>
                                                        </div>

                                                        <div className="col-sm-2">
                                                            <h4><span
                                                                className="color-red-3">{(this.state.base_price).toFixed(2)}</span>
                                                            </h4>
                                                        </div>

                                                        <div className="col-sm-3">
                                                            <h4><span
                                                                className="color-red-3">{(this.state.base_price * 0.09).toFixed(2)}</span>
                                                            </h4>
                                                        </div>

                                                        <div className="col-sm-2">
                                                            <h4><span
                                                                className="color-red-3">{(this.state.base_price * 1.09).toFixed(2)}</span>
                                                            </h4>
                                                        </div>

                                                        <div className="col-sm-3">
                                                            <h4><span
                                                                className="color-red-3">{(this.state.base_price * this.state.noofpeople * 1.09).toFixed(2)}</span>
                                                            </h4>
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-12">
                                                        <hr/>

                                                        <h5><strong className="color-red-3">Enter Guests
                                                            Information</strong>
                                                        </h5>
                                                        <br/>

                                                        <div className="col-sm-6">
                                                            <h6>First Name</h6>
                                                            <input type="text"
                                                                   className="form-control input-sm"
                                                                   id=""
                                                                   onChange={
                                                                       (event) => {
                                                                           this.traveler_details.first_name = event.target.value
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
                                                                           this.traveler_details.last_name = event.target.value
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
                                                                           this.traveler_details.email = event.target.value
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
                                                                           this.traveler_details.phonenumber = event.target.value
                                                                       }
                                                                   }
                                                            />
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
                                                                   required
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

                                                        <h6>Free cancellation until tomorrow</h6>
                                                        <h6>
                                                            <small>
                                                                If cancelled or modified up to 3 days before date of
                                                                arrival, no fee will be charged. If cancelled or
                                                                modified later or in case of no-show, 100 percent of the
                                                                first night will be charged.
                                                            </small>
                                                        </h6>

                                                        <br/>

                                                        <h6>Additional Terms</h6>
                                                        <h6>
                                                            <small>
                                                                <br/>1. 100 percent of the first night may be charged
                                                                anytime after booking.
                                                                <br/>2. The property reserves the right to pre-authorise
                                                                credit cards prior to arrival.
                                                                <br/>3. Bed types, smoking preference, and in-room
                                                                amenities are subject to hotel availability. Any
                                                                incidental charges will be assessed to you by the hotel
                                                                upon check-out, including parking fees, phone calls and
                                                                room service.
                                                                <br/>4. Government photo ID required. Age restrictions
                                                                may apply (check age restrictions with the hotel) unless
                                                                accompanied by parent or guardian.
                                                                <br/>5. For any bookings made by persons below the age
                                                                of 21, the hotel check in is not allowed and no booking
                                                                refunds will be made. Please note that all guests must
                                                                present valid IDs upon check-in. Government-issued photo
                                                                identification and a credit card or cash deposit are
                                                                required at check-in for incidental charges. Please note
                                                                that the dress code for guests at check in is smart
                                                                casual. Please contact the hotel for more information.
                                                                Please note that a valid credit card is required to
                                                                guarantee the reservation which will be pre-authorised
                                                                at the time of booking. There will be a mandatory New
                                                                Year's Eve Gala Dinner on 31 December 2017 at a charge
                                                                of AED 2750 per person. For children between the age of
                                                                6 and 12 years the Gala Dinner charge would be AED 1375.
                                                                Please note that only the suites can accommodate extra
                                                                beds. This is available for an extra fee.
                                                                <br/>6. 10 % service charge is excluded. 6 % Tourism fee
                                                                is excluded. AED 15 Destination fee per night is
                                                                excluded. 4 % Municipality fee is excluded.
                                                                <br/>7. Breakfast costs AED 224 per person per night.
                                                                <br/>8. Free private parking is possible on site
                                                                (reservation is not needed).
                                                                <br/>9. WiFi is available in all areas and is free of
                                                                charge.
                                                                <br/>10. All children are welcome. One child under 6
                                                                years stays free of charge when using existing beds. All
                                                                children under 2 years stay free of charge for
                                                                children's cots/cribs. All children under 6 years stay
                                                                free of charge for extra beds. All further older
                                                                children or adults are charged AED 650 per night for
                                                                extra beds. The maximum number of extra beds in a room
                                                                is 1.
                                                                <br/>11. Pets are not allowed.
                                                                <br/>12. When booking more than 10 rooms, different
                                                                policies and additional supplements may apply.
                                                            </small>
                                                        </h6>

                                                        <br/>

                                                        <h5>By clicking <strong>"Book"</strong> you agree to KAYAK's
                                                            policies</h5>

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
                                                            onClick={() => this.handleHotelBooking(this.hotel_payment)}>
                                                            BOOK
                                                        </button>
                                                        <AlertContainer ref={a => this.msg = a} {...alertOptions}/>
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
                                                    <h5>
                                                        <strong>{this.state.hotelObject.hotelName}</strong>{this.state.roomType}
                                                    </h5>

                                                    <h6><span
                                                        className="color-red-3">Adults : {this.props.hotelNoOfPeople}</span>
                                                    </h6>

                                                    <h6>
                                                        {this.state.fromDate}
                                                    </h6>
                                                    <h6>
                                                        {this.state.toDate}
                                                    </h6>
                                                    <br/><br/>
                                                    <h4>Costing</h4>
                                                    <hr/>
                                                    <div className="col-md-12">
                                                        <div className="col-md-6">
                                                            <h6>{this.props.hotelNoOfPeople}
                                                                Adult/s, {this.state.roomType}</h6>
                                                            <h6>Taxes and Fees</h6>
                                                            <hr/>
                                                            <h5><strong>TOTAL</strong></h5>
                                                        </div>

                                                        <div className="col-md-6">
                                                            <h6>{(this.state.base_price * this.props.hotelNoOfPeople).toFixed(2)}</h6>
                                                            <h6>{(this.state.base_price * this.props.hotelNoOfPeople * 0.09).toFixed(2)}</h6>
                                                            <hr/>
                                                            <h2>
                                                                <strong>{(this.state.base_price * this.props.hotelNoOfPeople * 1.09).toFixed(2)}</strong>
                                                            </h2>
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
                </div>


            </div>

        );
    }
}

//if you need anything from state to use here
function mapStateToProps(state) {

    return {
        hotelId: state.hotelId,
        hotelRoomType: state.hotelRoomType,
        hotelFromDate: state.hotelFromDate,
        hotelToDate: state.hotelToDate,
        hotelNoOfPeople: state.hotelNoOfPeople

    };
}

//if you need to push something to state, use action -> reducer

function mapDispatchToProps(dispatch) {
    return {
        bookingSuccess: (state) => {
            dispatch(booking_success(state))
        }
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HotelBooking));