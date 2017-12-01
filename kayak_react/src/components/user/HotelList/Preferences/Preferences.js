import React, {Component} from 'react';
import './styles-user/preferences.css';
import {Route, withRouter} from 'react-router-dom';
import '../bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';
import {connect} from "react-redux"

 class Preferences extends Component{

    constructor(){
        super();
 }
    componenentWillMount(){
    }

    render(){
        return(
            <div className="container-fluid">
            <div className="row">
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
                        <p>abc@gmail.com</p>
                    </div>
                    </div>
                    <div className="password-details">
                   <div className="password-user pull-left">
                   <p className="user-bold">Password</p>
                   </div>
                    <div className="password-info">
                        <p>ddss</p>
                    </div>
                    </div>
                    <div className="airport-details">
                    <div className="airport-user pull-left">
                    <p className="user-bold">Home-Airport</p>
                    </div>
                     <div className="airport-info">
                     <p>San Francisco</p>
                     </div>
                    </div>
                    <div className="delete-details">
                        <div className="delete-user pull-left">
                            <button type="button" id="delete-info">Delete Account</button>
                </div>
            </div>
                </div>
            </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        username: state.username
    }
}
export default connect(mapStateToProps)(Preferences);