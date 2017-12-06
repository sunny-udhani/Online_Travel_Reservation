import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from "react-redux"

import {booking_success} from "../../actions";

import {doLogout} from "../../api/user/API_HandleLogout";
import {getCarDetails} from "../../api/user/API_GetDetailsforPayment";
import {getUserDetails} from "../../api/user/API_GetUserDetails";
import {bookCar} from "../../api/user/API_BookCar";
import {insertTravelerDetails} from "../../api/user/API_InsertTravelerDetails";

import AlertContainer from 'react-alert';
import {alertOptions, showAlert} from "../../alertConfig";

import '../../design/css/bootstrap.min.css'
import '../../design/css/jquery-ui.min.css'
import '../../design/css/jquery-ui.structure.min.css'
import '../../design/css/style.css'

class CarBooking extends Component {

    handleSubmit = (userdata) => {

    };

    state = {
        operation: 'car',
        carObject: '',
        userDetails: '',
        paymentDetails: '',
        billingAddress: '',

        carId: this.props.carId,
        fromDate: this.props.carFromDate,
        toDate: this.props.carToDate,

        noofdays: 0,
        base_price: 0
    };

    car_payment = {
        carId: '',
        fromDate: '',
        toDate: '',
        noOfDays: '',
        ticketPrice: '',
        totalAmount: '',
        username: '',
        hostId: ''
    };

