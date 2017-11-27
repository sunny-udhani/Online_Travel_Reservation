import React, {Component} from 'react';
import '../cssfiles/myacc.css';

export default class AfteruserLogin extends Component {
    constructor() {
        super();
        this.state = {
            collapsed: true
        }
    }

    render() {
        let settingGear = <svg id="common-layout-settings" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%"><path class="colorable svg-dark-grey-default" stroke="currentColor" fill="none" d="M9.54,20.66l-1.92-.8-2,1.28A0.5,0.5,0,0,1,5,21.07L2.91,19a0.5,0.5,0,0,1-.07-0.61l1.3-2a15.59,15.59,0,0,1-.8-1.92L1,13.93a0.5,0.5,0,0,1-.38-0.48V10.53A0.5,0.5,0,0,1,1,10l2.34-.5a15.59,15.59,0,0,1,.8-1.92l-1.28-2A0.5,0.5,0,0,1,2.93,5L5,2.91a0.5,0.5,0,0,1,.61-0.07l2,1.3a15.59,15.59,0,0,1,1.92-.8L10.07,1A0.5,0.5,0,0,1,10.55.62h2.92A0.5,0.5,0,0,1,14,1l0.5,2.34a15.59,15.59,0,0,1,1.92.8l2-1.28a0.5,0.5,0,0,1,.61.07L21.09,5a0.5,0.5,0,0,1,.07.61l-1.3,2a15.59,15.59,0,0,1,.8,1.92L23,10.07a0.5,0.5,0,0,1,.38.48v2.92A0.5,0.5,0,0,1,23,14l-2.34.5a15.59,15.59,0,0,1-.8,1.92l1.28,2a0.5,0.5,0,0,1-.07.61L19,21.09a0.5,0.5,0,0,1-.61.07l-2-1.3a15.59,15.59,0,0,1-1.92.8L13.93,23a0.5,0.5,0,0,1-.48.38H10.53A0.5,0.5,0,0,1,10,23Z"></path><circle class="colorable svg-dark-grey-default" stroke="currentColor" fill="none" cx="12" cy="12" r="4"></circle></svg>;
        let tripIcon = <svg id="common-layout-suitcase" data-name="Layer 3" xmlns="http://www.w3.org/2000/svg" viewBox="0 2 24 24" width="100%" height="100%"><path class="colorable svg-dark-grey-default" stroke="currentColor" fill="none" d="M18.6 9.39H5.4a1.84 1.84 0 0 0-1.9 1.76v6.48a1.84 1.84 0 0 0 1.9 1.76h13.2a1.84 1.84 0 0 0 1.9-1.76v-6.48a1.84 1.84 0 0 0-1.9-1.76zM15.13 9.29v-.65c0-1.18-.67-2.14-1.49-2.14h-3.29c-.82 0-1.49 1-1.49 2.14v.65"></path></svg>;
        
        let bellIcon = <svg id="common-layout-pricealert" data-name="Layer 5" xmlns="http://www.w3.org/2000/svg" viewBox="0 1 24 24" width="100%" height="100%"><path id="eb78be3c-4940-428e-9ae1-e90c52a81a36" class="colorable svg-dark-grey-default" stroke="currentColor" fill="none" data-name="bell" d="M18.08 17.45H6a1 1 0 0 1-.82-.39.65.65 0 0 1 0-.79c.18-.27.39-.52.57-.79a4.16 4.16 0 0 0 1.11-2.06V9.73c0-2.24 2.21-4.09 4.85-4.09h.86c2.57 0 4.67 1.79 4.67 4v3.79a4 4 0 0 0 1.11 2.06 6.77 6.77 0 0 1 .57.79.65.65 0 0 1 0 .79.88.88 0 0 1-.84.38z"></path><ellipse class="colorable svg-dark-grey-default" stroke="currentColor" fill="none" cx="12" cy="4.09" rx=".93" ry=".91"></ellipse><ellipse class="colorable svg-dark-grey-default" stroke="currentColor" fill="none" cx="12" cy="18" rx="1.4" ry="1.36" clip-path="url(#bell-clip)"></ellipse></svg>;

        return (
        <div className="myacc-dropdown">
        <ul className="dropdown-menu avatar-dropdown">
            <li>
                <a className="dropdown-item">
                    <div className="icon">{settingGear}</div>
                    <span className="text">Account Preferences</span>
                </a>
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
            <li className="dropdown-item">
                <a className="signout button">Sign Out</a>
            </li>
        </ul>
        </div>
    );
  }
}