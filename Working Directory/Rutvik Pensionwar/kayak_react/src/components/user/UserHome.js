import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from "react-redux"

import {doLogout} from "../../api/user/API_HandleLogout";

import '../../design/css/bootstrap.min.css'
import '../../design/css/jquery-ui.min.css'
import '../../design/css/jquery-ui.structure.min.css'
import '../../design/css/style.css'

class UserHome extends Component {

    handleSubmit = (userdata) => {
    };

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
            <div className="container">

                <header className="color-1 hovered menu-3">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="nav">
                                    <a href="index.html" className="logo">
                                        <img src="https://a1.r9cdn.net/rimg/provider-logos/common/socialmedia/kayak-logo.png?width=440&height=220&crop=false"
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
                                        <li className="type-1 active">
                                            <a href="#">Home<span className="fa fa-angle-down"></span></a>
                                            <ul className="dropmenu">
                                                <li><a href="index.html">Homepage 1</a></li>
                                            </ul>
                                        </li>
                                        <li className="type-1"><a href="#">Hotels<span
                                            className="fa fa-angle-down"></span></a>
                                            <ul className="dropmenu">
                                                <li><a href="index_2.html">Home Hotels</a></li>
                                                <li><a href="hotel_list.html">List View</a></li>
                                                <li><a href="hotel_list_2.html">List View 2</a></li>
                                                <li><a href="hotel_grid.html">Grid View</a></li>
                                                <li><a href="hotel_block.html">Block View</a></li>
                                                <li><a href="hotel_detail.html">Hotel Details 1</a></li>
                                                <li><a href="booking.html">Booking</a></li>
                                                <li><a href="thank_you.html">Thank You</a></li>
                                            </ul>
                                        </li>
                                        <li className="type-1"><a href="#">Flights<span
                                            className="fa fa-angle-down"></span></a>
                                            <ul className="dropmenu">
                                                <li><a href="plane.html">Home Flights</a></li>
                                                <li><a href="flight_list.html">List View</a></li>
                                                <li><a href="flight_grid.html">Grid View</a></li>
                                                <li><a href="flight_block.html">Block View</a></li>
                                                <li><a href="flight_details.html">Detailed</a></li>
                                                <li><a href="booking.html">Booking</a></li>
                                                <li><a href="thank_you.html">Thank You</a></li>
                                            </ul>
                                        </li>
                                        <li className="type-1"><a href="#">Cars<span
                                            className="fa fa-angle-down"></span></a>
                                            <ul className="dropmenu">
                                                <li><a href="car_list.html">List View</a></li>
                                                <li><a href="car_grid.html">Grid View</a></li>
                                                <li><a href="car_block.html">Block View</a></li>
                                                <li><a href="car_detail.html">Detailed</a></li>
                                                <li><a href="booking.html">Booking</a></li>
                                                <li><a href="thank_you.html">Thank You</a></li>
                                            </ul>
                                        </li>
                                        <li className="type-1"><a href="#">Cruises<span
                                            className="fa fa-angle-down"></span></a>
                                            <ul className="dropmenu">
                                                <li><a href="cruise_list.html">List View</a></li>
                                                <li><a href="cruise_grid.html">Grid View</a></li>
                                                <li><a href="cruise_block.html">Block View</a></li>
                                                <li><a href="cruise_detail.html">Detailed</a></li>
                                                <li><a href="booking.html">Booking</a></li>
                                                <li><a href="thank_you.html">Thank You</a></li>
                                            </ul>
                                        </li>
                                        <li className="type-1"><a href="#">Pages<span
                                            className="fa fa-angle-down"></span></a>
                                            <ul className="dropmenu">
                                                <li><a href="#">About <span className="fa fa-chevron-right"></span></a>
                                                    <ul className="dropmenu">
                                                        <li><a href="about_us.html">About us 1</a></li>
                                                        <li><a href="about_us_2.html">About us 2</a></li>
                                                    </ul>
                                                </li>
                                                <li><a href="#">Service <span
                                                    className="fa fa-chevron-right"></span></a>
                                                    <ul className="dropmenu">
                                                        <li><a href="services.html">Services 1</a></li>
                                                        <li><a href="services_2.html">Services 2</a></li>
                                                    </ul>
                                                </li>
                                                <li><a href="#">Gallery <span
                                                    className="fa fa-chevron-right"></span></a>
                                                    <ul className="dropmenu">
                                                        <li><a href="gallery.html">Gallery Masonry</a></li>
                                                        <li><a href="gallery_2.html">Gallery Masonry 2</a></li>
                                                        <li><a href="gallery_3.html#cruises">Gallery 4 Column</a></li>
                                                        <li><a href="gallery_4.html#cruises">Gallery 3 Column</a></li>
                                                        <li><a href="gallery_5.html#cruises">Gallery 2 Column</a></li>
                                                        <li><a href="gallery_detail.html">Gallery Read</a></li>
                                                    </ul>
                                                </li>
                                                <li><a href="#">Blog <span className="fa fa-chevron-right"></span></a>
                                                    <ul className="dropmenu">
                                                        <li><a href="blog.html">Blog Style 1</a></li>
                                                        <li><a href="blog_list.html">Blog Right Sidebar</a></li>
                                                        <li><a href="blog_list_2.html">Blog Left Sidebar</a></li>
                                                        <li><a href="blog_full.html">Blog Full Width</a></li>
                                                        <li><a href="blog_detail.html">Blog Read</a></li>
                                                        <li><a href="blog_detail_2.html">Blog Read 2</a></li>
                                                    </ul>
                                                </li>
                                                <li><a href="#">FAQ <span className="fa fa-chevron-right"></span></a>
                                                    <ul className="dropmenu">
                                                        <li><a href="faq.html">Faq1</a></li>
                                                        <li><a href="faq1.html">Faq2</a></li>
                                                    </ul>
                                                </li>
                                                <li><a href="#">Layouts <span
                                                    className="fa fa-chevron-right"></span></a>
                                                    <ul className="dropmenu">
                                                        <li><a href="page_layout_left_sidebar.html">Layouts Left
                                                            Sidebar</a>
                                                        </li>
                                                        <li><a href="page_layout_right_sidebar.html">Layouts Right
                                                            Sidebar</a></li>
                                                        <li><a href="page_layout_2_sidebar.html">Layouts Two Sidebar</a>
                                                        </li>
                                                        <li><a href="page_layout_full_width.html">Layouts Full Width</a>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li><a href="#">Contact <span
                                                    className="fa fa-chevron-right"></span></a>
                                                    <ul className="dropmenu">
                                                        <li><a href="contact_us.html">Contact us 1</a></li>
                                                        <li><a href="contact_us_2.html">Contact us 2</a></li>
                                                    </ul>
                                                </li>
                                                <li><a href="policies.html">Policies</a></li>
                                                <li><a href="sitemap.html">Site Map</a></li>
                                                <li><a href="#">404 page <span
                                                    className="fa fa-chevron-right"></span></a>
                                                    <ul className="dropmenu">
                                                        <li><a href="404.html">Page 404 style 1</a></li>
                                                        <li><a href="404_2.html">Page 404 style 2</a></li>
                                                    </ul>
                                                </li>
                                                <li><a href="#">Coming soon <span
                                                    className="fa fa-chevron-right"></span></a>
                                                    <ul className="dropmenu">
                                                        <li><a href="cooming_soon.html">Coming soon 1</a></li>
                                                        <li><a href="cooming_soon_2.html">Coming soon 2</a></li>
                                                    </ul>
                                                </li>
                                                <li><a href="login.html">Login</a></li>
                                            </ul>
                                        </li>
                                        <li className="type-1"><a href="#">Shortcodes<span
                                            className="fa fa-angle-down"></span></a>
                                            <ul className="dropmenu">
                                                <li><a href="accordions.html">Accordions & Toggles</a></li>
                                                <li><a href="tabs.html">Tabs</a></li>
                                                <li><a href="buttons.html">Buttons</a></li>
                                                <li><a href="gallery_2.html">Image & Gallery Styles</a></li>
                                                <li><a href="gallery.html">Image Box Styles</a></li>
                                                <li>
                                                    <a href="#">Listing Styles<span
                                                        className="fa fa-chevron-right"></span></a>
                                                    <ul className="dropmenu">
                                                        <li><a href="tour_list.html">Listing Style 01</a></li>
                                                        <li><a href="tour_list_2.html">Listing Style 02</a></li>
                                                        <li><a href="tour_list_3.html">Listing Style 03</a></li>
                                                        <li><a href="tour_list_4.html">Listing Style 04</a></li>
                                                    </ul>
                                                </li>
                                                <li><a href="dropdowns.html">Dropdowns</a></li>
                                                <li><a href="prices.html">Pricing Tables</a></li>
                                                <li><a href="testimonials.html">Testimonials</a></li>
                                                <li><a href="ourteam.html">Our team</a></li>
                                                <li><a href="gallerypopup.html">Gallery Popup</a></li>
                                                <li><a href="thank_you.html">Thank you</a></li>
                                            </ul>
                                        </li>

