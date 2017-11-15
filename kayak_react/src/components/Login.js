import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux"
import {signIn} from "../actions"
import * as API from "../api/API"

class Login extends Component {

    componentWillMount() {

    }

    handleSignIn(userdata) {
        API.doLogin(userdata)
            .then((res) => {
                if (res.status === 200) {

                } else {

                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        let {userDet} = this.props;
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
                                label="Username"
                                placeholder="Enter Username"
                                onChange={(event) => {
                                    userDet.userId = event.target.value;

                                }}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                className="form-control"
                                type="password"
                                label="password"
                                placeholder="Enter Password"
                                onChange={(event) => {
                                    userDet.pass = event.target.value;
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <button
                                className="btn btn-primary"
                                type="button"
                                onClick={() => this.handleSignIn(userDet)}>
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
        userDet: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        handleSignIn: (data) => {
            dispatch(signIn(data))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
