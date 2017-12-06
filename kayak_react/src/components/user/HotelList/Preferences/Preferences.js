import React, {Component} from 'react';
import './styles-user/preferences.css';
import {Route, withRouter} from 'react-router-dom';
import '../bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';
import {connect} from "react-redux";
import {getuserprofile_user} from '../../../../api/user/API_GetUserProfile';
import Moment from "react-moment"
import {Link} from 'react-router-dom';
import * as LogAPI from "../../../../api/user/API_Logging";

// import ProfileIconEditor from './ProfileIconEditor';

class Preferences extends Component {

    constructor() {
        super();
        this.state = ({
            detailed: []
        });

    }

    componentWillMount() {
        let click = {
            pageClick:{
                userId: "anonymous",
                pageName: "UserProfile",
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
        if (this.props.isLoggedIn) {

            getuserprofile_user().then((res) => {

                console.log(res);
                console.log(this.state);

                this.setState({
                    ...this.state,
                    detailed: res

                });
                console.log(this.state);

            }).catch((err) => {

                console.log(err);
            })
        }else{
            this.props.handlePageChange("/u")
        }
    }


    render() {
        return (
            <div className="container-fluid">
                {
                    this.state.detailed.map((details, index) => (

                        <div className="row" style={{marginTop: "9%", backgroundColor: "#ffffff"}}>
                            <div className="col-md-3-navFileUpload">
                                <Navbar/>
                            </div>
                            <div className="col-md-8-navFileUpload">
                                <br/><br/>
                                <div className="heading-container">
                                    <h5 className="header-preferences">Preferences</h5>
                                </div>
                                <hr className="line"></hr>
                                <div className="email-details">
                                    <div className="email-user pull-left">
                                        <p className="user-bold">Email Login</p>
                                    </div>
                                    <div className="email-info">
                                        <p>{this.props.email}</p>
                                    </div>
                                </div>


                                <div className="password-details">
                                    <div className="password-user pull-left">
                                        <p className="user-bold">FirstName</p>
                                    </div>
                                    <div className="password-info">
                                        <p>{details.firstName}</p>
                                    </div>
                                </div>

                                <div className="password-details">
                                    <div className="password-user pull-left">
                                        <p className="user-bold">Lastname</p>
                                    </div>
                                    <div className="password-info">
                                        <p>{details.lastName}</p>
                                    </div>
                                </div>
                                <div className="password-details">
                                    <div className="password-user pull-left">
                                        <p className="user-bold">Gender</p>
                                    </div>
                                    <div className="password-info">
                                        <p>{details.gender}</p>
                                    </div>
                                </div>
                                <div className="password-details">
                                    <div className="password-user pull-left">
                                        <p className="user-bold">Street</p>
                                    </div>
                                    <div className="password-info">
                                        <p>{details.street}</p>
                                    </div>
                                </div>
                                <div className="password-details">
                                    <div className="password-user pull-left">
                                        <p className="user-bold">City</p>
                                    </div>
                                    <div className="password-info">
                                        <p>{details.city}</p>
                                    </div>
                                </div>

                                <div className="password-details">
                                    <div className="password-user pull-left">
                                        <p className="user-bold">State</p>
                                    </div>
                                    <div className="password-info">
                                        <p>{details.state}</p>
                                    </div>
                                </div>
                                <div className="password-details">
                                    <div className="password-user pull-left">
                                        <p className="user-bold">ZipCodee</p>
                                    </div>
                                    <div className="password-info">
                                        <p>{details.zipCode}</p>
                                    </div>
                                </div>
                                <div className="password-details">
                                    <div className="password-user pull-left">
                                        <p className="user-bold">Phone number</p>
                                    </div>
                                    <div className="password-info">
                                        <p>{details.phoneNumber}</p>
                                    </div>
                                </div>


                                <div className="airport-details">
                                    <div className="airport-user pull-left">
                                        <p className="user-bold">Date of Birth</p>
                                    </div>
                                    <div className="airport-info">
                                        <p><Moment format="YYYY/MM/DD">{details.dateofbirth}</Moment></p>
                                    </div>
                                </div>

                                <div className="delete-details">
                                    <Link classname="btn btn-danger" id="cancelcard" to="/editdetails">Edit </Link>
                                </div>


                            </div>

                        </div>
                    ))
                }
            </div>


        );
    }
}

function mapStateToProps(state) {
    return {
        email: state.email,
        isLoggedIn: state.isLoggedIn,
    }
}

export default connect(mapStateToProps, null)(Preferences);