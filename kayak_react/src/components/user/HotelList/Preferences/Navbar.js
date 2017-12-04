import React, {Component} from 'react';
import './styles-user/navbar.css';
import {Link} from 'react-router-dom';

import {Route, withRouter} from 'react-router-dom';
import '../bootstrap/dist/css/bootstrap.min.css';

export default class Navbar extends Component {
    render() {
        return (
            <div className="col-md-12-navbar">

                        <br/><br/>
                        <Link className="prefed" id="a" to = "/pref">Preferences </Link>
                        <br/><br/>
                        <Link classname="payinfoed" id="a" to = "/payinfo">Payment Methods </Link>
                        <br/><br/>
                        <Link className="triphistoried"id="a" to = "/triphistory">Trip History</Link>
                        <br/>
                    </div>


        );
    }
}