                                        <li className="type-1"><a href="#">My Account<span
                                            className="fa fa-angle-down"></span></a>
                                            <ul className="dropmenu">
                                                <li><a href="#">Account Preferences {this.props.username} </a></li>
                                                <li><a href="car_block.html">Trips</a></li>
                                                <li><a href="car_detail.html">Watchlist</a></li>
                                                <li><a href="" onClick={this.handleSignOut}>Sign Out</a></li>

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
                                                    <h5><strong className="color-red-3">ETIHAD AIRWAYS</strong></h5>
                                                    <h4><b>AUH to SFO</b></h4>
                                                    <h5>Etihad Airways - One Way - Economy - <span
                                                        className="color-red-3"> Adults : 3</span></h5>

                                                    <div className="fi_block">
                                                        <div className="flight-icon col-xs-4 col10">
                                                            <img className="fi_icon"
                                                                 src="https://cdn4.iconfinder.com/data/icons/aiga-symbol-signs/444/aiga_departingflights-512.png"
                                                                 height="25" width="25"
                                                                 alt=""/>
                                                            <div className="fi_content">

                                                                <div className="fi_title color-dark-2">Depart</div>
                                                                <div className="fi_title color-dark-2">wed nov 13, 2013
                                                                    7:50 am
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

                                                                <div className="fi_title color-dark-2">Return</div>
                                                                <div className="fi_title color-dark-2">wed nov 13, 2013
                                                                    7:50 am
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <br/><br/>
                                                    <button className="btn btn-primary" onClick={() => {
                                                        this.props.history.push("/UserPaymentDetails");
                                                    }}>
                                                        View more ...
                                                    </button>
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
                                                    <h4><strong className="color-red-3">Enter Traveler Details (must be
                                                        an adult)</strong></h4>

