import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import * as API from '../api/user/API_SignIn';
import Login from "./Login";
import Message from "./Message";
import Welcome from "./Welcome";

class NewerHomePage extends Component {

    state = {
        isLoggedIn: false,
        message: '',
        username: ''
    };

    handleSubmit = (userdata) => {
        API.doLogin(userdata)
            .then((status) => {
                if (status === 201) {
                    this.setState({
                        isLoggedIn: true,
                        message: "Welcome to my App..!!",
                        username: userdata.username
                    });
                    this.props.history.push("/welcome");
                } else if (status === 401) {
                    this.setState({
                        isLoggedIn: false,
                        message: "Wrong username or password. Try again..!!"
                    });
                }
            });
    };

    render() {
        return (
            <div className="container-fluid">
                <Route exact path="/login" render={() => (
                    <div>
                        <Login handleSubmit={this.handleSubmit} invalidateUserSession={this.invalidateUserSession}/>
                    </div>
                )}/>

                <Route exact path="/" render={() => <SignUp handleSubmitRegister={this.handleRegister}/>}/>

                <Route exact path="/welcome" render={() => (
                    <Welcome validateUserSession={this.validateUserSession} handleLogout={this.handleLogout}
                             username={this.state.username}/>
                )}/>
            </div>
        );
    }
}

export default withRouter(NewerHomePage);