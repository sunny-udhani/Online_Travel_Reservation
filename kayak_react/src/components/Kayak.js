import React, {Component} from 'react';
import {Route, withRouter, Switch, Link, Redirect} from 'react-router-dom';
import AdminHome from "./admin/AdminHome";
import UserPaymentPage from "./user/UserPaymentPage";
import {connect} from "react-redux"

import Login from "./Login";
import SignUp from "./SignUp";

import '../design/css/home.css'

import * as API from "../api/API";
import {doLogout} from "../api/user/API_HandleLogout";

import UserHome from "./user/UserHome";

import './kayak.css'
import "../css/bootstrap.min.css"
import "../css/font-awesome.min.css"
import "../css/style.css"
import "../css/jquery-ui.min.css"
import "../css/jquery-ui.structure.min.css"
import Listing from "./user/listing/Listing";
import Payment from './user/HotelList/Preferences/Payment';
import Preferences from "./user/HotelList/Preferences/Preferences";
import TripHistory from "./user/HotelList/Preferences/TripHistory";
import ProfileIconEditor from './user/HotelList/Preferences/ProfileIconEditor.js';
import EditUserInfo from './user/HotelList/Preferences/EditUserInfo';
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


import {doSignIn} from "../api/user/API_SignIn";
import {carListingView, filter_change, login_success, logout_success, toggleLoginModal} from "../actions";
import * as LogAPI from "../api/user/API_Logging";


class Kayak extends Component {

    constructor() {
        super();
        this.state = {
            signupForm: <SignUp/>,
            signinForm: "",
            showSignupForm: false,
            showSigninForm: false
        };
    }

    loginInfo = {
        username: "",
        password: "",
    };

    renderSigninForm() {
        this.setState({
            showSigninForm: true
        });
    }

    renderSignupForm() {
        this.setState({
            showSignupForm: true
        });
    }

    handleSubmit = (userdata) => {
    };

    handlePageChange = ((page) => {
        this.props.history.push(page);
    });

    componentWillMount() {
        // this.showLoginOption();
    }

    handleSignOut = () => {
        console.log("Logout called");
        doLogout()
            .then((status) => {
                if (status === 200) {
                    console.log("Logout Successful");
                    this.props.logoutSuccess();
                    this.props.history.push("/");
                }
            });
    };

    showLoginOption = ((item) => {
        console.log(item);
        console.log(this.props.admi);
        API.validateSession().then((response) => {
            if (response.status === 200) {
                let username;
                response.json().then((data) => {
                    username = data.username;
                });
                return (
                    <div>
                        User Email : {this.username}
                    </div>
                )
            }
            // else if(response.status===201){
            //     let username;
            //     response.json().then((data)=>{
            //         username = data.username;
            //     });
            //     return(
            //         <div>
            //             Admin Email : {this.username}
            //         </div>
            //     )
            // }
            else {
                return (
                    <div>
                        <Link to='/login'><span className="glyphicon glyphicon-circle-arrow-right"></span>Login</Link>
                        <Link to='/signup'><span className="glyphicon glyphicon-circle-arrow-right"></span>Sign
                            Up</Link>
                    </div>
                )
            }
        });


    });

    toggle = ((toggleInd) => {

        if (toggleInd) {
            this.props.toggleLoginModal(toggleInd);
        } else
            this.props.toggleLoginModal(!this.props.loginModalToggle)
    });

    doLogin = ((loginData) => {

        if (loginData.username === "") {
            showAlert("Enter username used for sign up", "error", this);
            return;
        }

        if (loginData.password === "") {
            showAlert("Enter password used for sign up", "error", this);
            return;
        }

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

        doSignIn(loginData)
            .then((res) => {
                console.log(res.status);
                console.log(loginData.username);
                if (res.status === 200) {
                    this.props.loginSuccess(loginData.username, "successful login");
                    showAlert("Logged In Successfully", "info", this);
                    this.toggle(false);
                    this.props.history.push("/u");


                }
                else if (res.status === 201) {
                    this.props.loginSuccess(loginData.username, "successful admin login");
                    this.toggle(false);
                    showAlert("Admin Logged In Successfully", "info", this);

                    this.props.history.push("/admin");
                }
                else {
                    console.log("validation");
                    showAlert("Login Unsuccessful", "error", this);

                }
            })
            .catch((err) => {
                console.log(err);
            })
    });

    showLogin = (() => {
        // alert(this.props.className);
        if (this.props.loginModalToggle) {
            return (
                <Modal isOpen={this.props.loginModalToggle} toggle={() => this.toggle} className="login-modal">
                    <ModalHeader toggle={() => this.toggle}>Login</ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col xs="12">
                                <FormGroup>
                                    <input type="text" className="form-input" placeholder="Username"
                                           onChange={(event) => {
                                               this.loginInfo.username = event.target.value;
                                           }}
                                    />
                                </FormGroup>
                            </Col>
                            <Col xs="12">
                                <FormGroup>
                                    <input type="password" className="form-input" placeholder="Password"
                                           onChange={(event) => {
                                               this.loginInfo.password = event.target.value;
                                           }}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <input type="button" value="Login" className="btn btn-primary"
                               onClick={(() => {
                                   this.doLogin(this.loginInfo)
                               })}
                        />

                        <input type="button" value="Cancel"
                               className="btn btn-primary"
                               onClick={() => {
                                   this.toggle(false);
                                   this.props.history.push("/u");
                               }}
                        />
                    </ModalFooter>
                </Modal>
            )
        }
        else {
            return (
                <div>
                </div>
            )
        }

    });


