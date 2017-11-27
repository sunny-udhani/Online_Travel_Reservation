import React, {Component} from 'react';
import * as API from "../../api/admin/API";
import ShowHotels from "./hotel/ShowHotels";
class HotelPage extends Component {

    constructor(){
        super();
        this.state = {
            showAddHotel : false,
            hotels : []
        };
    }


    handleSubmit = () => {
    };

    addHotelData = {
        hostId : "",
        hotelName : "",
        hotelAddress : "",
        city : "",
        state : "",
        zipCode : "",
        totalRooms : 0,
        stars : 0
    };

    addHotel = ((flightdata)=>{
        console.log(flightdata);
        API.addHotel(flightdata).then((response)=>{
            console.log(response.status);
            if(response.status===200){
                response.json().then((data)=>{
                    console.log(data);
                    this.setState({
                        ...this.state,
                        showAddHotel : false
                    });
                    this.fetchHotels();
                });
            }
            else {
                console.log("Error while adding hotel");
            }
        });
    });

    showAddHotel = (()=>{
        // console.log(this.state.showAddHotel);
        if(this.state.showAddHotel){
            return(
                <div className="signinform">
                    <div className="form-modal">
                        <div className="panel panel-heading">
                            <form>
                                <div className="form-group">
                                    <label className="signin-label">Add Hotel</label>
                                    <input type="text" className="form-input" placeholder="Host Id"
                                           onChange={(event)=>{
                                               this.addHotelData.hostId = event.target.value;
                                           }}
                                    />
                                    <input type="text" className="form-input" placeholder="Hotel Name"
                                           onChange={(event)=>{
                                               this.addHotelData.hotelName = event.target.value;
                                           }}
                                    />
                                    <input type="text" className="form-input" placeholder="Hotel Address"
                                           onChange={(event)=>{
                                               this.addHotelData.hotelAddress = event.target.value;
                                           }}
                                    />
                                    <input type="text" className="form-input" placeholder="City"
                                           onChange={(event)=>{
                                               this.addHotelData.city = event.target.value;
                                           }}
                                    />
                                    <input type="text" className="form-input" placeholder="State"
                                           onChange={(event)=>{
                                               this.addHotelData.state = event.target.value;
                                           }}
                                    />
                                    <input type="number" className="form-input" placeholder="ZipCode"
                                           onChange={(event)=>{
                                               this.addHotelData.zipCode = event.target.value;
                                           }}
                                    />
                                    <input type="number" max="5" className="form-input" placeholder="Stars"
                                           onChange={(event)=>{
                                               this.addHotelData.stars = event.target.value;
                                           }}
                                    />
                                    <br/>
                                    <input type="button" value="Add Hotel" className="btn btn-primary"
                                           onClick={(()=>{this.addHotel(this.addHotelData)})}
                                    />

                                    <input type="button" value="Cancel"
                                           className="btn btn-primary"
                                           onClick={(()=>{this.setState({
                                               ...this.state,
                                               showAddHotel : false
                                           })})}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return(
                <div>
                </div>
            )
        }

    });

    fetchHotels = (()=> {
        console.log("Wil Mount HotelPage");
        API.fetchHotels().then((response) => {
            console.log(response.status);
            if(response.status===200){
                response.json().then((data)=>{
                    console.log(data);
                    this.setState({
                        ...this.state,
                        hotels : data
                    });
                });
            }
        });
    });

    componentWillMount(){
        this.fetchHotels();
    }

    render() {
        return (
            <div className="container-fluid">
                <h1>Hotel</h1>
                <div>
                    {
                        this.showAddHotel()
                    }
                    <button className="btn btn-primary" onClick={(()=>{
                        this.setState({
                            ...this.state,
                            showAddHotel:true
                        })
                    })}>Add Hotel</button>
                </div>
                {/*<div>*/}
                <table>
                    <thead>
                    <tr>
                        <th>
                            Host Id
                        </th>
                        <th>
                            Hotel Id
                        </th>
                        <th>
                            Hotel Name
                        </th>
                    </tr>
                    </thead>

                    {
                        this.state.hotels.map((hotel, index)=>{
                            return(
                                <ShowHotels
                                    key = {index}
                                    hotel = {hotel}
                                    fetchHotels = {this.fetchHotels}
                                />
                            )
                        })
                    }
                </table>
                {/*</div>*/}
            </div>
        );
    }
}

export default HotelPage;