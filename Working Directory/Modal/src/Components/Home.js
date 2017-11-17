import React, {Component} from 'react';
//import { Route, withRouter } from 'react-router-dom';
//import * as API from '../api/API';
import Navbar from "../common/Navbar";
import Homepage from "../common/Homepage";
//import Message from "./Message";
//import Welcome from "./Welcome";
//import Signup from "./Signup";
import {Button} from 'react-bootstrap';
import '../cssfiles/Home.css'
class Home extends Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: false,
            message: '',
            username: '',
            firstname:'',
            lastname:''
        };

    }

  /*  componentWillMount() {

        fetch("http://localhost:3001/checkLogin", {
            method: 'GET',
            // mode: 'no-cors',
            credentials: 'include'
        }).then(this.handleResponse.bind(this))
            .catch(this.handleError.bind(this));
    }

    handleResponse(response) {
        if(response.status != 200) {
            throw new Error();
        }
        this.setState({
            isLoggedIn:true
        });
        this.props.history.push("/welcome");
        return response;
    }
    handleError(response) {
        /*this.setState({
            isLoggedIn: false
        });
        this.props.history.push("/");
    }
    handleSubmit = (userdata) => {
        API.doLogin(userdata)
            .then((status) => {
                if (status === 201) {
                    this.setState({
                        isLoggedIn: true,
                        message: "Welcome to my App..!!",
                        username: userdata.username,
                        /*firstname:userdata.firstname,
                        lastname:userdata.lastname
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

    handleLogout = () => {
        console.log('logout called');
        API.logout()
            .then((status) => {
                if(status === 200){
                    this.setState({
                        isLoggedIn: false
                    });
                    this.props.history.push("/");
                }
            });
    };

*/

    render() {

        return (
            <div className="container">
                <Navbar/>
                <Homepage/>
            </div>
        );
    }
}
export default Home=Home;

