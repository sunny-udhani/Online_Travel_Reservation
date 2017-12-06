import React, {Component} from 'react';
import * as LogAPI from "../../api/user/API_Logging";

class UserProfile extends Component {

    handleSubmit = (userdata) => {
    };

    componentWillMount(){
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
    }

    render() {
        return (
            <div className="container-fluid">
                <h1 style={{marginTop:"100px"}}>User Profile</h1>
            </div>
        );
    }
}

export default UserProfile;