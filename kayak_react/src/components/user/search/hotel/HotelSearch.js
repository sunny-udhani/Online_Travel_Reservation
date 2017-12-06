import React, {Component} from 'react';
import {Route, withRouter, Switch, Link} from 'react-router-dom';
import {flightEssentialsAdd, hotelEssentialsAdd, toggleBookingType} from "../../../../actions/index";
import {connect} from "react-redux";
import AlertContainer from 'react-alert';

import {alertOptions, showAlert} from "../../../../alertConfig";

// import "../../css/bootstrap.min.css"
// import "../../css/font-awesome.min.css"
// import "../../css/style.css"
// import "../../css/jquery-ui.min.css"
// import "../../css/jquery-ui.structure.min.css"

class HotelSearch extends Component {
    searchCriteria = {
        city: "",
        check_in_date: "",
        check_out_date: "",
        no_of_people: "",
        no_of_rooms: "",
    };

    searchHotels() {
        let searchString = "";

        if (this.searchCriteria.city === "") {
            showAlert("Select appropriate city", "error", this);
            return;
        }

        if (Date.parse(new Date(this.searchCriteria.check_out_date)) < Date.parse(new Date(this.searchCriteria.check_in_date)) || Date.parse(new Date(this.searchCriteria.check_out_date)) === Date.parse(new Date(this.searchCriteria.check_in_date))) {
            showAlert("Select appropriate check-in or check-out dates", "error", this);
            return;
        }

        if (this.searchCriteria.no_of_people === "" || this.searchCriteria.no_of_people === "0") {
            showAlert("Select appropriate number of people", "error", this);
            return;
        }

        if (this.searchCriteria.no_of_rooms === "" || this.searchCriteria.no_of_rooms === "0") {
            showAlert("Select appropriate number of rooms", "error", this);
            return;
        }

        if (this.searchCriteria.check_out_date === "") {
            showAlert("Select appropriate check out date", "error", this);
            return;
        }

        if (this.searchCriteria.check_in_date === "") {
            showAlert("Select appropriate check in date", "error", this);
            return;
        }


        this.props.hotelEssentialsAdd(this.searchCriteria.check_in_date, this.searchCriteria.check_out_date, this.searchCriteria.no_of_people);

        searchString += this.searchCriteria.city + "_" + this.searchCriteria.check_in_date + "_" + this.searchCriteria.check_out_date + "_" + this.searchCriteria.no_of_people + "_" + this.searchCriteria.no_of_rooms;
        this.props.listHotel(searchString)
    };

    render() {
        let arrowinside=<svg className=""  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="currentColor"><path d="M31.88 12.32l-1.43 1.4L39.56 23H20v2h19.56l-9.11 9.27 1.43 1.41L43.35 24 31.88 12.32M11 23h6v2h-6zM5 23h3v2H5z"></path></svg>

        return (
            <div>
                <div className="form-row">
                    <div className="form-group col-md-3">
                        <label className="form-label">City</label>
                        <input type="text" required="required" className="form-control" id="city" placeholder="city"
                               onChange={
                                   (event) => {
                                       this.searchCriteria.city = event.target.value
                                   }
                               }/>
                    </div>
                    <div className="form-group col-md-2">
                        <label className="form-label">Check-in Date</label>
                        <input type="date" className="form-control" required="required" id="checkindate"
                               placeholder="mm/dd/yyyy"
                               onChange={
                                   (event) => {
                                       this.searchCriteria.check_in_date = event.target.value
                                   }
                               }/>
                    </div>
                    <div className="form-group col-md-2">
                        <label className="form-label">Check-out Date</label>
                        <input type="date" className="form-control" required="required" id="checkoutdate"
                               placeholder="mm/dd/yyyy"
                               onChange={
                                   (event) => {
                                       this.searchCriteria.check_out_date = event.target.value
                                   }
                               }/>
                    </div>
                    <div className="form-group col-md-2">
                        <label className="table-label">No. of Persons</label>
                        <input type="number" className="form-control" required="required" id="noofpersons"
                               placeholder="no of persons"
                               onChange={
                                   (event) => {
                                       this.searchCriteria.no_of_people = event.target.value
                                   }
                               }/>
                    </div>
                    <div className="form-group col-md-2">
                        <label className="table-label">No. of rooms</label>
                        <input type="number" className="form-control" required="required" id="noofrooms"
                               placeholder="no of rooms"
                               onChange={
                                   (event) => {
                                       this.searchCriteria.no_of_rooms = event.target.value
                                   }
                               }/>
                    </div>
                </div>
                <center>
                    <button className="buttonsbox" onClick={() => this.searchHotels()}>{arrowinside}</button>
                    <AlertContainer ref={a => this.msg = a} {...alertOptions}/>

                </center>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        hotelEssentialsAdd: (fromDate, toDate, noOfPeople) => {
            dispatch(hotelEssentialsAdd(fromDate, toDate, noOfPeople))
        }
    };
}


export default connect(null, mapDispatchToProps)(HotelSearch);