import React, {Component} from 'react';
import SignupForm from './Signupform.js';
import SigninForm from './Signinform.js';
import '../cssfiles/myacc.css';

export default class BeforeuserLogin extends Component {
    constructor() {
        super();
        this.state = {
            signupForm: <SignupForm />,
            signinForm: <SigninForm />,
            showSignupForm: false,
            showSigninForm: false
        };
    }

    renderSignupForm() {
        this.setState({
            showSignupForm: true,
            showSigninForm: true
        });
    }

    render() {
        let tripIcon = <svg id="common-layout-suitcase" data-name="Layer 3" xmlns="http://www.w3.org/2000/svg" viewBox="0 2 24 24" width="100%" height="100%"><path class="colorable svg-dark-grey-default" stroke="currentColor" fill="none" d="M18.6 9.39H5.4a1.84 1.84 0 0 0-1.9 1.76v6.48a1.84 1.84 0 0 0 1.9 1.76h13.2a1.84 1.84 0 0 0 1.9-1.76v-6.48a1.84 1.84 0 0 0-1.9-1.76zM15.13 9.29v-.65c0-1.18-.67-2.14-1.49-2.14h-3.29c-.82 0-1.49 1-1.49 2.14v.65"></path></svg>;
        
        let bellIcon = <svg id="common-layout-pricealert" data-name="Layer 5" xmlns="http://www.w3.org/2000/svg" viewBox="0 1 24 24" width="100%" height="100%"><path id="eb78be3c-4940-428e-9ae1-e90c52a81a36" class="colorable svg-dark-grey-default" stroke="currentColor" fill="none" data-name="bell" d="M18.08 17.45H6a1 1 0 0 1-.82-.39.65.65 0 0 1 0-.79c.18-.27.39-.52.57-.79a4.16 4.16 0 0 0 1.11-2.06V9.73c0-2.24 2.21-4.09 4.85-4.09h.86c2.57 0 4.67 1.79 4.67 4v3.79a4 4 0 0 0 1.11 2.06 6.77 6.77 0 0 1 .57.79.65.65 0 0 1 0 .79.88.88 0 0 1-.84.38z"></path><ellipse class="colorable svg-dark-grey-default" stroke="currentColor" fill="none" cx="12" cy="4.09" rx=".93" ry=".91"></ellipse><ellipse class="colorable svg-dark-grey-default" stroke="currentColor" fill="none" cx="12" cy="18" rx="1.4" ry="1.36" clip-path="url(#bell-clip)"></ellipse></svg>;

        return (
        <div className="myacc-dropdown">
        {this.state.showSignupForm ? this.state.signupForm : ''}
        {this.state.showSigninForm ? this.state.signinForm : ''}

        <ul className="dropdown-menu avatar-dropdown">
            <li>
                <a className="signup" onClick={this.renderSignupForm.bind(this)}>Sign up</a>
               
            </li>
            <li>
                
                <a className="signin" onClick={this.renderSignupForm.bind(this)}>Sign in</a>
            </li>
            <li>
                <a className="dropdown-item">
                    <div className="icon">{tripIcon}</div>
                    <span className="text">Trips</span>
                </a>
            </li>
            <li>
                <a className="dropdown-item">
                    <div className="icon">{bellIcon}</div>
                    <span className="text">Price alerts</span>
                </a>
            </li>
            
        </ul>
        </div>
    );
  }
}