    componentWillMount() {
        console.log("1");
        let carId = {
            id: this.state.carId
        };

        getCarDetails(carId)
            .then(res => {
                if (res.status === 200) {

                    console.log(this);
                    console.log("10");

                    res.json()
                        .then(data => {
                            console.log("11");
                            console.log(data);

                            var fromDate = new Date(this.state.fromDate);
                            var toDate = new Date(this.state.toDate);

                            var difference = toDate.getDate() - fromDate.getDate();

                            this.setState({
                                ...this.state,
                                noofdays: difference,
                                carObject: data
                            });

                            console.log("Car base price is " + this.state.carObject.price);
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
                                                this.car_payment.carId = this.state.carId;
                                                this.car_payment.fromDate = this.state.fromDate;
                                                this.car_payment.toDate = this.state.toDate;
                                                this.car_payment.noOfDays = this.state.noofdays;
                                                this.car_payment.ticketPrice = this.state.carObject.price;
                                                this.car_payment.totalAmount = this.state.carObject.price * this.state.noofdays * 1.09;
                                                this.car_payment.username = this.state.userDetails.username;
                                                this.car_payment.hostId = this.state.carObject.hostId;
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

    handleCarBooking(userdata) {
        console.log("In handleFlightBooking");
        console.log(userdata);

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

                                bookCar(userdata)
                                    .then((res) => {
                                        console.log(res.status);
                                        console.log(userdata.username);
                                        if (res.status === 200) {
                                            console.log("success");

                                            let payload = {
                                                bookingType: "car",
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
                <div className="row list-wrapper  bg-grey-2">
                    <div className="col-md-8">
                        <div className="list-content clearfix">
                            <div className="list-item-entry">
                                <div className="hotel-item style-10 bg-white">
                                    <div className="table-view">


                                        <div className="title hotel-middle cell-view">
                                            <h5 className="color-grey-3">You will drive
                                                <br/>
                                                <h4><strong
                                                    className="color-red-3">{this.state.carObject.carMake} {this.state.carObject.carName}</strong>
                                                </h4>
                                            </h5>

                                            <br/>
                                            <h5>
                                                <b>{this.state.carObject.carType}</b>{this.state.carObject.carModel}
                                            </h5>

                                            <h6>
                                                <br/>
                                                <span className="color-red-3"> {this.state.carObject.city}
                                                    - {this.state.carObject.state}
                                                    - {this.state.carObject.zipCode}</span>

                                                <br/>
                                                Days : <span
                                                className="color-red-3">{this.state.noofdays}</span>

                                                <br/>
                                                <small>capacity <span
                                                    className="color-red-3">{this.state.carObject.capacity}</span>
                                                </small>
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

                                <div className="list-content clearfix">
                                    <div className="list-item-entry">
                                        <div className="bg-grey-2">
                                            <div className="table-view">
                                                <div className="title hotel-middle cell-view">
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
                                                                className="color-red-3">{this.state.noofdays}</span>
                                                            </h4>
                                                        </div>

                                                        <div className="col-sm-2">
                                                            <h4><span
                                                                className="color-red-3">{this.state.carObject.price}</span>
                                                            </h4>
                                                        </div>

                                                        <div className="col-sm-2">
                                                            <h4><span
                                                                className="color-red-3">{(this.state.carObject.price * 0.09).toFixed(2)}</span>
                                                            </h4>
                                                        </div>

                                                        <div className="col-sm-4">
                                                            <h4><span
                                                                className="color-red-3">{(this.state.carObject.price * 1.09).toFixed(2)}</span>
                                                            </h4>
                                                        </div>

                                                        <div className="col-sm-2">
                                                            <h4><span
                                                                className="color-red-3">{(this.state.carObject.price * this.state.noofdays * 1.09).toFixed(2)}</span>
                                                            </h4>
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-12">
                                                        <hr/>

                                                        <h5><strong className="color-red-3">Enter Renter
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
                                                        <h5><strong className="color-red-3">Rental Insurance </strong>
                                                            <small>(optional)</small>
                                                        </h5>
                                                        <h6>
                                                            <small>It Saves You Money! Purchasing collision damage
                                                                insurance
                                                                online is almost always cheaper than at the counter.
                                                            </small>
                                                        </h6>

                                                        <div className="radio">
                                                            <h6>
                                                                <label><input type="radio" name="optradio"/>
                                                                    <strong>Yes, </strong>
                                                                    <small>
                                                                        <br/>1. Covers costs if your rental car is
                                                                        stolen or is
                                                                        damaged in an accident or while left unattended
                                                                        <br/>2. Provided as primary coverage – no
                                                                        deductible
                                                                        <br/>3. Toll-free, 24-hour emergency hotline
                                                                        help
                                                                        included
                                                                    </small>
                                                                </label>
                                                            </h6>
                                                        </div>
                                                        <div className="radio">
                                                            <h6>
                                                                <label><input type="radio" name="optradio"/>
                                                                    <strong>No, </strong>
                                                                    <small>"Nothing goes wrong when I travel." –
                                                                        Familiar with
                                                                        Murphy's Law? There's a first time for
                                                                        everything.
                                                                        Recommended by AGA Service Company, the licensed
                                                                        producer and administrator of this plan.
                                                                        Insurance
                                                                        benefits are underwritten by either BCS
                                                                        Insurance
                                                                        Company or Jefferson Insurance Company,
                                                                        depending on
                                                                        insured's state of residence. Terms, conditions
                                                                        and
                                                                        exclusions apply.
                                                                    </small>
                                                                </label>
                                                            </h6>
                                                        </div>
                                                    </div>


                                                    <div className="col-sm-12">
                                                        <hr/>
                                                        <h5><strong className="color-red-3">Terms & Conditions</strong>
                                                            <small></small>
                                                        </h5>
                                                        <br/>

                                                        <h6>Cancellation Policy</h6>
                                                        <h6>
                                                            <small>
                                                                <br/>1. E-Z Rent-A-Car will charge your credit card the
                                                                amount
                                                                shown below at the time of booking. See detailed rental
                                                                terms
                                                                for cancellation and change policy information for this
                                                                rental.
                                                                <br/>2. You will need a credit card to pick up this car.
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
                                                            onClick={() => this.handleCarBooking(this.car_payment)}>
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

                                            <h5><strong className="color-red-3">{this.state.carObject.carMake}
                                                - {this.state.carObject.carName}</strong>
                                                : {this.state.carObject.carType}
                                                - {this.state.carObject.carModel}
                                            </h5>

                                            <h5>
                                                <small>From :</small>
                                                {this.state.fromDate}
                                                <br/>
                                                <small>To :</small>
                                                {this.state.toDate}
                                            </h5>

                                            <br/><br/>
                                            <h4>Costing</h4>
                                            <hr/>
                                            <div className="col-md-12">
                                                <div className="col-md-6">
                                                    <h6>{this.state.noofdays} Day/s</h6>
                                                    <h6>Taxes and Fees</h6>
                                                    <hr/>
                                                    <h5><strong>TOTAL</strong></h5>
                                                </div>

                                                <div className="col-md-6">
                                                    <h6>{(this.state.carObject.price * this.state.noofdays).toFixed(2)}</h6>
                                                    <h6>{(this.state.carObject.price * this.state.noofdays * 0.09).toFixed(2)}</h6>
                                                    <hr/>
                                                    <h2>
                                                        <strong>{(this.state.carObject.price * this.state.noofdays * 1.09).toFixed(2)}</strong>
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

        );
    }
}

//if you need anything from state to use here
function mapStateToProps(state) {

    return {
        carId: state.carId,
        carFromDate: state.carFromDate,
        carToDate: state.carToDate
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CarBooking));
