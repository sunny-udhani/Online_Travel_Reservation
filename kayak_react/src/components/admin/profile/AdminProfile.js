import React, {Component} from 'react';
import * as API from '../../api/API';

class AdminProfile extends Component {

    handleSubmit = (userdata) => {
    };

    componentWillMount(){
        API.fetchProfile().then((response) => {
            console.log(response.status);
        });
    }

    render() {
        return (
            <div className="container-fluid">
                <h1>Admin Profile</h1>
            </div>
        );
    }
}

export default AdminProfile;