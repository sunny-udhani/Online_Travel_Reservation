import React, {Component} from 'react';
import '../styles/modal.css';
import "../bootstrap/dist/css/bootstrap.min.css";


export default class Modal extends Component {
    constructor() {
        super();
    }

    render () {
        return (
            <div>
                <input type="checkbox" id="showdetail-modal" className="hidden"/>
            <div className="signupform">
                <div className=" form-modal">
                    <div className="containerinside ">
                        <p className="headerhere">Double room with double bed</p>
                    </div>
                    <div className="containerinside1 col-md-3">
                        <img className="img1" src="https://mobile-text-alerts.com/blog/wp-content/uploads/2015/11/Hotel.jpg" />
                        <div className="smallimage col-md-1">
                            <img className="img2" src="https://mobile-text-alerts.com/blog/wp-content/uploads/2015/11/Hotel.jpg" align="left" />
                        </div>
                        <div className="smallimage col-md-1">
                            <img className="img3" src="https://mobile-text-alerts.com/blog/wp-content/uploads/2015/11/Hotel.jpg" />
                        </div>
                        <div className="smallimage col-md-1">
                            <img className="img4" src="https://mobile-text-alerts.com/blog/wp-content/uploads/2015/11/Hotel.jpg" />
                        </div>
                        <div className="ratesinfo">
                            <p>Rates</p>
                        </div>
                    </div>
                    <div className="containerinside1 col-md-8">
                        <p className="detail">Beds:</p>
                        <p className="detailed">2 Double</p>
                        <p className="detailed1">Included with your booking</p>
                        <p className="detailed2">Free Internet</p>
                    </div>
                    <div className="containerinside1 col-md-1">
                        <a href="#" id="cancel" name="cancel" className="glyphicon glyphicon-remove"></a>
                    </div>
                    <div className="carddetails">
                        <div className="rowdetails">
                        <div className="carddetail col-md-2">
                            <p>1 Queen</p></div>
                        <div className="cancellation">
                            <div className="cancellation pull-right">
                                <button class="button"  type="button">Select
                                </button>

                            </div>

                            <p className="totalprice">$103 </p>
                            <p className="cancel">Free Cancellation</p>
                            <div className="cancellationpolicy">
                                <a href="#" className="policy">Cancellation Policy </a>
                            </div>
                        </div>



                        <p className="tax">$14 taxes/fees</p>



                    </div>

                    </div>

                </div>



            </div>
            </div>
        );
    }
}