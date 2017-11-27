
import React, { Component } from 'react';
//import bootstrap from 'bootstrap';
import Myaccount from './Myaccount';
import '../cssfiles/navbar.css';


export default class Navbar extends Component {
    constructor() {
        super();
    }

    render() {
        return (
                <nav className="navbar navbar-default">
                    <a className="navbar-brand" href="#"><img src="/images/kayaklogo.PNG" /></a>
                    <div className="navbar-header">
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1" >
                        <ul className="nav navbar-nav">
                                <li className="tabsFormat"> <a  href ="#">Hotels</a></li>
                                <li className="tabsFormat"> <a  href ="#">Flights</a></li>
                                <li className="tabsFormat"> <a  href ="#">Cars</a></li>
                                <li className="tabsFormat"><a href="#">Packages</a></li>
                                <li className="tabsFormat"> <a  href ="#">Rentals</a></li>
                                <li className="tabsFormat"> <a  href ="#">Cruises</a></li>
                        </ul>
                    </div>
                    </div>
                    <span className="pull-right"><Myaccount /></span>
                </nav>
        );
    }
}

