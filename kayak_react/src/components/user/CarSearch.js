import React, {Component} from 'react';
import {Route, withRouter, Switch, Link} from 'react-router-dom';
import {carEssentialsAdd, flightEssentialsAdd, toggleBookingType} from "../../actions";
import {connect} from "react-redux";

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


        this.props.carEssentialsAdd(this.searchCriteria.from_date, this.searchCriteria.to_date);


        searchString += this.searchCriteria.city + "_" + this.searchCriteria.from_date + "_" + this.searchCriteria.to_date;
        this.props.listCars(searchString)
    };

    render() {
        return (
            <div className="text-center">
                <div className="form-row" style={{marginLeft: "20%"}}>
                    <div className="form-group col-md-3">
                        <label className="form-label">City</label>
                        <input type="text" required="required" className="form-control" id="city" placeholder="city"
                               onChange={
                                   (event) => {
                                       this.searchCriteria.city = event.target.value
                                   }
                               }/>
                    </div>
                    <div className="form-group col-md-3">
                        <label className="form-label">From Date</label>
                        <input type="date" className="form-control" required="required" id="checkindate"
                               placeholder="mm/dd/yyyy"
                               onChange={
                                   (event) => {
                                       this.searchCriteria.from_date = event.target.value
                                   }
                               }/>
                    </div>
                    <div className="form-group col-md-3">
                        <label className="form-label">To Date</label>
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
                    <button className="btn btn-warning" onClick={() => this.searchCars()}>Search</button>
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