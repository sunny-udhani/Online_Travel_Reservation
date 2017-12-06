import React, {Component} from 'react';
import {Route, withRouter, Switch, Link} from 'react-router-dom';
import {connect} from "react-redux";
import {toggleBookingType} from "../../../../actions/index";

// import "../../css/bootstrap.min.css"
// import "../../css/font-awesome.min.css"
// import "../../css/style.css"
// import "../../css/jquery-ui.min.css"
// import "../../css/jquery-ui.structure.min.css"

class FlightSearchDynamic extends Component {


    render() {
        let criteria = this.props.criteria;
        if (this.props.toggleInd) {
            return (
                <div>
                    <div className="form-group col-md-2">
                        <label className="form-label"id="givecolor">From</label>
                        <input type="text" required="required" className="form-control" id="from"
                               placeholder="from: new york"
                               onChange={
                                   (event) => {
                                       this.props.criteria.from = event.target.value
                                   }
                               }/>
                    </div>
                    <div className="form-group col-md-2">
                        <label className="form-label"id="givecolor">To</label>
                        <input type="text" required="required" className="form-control" id="to"
                               placeholder="to: san francisco"
                               onChange={
                                   (event) => {
                                       this.props.criteria.to = event.target.value
                                   }
                               }/>
                    </div>
                    <div className="form-group col-md-2">
                        <label className="form-label"id="givecolor">Dept Date</label>
                        <input type="date" className="form-control" required="required" id="deptDate"
                               placeholder="mm/dd/yyyy"
                               onChange={
                                   (event) => {
                                       this.props.criteria.depart_date = event.target.value
                                   }
                               }/>
                    </div>
                    <div className="form-group col-md-2">
                        <label className="form-label"id="givecolor">Return Date</label>
                        <input type="date" className="form-control" required="required" id="checkoutdate"
                               placeholder="mm/dd/yyyy"
                               onChange={
                                   (event) => {
                                       this.props.criteria.return_date = event.target.value
                                   }
                               }/>
                    </div>
                    <div className="form-group col-md-2">
                        <label className="table-label"id="givecolor">No. of Persons</label>
                        <input type="number" className="form-control" required="required" id="noofpersons"
                               placeholder="2"
                               onChange={
                                   (event) => {
                                       this.props.criteria.no_of_people = event.target.value
                                   }
                               }/>
                    </div>
                    <div className="form-group col-md-2">
                        <label className="table-label"id="givecolor">Select Class</label>
                        <select  style={{backgroundColor: "#ffffff"}} onChange={(event) => {
                            console.log(this);
                            this.props.criteria.class = event.target.value
                        }}>
                            <option value="-1">
                                --
                            </option>
                            <option value="economy">
                                Economy
                            </option>
                            <option value="business">
                                Business
                            </option>
                            <option value="first-class">
                                First-class
                            </option>
                        </select>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="center-block">
                    <div className="form-group col-md-2"id="givecolor">
                        <label className="form-label">From</label>
                        <input type="text" required="required" className="form-control" id="from"
                               placeholder="from: new york"
                               onChange={
                                   (event) => {
                                       this.props.criteria.from = event.target.value
                                   }
                               }/>
                    </div>
                    <div className="form-group col-md-2">
                        <label className="form-label"id="givecolor">To</label>
                        <input type="text" required="required" className="form-control" id="to"
                               placeholder="to: san francisco"
                               onChange={
                                   (event) => {
                                       this.props.criteria.to = event.target.value
                                   }
                               }/>
                    </div>
                    <div className="form-group col-md-2">
                        <label className="form-label"id="givecolor">Dept Date</label>
                        <input type="date" className="form-control" required="required" id="checkindate"
                               placeholder="mm/dd/yyyy"
                               onChange={
                                   (event) => {
                                       this.props.criteria.depart_date = event.target.value
                                   }
                               }/>
                    </div>
                    <div className="form-group col-md-2">
                        <label className="table-label"id="givecolor">No. of Persons</label>
                        <input type="number" className="form-control" required="required" id="noofpersons"
                               placeholder="no of persons"
                               onChange={
                                   (event) => {
                                       this.props.criteria.no_of_people = event.target.value
                                   }
                               }/>
                    </div>
                    <div className="form-group col-md-2" >
                        <label className="table-label"id="givecolor"> Select Class</label>
                        <select style={{backgroundColor: "#ffffff"}} onChange={(event) => {
                            this.props.criteria.class = event.target.value
                        }}>
                            <option value="-1">
                                --
                            </option>
                            <option value="economy">
                                Economy
                            </option>
                            <option value="business">
                                Business
                            </option>
                            <option value="firstclass">
                                First-class
                            </option>
                        </select>
                    </div>
                </div>
            );
        }
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
        }
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(FlightSearchDynamic);