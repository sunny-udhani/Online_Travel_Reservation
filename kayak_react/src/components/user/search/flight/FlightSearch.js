import React, {Component} from 'react';
import {Route, withRouter, Switch, Link} from 'react-router-dom';
import {connect} from "react-redux";
import {toggleBookingType, flightEssentialsAdd} from "../../../../actions/index";
import FlightSearchDynamic from "./FlightSearchDynamic";
import AlertContainer from 'react-alert';

import {alertOptions, showAlert} from "../../../../alertConfig";

// import "../../css/bootstrap.min.css"
// import "../../css/font-awesome.min.css"
// import "../../css/style.css"
// import "../../css/jquery-ui.min.css"
// import "../../css/jquery-ui.structure.min.css"
import "../../../kayak.css"
class FlightSearch extends Component {

    searchCriteria = {
        from: "",
        to: "",
        booking_type: "one-way",
        depart_date: "",
        return_date: "",
        no_of_people: "",
        class: "-1",
    };

    searchFlights() {
        let searchString = "";
        console.log(this.searchCriteria);

        if (this.searchCriteria.from === "") {
            showAlert("Select appropriate departure city", "error", this);
            return;
        }

        if (this.searchCriteria.to === "") {
            showAlert("Select appropriate arrival city", "error", this);
            return;
        }

        if (this.searchCriteria.booking_type === "round-trip") {
            if (Date.parse(new Date(this.searchCriteria.return_date)) < Date.parse(new Date(this.searchCriteria.depart_date)) || Date.parse(new Date(this.searchCriteria.return_date)) === Date.parse(new Date(this.searchCriteria.depart_date))) {
                showAlert("Select appropriate departure or return dates", "error", this);
                return;
            }
        }

        if (this.searchCriteria.no_of_people === "" || this.searchCriteria.no_of_people === "0") {
            showAlert("Select appropriate number of people", "error", this);
            return;
        }

        if (this.searchCriteria.depart_date === "") {
            showAlert("Select appropriate departure date", "error", this);
            return;
        }

        if (this.searchCriteria.booking_type === "round-trip") {
            if (this.searchCriteria.return_date === "") {
                showAlert("Select appropriate return date", "error", this);
                return;
            }
        }

        if (this.searchCriteria.class == -1) {
            showAlert("Select appropriate flight class", "error", this);
            return;
        }

        this.props.flightEssentialsAdd(this.searchCriteria.class, this.searchCriteria.booking_type, this.searchCriteria.no_of_people, this.searchCriteria.depart_date, this.searchCriteria.return_date);

        if (this.props.toggleInd)
            searchString += this.searchCriteria.booking_type + "_" + this.searchCriteria.from + "_" + this.searchCriteria.to + "_" + this.searchCriteria.depart_date + "_" + this.searchCriteria.return_date + "_" + this.searchCriteria.no_of_people + "_" + this.searchCriteria.class;
        else
            searchString += this.searchCriteria.booking_type + "_" + this.searchCriteria.from + "_" + this.searchCriteria.to + "_" + this.searchCriteria.depart_date + "_" + this.searchCriteria.no_of_people + "_" + this.searchCriteria.class;

        this.props.listFlight(searchString)
    };

    toggleFlightBookingType(value) {
        this.props.toggleBookingType(value);
        if (value)
            this.searchCriteria.booking_type = "round-trip";
        else
            this.searchCriteria.booking_type = "one-way";

    };


    render() {
        let arrowinside=<svg class=""  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="currentColor"><path d="M31.88 12.32l-1.43 1.4L39.56 23H20v2h19.56l-9.11 9.27 1.43 1.41L43.35 24 31.88 12.32M11 23h6v2h-6zM5 23h3v2H5z"></path></svg>

        return (
            <div>
                <div className="form-row">
                    <div className="form-group col-md-3"></div>
                    <div className="form-group col-md-6">
                        <label className="form-label">Booking Type:</label>
                        &nbsp;
                        &nbsp;
                        <button className="button-s-2 bg-3 m-right" onClick={() => this.toggleFlightBookingType(true)}>
                            Round
                        </button>
                        <button className="button-s-2 bg-3 m-right" onClick={() => this.toggleFlightBookingType(false)}>
                            one-way
                        </button>

                    </div>
                    <div className="form-group col-md-3">
                    </div>
                </div>

                <div className="form-row">
                    <FlightSearchDynamic criteria={this.searchCriteria}/>
                </div>
                <center>
                    <button className="buttonsbox" onClick={() => this.searchFlights()}>{arrowinside}</button>
                </center>
                <AlertContainer ref={a => this.msg = a} {...alertOptions}/>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        toggleInd: state.toggleInd,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        toggleBookingType: (filterInd) => {
            dispatch(toggleBookingType(filterInd))
        },
        flightEssentialsAdd: (className, tripType, noOfPassengers, fromDate, toDate) => {
            dispatch(flightEssentialsAdd(className, tripType, noOfPassengers, fromDate, toDate))
        }
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(FlightSearch);