    showProfileIcon = (() => {
        // alert(this.props.className);
        if (this.props.isLoggedIn) {
            return (
                <ProfileIconEditor height="50" width="50"/>

            )
        }
        else {
            return (
                <div>
                </div>
            )
        }

    });


    render() {



        let dashboard = '';
        // let profilepicture='';

        if (this.props.isLoggedIn === false) {


            dashboard =
                <ul className="dropmenu">
                    <li><a href="/signup"  onClick={this.renderSignupForm.bind(this)}>Sign Up</a></li>
                    <li><a href="/login" onClick={this.renderSigninForm.bind(this)}>Sign In</a></li>
                </ul>

        }
        else {
            dashboard =
                <ul className="dropmenu">
                    <li><Link to="/pref">Account Preferences {this.props.username} </Link></li>
                    <li className="type-1"><a href="/u" onClick={(()=>{this.handleSignOut()})}>Sign Out</a></li>
                </ul>
            /*profilepicture=
                <li><ProfileIconEditor height="50" width="50"/></li>*/

        }


        return (
            <div>
                <div className="container">
                    <header className="color-1 hovered menu-3"id="pritya">
                        <div className="nav">
                            <nav className="navbar">
                                <img src="/img/kayaklogo.PNG" id="prityaimage"/>

                                <ul>
                                    <li className="type-1 active">
                                        <Link to="/u/hotel" id="colouredtabs">home<span
                                            className="fa fa-angle-down"></span></Link>

                                    </li>
                                    <li className="type-1"><Link to="/u/hotel"id="colouredtabs" >Hotels
                                        <span
                                            className="fa fa-angle-down"></span></Link>

                                    </li>
                                    <li className="type-1"><Link to="/u/flight"id="colouredtabs" >Flights
                                        <span
                                            className="fa fa-angle-down"></span></Link>

                                    </li>
                                    <li className="type-1"><Link to="/u/cars"id="colouredtabs">Cars
                                        <span
                                            className="fa fa-angle-down"></span></Link>

                                    </li>

                                    {/*Added myAccount Tab*/}
                                    <li className="type-1"><a href="#"id="colouredtabs">My Account<span
                                        className="fa fa-angle-down"></span></a>

                                        {dashboard}

                                    </li>
                                    <li>
                                        {
                                            this.showProfileIcon()
                                        }
                                    </li>
                                </ul>


                            </nav>
                        </div>
                    </header>
                </div>
                <div className="myacc-dropdown">
                    {/*{this.state.showSigninForm ? this.state.signinForm : ''}*/}
                    {this.state.showSignupForm ? this.state.signupForm : ''}
                </div>

                <div className="container">
                    <Switch>
                        <Route exact path="/" render={() => {
                            return (
                                <div>
                                    {this.handlePageChange("/u")}
                                </div>
                            );
                        }}/>

                        <Route path="/payment" render={() =>
                            <UserPaymentPage/>
                        }/>

                        <Route path="/u" render={() =>
                            <UserHome
                                handlePageChange={this.handlePageChange}
                            />
                        }/>

                        <Route path="/listing" render={() =>
                            <Listing handlePageChange={this.handlePageChange}/>
                        }/>

                        <Route path="/signup" render={() =>
                            <SignUp
                                handleSubmit={this.handleSubmit}
                                handlePageChange={this.handlePageChange}
                                invalidateUserSession={this.invalidateUserSession}/>
                        }/>

                        <Route path="/login" render={() => {
                            this.toggle(true)
                            return (
                                <div>
                                    {
                                        this.showLogin()
                                    }
                                    <AlertContainer ref={a => this.msg = a} {...alertOptions}/>

                                </div>
                            )
                        }
                        }/>

                        <Route path="/admin" render={() => (
                            <AdminHome
                                handleLogout={this.handleLogout}
                                handlePageChange={this.handlePageChange}
                            />
                        )}/>


                        <Route path="/pref" render={() => (
                            <Preferences handlePageChange={this.handlePageChange}/>
                        )}/>
                        <Route path="/payinfo" render={() => (
                            <Payment handlePageChange={this.handlePageChange}/>
                        )}/>
                        <Route path="/triphistory" render={() => (
                            <TripHistory handlePageChange={this.handlePageChange}/>
                        )}/>
                        <Route path="/editdetails" render={() => (
                            <EditUserInfo handlePageChange={this.handlePageChange} />
                        )}/>


                    </Switch>
                    <AlertContainer ref={a => this.msg = a} {...alertOptions}/>

                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {

    return {
        username: state.email,
        isLoggedIn: state.isLoggedIn,
        loginModalToggle: state.loginModaltoggleInd,
    };
}


function mapDispatchToProps(dispatch) {
    return {
        toggleLoginModal: (toggleInd) => {
            dispatch(toggleLoginModal(toggleInd));
        },
        loginSuccess: (email, message) => {
            dispatch(login_success(email, message))
        },
        logoutSuccess: () => {
            dispatch(logout_success())
        },
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Kayak));

