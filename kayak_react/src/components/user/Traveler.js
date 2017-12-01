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

    };


    render() {

        return (
            <div>
                <div className="col-sm-12">
                    <hr/>

                    <h5><strong className="color-red-3">Traveler</strong>
                        <small>(primary contact must be an adult)</small>
                    </h5>
                    <br/>

                    <div className="col-sm-6">
                        <h6>First Name</h6>
                        <input type="text" name=""
                               className="form-control input-sm"
                               id="" value=""/>
                    </div>

                    <div className="col-sm-6">
                        <h6>Middle Name</h6>
                        <input type="text" name=""
                               className="form-control input-sm"
                               id="" value=""/>
                    </div>
                </div>


                <div className="col-sm-12">
                    <div className="col-sm-6">
                        <h6>Lastname</h6>
                        <input type="text" name="" className="form-control input-sm"
                               id="" value=""/>
                    </div>
                </div>

                <div className="col-sm-12">
                    <div className="col-sm-6">
                        <h6>Email Address</h6>
                        <input type="text" name="" className="form-control input-sm"
                               id=""
                               value=""/>
                    </div>
                    <div className="col-sm-6">
                        <h6>Phone Number</h6>
                        <input type="" name="" className="form-control input-sm"
                               id="" value=""/>
                    </div>
                </div>
            </div>
        );
    }
}

//if you need anything from state to use here
function mapStateToProps(state) {

    return {};
}

//if you need to push something to state, use action -> reducer
function mapDispatchToProps(dispatch) {
    return {};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Traveler));