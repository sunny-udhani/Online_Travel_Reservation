import React, {Component} from 'react';
import './styles-user/triphistory.css';
import {Route, withRouter} from 'react-router-dom';
import '../bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';
import {connect} from "react-redux"
import Moment from "react-moment"
import {getbookinginfo_user} from '../../../../api/user/API_GetBookingInfo'

class TripHistory extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            flight: [],
            hotel: [],
            car: []
        });

    }

    componentWillMount() {
        let userdet = {
            // username:this.props.username
            username: this.props.username
        };
        if (this.props.isLoggedIn) {


            getbookinginfo_user(userdet)
                .then((res) => {
                    console.log(res);
                    console.log(this.state);

                    this.setState({
                        ...this.state,
                        hotel: res.hotel,
                        flight: res.flight,
                        car: res.car

                    });
                    console.log(this.state);

                }).catch((err) => {

                console.log(err);
            })
        } else {
            this.props.handlePageChange("/u")
        }
    }


    render() {
        console.log(this.state);

        let hotels = <svg xmlns="http://www.w3.org/2000/svg" width="25" height="17" fill="currentColor"
                          viewBox="0 0 25 17">
            <path d="M2 14.77h21v2H2z"></path>
            <path
                d="M6 7.07V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1.07h1V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1.07h2V0H4v7.07h2zM21 8.67H4a4.06 4.06 0 0 0-4 4.07v2.43h25v-2.43a4.06 4.06 0 0 0-4-4.07z"></path>
        </svg>
        let flights = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                           viewBox="0 0 20 20">
            <path
                d="M16.79 7.83l-3.93 3.93 4.51 7.05.76-.76-1.34-10.22M12.24 3.15L1.62 1.76l-.75.76 7.32 4.69 4.05-4.06"></path>
            <path
                d="M10.73 11.94l1.3-1.3 4.28-4.28 2.8-2.8s1.54-2.12.46-3.17-3.17.47-3.17.47l-2.62 2.62-4.4 4.4L8 9.24a20 20 0 0 0-2.23 3.2l-4.67-.89L0 12.62l3.79 2.65.92.92L7.41 20l1.07-1.1-.91-4.76a20.06 20.06 0 0 0 3.16-2.2z"></path>
        </svg>
        let cars = <svg xmlns="http://www.w3.org/2000/svg" width="32" height="16" fill="currentColor"
                        viewBox="0 0 32 17">
            <path d="M10.6 2.77L.61 1.2V0h9.99v2.77"></path>
            <path fill="none" d="M12 1.84v3.33l8.14.11C18.29 3.56 16 1.87 14.72 1.84c-.96-.03-2.72 0-2.72 0z"></path>
            <path
                d="M31 7.77c-.87-1.6-8.41-2.52-8.41-2.52S17.3.46 14.53 0H6.37h1.5A7.73 7.73 0 0 0 3 1.59a18.47 18.47 0 0 0-3 4.23v3.83c0 3.86 1.55 4.49 2.53 4.52v-.13A3.76 3.76 0 1 1 10 14v.07l9-.01a3.76 3.76 0 0 1 7.52 0h.79a7 7 0 0 0 3.9-.93A28.38 28.38 0 0 0 31 7.77zm-19-2.6V1.84h2.72c1.3 0 3.56 1.72 5.42 3.45z"></path>
            <circle cx="22.71" cy="14.04" r="2.36"></circle>
            <circle cx="6.28" cy="14.04" r="2.36"></circle>
        </svg>


        if (this.state.hotel.length === 0) {
            this.setState({
                ...this.state,
                hotel: [{}]
            })
        }
        if (this.state.car.length === 0) {
            this.setState({
                ...this.state,
                car: [{}]
            })
        }
        if (this.state.flight.length === 0) {
            this.setState({
                ...this.state,
                flight: [{}]
            })
        }

        return (

            <div className="conatiner-fluid">
                <div className="row" style={{marginTop: "9%", backgroundColor: "#ffffff"}}>
                    <div className="col-md-3-triphistorynavbar">
                        <Navbar/>
                    </div>
                    <div className="col-md-9-triphistorynavbar">
                        <div className="heading-triphistory">
                            <h3 className="heading-trip">
                                History
                            </h3>
                        </div>

                        <div className="heading1-triphistory">
                            <h3 className="heading1-trip">
                                Hotel Bookings

                            </h3>
                        </div>
                        <div className="borderone">
                            <div className="hotelbookinginformation">
                                <h5 className="hotelbookingid">Booking Id</h5>
                                <h5 className="hotelbookingid">Hotel Name</h5>
                                <h5 className="hotelbookingid">Check-in Date</h5>
                                <h5 className="hotelbookingid">Check-out Date</h5>
                                <h5 className="hotelbookingid">No of People</h5>
                                <h5 className="hotelbookingid">Rooms</h5>
                                <h5 className="hotelbookingid">Total Cost</h5>
                            </div>

                            {
                                this.state.hotel.map(function (hotelDetails, index) {
                                    console.log(hotelDetails);
                                    if (hotelDetails.one === undefined) {
                                        return (<div>

                                        </div>)
                                    } else {
                                        return (
                                            <div className="hotelbookingdata">
                                                <h5 className="hotelbookingid">{hotels}{hotelDetails.two.bookingId}</h5>
                                                <h5 className="hotelbookingid">{hotelDetails.one.hotelName} </h5>
                                                <h5 className="hotelbookingid"><Moment
                                                    format="YYYY/MM/DD">{hotelDetails.two.fromDate}</Moment></h5>
                                                <h5 className="hotelbookingid"><Moment
                                                    format="YYYY/MM/DD">{hotelDetails.two.toDate}</Moment></h5>
                                                <h5 className="hotelbookingid">{hotelDetails.two.noOfPeople}</h5>
                                                <h5 className="hotelbookingid">{hotelDetails.two.roomType}</h5>
                                                <h5 className="hotelbookingid">$ {hotelDetails.two.ticketPrice}</h5>
                                            </div>
                                        )
                                    }
                                })
                            }

                        </div>

                        <div className="heading1-triphistory">
                            <h3 className="heading1-trip">
                                Flight Bookings
                            </h3>
                        </div>
                        <div className="borderone">
                            <div className="hotelbookinginformation">
                                <h5 className="hotelbookingid">Booking Id</h5>
                                <h5 className="hotelbookingid">Flight No</h5>
                                <h5 className="hotelbookingid">Flight Operator</h5>
                                <h5 className="hotelbookingid">Class</h5>
                                <h5 className="hotelbookingid">Departure date</h5>
                                <h5 className="hotelbookingid">Arrival date</h5>
                                <h5 className="hotelbookingid">Total Cost</h5>
                            </div>


                            {
                                this.state.flight.map(function (flightDetails, index) {
                                    console.log(flightDetails);
                                    if (flightDetails.one === undefined) {
                                        return (<div>

                                        </div>)
                                    } else {
                                        return (
                                            <div className="hotelbookingdata">
                                                <h5 className="hotelbookingid">{flights}{flightDetails.two.bookingId}</h5>
                                                <h5 className="hotelbookingid">{flightDetails.one.flightNo} </h5>
                                                <h5 className="hotelbookingid">{flightDetails.one.flightOperator}</h5>
                                                <h5 className="hotelbookingid">{flightDetails.two.flightClass}</h5>
                                                <h5 className="hotelbookingid">{flightDetails.one.origin}</h5>
                                                <h5 className="hotelbookingid">{flightDetails.one.destination}</h5>
                                                <h5 className="hotelbookingid">$ {flightDetails.two.ticketPrice}</h5>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>

                        <div className="heading1-triphistory">
                            <h3 className="heading1-trip">
                                Car Bookings
                            </h3>
                        </div>
                        <div className="borderone">

                            <div className="hotelbookinginformation">
                                <h5 className="hotelbookingid">Booking Id</h5>
                                <h5 className="hotelbookingid">Car Type</h5>
                                <h5 className="hotelbookingid">Car details</h5>
                                <h5 className="hotelbookingid">City</h5>
                                <h5 className="hotelbookingid">From date</h5>
                                <h5 className="hotelbookingid">To date</h5>
                                <h5 className="hotelbookingid">Price</h5>
                            </div>


                            {
                                this.state.car.map(function (cardetails, index) {
                                    console.log(cardetails);
                                    if (cardetails.one === undefined) {
                                        return (<div>

                                        </div>)
                                    } else {
                                        return (
                                            <div className="hotelbookingdata">
                                                <h5 className="hotelbookingid">{cars}{cardetails.two.bookingId}</h5>
                                                <h5 className="hotelbookingid">{cardetails.one.carType} </h5>
                                                <h5 className="hotelbookingid">{cardetails.one.carMake} - {cardetails.one.carModel}</h5>
                                                <h5 className="hotelbookingid">{cardetails.one.city}</h5>
                                                <h5 className="hotelbookingid"><Moment
                                                    format="YYYY/MM/DD">{cardetails.two.fromDate}</Moment></h5>
                                                <h5 className="hotelbookingid"><Moment
                                                    format="YYYY/MM/DD">{cardetails.two.toDate}</Moment></h5>
                                                <h5 className="hotelbookingid">$ {cardetails.two.ticketPrice}</h5>
                                            </div>
                                        )
                                    }
                                })
                            }

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        username: state.username,
        isLoggedIn: state.isLoggedIn,
    }
}

export default connect(mapStateToProps, null)(TripHistory);