import React, {Component} from 'react';
import {Route, withRouter, Switch, Link} from 'react-router-dom';
import {carEssentialsAdd, flightEssentialsAdd, toggleBookingType} from "../../../../actions/index";
import {connect} from "react-redux";
import {alertOptions, showAlert} from "../../../../alertConfig";
import AlertContainer from 'react-alert';

import "../../../kayak.css"
// import "../../css/bootstrap.min.css"
// import "../../css/font-awesome.min.css"
// import "../../css/style.css"
// import "../../css/jquery-ui.min.css"
// import "../../css/jquery-ui.structure.min.css"

class CarSearch extends Component {
    searchCriteria = {
        city: "",
        from_date: "",
        to_date: "",
    };

    searchCars() {
        let searchString = "";

        console.log(this);

        if (this.searchCriteria.city === "") {
            showAlert("Select appropriate city", "error", this);
            return;
        }

        if (Date.parse(new Date(this.searchCriteria.to_date)) < Date.parse(new Date(this.searchCriteria.from_date)) || Date.parse(new Date(this.searchCriteria.to_date)) === Date.parse(new Date(this.searchCriteria.from_date))) {
            showAlert("Select appropriate from and to dates", "error", this);
            return;
        }

        if (this.searchCriteria.from_date === "") {
            showAlert("Select appropriate from date", "error", this);
            return;
        }

        if (this.searchCriteria.to_date === "") {
            showAlert("Select appropriate to date", "error", this);
            return;
        }


        this.props.carEssentialsAdd(this.searchCriteria.from_date, this.searchCriteria.to_date);


        searchString += this.searchCriteria.city + "_" + this.searchCriteria.from_date + "_" + this.searchCriteria.to_date;
        this.props.listCars(searchString)
    };

    render() {
        let arrowinside=<svg class=""  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="currentColor"><path d="M31.88 12.32l-1.43 1.4L39.56 23H20v2h19.56l-9.11 9.27 1.43 1.41L43.35 24 31.88 12.32M11 23h6v2h-6zM5 23h3v2H5z"></path></svg>

        return (
            <div className="text-center">
                <div className="form-row" style={{marginLeft: "20%"}}>
                    <div className="form-group col-md-3">
                        <label className="form-label"id="givecolor">City</label>
                        <input type="text" required="required" className="form-control" id="city" placeholder="city"
                               onChange={
                                   (event) => {
                                       this.searchCriteria.city = event.target.value
                                   }
                               }/>
                    </div>
                    <div className="form-group col-md-3">
                        <label className="form-label"id="givecolor">From Date</label>
                        <input type="date" className="form-control" required="required" id="checkindate"
                               placeholder="mm/dd/yyyy"
                               onChange={
                                   (event) => {
                                       this.searchCriteria.from_date = event.target.value
                                   }
                               }/>
                    </div>
                    <div className="form-group col-md-3">
                        <label className="form-label"id="givecolor">To Date</label>
                        <input type="date" className="form-control" required="required" id="checkoutdate"
                               placeholder="mm/dd/yyyy"
                               onChange={
                                   (event) => {
                                       this.searchCriteria.to_date = event.target.value
                                   }
                               }/>
                    </div>
                </div>
                <center>
                    <button className="buttonsbox"onClick={() => this.searchCars()} >{arrowinside}</button>
                    <AlertContainer ref={a => this.msg = a} {...alertOptions}/>
                </center>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        carEssentialsAdd: (fromDate, toDate) => {
            dispatch(carEssentialsAdd(fromDate, toDate))
        }
    };
}


export default connect(null, mapDispatchToProps)(CarSearch);