import React, {Component} from 'react';
import {Route, withRouter, Switch, Link} from 'react-router-dom';

import '../../design/css/bootstrap.min.css'
import '../../design/css/jquery-ui.min.css'
import '../../design/css/jquery-ui.structure.min.css'
import '../../design/css/style.css'

class UserPaymentDetails extends Component {

    render() {
        return (
            <div className="col-xs-12 col-md-8">
                <form className="simple-from">
                    <div className="simple-group">
                        <h3 className="small-title">Your Personal Information</h3>
                        <div className="row">
                            <div className="col-xs-12 col-sm-6">
                                <div className="form-block type-2 clearfix">
                                    <div className="form-label color-dark-2">First Name</div>
                                    <div className="input-style-1 b-50 brd-0 type-2 color-3">
                                        <input type="text" placeholder="Enter your first name" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-6">
                                <div className="form-block type-2 clearfix">
                                    <div className="form-label color-dark-2">Last Name</div>
                                    <div className="input-style-1 b-50 brd-0 type-2 color-3">
                                        <input type="text" placeholder="Enter your last name" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-6">
                                <div className="form-block type-2 clearfix">
                                    <div className="form-label color-dark-2">E-mail Adress</div>
                                    <div className="input-style-1 b-50 brd-0 type-2 color-3">
                                        <input type="text" placeholder="Enter your e-mail adress" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-6">
                                <div className="form-block type-2 clearfix">
                                    <div className="form-label color-dark-2">Verify E-mail Address</div>
                                    <div className="input-style-1 b-50 brd-0 type-2 color-3">
                                        <input type="text" placeholder="Enter your e-mail adress for verify" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-6">
                                <div className="form-block type-2 clearfix">
                                    <div className="form-label color-dark-2">Country Code</div>
                                    <div className="drop-wrap drop-wrap-s-4 color-5">
                                        <div className="drop">
                                            <b>United Kingdom (+44)</b>
                                            <a href="#" className="drop-list"><i className="fa fa-angle-down"></i></a>
                                            <span>
                                                <a href="#">USA (+44)</a>
                                                <a href="#">Canada (+15)</a>
                                                <a href="#">France (+34)</a>
                                                <a href="#">Italy (+42)</a>
                                                <a href="#">Spain (+15)</a>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-6">
                                <div className="form-block type-2 clearfix">
                                    <div className="form-label color-dark-2">Phone Number</div>
                                    <div className="input-style-1 b-50 brd-0 type-2 color-3">
                                        <input type="text" placeholder="Enter your phone number" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-12">
                                <div className="confirm-terms">
                                    <div className="input-entry color-3">
                                        <input className="checkbox-form" id="text-1" type="checkbox" name="checkbox"
                                               value="climat control" />
                                            <label className="clearfix" for="text-1">
                                                <span className="sp-check"><i className="fa fa-check"></i></span>
                                                <span className="checkbox-text"> I want to receive <a
                                                    className="color-dr-blue-2 link-dark-2" href="#">Let’s Travel</a> promotional offers in the future</span>
                                            </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="simple-group">
                        <h3 className="small-title">Your Card Information</h3>
                        <div className="row">
                            <div className="col-xs-12 col-sm-6">
                                <div className="form-block type-2 clearfix">
                                    <div className="form-label color-dark-2">Credit Card Type</div>
                                    <div className="drop-wrap drop-wrap-s-4 color-5">
                                        <div className="drop">
                                            <b>Select a card</b>
                                            <a href="#" className="drop-list"><i className="fa fa-angle-down"></i></a>
                                            <span>
                                            <a href="#">USD 1254 6524 2541 6212</a>
                                            <a href="#">EUR 6524 1254 6212 2541</a>
                                            <a href="#">USD 1254 6524 2541 6212</a>
                                            <a href="#">EUR 6524 1254 6212 2541</a>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-6">
                                <div className="form-block type-2 clearfix">
                                    <div className="form-label color-dark-2">Card Holder Name</div>
                                    <div className="input-style-1 b-50 brd-0 type-2 color-3">
                                        <input type="text" placeholder="Enter your card holder name" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-6">
                                <div className="form-block type-2 clearfix">
                                    <div className="form-label color-dark-2">Card Number</div>
                                    <div className="input-style-1 b-50 brd-0 type-2 color-3">
                                        <input type="text" placeholder="Enter your card number" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-6">
                                <div className="form-block type-2 clearfix">
                                    <div className="form-label color-dark-2">Card Identification Number</div>
                                    <div className="input-style-1 b-50 brd-0 type-2 color-3">
                                        <input type="text" placeholder="Enter your e-mail adress for verify" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-6">
                                <div className="form-block type-2 clearfix">
                                    <div className="form-label color-dark-2">Credit Card Type</div>
                                    <div className="row">
                                        <div className="col-xs-12 col-sm-6">
                                            <div className="drop-wrap drop-wrap-s-4 color-5">
                                                <div className="drop">
                                                    <b>Month</b>
                                                    <a href="#" className="drop-list"><i className="fa fa-angle-down"></i></a>
                                                    <span>
                                                        <a href="#">January</a>
                                                        <a href="#">February</a>
                                                        <a href="#">March</a>
                                                        <a href="#">April</a>
                                                        <a href="#">May</a>
                                                        <a href="#">June</a>
                                                        <a href="#">Jul</a>
                                                        <a href="#">July</a>
                                                         <a href="#">August</a>
                                                        <a href="#">September</a>
                                                        <a href="#">October</a>
                                                        <a href="#">November</a>
                                                        <a href="#">December</a>
                                                        </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xs-12 col-sm-6">
                                            <div className="drop-wrap drop-wrap-s-4 color-5">
                                                <div className="drop">
                                                    <b>Year</b>
                                                    <a href="#" className="drop-list"><i className="fa fa-angle-down"></i></a>
                                                    <span>
                                                        <a href="#">2015</a>
                                                        <a href="#">2016</a>
                                                        <a href="#">2017</a>
                                                        <a href="#">2018</a>
                                                        <a href="#">2019</a>
                                                        <a href="#">2020</a>
                                                        </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-6">
                                <div className="form-block type-2 clearfix">
                                    <div className="form-label color-dark-2">Billing Zip Code</div>
                                    <div className="input-style-1 b-50 brd-0 type-2 color-3">
                                        <input type="text" placeholder="Enter billing zip code" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="confirm-terms">
                            <div className="input-entry color-3">
                                <input className="checkbox-form" id="text-2" type="checkbox" name="checkbox"
                                       value="climat control" />
                                    <label className="clearfix" for="text-2">
                                        <span className="sp-check"><i className="fa fa-check"></i></span>
                                        <span className="checkbox-text">By continuing, you agree to the<a
                                            className="color-dr-blue-2 link-dark-2"
                                            href="#"> Terms and Conditions</a>.</span>
                                    </label>
                            </div>
                        </div>
                    </div>
                    <input type="submit" className="c-button bg-dr-blue-2 hv-dr-blue-2-o" value="confirm booking" />
                </form>
            </div>
        );
    }
}

export default withRouter(UserPaymentDetails);