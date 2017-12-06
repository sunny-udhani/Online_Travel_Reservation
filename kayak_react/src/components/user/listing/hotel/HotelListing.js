import React, {Component} from 'react';
import Slider from 'rc-slider';
import {connect} from "react-redux"
import {hotelList_Success, hotelListingView} from "../../../../actions/index";
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

class HotelListing extends Component {

    filterCriteria = {
        priceStart: 0,
        priceEnd: 2000,
        star: [],
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
            pageClick:{
                userId: "anonymous",
                pageName: "HotelListing",
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

        this.props.searchHotel({criteria: this.props.match.params.criteria});
    }

    handleListingView(id, roomType) {

        this.props.listingView(id, roomType);
        this.props.handlePageChange("/payment/hotels");

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
        let hotels = this.props.hotelList;
        if (hotels === null || hotels === undefined) {
            hotels = [];
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
                                    hotels.map((hotel, index) => {

                                        function matchStar(star) {
                                            return star === hotel.stars.toString();
                                        }
                                        console.log(images);

                                        let image_index = index % 10;
                                        let img_src = "../../img/hotel_list_" + (image_index + 1) + ".jpg";
                                        console.log(hotel.rooms[0].roomPrice);
                                        console.log(this.filterCriteria.priceEnd);
                                        console.log(this.filterCriteria.priceStart);
                                        console.log(this.filterCriteria.star.length);
                                        console.log(hotel.stars);
                                        console.log("stars");
                                        if (
                                            (hotel.rooms[0].roomPrice >= this.filterCriteria.priceStart)
                                            &&
                                            (hotel.rooms[0].roomPrice <= this.filterCriteria.priceEnd)
                                            &&
                                            (this.filterCriteria.star.length === 0 ? true : (this.filterCriteria.star.some(matchStar)))
                                        ) {
                                            return (
                                                <div className="list-item-entry">
                                                    <div className="hotel-item style-3 bg-white">
                                                        <div className="table-view">
                                                            <div className="radius-top cell-view">
                                                                <img src={img_src} alt=""/>
                                                            </div>
                                                            <div className="title hotel-middle clearfix cell-view">
                                                                <h4><b>{hotel.hotelName}</b></h4>
                                                                <div className="rate-wrap">
                                                                    <div className="rate">
                                                                        <button>{hotel.rating} <span
                                                                            className="fa fa-star color-yellow"></span>
                                                                        </button>
                                                                    </div>
                                                                    <i>485 reviews</i>
                                                                </div>
                                                                <p className="f-14 grid-hidden"></p>
                                                            </div>
                                                            <div className="title hotel-right clearfix cell-view">
                                                                <div className="hotel-person color-dark-2">from <span
                                                                    className="color-blue">$ {hotel.rooms[0].roomPrice}</span>
                                                                    /night
                                                                </div>
                                                                <button
                                                                    className="c-button b-40 bg-blue hv-blue-o grid-hidden"
                                                                    onClick={() => this.handleListingView(hotel._id, hotel.rooms[0].roomType)}
                                                                > Book now
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
        hotelList: state.hotelList,
        filterInd: state.filterInd,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        hotelList_Success: (email, message) => {
            dispatch(hotelList_Success(email, message))
        },
        filter_change: (filterInd) => {
            dispatch(filter_change(filterInd))
        },
        listingView: (id, roomType) => {
            dispatch(hotelListingView(id, roomType))
        },
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(HotelListing);