import React, {Component} from 'react';
import Signup from './Signup';
import '../cssfiles/myacc.css';
import AfteruserLogin from './afteruserlogin.js';
import BeforeuserLogin from './beforeuserlogin.js';

export default class Myaccount extends Component{

    constructor(){
        super();


    }

    state = {
        loggedin:false,
        collapsed: true
    }

    handleClick()
    {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        if(!this.state.loggedin){
            <div></div>
        }
        

        let emptyAvatar = <svg id="common-layout-profile" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle class="colorable svg-white-default" stroke="currentColor" fill="none" cx="12" cy="10" r="3.5"></circle><path class="colorable svg-white-default" stroke="currentColor" fill="none" d="M12,14c-4,0-7.21,2.67-7.47,6.05a11,11,0,0,0,14.95,0C19.21,16.67,16,14,12,14Z"></path><path class="colorable svg-white-default" stroke="currentColor" fill="none" d="M23,12A11,11,0,1,0,4.53,20.05C4.79,16.67,8,14,12,14s7.21,2.67,7.47,6.05A11,11,0,0,0,23,12Z"></path></svg>;
       
        return(
                <div className="avatar">
                    <a href="#" onClick={this.handleClick.bind(this)} >
                    <div className="image">{emptyAvatar}</div>
                            <span>My Account</span>
                            
                    </a>
                    {!this.state.collapsed ? this.state.loggedin ? <AfteruserLogin /> : <BeforeuserLogin /> : ''}
                </div>
        );



    }

}