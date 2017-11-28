import React, {Component} from 'react';
import {Route, withRouter, Switch} from 'react-router-dom';
import AdminHome from "./admin/AdminHome";
import UserHome from "./user/UserHome";

import Login from "./Login";
import HostHome from "./host/HostHome";
import SignUp from "./SignUp";
import Home from "./user/Home";

import '../design/css/home.css'

class Kayak extends Component {

    handleSubmit = (userdata) => {
    };

    render() {
        return (
            <div>
                <div className="container-fluid">
                    <Switch>
                        <Route exact path="/" render={() =>
                            <Home/>
                        }/>

                        <Route exact path="/u" render={() => (
                            <UserHome/>
                        )}/>

                        <Route path="/signup" render={() =>
                            <SignUp handleSubmit={this.handleSubmit}
                                    invalidateUserSession={this.invalidateUserSession}/>
                        }/>

                        <Route path="/login" render={() =>
                            <Login handleSubmit={this.handleSubmit} invalidateUserSession={this.invalidateUserSession}/>
                        }/>

                        <Route path="/admin" render={() => (
                            <AdminHome/>
                        )}/>

                        <Route path="/host" render={() => (
                            <HostHome/>
                        )}/>
                    </Switch>
                </div>
                <br/>
                {/*<hr/>*/}
                {/*Footer*/}
                {/*<hr/>*/}
            </div>
        )
    }
}

export default withRouter(Kayak);

