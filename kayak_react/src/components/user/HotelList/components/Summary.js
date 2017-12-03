import React, {Component} from 'react';
import "../bootstrap/dist/css/bootstrap.min.css";
import '../styles/summary.css';

export default class Summary extends Component{
    render(){
        return(
            <div className="col-md-6" style={{marginLeft: "30%"}}>
                <div className="row-oo">
            <div className="summaryy">
                <p className="summaryheader">Summary</p>
                <p className="summaryheader2">2rooms,2 adults,1 child</p>
                <p className="summaryheader2">Sun 11/26-Tue12/5(9 nights)</p>
                <hr className="hr"/>
                <img className="logoimage" src="https://a1.r9cdn.net/rimg/provider-logos/common/h/kayak-logo.png?crop=true&amp;height=15&amp;_v=a0d5bc4351ca838340f6f620d50049eb738666a1" alt="KAYAK"/>
                <hr className="hr"/>
                <div className="gylp">
                    <p className="secure"> <span className="glyphicon glyphicon-ok"></span>Faster secure checkout</p>
                    <p className="checkout">Save your payment details for faster booking in the future.</p>
            </div>
                <div className="gylpi">
                    <p className="secure"> <span className="glyphicon glyphicon-ok"></span>Easily manage travel</p>
                    <p className="checkout">Sign in to share and receive updates on your trip.</p>
                </div>
            </div>
                </div>
            </div>
        );
    }
}
