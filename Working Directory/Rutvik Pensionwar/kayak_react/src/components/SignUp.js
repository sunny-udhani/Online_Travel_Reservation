import React, {Component} from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import {connect} from "react-redux"
import {signUpSuccess} from "../actions/index";
import {doSignUp} from "../api/user/API_SignUp";

class SignUp extends Component {

    static propTypes = {
        //handleSubmitRegister: PropTypes.func.isRequired
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

    handleSubmitClick() {

        let formData = new FormData();
        formData = this.state;

        console.log("Formdata : " + formData);

        doSignUp(formData)
            .then((res) => {
                if (res.status === 200) {
                    this.props.handleSubmitRegister(res.userEmail);
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
            <div>
                {/*<h4>SIGN UP</h4><br/>*/}
                {/*<form>*/}
                {/*<input type="text" name="user" placeholder="Username" />*/}
                {/*<input type="password" name="pass" placeholder="Password" />*/}
                {/*<input type="submit" name="login" className="login loginmodal-submit" value="Login" />*/}
                {/*</form>*/}

                {/*<div className="login-help">*/}
                {/*<a href="#">Register</a> - <a href="#">Forgot Password</a>*/}
                {/*</div>*/}


                {/*<div className="panel panel-default">*/}
                {/*<div className="panel panel-body">*/}
                {/*<ul id="dTab" className="nav nav-tabs">*/}
                {/*<li><Link to='/login'><span className="glyphicon glyphicon-circle-arrow-right"></span>Login</Link>*/}
                {/*</li>*/}
                {/*</ul>*/}
                {/*<div id="pane1" className="tab-pane">*/}
                <form className="text-justify">

                    <div className="form-group">
                        <h5>Username</h5>
                        <input onChange={(e) => this.handleChange(e)} type="email" id="userEmail"
                               required="required" name="userEmail"
                               placeholder="" className="form-control input-sm"/>
                    </div>
                    <div className="form-group">
                        <h5>Password</h5>
                        <input onChange={(e) => this.handleChange(e)} type="password"
                               required="required" id="password" name="password"
                               placeholder="" className="form-control input-sm"/>
                    </div>

                    <div className="form-group">
                        <h5>First Name</h5>
                        <input onChange={(e) => this.handleChange(e)} type="text" id="firstName"
                               required name="firstName" placeholder=""
                               className="form-control input-sm"/>
                    </div>
                    <div className="form-group">
                        <h5>Last Name</h5>
                        <input onChange={(e) => this.handleChange(e)} type="text" required
                               id="lastName" name="lastName" placeholder=""
                               className="form-control input-sm"/>
                    </div>
                    <div className="form-group">
                        <h5>Date of Birth</h5>
                        <input onChange={(e) => this.handleChange(e)} type="date" required id="dob"
                               name="dob" className="form-control input-sm"/>

                    </div>
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
                    <button
                        className="login loginmodal-submit btn-block"
                        type="button"
                        onClick={() => this.handleSubmitClick()}>
                        Submit
                    </button>

                </form>
                {/*</div>*/}
                {/*</div>*/}
                {/*</div>*/}
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
        handleSubmitRegister: (userEmail) => {
            dispatch(signUpSuccess(userEmail))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);