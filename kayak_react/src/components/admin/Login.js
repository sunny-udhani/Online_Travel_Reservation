import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux"
import {login_success} from "../../actions"
import {doSignIn} from "../../api/user/API_SignIn"

class Login extends Component {

    userDet = {
        username: "",
        password: ""
    };

    componentWillMount() {

    }

    handleSignIn(userdata) {
        doSignIn(userdata)
            .then((res) => {
            console.log(res.status);
            console.log(userdata.username);
                if (res.status === 200) {
                    this.props.loginSuccess(userdata.username, "successful login");
                    console.log(this.props.menu);
                } else {
                    console.log("validation");
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    render() {

        return (
            <div className="row justify-content-md-center">
                <div className="col-md-3">
                    <form>
                        <div className="form-group">
                            <h1>Login</h1>
                        </div>
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                name= "username"
                                label="Username"
                                placeholder="Enter Username"
                                onChange={(event) => {
                                    this.userDet.username = event.target.value;

                                }}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                className="form-control"
                                type="password"
                                name = "password"
                                label="password"
                                placeholder="Enter Password"
                                onChange={(event) => {
                                    this.userDet.password = event.target.value;
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <button
                                className="btn btn-primary"
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
