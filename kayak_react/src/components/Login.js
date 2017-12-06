import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {login_success} from "../actions";
import {doSignIn} from "../api/user/API_SignIn";

import '../design/css/signinform.css'
import * as LogAPI from "../api/user/API_Logging";

class Login extends Component {

    userDet = {
        username: "",
        password: ""
    };

    componentWillMount(){
        let click = {
            pageClick:{
                userId: "anonymous",
                pageName: "SignIn",
                date: new Date().getDate(),
                month: new Date().getMonth(),
                year: 1900+new Date().getYear(),
                timeStamp: new Date().toLocaleTimeString()
            }
        };
        console.log(click);
        LogAPI.logClicksPerPage(click)
            .then(res => {
                console.log(`Logged ${click} status: ${res.status}`);
            })
            .catch(err => console.log(err));
    }

    handleSignIn(userdata) {
        doSignIn(userdata)
            .then((res) => {
            console.log(res.status);
            console.log(userdata.username);
                if (res.status === 200) {
                    this.props.loginSuccess(userdata.username, "successful login");
                    console.log(this.props.menu);
                    this.props.history.push("/u");
                }
                else if (res.status === 201) {
                    this.props.loginSuccess(userdata.username, "successful admin login");
                    console.log(this.props.menu);
                    this.props.history.push("/admin");
                }
                else {
                    console.log("validation");
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    render() {

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

function mapStateToProps(state) {
    return {
        menu: state
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loginSuccess: (email, message) => {
            dispatch(login_success(email, message))
        }
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
