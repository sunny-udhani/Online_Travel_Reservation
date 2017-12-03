import React, {Component} from 'react';
import './styles-user/navbar.css';
import {Route, withRouter} from 'react-router-dom';
import '../bootstrap/dist/css/bootstrap.min.css';

export default class Navbar extends Component {
    render() {
        return (
            <div className="col-md-12-navbar">

                        <br/><br/>
                        <a className="prefed" id="a"href="/pref">Preferences </a>
                        <br/><br/>
                        <a classname="payinfoed" id="a"href="/payinfo">Payment Methods </a>
                        <br/><br/>
                        <a className="triphistoried"id="a" href="/triphistory">Trip History</a>
                        <br/>
                    </div>


        );
    }
}