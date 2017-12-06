import React, {Component} from 'react';
import Slider from 'rc-slider';
import Moment from 'react-moment';
import {connect} from "react-redux"
import {flightListingView, hotelList_Success, hotelListingView} from "../../../../actions/index";
import 'rc-slider/assets/index.css';
import {filter_change} from "../../../../actions/index";
import * as LogAPI from "../../../../api/user/API_Logging";

// import "../../css/bootstrap.min.css"
// import "../../css/font-awesome.min.css"
// import "../../css/style1.css"
// import "../../css/jquery-ui.min.css"
// import "../../css/jquery-ui.structure.min.css"

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => {
        images[item.replace('./', '')] = r(item);
    });
    return images;
}

const images = importAll(require.context('../../../../img', false, /\.(png|jpe?g|svg)$/));

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

class FlightListing extends Component {

    filterCriteria = {
        priceStart: 0,
        priceEnd: 2000,
        departStart: 0,
        departEnd: 20,
        arrivalStart: 0,
        arrivalEnd: 20,
        star: [],
    };

    flipArrow = true;

    constructor(props) {
        super(props);
        console.log(this.props.match);
        console.log("match for url");

        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleListingView = this.handleListingView.bind(this);
        this.handleDepartFilterChange = this.handleDepartFilterChange.bind(this);
        this.handleArrivalFilterChange = this.handleArrivalFilterChange.bind(this);
    }

    componentWillMount() {
        let click = {
            pageClick:{
                userId: "anonymous",
                pageName: "FlightListing",
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
        this.props.searchFlights({criteria: this.props.match.params.criteria});
    }

    handleListingView(id) {

        console.log(id);
        this.props.listingView(id);
        this.props.handlePageChange("/payment/flights");

    }

    handleFilterChange(value) {
        console.log(value);
        console.log(this.filterCriteria);
        if (value) {
            this.filterCriteria.priceStart = value[0];
            this.filterCriteria.priceEnd = value[1];
            // this.forceUpdate();
        }
        this.props.filter_change(!this.props.filterInd);
    }

    handleDepartFilterChange(value) {
        console.log(value);
        console.log(this.filterCriteria);
        if (value) {
            this.filterCriteria.departStart = value[0];
            this.filterCriteria.departEnd = value[1];
            // this.forceUpdate();
        }
        this.props.filter_change(!this.props.filterInd);
    }

    handleArrivalFilterChange(value) {
        console.log(value);
        console.log(this.filterCriteria);
        if (value) {
            this.filterCriteria.arrivalStart = value[0];
            this.filterCriteria.arrivalEnd = value[1];
            // this.forceUpdate();
        }
        this.props.filter_change(!this.props.filterInd);
    }

    render() {
        let flights = this.props.flightList;

        if (flights === null || flights === undefined || flights.direct === null || flights.direct === undefined) {
            flights = {direct: [{}], indirect: [{}]};
        }
        console.log(flights);
        console.log("before it all starts");

        function importAll(r) {
            let images = {};
            r.keys().map((item, index) => {
                images[item.replace('./', '')] = r(item);
            });
            return images;
        }

        const images = importAll(require.context('../../../../img', false, /\.(png|jpe?g|svg)$/));

        return (
            <div className="list-wrapper bg-grey-2">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-4 col-md-3">
                            <div className="sidebar bg-white clearfix">
                                <div className="sidebar-block">
                                    <h4 className="sidebar-title color-dark-2">price range</h4>
                                    <div className="slider-range color-2 clearfix" data-counter="$"
                                         data-position="start"
                                         data-from="0"
                                         data-to="1500" data-min="0" data-max="2000">
                                        <div className="range">
                                            <Range min={0} max={2000} defaultValue={[20, 1500]}
                                                   onAfterChange={this.handleFilterChange}/>

                                            {/*<input type="range" name="price-max" id="price-max" value="800" min="0"*/}
                                            {/*max="1000"/>*/}
                                        </div>
                                        <input type="text" className="amount-start" readOnly="true" value="$0"/>
                                        <input type="text" className="amount-end" readOnly value="$1500"/>
                                    </div>
                                </div>

                                <div className="sidebar-block">
                                    <h4 className="sidebar-title color-dark-2">Departure Time</h4>

                                    <div className="slider-range color-4 clearfix" data-counter=":00"
                                         data-position="end" data-from="0" data-to="1500" data-min="0"
                                         data-max="24">
                                        <div
                                            className="range ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all"
                                            id="slider-range-1">
                                            <Range min={0} max={24} defaultValue={[0, 20]} step={1}
                                                   marks={{0: "00:00", 24: "24:00"}}
                                                   allowCross={false}
                                                   onAfterChange={this.handleDepartFilterChange}/>
                                        </div>

                                    </div>
                                </div>
                                <div className="sidebar-block">
                                    <h4 className="sidebar-title color-dark-2">Arrival Time</h4>

                                    <div className="slider-range color-4 clearfix" data-counter=":00"
                                         data-position="end" data-from="0" data-to="1500" data-min="0"
                                         data-max="24">
                                        <div
                                            className="range ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all"
                                            id="slider-range-1">
                                            <Range min={0} max={24} defaultValue={[0, 20]} step={1}
                                                   marks={{0: "00:00", 24: "24:00"}}
                                                   allowCross={false}
                                                   onAfterChange={this.handleArrivalFilterChange}/>
                                        </div>

                                    </div>
                                </div>
                                <div className="sidebar-block">
                                    <h4 className="sidebar-title color-dark-2">star rating</h4>
                                    <div className="sidebar-rating">
                                        <div className="input-entry color-1">
                                            <input className="checkbox-form" id="star-5" type="checkbox" name="checkbox"
                                                   value="5" onChange={(event) => {
                                                var index = this.filterCriteria.star.indexOf(event.target.value);

                                                if (index > -1) {
                                                    this.filterCriteria.star.splice(index, 1);
                                                } else {
                                                    this.filterCriteria.star.push(event.target.value);
                                                }
                                                this.handleFilterChange();
                                            }}/>
                                            <label className="clearfix" htmlFor="star-5">
                                                <span className="sp-check"><i className="fa fa-check"></i></span>
                                                <span className="rate">
                                                    <span className="fa fa-star color-yellow"></span>
                                                    <span className="fa fa-star color-yellow"></span>
                                                    <span className="fa fa-star color-yellow"></span>
                                                    <span className="fa fa-star color-yellow"></span>
                                                    <span className="fa fa-star color-yellow"></span>
                                                </span>
                                            </label>
                                        </div>
                                        <div className="input-entry color-1">
                                            <input className="checkbox-form" id="star-4" type="checkbox" name="checkbox"
                                                   value="4" onChange={(event) => {
                                                var index = this.filterCriteria.star.indexOf(event.target.value);

                                                if (index > -1) {
                                                    this.filterCriteria.star.splice(index, 1);
                                                } else {
                                                    this.filterCriteria.star.push(event.target.value);
                                                }
                                                this.handleFilterChange();
                                            }}/>
                                            <label className="clearfix" htmlFor="star-4">
                                                <span className="sp-check"><i className="fa fa-check"></i></span>
                                                <span className="rate">
                                                        <span className="fa fa-star color-yellow"></span>
                                                        <span className="fa fa-star color-yellow"></span>
                                                        <span className="fa fa-star color-yellow"></span>
                                                        <span className="fa fa-star color-yellow"></span>
                                                    </span>
                                            </label>
                                        </div>
                                        <div className="input-entry color-1">
                                            <input className="checkbox-form" id="star-3" type="checkbox" name="checkbox"
                                                   value="3" onChange={(event) => {
                                                var index = this.filterCriteria.star.indexOf(event.target.value);

                                                if (index > -1) {
                                                    this.filterCriteria.star.splice(index, 1);
                                                } else {
                                                    this.filterCriteria.star.push(event.target.value);
                                                }
                                                this.handleFilterChange();
                                            }}/>
                                            <label className="clearfix" htmlFor="star-3">
                                                <span className="sp-check"><i className="fa fa-check"></i></span>
                                                <span className="rate">
<span className="fa fa-star color-yellow"></span>
<span className="fa fa-star color-yellow"></span>
<span className="fa fa-star color-yellow"></span>
</span>
                                            </label>
                                        </div>
                                        <div className="input-entry color-1">
                                            <input className="checkbox-form" id="star-2" type="checkbox" name="checkbox"
                                                   value="2" onChange={(event) => {
                                                var index = this.filterCriteria.star.indexOf(event.target.value);

                                                if (index > -1) {
                                                    this.filterCriteria.star.splice(index, 1);
                                                } else {
                                                    this.filterCriteria.star.push(event.target.value);
                                                }
                                                this.handleFilterChange();
                                            }}/>
                                            <label className="clearfix" htmlFor="star-2">
                                                <span className="sp-check"><i className="fa fa-check"></i></span>
                                                <span className="rate">
<span className="fa fa-star color-yellow"></span>
<span className="fa fa-star color-yellow"></span>
</span>
                                            </label>
                                        </div>
                                        <div className="input-entry color-1">
                                            <input className="checkbox-form" id="star-1" type="checkbox" name="checkbox"
                                                   value="1" onChange={(event) => {
                                                var index = this.filterCriteria.star.indexOf(event.target.value);

                                                if (index > -1) {
                                                    this.filterCriteria.star.splice(index, 1);
                                                } else {
                                                    this.filterCriteria.star.push(event.target.value);
                                                }
                                                this.handleFilterChange();
                                            }}/>
                                            <label className="clearfix" htmlFor="star-1">
                                                <span className="sp-check"><i className="fa fa-check"></i></span>
                                                <span className="rate">
<span className="fa fa-star color-yellow"></span>
</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="sidebar-block">
                                    <h4 className="sidebar-title color-dark-2">Review Score</h4>
                                    <div className="sidebar-score">
                                        <div className="input-entry type-2 color-2">
                                            <input className="checkbox-form" id="score-5" type="checkbox"
                                                   name="checkbox"
                                                   value="climat control"/>
                                            <label className="clearfix" htmlFor="score-5">
                                                <span className="checkbox-text">
                                                5
                                                <span className="rate">
                                                    <span className="fa fa-star color-yellow"></span>
                                                    </span>
                                                </span>
                                                <span className="sp-check"><i className="fa fa-check"></i></span>
                                            </label>
                                        </div>
                                        <div className="input-entry type-2 color-2">
                                            <input className="checkbox-form" id="score-4" type="checkbox"
                                                   name="checkbox"
                                                   value="climat control"/>
                                            <label className="clearfix" htmlFor="score-4">
                                                <span className="checkbox-text">
                                                4
                                                <span className="rate">
                                                <span className="fa fa-star color-yellow"></span>
                                                </span>
                                                </span>
                                                <span className="sp-check"><i className="fa fa-check"></i></span>
                                            </label>
                                        </div>
                                        <div className="input-entry type-2 color-2">
                                            <input className="checkbox-form" id="score-3" type="checkbox"
                                                   name="checkbox"
                                                   value="climat control"/>
                                            <label className="clearfix" htmlFor="score-3">
                                                <span className="checkbox-text">
                                                3
                                                <span className="rate">
                                                <span className="fa fa-star color-yellow"></span>
                                                </span>
                                                </span>
                                                <span className="sp-check"><i className="fa fa-check"></i></span>
                                            </label>
                                        </div>
                                        <div className="input-entry type-2 color-2">
                                            <input className="checkbox-form" id="score-2" type="checkbox"
                                                   name="checkbox"
                                                   value="climat control"/>
                                            <label className="clearfix" htmlFor="score-2">
                                                <span className="checkbox-text">
                                                2
                                                <span className="rate">
                                                <span className="fa fa-star color-yellow"></span>
                                                </span>
                                                </span>
                                                <span className="sp-check"><i className="fa fa-check"></i></span>
                                            </label>
                                        </div>
                                        <div className="input-entry type-2 color-2">
                                            <input className="checkbox-form" id="score-1" type="checkbox"
                                                   name="checkbox"
                                                   value="climat control"/>
                                            <label className="clearfix" htmlFor="score-1">
                                                <span className="checkbox-text">
                                                1
                                                <span className="rate">
                                                <span className="fa fa-star color-yellow"></span>
                                                </span>
                                                </span>
                                                <span className="sp-check"><i className="fa fa-check"></i></span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-8 col-md-9">
                            <div className="list-header clearfix">
                                <div className="drop-wrap drop-wrap-s-4 color-4 list-sort">
                                    <div className="drop">
                                        <b>Sort by price</b>
                                        <a href="#" className="drop-list"><i className="fa fa-angle-down"></i></a>
                                        <span>
                                        <a href="#">ASC</a>
                                        <a href="#">DESC</a>
                                        </span>
                                    </div>
                                </div>
                                <div className="drop-wrap drop-wrap-s-4 color-4 list-sort">
                                    <div className="drop">
                                        <b>Sort by ranking</b>
                                        <a href="#" className="drop-list"><i className="fa fa-angle-down"></i></a>
                                        <span>
                                        <a href="#">ASC</a>
                                        <a href="#">DESC</a>
                                        </span>
                                    </div>
                                </div>
                                <div className="list-view-change">
                                    <div className="change-grid color-1 fr"><i className="fa fa-th"></i></div>
                                    <div className="change-list color-1 fr active"><i className="fa fa-bars"></i></div>
                                    <div className="change-to-label fr color-grey-8">View:</div>
                                </div>
                            </div>
                            <div className="list-content clearfix">
                                {
                                    flights.direct.map((flight, index) => {
                                        console.log(flight.origin);
                                        console.log("direct ka guard");
                                        if (flight.origin !== undefined) {

                                            function matchStar(star) {
                                                return star === flight.stars.toString();
                                            }

                                            let image_index = index % 10;
                                            let img_src = "flight_list_" + (image_index + 1) + ".jpg";
                                            let flightPrice = flight.classes[0].price;

                                            for (let i = 0; i < flight.classes.length; i++) {

                                                if (flight.classes[i].classType === this.props.flightClass) {

                                                    flightPrice = flight.classes[i].price;

                                                }

                                            }
                                            let departTimeNum = flight.departureTime.split(":");
                                            let arrivalTimeNum = flight.arrivalTime.split(":");

                                            // console.log(this.filterCriteria.priceEnd);
                                            // console.log(this.filterCriteria.priceStart);
                                            // console.log(this.filterCriteria.star.length);
                                            // console.log(flight.stars);
                                            // console.log("stars");
                                            if (
                                                (flightPrice >= this.filterCriteria.priceStart)
                                                &&
                                                (flightPrice <= this.filterCriteria.priceEnd)
                                                &&
                                                (departTimeNum[0] <= this.filterCriteria.departEnd)
                                                &&
                                                (departTimeNum[0] >= this.filterCriteria.departStart)
                                                &&
                                                (arrivalTimeNum[0] <= this.filterCriteria.arrivalEnd)
                                                &&
                                                (arrivalTimeNum[0] >= this.filterCriteria.arrivalStart)
                                                &&
                                                (this.filterCriteria.star.length === 0 ? true : (this.filterCriteria.star.some(matchStar)))
                                            ) {
                                                return (
                                                    <div className="list-item-entry">

                                                        <div className="hotel-item style-10 bg-white">
                                                            <div className="table-view">
                                                                <div className="radius-top cell-view">
                                                                    <img src={images[img_src]} alt=""/>
                                                                </div>
                                                                <div className="title hotel-middle cell-view">
                                                                    <h5>from <strong
                                                                        className="color-red-3">
                                                                        ${flightPrice}</strong>
                                                                        / person for {this.props.flightClass}</h5>
                                                                    <h6 className="color-grey-3 list-hidden">
                                                                        <strong>{this.props.flightTripType}</strong><br/>
                                                                        flights</h6>
                                                                    <h4>
                                                                        <b>From {flight.origin} to {flight.destination} </b>
                                                                    </h4>
                                                                    <p className="list-hidden">Book now and <span
                                                                        className="color-red-3">save 30%</span></p>
                                                                    <div className="fi_block grid-hidden row row10">
                                                                        <div className="flight-icon col-xs-6 col10">
                                                                            <img className="fi_icon"
                                                                                 src="img/tour_list/flight_icon_2.png"
                                                                                 alt=""/>
                                                                            <div className="fi_content">
                                                                                <div
                                                                                    className="fi_title color-dark-2">take
                                                                                    off
                                                                                </div>
                                                                                <div className="fi_text color-grey">
                                                                                    <Moment format="YYYY/MM/DD">
                                                                                        {flight.departureDate}
                                                                                    </Moment> - {flight.departureTime}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="flight-icon col-xs-6 col10">
                                                                            <img className="fi_icon"
                                                                                 src="img/tour_list/flight_icon_1.png"
                                                                                 alt=""/>
                                                                            <div className="fi_content">
                                                                                <div
                                                                                    className="fi_title color-dark-2">landing
                                                                                </div>
                                                                                <div className="fi_text color-grey">
                                                                                    <Moment
                                                                                        format="YYYY/MM/DD">
                                                                                        {flight.arrivalDate}
                                                                                    </Moment> - {flight.arrivalTime}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <button
                                                                        className="c-button b-40 bg-blue hv-blue-o grid-hidden"
                                                                        onClick={() => this.handleListingView(flight._id)}
                                                                    > Book now
                                                                    </button>

                                                                </div>
                                                                <div
                                                                    className="title hotel-right clearfix cell-view grid-hidden">
                                                                    <div className="hotel-right-text color-dark-2">
                                                                        <strong>{this.props.flightTripType} Direct</strong><br/>
                                                                        flights
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )

                                            } else {
                                                return (<div>
                                                </div>);
                                            }
                                        }
                                    })
                                }
                                {
                                    flights.indirect.map((flight, index) => {
                                        console.log(flight.one);
                                        console.log("indirect ka guard");

                                        if (flight.one !== undefined) {


                                            function matchStar(star) {
                                                return star === flight.stars.toString();
                                            }

                                            let image_index = index % 10;
                                            let img_src = "../../img/flight_list_" + flight.flightOperator + (image_index + 1) + ".jpg";
                                            let flightPrice = flight.totalPrice;

                                            let departTimeNum = flight.one.departureTime.split(":");
                                            let arrivalTimeNum = flight.two.arrivalTime.split(":");

                                            console.log(arrivalTimeNum);

                                            // console.log(this.filterCriteria.priceEnd);
                                            // console.log(this.filterCriteria.priceStart);
                                            // console.log(this.filterCriteria.star.length);
                                            // console.log(flight.stars);
                                            // console.log("stars");
                                            if (
                                                (flightPrice >= this.filterCriteria.priceStart)
                                                &&
                                                (flightPrice <= this.filterCriteria.priceEnd)
                                                &&
                                                (departTimeNum[0] <= this.filterCriteria.departEnd)
                                                &&
                                                (departTimeNum[0] >= this.filterCriteria.departStart)
                                                &&
                                                (arrivalTimeNum[0] <= this.filterCriteria.arrivalEnd)
                                                &&
                                                (arrivalTimeNum[0] >= this.filterCriteria.arrivalStart)
                                                &&
                                                (this.filterCriteria.star.length === 0 ? true : (this.filterCriteria.star.some(matchStar)))
                                            ) {
                                                return (
                                                    <div className="list-item-entry">

                                                        <div className="hotel-item style-10 bg-white">
                                                            <div className="table-view">
                                                                <div className="radius-top cell-view">
                                                                    <img src="img/tour_list/flight_grid_1.jpg" alt=""/>
                                                                </div>
                                                                <div className="title hotel-middle cell-view">
                                                                    <h5>from <strong
                                                                        className="color-red-3">
                                                                        ${flightPrice}</strong>
                                                                        / person for {this.props.flightClass}</h5>
                                                                    <h6 className="color-grey-3 list-hidden">
                                                                        <strong>{this.props.flightTripType}</strong><br/>
                                                                        flights</h6>
                                                                    <h4>
                                                                        <b>From {flight.one.origin} to {flight.one.destination} </b>
                                                                    </h4>
                                                                    <h4>
                                                                        <b>From {flight.two.origin} to {flight.two.destination} </b>
                                                                    </h4>
                                                                    <div className="fi_block grid-hidden row row10">
                                                                        <div className="flight-icon col-xs-6 col10">
                                                                            <img className="fi_icon"
                                                                                 src="img/tour_list/flight_icon_2.png"
                                                                                 alt=""/>
                                                                            <div className="fi_content">
                                                                                <div
                                                                                    className="fi_title color-dark-2">take
                                                                                    off
                                                                                </div>
                                                                                <div className="fi_text color-grey">
                                                                                    <Moment format="YYYY/MM/DD">
                                                                                        {flight.one.departureDate}
                                                                                    </Moment> - {flight.one.departureTime}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="flight-icon col-xs-6 col10">
                                                                            <img className="fi_icon"
                                                                                 src="img/tour_list/flight_icon_1.png"
                                                                                 alt=""/>
                                                                            <div className="fi_content">
                                                                                <div
                                                                                    className="fi_title color-dark-2">landing
                                                                                </div>
                                                                                <div className="fi_text color-grey">
                                                                                    <Moment
                                                                                        format="YYYY/MM/DD">
                                                                                        {flight.two.arrivalDate}
                                                                                    </Moment> - {flight.two.arrivalTime}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <button
                                                                        className="c-button b-40 bg-blue hv-blue-o grid-hidden"
                                                                        onClick={() => this.handleListingView(flight._id)}
                                                                    >book
                                                                        now</button>

                                                                </div>
                                                                <div
                                                                    className="title hotel-right clearfix cell-view grid-hidden">
                                                                    <div className="hotel-right-text color-dark-2">
                                                                        <strong>{this.props.flightTripType}   Indirect</strong><br/>
                                                                        flights
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )

                                            } else {
                                                return (<div>
                                                </div>);
                                            }
                                        }
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        flightList: state.flightList,
        filterInd: state.filterInd,
        flightTripType: state.flightTripType,
        flightClass: state.flightClass,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        filter_change: (filterInd) => {
            dispatch(filter_change(filterInd))
        },
        listingView: (id) => {
            dispatch(flightListingView(id))
        },
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(FlightListing);