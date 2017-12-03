import React, {Component} from 'react';
import '../styles/card2.css';
import "../bootstrap/dist/css/bootstrap.min.css";
import Img1 from "./../images/hotel.jpg";

import Modal from './Modal.js'

class Card2 extends Component {


    render() {
let pricebacked=0;
        return (
            <div className="row">
                <h1 className="header1">Select a Room</h1>
                {
                    this.props.hotelRoom.rooms.map((room, index) => (


                        <div className="innercontainer">
                            <div className="imagecontainer">
                                <div className="row one">
                                    <p className="header2">Delux({this.props.noOfrooms_ceil} rooms)</p>
                                </div>
                                <div className="row two">
                                    <div className="col-md-2 image">
                                        <img className="img1" src={Img1}/>

                                    </div>
                                    <div className="col-md-9" style={{marginLeft: "1%"}}>
                                        <div className="carddetail">
                                            <p className="description pull-left">Price:${room.roomPrice}</p>
                                            <div className="cancellation">
                                                <div className="cancellation pull-right">
                                                    <button className="button" type="button">Select
                                                    </button>

                                                </div>
                                                <div className="description1 pull-left">
                                                    <p className="totalprice pull-left">Total
                                                        Price:${room.roomPrice}+{room.roomPrice}</p>
                                                </div>
                                                <p className="cancel">Free Cancellation</p>
                                                <div className="cancellationpolicy">
                                                    <a href="#" className="policy">Cancellation Policy </a>
                                                </div>
                                            </div>


                                            <div className="description1tax pull-left">
                                                <p className="tax">Tax: ${this.props.tax}</p>
                                            </div>


                                        </div>

                                    </div>


                                </div>


                            </div>

                        </div>
                    ))
                }


            </div>


        );

    }
}

export default Card2;