import React, {Component} from 'react';
import {connect} from "react-redux";
import "../styles/profileIconEditor.css";
import {addprofilepicture} from "../../../../api/user/API_ADDprofilePicture"
import {Route, withRouter} from 'react-router-dom';

 class ProfileIconEditor extends Component {
    constructor() {
        super();
    }

    changeProfilePicture(event) {
        var formData = new FormData();
        formData.append("profile-picture", event.target.files[0]);
        addprofilepicture(formData).then(function(){
            this.forceUpdate();
        }.bind(this));
    }


    render() {
        let style = {
            height: (this.props.height || 20) + "px",
            width: (this.props.width || 20) + "px"

        };
        return(
            <div className="profile-icon-editor" style={style}>
                <img src={"http://localhost:3001/images/Pritam@gmail.com.jpg?_=" + Date.now()} alt={this.props.alt || "No profile picture Available"} />
                <form>
                    <input className="hidden" type="file" id="profile-icon-editor-input" onChange={this.changeProfilePicture.bind(this)}/>
                    <label htmlFor="profile-icon-editor-input" className="glyphicon glyphicon-pencil"></label>
                </form>
            </div>
        );
    }
}



function mapStateToProps(state) {
    return {
        username: state.username
    }
}
export default connect(mapStateToProps)(ProfileIconEditor);