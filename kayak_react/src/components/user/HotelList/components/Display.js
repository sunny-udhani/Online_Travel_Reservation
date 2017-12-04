import React, {Component} from 'react';
import Card from './card.jsx';
import Card2 from './Card2.jsx';
import CollapsibleCard from './collapsiblecard.jsx';
import '../styles/app.css';
import Summary from './Summary.js';
import {getHotelRoom} from "../../../../api/user/API_HotelRoom.js";
import {Route, withRouter} from 'react-router-dom';
import {connect} from "react-redux"

const headers = {
    'Accept': 'application/json'
};

export default class Display extends Component {

    constructor(props) {
        super(props);
       this.state={
            id:2,
           hotelRoom:{
            rooms: []
           },
           answer:0
        };

    }

    componentWillMount(){
        let temp = {
            id: 2
        };

        getHotelRoom(temp)
            .then((res) => {


                    this.setState ({ hotelRoom:res });

            }).catch((err) => {
            console.log(err);
        })

    }


    render() {

        let noOfPeople=6;
        let noOfrooms = (noOfPeople / 2);
        //let noOfrooms_ceil = Math.ceil(noOfrooms);
        let priceback=2;
        let priceOfRoom = 2* priceback;
        console.log(priceOfRoom);
        let tax = (priceOfRoom) * 0.18;
        console.log(tax);
        let totalpriceOfRoom = priceOfRoom + tax;

        return (

                <div className="row hotel-room-p">

                    <div className="col-lg-9 ">
                        <Card hotelRoom={this.state.hotelRoom} />
                        <CollapsibleCard hotelRoom={this.state.hotelRoom} className="state hotelResults" />
                        <Card2 hotelRoom={this.state.hotelRoom} totalpriceOfRoom={totalpriceOfRoom} priceOfRoom={priceOfRoom} tax={tax} noOfrooms_ceil={noOfrooms}/>

                    </div>
                    <div className="col-lg-3" style={{float: "right"}}>
                        <Summary hotelRoom={this.state.hotelRoom}/>
                    </div>
                </div>


        );
    }
}
