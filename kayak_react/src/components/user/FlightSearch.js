import React, {Component} from 'react';
import {Route, withRouter, Switch, Link} from 'react-router-dom';
import {connect} from "react-redux";
import {toggleBookingType,flightEssentialsAdd} from "../../actions/index";
import FlightSearchDynamic from "./FlightSearchDynamic";

// import "../../css/bootstrap.min.css"
// import "../../css/font-awesome.min.css"
// import "../../css/style.css"
// import "../../css/jquery-ui.min.css"
// import "../../css/jquery-ui.structure.min.css"

class FlightSearch extends Component {

    searchCriteria = {
        from: "",
        to: "",
        booking_type: "",
        depart_date: "",
        return_date: "",
        no_of_people: "",
        class: "-1",
    };

    searchFlights() {
        let searchString = "";
        console.log(this.searchCriteria);

        if(this.searchCriteria.class == -1){
            alert("please select a valid flight class ");
            return;
        }

        this.props.flightEssentialsAdd(this.searchCriteria.class, this.searchCriteria.booking_type, this.searchCriteria.no_of_people);

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
                        {/*<label className="form-label">Round Trip</label>*/}
                        {/*<input type="radio" required="required" value="round" className="form-control"*/}
                        {/*name="bookingtype" id="roundtrip"*/}
                        {/*onChange={*/}
                        {/*(event) => {*/}
                        {/*this.searchCriteria.booking_type = event.target.value*/}
                        {/*}*/}
                        {/*}/>*/}
                        {/*<label className="form-label">One way</label>*/}
                        {/*<input type="radio" required="required" value="one" className="form-control"*/}
                        {/*name="bookingtype" id="oneway"*/}
                        {/*onChange={*/}
                        {/*(event) => {*/}
                        {/*this.searchCriteria.booking_type = event.target.value*/}
                        {/*}*/}
                        {/*}/>*/}

                    </div>
                    <div className="form-group col-md-3">
                    </div>
                </div>

                <div className="form-row">
                    <FlightSearchDynamic criteria={this.searchCriteria}/>
                </div>
                <center>
                    <button className="btn btn-warning" onClick={() => this.searchFlights()}>Search</button>
                </center>
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
    flightEssentialsAdd: (className, tripType, noOfPassengers) => {
            dispatch(flightEssentialsAdd(className, tripType, noOfPassengers))
        }
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(FlightSearch);