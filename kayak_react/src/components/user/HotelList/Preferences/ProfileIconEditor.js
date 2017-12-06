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
        let stylecolor={
            color:"white"
        }
        let style = {
            height: (this.props.height || 20) + "px",
            width: (this.props.width || 20) + "px"

        };
        let image_url = this.props.username;
        console.log(image_url);

        return(
            <div className="profile-icon-editor" style={style}>
                <img src={"http://localhost:3001/images/"+this.props.username+".jpg?_=" + Date.now()} alt={this.props.alt || "No profile picture "} />
                <form>
                    <input className="hidden" type="file" id="profile-icon-editor-input" onChange={this.changeProfilePicture.bind(this)}/>
                    <label htmlFor="profile-icon-editor-input" style={stylecolor}className="glyphicon glyphicon-pencil"></label>
                </form>
            </div>
        );
    }
}



function mapStateToProps(state) {
    return {
        username: state.email
    }
}
export default connect(mapStateToProps,null)(ProfileIconEditor);