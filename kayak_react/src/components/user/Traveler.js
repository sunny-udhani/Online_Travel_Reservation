import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from "react-redux"

import '../../design/css/bootstrap.min.css'
import '../../design/css/jquery-ui.min.css'
import '../../design/css/jquery-ui.structure.min.css'
import '../../design/css/style.css'

class Traveler extends Component {

    handleSubmit = (userdata) => {

    };

    componentWillMount() {
        // console.log("In Traveler.js - no of passengers " + this.props.noofpassengers);

    };


    render() {

            for (var i = 0; i < this.props.noofpassengers; i++) {

                console.log("In Traveler : " + i);
                console.log(this.props.flag);
                console.log(this.props.traveler_details);

                if (this.props.flag === true) {
                    console.log("Flag is true");
                    this.props.travelers.push(
                        (<div>
                            <div className="col-sm-12">
                                <hr/>

                                <h5><strong className="color-red-3">Traveler</strong>
                                    <small>(primary contact must be an adult)</small>
                                </h5>
                                <br/>

                                <div className="col-sm-6">
                                    <h6>First Name</h6>
                                    <input type="text"
                                           className="form-control input-sm"
                                           id=""
                                           onChange={
                                               (event) => {
                                                   this.props.traveler_details[i].first_name = event.target.value
                                               }
                                           }
                                    />
                                </div>
                                <div className="col-sm-6">
                                    <h6>Lastname</h6>
                                    <input type="text"
                                           className="form-control input-sm"
                                           id=""
                                           onChange={
                                               (event) => {
                                                   this.props.traveler_details[i].last_name = event.target.value
                                               }
                                           }
                                    />
                                </div>
                            </div>

                            <div className="col-sm-12">
                                <div className="col-sm-6">
                                    <h6>Email Address</h6>
                                    <input type="text"
                                           className="form-control input-sm"
                                           id=""
                                           onChange={
                                               (event) => {
                                                   this.props.traveler_details[i].email = event.target.value
                                               }
                                           }
                                    />
                                </div>
                                <div className="col-sm-6">
                                    <h6>Phone Number</h6>
                                    <input type="text"
                                           className="form-control input-sm"
                                           id=""
                                           onChange={
                                               (event) => {
                                                   this.props.traveler_details[i].phonenumber = event.target.value
                                               }
                                           }
                                    />
                                </div>
                            </div>
                        </div>)
                    );
                }
        }

        return (
            <div>
                {this.props.travelers}
            </div>
        )
    }
}

//if you need anything from state to use here
// function mapStateToProps(state) {
//
//     return {};
// }

//if you need to push something to state, use action -> reducer
// function mapDispatchToProps(dispatch) {
//     return {};
// }

export default Traveler;