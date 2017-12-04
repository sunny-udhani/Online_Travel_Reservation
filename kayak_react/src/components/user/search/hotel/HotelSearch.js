import React, {Component} from 'react';
import {Route, withRouter, Switch, Link} from 'react-router-dom';
import {flightEssentialsAdd, hotelEssentialsAdd, toggleBookingType} from "../../../../actions/index";
import {connect} from "react-redux";

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

        this.props.hotelEssentialsAdd(this.searchCriteria.check_in_date, this.searchCriteria.check_out_date, this.searchCriteria.no_of_people);

        searchString += this.searchCriteria.city + "_" + this.searchCriteria.check_in_date + "_" + this.searchCriteria.check_out_date + "_" + this.searchCriteria.no_of_people+ "_" + this.searchCriteria.no_of_rooms;
        this.props.listHotel(searchString)
    };

    render() {
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
                               placeholder="2"
                               onChange={
                                   (event) => {
                                       this.searchCriteria.no_of_people = event.target.value
                                   }
                               }/>
                    </div>
                    <div className="form-group col-md-2">
                        <label className="table-label">No. of rooms</label>
                        <input type="number" className="form-control" required="required" id="noofrooms"
                               placeholder="1"
                               onChange={
                                   (event) => {
                                       this.searchCriteria.no_of_rooms = event.target.value
                                   }
                               }/>
                    </div>
                </div>
                <center><button className="btn btn-warning" onClick={() => this.searchHotels()}>Search</button></center>
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