                                                    <div className="help-contact">
                                                        <h6>Logged in as :
                                                            <b> pensionwar.rutvik@gmail.com</b></h6>
                                                    </div>

                                                    <hr/>

                                                    <div className="col-sm-12">
                                                        <h5><strong className="color-red-3">Traveler</strong>
                                                            <small>(primary contact must be an adult)</small>
                                                        </h5>
                                                        <br/>

                                                        <div className="col-sm-6">
                                                            <h6>First Name</h6>
                                                            <input type="password" name=""
                                                                   className="form-control input-sm"
                                                                   id="" value=""/>
                                                        </div>

                                                        <div className="col-sm-6">
                                                            <h6>Middle Name</h6>
                                                            <input type="password" name=""
                                                                   className="form-control input-sm"
                                                                   id="" value=""/>
                                                        </div>
                                                    </div>


                                                    <div className="col-sm-12">
                                                        <div className="col-sm-6">
                                                            <h6>Lastname</h6>
                                                            <input type="" name="" className="form-control input-sm"
                                                                   id=""
                                                                   value=""/>
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-12">
                                                        <div className="col-sm-6">
                                                            <h6>Email Address</h6>
                                                            <input type="" name="" className="form-control input-sm"
                                                                   id=""
                                                                   value=""/>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <h6>Phone Number</h6>
                                                            <input type="" name="" className="form-control input-sm"
                                                                   id="" value=""/>
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-12">
                                                        <div className="col-sm-6">
                                                            <h6>Carrier</h6>
                                                            <input type="" name="" className="form-control input-sm"
                                                                   id=""
                                                                   value=""/>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <h6>Frequent Flyer Number</h6>
                                                            <input type="" name="" className="form-control input-sm"
                                                                   id="" value=""/>
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-12">

                                                        <hr/>

                                                        <h5><strong className="color-red-3">Secure flight information required by the airline</strong>
                                                        </h5>

                                                        <br/>

                                                        <div className="col-sm-8">
                                                            <h6>Date of Birth</h6>

                                                            <input type="" name="" className="form-control input-sm"
                                                                   id=""
                                                                   value=""/>

                                                        </div>
                                                        <div className="col-sm-4">
                                                            <h6>Frequent Flyer Number</h6>
                                                            <input type="" name="" className="form-control input-sm"
                                                                   id="" value=""/>
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-12">
                                                        <hr/>
                                                        <h5><strong className="color-red-3">Choose Seats</strong>
                                                            <small>(optional)</small>
                                                        </h5>
                                                        <br/>
                                                        {/*Seat selection code should go here*/}
                                                    </div>

                                                    <div className="col-sm-12">
                                                        <hr/>
                                                        <h5><strong className="color-red-3">Travel Options</strong>
                                                            <small>(optional)</small>
                                                        </h5>
                                                        <h6>
                                                            <small>Recommended: Trip Protection</small>
                                                        </h6>
                                                        <br/>

                                                        <h6><input type="radio" name="insurance_yes"
                                                                   value="insurance_yes"/> Yes</h6>
                                                        <h6>
                                                            <small>
                                                                <br/>1. 100% Trip Cancellation and Trip Interruption
                                                                Protection reimburses for cancellations due to reasons
                                                                like covered illness, injury and more
                                                                <br/>2. $20,000 Emergency Medical Coverage
                                                                <br/>3. $100,000 Emergency Medical Transportation
                                                                <br/>4. Travel Delay provides reimbursement for meals
                                                                and accommodation expenses when a trip is delayed
                                                                <br/>5. 24/7 Live Emergency Hotline Help offers a broad
                                                                range of services in the event of a travel or medical
                                                                emergency including: medical referral and monitoring,
                                                                legal assistance, arrangement of medical evacuations or
                                                                repatriations and pre-trip assistance
                                                                <br/>6. Concierge provides information about your
                                                                destination before you travel and can help you select
                                                                restaurants, reserve golf tee times or secure tickets to
                                                                local events
                                                                <br/>7. Protect your travel investment with valuable
                                                                Allianz Travel Insurance.
                                                            </small>
                                                        </h6>

                                                        <br/>

                                                        <h6><input type="radio" name="insurance_no"
                                                                   value="insurance_no"/> No,
                                                            <small>I understand by declining protection I am responsible
                                                                for all cancellation fees and delay expenses.
                                                            </small>
                                                        </h6>
                                                        <h6>
                                                            <small>
                                                                <br/>Recommended by AGA Service Company, the licensed
                                                                producer and administrator of this plan.
                                                                <br/>Insurance benefits are underwritten by either BCS
                                                                Insurance Company or Jefferson Insurance Company,
                                                                depending on insured's state of residence. Terms,
                                                                conditions and exclusions apply.
                                                            </small>
                                                        </h6>
                                                    </div>


                                                    <div className="col-sm-12">
                                                        <hr/>
                                                        <h5><strong className="color-red-3">Enter Billing
                                                            Information</strong></h5>
                                                        <h6>
                                                            <small> Billing Address</small>
                                                        </h6>
                                                        <br/>

                                                        <div className="col-sm-6">
                                                            <h6>Street
                                                                <small>Line 1</small>
                                                            </h6>
                                                            <input type="password" name=""
                                                                   className="form-control input-sm"
                                                                   id="" value=""/>
                                                        </div>

                                                        <div className="col-sm-6">
                                                            <h6>Street
                                                                <small>Line 2</small>
                                                            </h6>
                                                            <input type="password" name=""
                                                                   className="form-control input-sm"
                                                                   id="" value=""/>
                                                        </div>
                                                    </div>


                                                    <div className="col-sm-12">
                                                        <div className="col-sm-6">
                                                            <h6>Postal Code</h6>
                                                            <input type="" name="" className="form-control input-sm"
                                                                   id=""
                                                                   value=""/>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <h6>City</h6>
                                                            <input type="" name="" className="form-control input-sm"
                                                                   id=""
                                                                   value=""/>
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-12">
                                                        <div className="col-sm-6">
                                                            <h6>State/Region</h6>
                                                            <input type="" name="" className="form-control input-sm"
                                                                   id=""
                                                                   value=""/>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <h6>Country</h6>
                                                            <input type="" name="" className="form-control input-sm"
                                                                   id="" value=""/>
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-12">
                                                        <hr/>
                                                        <h5><strong className="color-red-3">Card Details</strong></h5>
                                                        <br/>

                                                        <div className="col-sm-6">
                                                            <h6>Name on Card</h6>
                                                            <input type="password" name=""
                                                                   className="form-control input-sm"
                                                                   id="" value=""/>
                                                        </div>

                                                        <div className="col-sm-6">
                                                            <h6>Card Number</h6>
                                                            <input type="password" name=""
                                                                   className="form-control input-sm"
                                                                   id="" value=""/>
                                                        </div>
                                                    </div>


                                                    <div className="col-sm-8">
                                                        <div className="col-sm-6">
                                                            <h6>Good Thru</h6>
                                                            <input type="" name="" className="form-control input-sm"
                                                                   id=""
                                                                   value=""/>
                                                        </div>
                                                        <div className="col-sm-2">
                                                            <h6>CVV</h6>
                                                            <input type="" name="" className="form-control input-sm"
                                                                   id=""
                                                                   value=""/>
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
                                                            also apply.</h5>

                                                        <br/>

                                                        <div className="form-check">
                                                            <label className="form-check-label">
                                                                <h6>
                                                                    <input className="form-check-input" type="checkbox"
                                                                           value=""/>
                                                                    Email me KAYAK's deals
                                                                </h6>
                                                            </label>
                                                        </div>
                                                    </div>


                                                    <div className="col-sm-12">
                                                        <br/>
                                                        <button
                                                            className="btn-block btn-success btn-group-sm"
                                                            type="button">
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
    console.log("User logged in is " + state.username);
    return {
        username: state.username
    };
}

//if you need to push something to state, use action -> reducer
function mapDispatchToProps(dispatch) {
    return {

    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserHome));