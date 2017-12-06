import React, {Component} from 'react';
import Slider from 'rc-slider';
import Moment from 'react-moment';
import {connect} from "react-redux"
import {carListingView, flightListingView, hotelList_Success} from "../../../../actions/index";
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

class CarListing extends Component {

    filterCriteria = {
        priceStart: 0,
        priceEnd: 2000,
        type: [],
    };

    flipArrow = true;

    constructor(props) {
        super(props);
        console.log(this.props.match);
        console.log("match for url");

        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleListingView = this.handleListingView.bind(this);

    }

    componentWillMount() {
        let click = {
            pageClick: {
                userId: "anonymous",
                pageName: "CarListing",
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
        this.props.searchCars({criteria: this.props.match.params.criteria});
    }

    handleListingView(id) {

        this.props.listingView(id);
        this.props.handlePageChange("/payment/cars");

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

    render() {
        var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        var firstDate = new Date(this.props.carFromDate);
        var secondDate = new Date(this.props.carToDate);

        var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));

        let cars = this.props.carList;
        if (cars === null || cars === undefined) {
            cars = [];
        }
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
                                            <Range min={0} max={1500} defaultValue={[100, 900]}
                                                   onAfterChange={this.handleFilterChange}/>

                                            {/*<input type="range" name="price-max" id="price-max" value="800" min="0"*/}
                                            {/*max="1000"/>*/}
                                        </div>
                                        <input type="text" className="amount-start" readOnly="true" value="$0"/>
                                        <input type="text" className="amount-end" readOnly value="$1500"/>
                                    </div>
                                </div>
                                <div className="sidebar-block">
                                    <h4 className="sidebar-title color-dark-2">Car Type</h4>
                                    <div className="sidebar-score">
                                        <div className="input-entry type-2 color-2">
                                            <input className="checkbox-form" id="score-5" type="checkbox"
                                                   name="checkbox"
                                                   value="suv"
                                                   onChange={(event) => {
                                                       var index = this.filterCriteria.type.indexOf(event.target.value);

                                                       if (index > -1) {
                                                           this.filterCriteria.type.splice(index, 1);
                                                       } else {
                                                           this.filterCriteria.type.push(event.target.value);
                                                       }
                                                       this.handleFilterChange();
                                                   }
                                                   }/>
                                            <label className="clearfix" htmlFor="score-5">
                                                <span className="checkbox-text">
                                                SUV
                                                <span className="rate">
                                                    <span className="fa fa-car color-red"></span>
                                                    </span>
                                                </span>
                                                <span className="sp-check"><i className="fa fa-check"></i></span>
                                            </label>
                                        </div>
                                        <div className="input-entry type-2 color-2">
                                            <input className="checkbox-form" id="score-4" type="checkbox"
                                                   name="checkbox"
                                                   value="sedan"
                                                   onChange={(event) => {
                                                       var index = this.filterCriteria.type.indexOf(event.target.value);

                                                       if (index > -1) {
                                                           this.filterCriteria.type.splice(index, 1);
                                                       } else {
                                                           this.filterCriteria.type.push(event.target.value);
                                                       }
                                                       this.handleFilterChange();
                                                   }
                                                   }/>
                                            <label className="clearfix" htmlFor="score-4">
                                                <span className="checkbox-text">
                                                    Sedan
                                                <span className="rate">
                                                <span className="fa fa-car color-red"></span>
                                                </span>
                                                </span>
                                                <span className="sp-check"><i className="fa fa-check"></i></span>
                                            </label>
                                        </div>
                                        <div className="input-entry type-2 color-2">
                                            <input className="checkbox-form" id="score-3" type="checkbox"
                                                   name="checkbox"
                                                   value="hatchback"
                                                   onChange={(event) => {
                                                       var index = this.filterCriteria.type.indexOf(event.target.value);

                                                       if (index > -1) {
                                                           this.filterCriteria.type.splice(index, 1);
                                                       } else {
                                                           this.filterCriteria.type.push(event.target.value);
                                                       }
                                                       this.handleFilterChange();
                                                   }
                                                   }
                                            />
                                            <label className="clearfix" htmlFor="score-3">
                                                <span className="checkbox-text">
                                                Hatchback
                                                <span className="rate">
                                                <span className="fa fa-car color-red"></span>
                                                </span>
                                                </span>
                                                <span className="sp-check"><i
                                                    className="fa fa-check"></i></span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-8 col-md-9">
                            <div className="list-header clearfix">
                                <div
                                    className="drop-wrap drop-wrap-s-4 color-4 list-sort">
                                    <div className="drop">
                                        <b>Sort by price</b>
                                        <a href="#" className="drop-list"><i className="fa fa-angle-down"></i></a>
                                        <span>
                                                                       <a href="#">ASC</a>
                                                                       <a href="#">DESC</a>
                                                                       </span>
                                    </div>
                                </div>
                                <div
                                    className="drop-wrap drop-wrap-s-4 color-4 list-sort">
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
                                    <div className="change-grid color-1 fr"><i
                                        className="fa fa-th"></i></div>
                                    <div className="change-list color-1 fr active"><i
                                        className="fa fa-bars"></i></div>
                                    <div className="change-to-label fr color-grey-8">View:
                                    </div>
                                </div>
                            </div>
                            <div className="list-content clearfix">
                                {
                                    cars.map((car, index) => {

                                        function matchType(type) {
                                            return type.toLowerCase() === car.carType.toString().toLowerCase();
                                        }

                                        let image_index = index % 2;
                                        let img_src = "car_list_" + (car.carType.toString().toLowerCase()) + "_" + (image_index + 1) + ".jpg";
                                        // console.log(hotel.rooms[0].roomPrice);
                                        // console.log(this.filterCriteria.priceEnd);
                                        // console.log(this.filterCriteria.priceStart);
                                        // console.log(this.filterCriteria.star.length);
                                        // console.log(hotel.stars);
                                        // console.log("stars");
                                        if (
                                            (car.price >= this.filterCriteria.priceStart)
                                            &&
                                            (car.price <= this.filterCriteria.priceEnd)
                                            &&
                                            (this.filterCriteria.type.length === 0 ? true : (this.filterCriteria.type.some(matchType)))
                                        ) {
                                            return (
                                                <div className="list-item-entry">
                                                    <div
                                                        className="hotel-item style-3 bg-white">
                                                        <div className="table-view">
                                                            <div
                                                                className="radius-top cell-view">
                                                                <img src={images[img_src]}
                                                                     alt=""/>
                                                            </div>
                                                            <div
                                                                className="title hotel-middle clearfix cell-view">

                                                                <div
                                                                    className="date grid-hidden">
                                                                    <strong>
                                                                        <Moment
                                                                            format="YYYY/MM/DD">
                                                                            {this.props.carFromDate}
                                                                        </Moment>
                                                                        -
                                                                        <Moment
                                                                            format="YYYY/MM/DD">
                                                                            {this.props.carToDate}
                                                                        </Moment>
                                                                        =
                                                                        {/*<Moment from={this.props.carFromDate}>*/}
                                                                        {/*/!*{this.props.carToDate}*!/*/}
                                                                        {/*</Moment>*/}
                                                                        {diffDays} days
                                                                    </strong>
                                                                </div>
                                                                <h4><b>{car.carType}</b>
                                                                </h4>
                                                                <div
                                                                    className="rate-wrap">
                                                                    <i className="text-info">{car.carMake}&nbsp;{car.carName}&nbsp;{car.carModel} or
                                                                        similar</i>
                                                                </div>
                                                                <span
                                                                    className="fa fa-users color-red"></span>
                                                                <p className="text-info">Capacity
                                                                    : {car.capacity}</p>
                                                            </div>
                                                            <div
                                                                className="title hotel-right clearfix cell-view">
                                                                <div
                                                                    className="hotel-person color-dark-2">from <span
                                                                    className="color-blue">$ {car.price}</span> per
                                                                    day
                                                                </div>
                                                                <button
                                                                    className="c-button b-40 bg-blue hv-blue-o grid-hidden"
                                                                    onClick={() => this.handleListingView(car._id)}
                                                                > Book Now
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )

                                        } else {
                                            return (<div>
                                            </div>);
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
        carList: state.carList,
        filterInd: state.filterInd,
        carFromDate: state.carFromDate,
        carToDate: state.carToDate,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        filter_change: (filterInd) => {
            dispatch(filter_change(filterInd))
        },
        listingView: (id) => {
            dispatch(carListingView(id))
        },
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(CarListing);