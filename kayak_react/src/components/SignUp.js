import React, {Component} from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import * as API from '../api/API';

class SignUp extends Component {

    static propTypes = {
        handleSubmitRegister: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
    }

    handleChange(event) {
        this.setState(
            ...this.state,
            {
                [event.target.name]: event.target.value
            });
    }

    handleSubmitClick(event) {

        let formData = new FormData();
        formData = this.state;
        this.props.handleSubmitRegister(formData);
    };


    render() {

        return (
            <div className="row">
                <div className="col-sm-offset-4 col-md-offset-4 col-lg-offset-4 col-sm-6 col-md-6">
                    <div className="panel panel-default">
                        <div className="panel panel-body">
                            <ul id="dTab" className="nav nav-tabs">
                                <li><Link to='/login'><span className="glyphicon glyphicon-circle-arrow-right"></span>Login</Link>
                                </li>
                            </ul>
                            <div id="pane1" className="tab-pane">
                                <form className="text-justify">
                                    <fieldset>
                                        <div className="form-group">
                                            <label className="control-label">UserName</label>
                                            <input onChange={(e) => this.handleChange(e)} type="email" id="userEmail"
                                                   required="required" name="userEmail"
                                                   placeholder="Enter your email id" className="form-control"/>
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label">Password</label>
                                            <input onChange={(e) => this.handleChange(e)} type="password"
                                                   required="required" id="password" name="password"
                                                   placeholder="Enter Password" className="form-control"/>
                                        </div>

                                        <div className="form-group">
                                            <label className="control-label">First Name</label>
                                            <input onChange={(e) => this.handleChange(e)} type="text" id="firstName"
                                                   required name="firstName" placeholder="Enter First Name"
                                                   className="form-control"/>
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label">Last Name</label>
                                            <input onChange={(e) => this.handleChange(e)} type="text" required
                                                   id="lastName" name="lastName" placeholder="Enter Last Name"
                                                   className="form-control"/>
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label">Date of Birth</label>
                                            <input onChange={(e) => this.handleChange(e)} type="date" required id="dob"
                                                   name="dob" className="form-control"/>

                                        </div>
                                        <div className="form-group">
                                            <label className="control-label">Gender</label><br/>
                                            <input onChange={(e) => this.handleChange(e)} type="radio"
                                                   id="genderChoice1"
                                                   name="gender" value="male"/>
                                            <label className="control-label">Male</label>
                                            <input onChange={(e) => this.handleChange(e)} type="radio"
                                                   id="genderChoice2"
                                                   name="gender" value="female"/>
                                            <label className="control-label">Female</label>
                                            <input onChange={(e) => this.handleChange(e)} type="radio"
                                                   id="genderChoice3"
                                                   name="gender" value="other"/>
                                            <label className="control-label">Other</label>
                                            <input onChange={(e) => this.handleChange(e)} type="radio"
                                                   id="genderChoice4"
                                                   name="gender" value="notSpecified"/>
                                            <label className="control-label">Prefer not to specify</label>
                                        </div>
                                        <button
                                            className="btn btn-primary"
                                            type="button"
                                            onClick={() => this.handleSubmitClick()}>
                                            Submit
                                        </button>
                                    </fieldset>
                                </form>
                            </div>
                            <div className="col-md-10">
                                <br/>
                                <img src="../../public/logo.png"></img>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignUp;