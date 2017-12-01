import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from "react-redux"

import {signUpSuccess} from "../actions/index";
import {doSignUp} from "../api/user/API_SignUp";

import '../design/css/signupform.css'
import * as LogAPI from "../api/user/API_Logging";

class SignUp extends Component {

    static propTypes = {
        //handleSubmitRegister: PropTypes.func.isRequired
    };

    componentWillMount(){
        let click = {
            // userId: "anonymous",
            pageName: "SignUp",
            timeStamp: new Date().toLocaleTimeString()
        };
        console.log(click);
        LogAPI.logClicksPerPage(click)
            .then(res => {
                console.log(`Logged ${click} status: ${res.status}`);
            })
            .catch(err => console.log(err));
    }

    constructor(props) {
        super(props);
        this.state = {};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
    }

    userdata = {
    };

    handleChange(event) {
        this.setState(
            ...this.state,
            {
                [event.target.name]: event.target.value
            });
    }

    handleSubmitClick() {
        let userdata = new FormData();
        userdata = this.state;

        console.log("Formdata : " + userdata);

        doSignUp(userdata)
            .then((res) => {
                if (res.status === 200) {

                    console.log("SignUp - username : " + res.username);
                    console.log("Signup - message is - " + res.message);

                    this.props.handleSubmitRegister(userdata.username);
                    this.props.history.push("/u");
                }
                if (res.status === 201) {

                    console.log("SignUp - username : " + res.username);
                    console.log("Signup - message is - " + res.message);

                    this.props.handleSubmitRegister(userdata.username);
                    this.props.history.push("/admin");
                }
                else if (res.status === 401) {
                    console.log("User Already Exists");
                }
                else {
                    console.log("Failed to Signup");
                }
            })
            .catch((err) => {
                console.log(err);
            })
    };


    render() {

        return (
            <div className="signupform">
                <div className="form-modal" >
                    <form className="text-justify">
                        <div>
                            <h5>Username</h5>
                            <input onChange={(e) => this.handleChange(e)} type="email" id="username"
                                   required="required" name="username"
                                   placeholder="" className="form-control input-sm"/>
                        </div>
                        <br/>
                        <div>
                            <h5>Password</h5>
                            <input onChange={(e) => this.handleChange(e)} type="password"
                                   required="required" id="password" name="password"
                                   placeholder="" className="form-control input-sm"/>
                        </div>
                        <br/>
                        <div>
                            <h5>First Name</h5>
                            <input onChange={(e) => this.handleChange(e)} type="text" id="firstName"
                                   name="firstName" placeholder=""
                                   className="form-control input-sm"/>
                        </div>
                        <br/>
                        <div>
                            <h5>Last Name</h5>
                            <input onChange={(e) => this.handleChange(e)} type="text" id="lastName"
                                   name="lastName" placeholder=""
                                   className="form-control input-sm"/>
                        </div>
                        <br/>
                        <div>
                            <h5>Date of Birth</h5>
                            <input onChange={(e) => this.handleChange(e)} type="date" id="dob"
                                   name="dob" className="form-control input-sm"/>

                        </div>
                        <br/>
                        <div>
                            <h5>Gender</h5>
                            <input onChange={(e) => this.handleChange(e)} type="radio"
                                   id="genderChoice1"
                                   name="gender" value="male"/>
                            <label className=""><h6>Male</h6></label>
                            <input onChange={(e) => this.handleChange(e)} type="radio"
                                   id="genderChoice2"
                                   name="gender" value="female"/>
                            <label className=""><h6>Female</h6></label>
                            <input onChange={(e) => this.handleChange(e)} type="radio"
                                   id="genderChoice4"
                                   name="gender" value="notSpecified"/>
                            <label className=""><h6>Prefer not to say</h6></label>
                        </div>
                        <br/>
                        <div>
                            <h5>Access Indicator</h5>
                            <input onChange={(e) => this.handleChange(e)} type="radio"
                                   id="accessInd1"
                                   name="accessInd" value="admin"/>
                            <label className=""><h6>Admin</h6></label>
                            <input onChange={(e) => this.handleChange(e)} type="radio"
                                   id="accessInd2"
                                   name="accessInd" value="user"/>
                            <label className=""><h6>User</h6></label>
                        </div>
                        <button
                            className="login loginmodal-submit btn-block"
                            type="button"
                            onClick={() => this.handleSubmitClick()}>
                            Submit
                        </button>

                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        menu: state
    }
}

function mapDispatchToProps(dispatch) {
    return {
        handleSubmitRegister: (username) => {
            dispatch(signUpSuccess(username))
        }
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp));