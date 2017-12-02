import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from "react-redux"


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
                    alert("User Already Exists");
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
            <Modal isOpen={true} className="signup-modal">
                <ModalHeader>Sign-Up</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col xs="12">
                            <FormGroup>
                                <input type="text" name="username" className="form-input" placeholder="Username"
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
                                       name="gender" value="notSpecified"/>
                                <label className=""><h6>Prefer not to say</h6></label>
                            </FormGroup>
                        </Col>
                    </Row>
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