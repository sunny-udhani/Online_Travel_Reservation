import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from "react-redux"
import AlertContainer from 'react-alert';

import {alertOptions, showAlert} from "../alertConfig";


import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Table,
    Pagination,
    PaginationItem,
    PaginationLink,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    FormText,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    Dropdown
} from 'reactstrap';

import {signUpSuccess} from "../actions/index";
import {doSignUp} from "../api/user/API_SignUp";

import '../design/css/signupform.css'
import * as LogAPI from "../api/user/API_Logging";

class SignUp extends Component {

    static propTypes = {
        //handleSubmitRegister: PropTypes.func.isRequired
    };

    componentWillMount() {
        let click = {
            pageClick: {
                userId: "anonymous",
                pageName: "SignUp",
                date: new Date().getDate(),
                month: new Date().getMonth(),
                year: 1900 + new Date().getYear(),
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

    constructor(props) {
        super(props);
        this.state = {
            username : "",
            password : "",
            firstname : "",
            lastname : "",
            dob : "",
            gender : "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
    }

    userdata = {};

    handleChange(event) {
        this.setState(
            ...this.state,
            {
                [event.target.name]: event.target.value
            });
    }

    handleSubmitClick() {
        let userdata = new FormData();
        let emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        userdata = this.state;

        console.log("Formdata : " + userdata);

        console.log(this.state);

        if (this.state.username === "") {
            console.log(this);

            showAlert("Please enter Username", "error", this);
            return;
        }

        if (this.state.password === "") {
            console.log(this);

            showAlert("Please enter password", "error", this);
            return;
        }

        if (this.state.firstname === "") {
            console.log(this);

            showAlert("Please enter firstname", "error", this);
            return;
        }

        if (this.state.lastname === "") {
            console.log(this);

            showAlert("Please enter lastname", "error", this);
            return;
        }

        if (this.state.dob === "") {
            console.log(this);

            showAlert("Please enter dob", "error", this);
            return;
        }

        if (this.state.gender === "") {
            console.log(this);

            showAlert("Please enter gender", "error", this);
            return;
        }

        if ((emailPattern.exec(this.state.username)) === null) {
            console.log(this);

            showAlert("Not a email address", "error", this);
            return;
        }

        doSignUp(userdata)
            .then((res) => {
                if (res.status === 200) {
                    showAlert("Sign up successful", "info", this);

                    this.props.handleSubmitRegister(userdata.username);
                    this.props.history.push("/u");
                }
                if (res.status === 201) {

                    showAlert("Sign up successful", "info", this);

                    this.props.handleSubmitRegister(userdata.username);
                    this.props.history.push("/admin");
                }
                else if (res.status === 401) {
                    console.log("User Already Exists");
                    showAlert("User Already Exists", "error", this);

                }
                else {
                    showAlert("Failed to Signup", "error", this);

                    console.log("Failed to Signup");
                }
            })
            .catch((err) => {
                console.log(err);
            })
    };


    render() {

        return (
            <Modal isOpen={true} className="signup-modal">
                <ModalHeader>Sign-Up</ModalHeader>
                <ModalBody>
                    <AlertContainer ref={a => this.msg = a} {...alertOptions}/>

                    <Row>
                        <Col xs="12">
                            <FormGroup>
                                <input type="email" name="username" className="form-input" placeholder="Username"
                                       onChange={(event) => {
                                           this.handleChange(event);
                                       }}
                                />
                            </FormGroup>
                        </Col>
                        <Col xs="12">
                            <FormGroup>
                                <input type="password" name="password" className="form-input" placeholder="Password"
                                       onChange={(event) => {
                                           this.handleChange(event);
                                       }}
                                />
                            </FormGroup>
                        </Col>
                        <Col xs="12">
                            <FormGroup>
                                <input type="text" name="firstname" className="form-input" placeholder="FirstName"
                                       onChange={(event) => {
                                           this.handleChange(event);
                                       }}
                                />
                            </FormGroup>
                        </Col>
                        <Col xs="12">
                            <FormGroup>
                                <input type="text" name="lastname" className="form-input" placeholder="LastName"
                                       onChange={(event) => {
                                           this.handleChange(event);
                                       }}
                                />
                            </FormGroup>
                        </Col>
                        <Col xs="12">
                            <FormGroup>
                                <input type="date" name="dob" className="form-input" placeholder="DOB"
                                       onChange={(event) => {
                                           this.handleChange(event);
                                       }}
                                />
                            </FormGroup>
                        </Col>
                        <Col xs="12">
                            <FormGroup>
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
                                       name="gender" value="no"/>
                                <label className=""><h6>Prefer not to say</h6></label>
                            </FormGroup>
                        </Col>
                    </Row>
                    <AlertContainer ref={a => this.msg = a} {...alertOptions}/>

                </ModalBody>
                <ModalFooter>
                    <input type="button" value="SignUp" className="btn btn-primary"
                           onClick={() => this.handleSubmitClick()}
                    />

                    <input type="button" value="Cancel"
                           className="btn btn-primary"
                           onClick={() => {
                               this.props.handlePageChange("/u");
                           }}
                    />
                </ModalFooter>
                <AlertContainer ref={a => this.msg = a} {...alertOptions}/>

            </Modal>
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