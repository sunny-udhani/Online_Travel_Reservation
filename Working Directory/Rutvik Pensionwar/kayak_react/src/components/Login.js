import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from "react-redux"

import {login_success} from "../actions";
import {doSignIn} from "../api/user/API_SignIn";

import '../design/css/signinform.css'

import UserHome from './user/UserHome';

class Login extends Component {

    userDet = {
        username: "",
        password: ""
    };

    componentWillMount() {

    };

    handleSignIn(userdata) {
        console.log("1: " + userdata.username);
        console.log("2: " + userdata.password);
        doSignIn(userdata)
            .then((res) => {
                console.log(res.status);
                console.log(userdata.username);
                if (res.status === 200) {
                    this.props.loginSuccess(userdata.username, "successful login");

                    this.props.history.push("/u");

                    console.log(this.props.menu);
                    console.log(this.props.menu.username);
                } else {
                    console.log("validation");
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    render() {
        console.log("Props: " + this.props.isLoggedIn);
        return (

            <div className="signinform">
                <div className="form-modal" >
                    <form className="text-justify">
                        <div className="">
                            <h4>Login</h4>
                        </div>
                        <br/>
                        <div>
                            <input
                                className="form-control"
                                type="text"
                                name="username"
                                label="Username"
                                placeholder=""
                                onChange={(event) => {
                                    this.userDet.username = event.target.value;

                                }}
                            />
                        </div>
                        <br/>
                        <div>
                            <input
                                className="form-control"
                                type="password"
                                name="password"
                                label="password"
                                placeholder=""
                                onChange={(event) => {
                                    this.userDet.password = event.target.value;
                                }}
                            />
                        </div>
                        <br/>
                        <div>
                            <button
                                className="login loginmodal-submit btn-block"
                                type="button"
                                onClick={() => this.handleSignIn(this.userDet)}>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

//if you need anything from state to use here
function mapStateToProps(state) {
    return {
        menu: state
    }
}

//if you need to push something to state, use action -> reducer
function mapDispatchToProps(dispatch) {
    return {
        loginSuccess: (email, message) => {
            dispatch(login_success(email, message))
        }
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
