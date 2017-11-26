import React, {Component} from 'react';
import {Route, withRouter, Switch, Link} from 'react-router-dom';

import Login from '../Login'
import SignUp from '../SignUp'

import '../../design/css/bootstrap.min.css'
import '../../design/css/jquery-ui.min.css'
import '../../design/css/jquery-ui.structure.min.css'
import '../../design/css/style.css'
import '../../design/css/modal.css'

class Home extends Component {

    handleSubmit = (userdata) => {
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
                                                <li><a href="index_2.html">Homepage 2</a></li>
                                                <li><a href="index_3.html">Homepage 3</a></li>
                                                <li><a href="index_4.html">Homepage 4</a></li>
                                                <li><a href="index_5.html">Homepage 5</a></li>
                                                <li><a href="index_6.html">Homepage 6</a></li>
                                                <li><a href="index_7.html">Homepage 7</a></li>
                                                <li><a href="index_8.html">Homepage 8</a></li>
                                                <li><a href="index_9.html">Homepage 9</a></li>
                                                <li><a href="index_10.html">Homepage 10</a></li>
                                                <li><a href="plane.html">Homepage 11</a></li>
                                                <li><a href="hotels.html">Homepage 12</a></li>
                                                <li><a href="video_bar.html">Homepage 13</a></li>
                                                <li><a href="tour.html">Homepage 14</a></li>
                                                <li><a href="ship.html">Homepage 15</a></li>
                                                <li><a href="rental.html">Homepage 16</a></li>
                                                <li><a href="cars.html">Homepage 17</a></li>
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
                                                <li><a href="#" data-toggle="modal" data-target="#signup-modal">Sign Up</a></li>
                                                <li><a href="#" data-toggle="modal" data-target="#login-modal">Sign In</a></li>
                                                <li><a href="car_block.html">Trips</a></li>
                                                <li><a href="car_detail.html">Watchlist</a></li>

                                            </ul>
                                        </li>
                                    </ul>
                                </nav>
                            </div>

                        </div>
                    </div>
                </header>

                <div className="modal fade" id="signup-modal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="loginmodal-container">
                            <SignUp />
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="login-modal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="loginmodal-container">
                            <Login />
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default withRouter(Home);