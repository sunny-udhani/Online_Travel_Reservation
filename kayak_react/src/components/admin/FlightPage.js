import React, {Component} from 'react';
import "../../flight.css";
import * as API from "../../api/admin/API";

class FlightPage extends Component {

    constructor(){
        super();
        this.state = {
            showAddFlight : false
        };
    }


    handleSubmit = () => {
    };

    addflightData = {
        flightOperator : "",
        flightNo : "",
        hostId : "",
        // tripType : "",
        departureDate : "",
        arrivalDate : "",
        departureTime : "",
        arrivalTime : "",
        duration : "",
        origin : "",
        destination : "",
        classes: [
            {
                classType: "business",
                price: 0,
                noOfSeats: 0
            },
            {
                classType: "firstclass",
                price: 0,
                noOfSeats: 0
            },
            {
                classType: "economy",
                price: 0,
                noOfSeats: 0
            },
        ]
    };

    addflight = ((flightdata)=>{
        console.log(flightdata);
        API.addflightData(flightdata).then((response)=>{
            console.log(response.status);
            if(response.status===200){
                response.json().then((data)=>{
                    console.log(data);
                });
            }
        });
    });

    showAddFlight = (()=>{
        console.log(this.state.showAddFlight);
        if(this.state.showAddFlight){
            return(
                <div className="signinform">
                    <div className="form-modal">
                        <div className="panel panel-heading">
                            <form>
                                <div className="form-group">
                                    <label className="signin-label">Add Flight</label>
                                    <input type="text" className="form-input" placeholder="Flight Operator"
                                           onChange={(event)=>{
                                               this.addflightData.flightOperator = event.target.value;
                                           }}
                                    />
                                    <input type="text" className="form-input" placeholder="Flight Number"
                                           onChange={(event)=>{
                                               this.addflightData.flightNo = event.target.value;
                                           }}
                                    />
                                    <input type="text" className="form-input" placeholder="Host Id"
                                           onChange={(event)=>{
                                               this.addflightData.hostId = event.target.value;
                                           }}
                                    />
                                    <input type="text" className="form-input" placeholder="Flight Duration"
                                           onChange={(event)=>{
                                               this.addflightData.duration = event.target.value;
                                           }}
                                    />
                                    <input type="date" className="form-input" placeholder="Departure Date"
                                           onChange={(event)=>{
                                               this.addflightData.departureDate = event.target.value;
                                           }}
                                    />
                                    <input type="date" className="form-input" placeholder="Arrival Date"
                                           onChange={(event)=>{
                                               this.addflightData.arrivalDate = event.target.value;
                                           }}
                                    />
                                    <input type="time" className="form-input" placeholder="Flight Departure Time"
                                           onChange={(event)=>{
                                               this.addflightData.departureTime = event.target.value;
                                           }}
                                    />
                                    <input type="time" className="form-input" placeholder="Flight Arrival Time"
                                           onChange={(event)=>{
                                               this.addflightData.arrivalTime = event.target.value;
                                           }}
                                    />

                                    <input type="text" className="form-input" placeholder="Origin"
                                           onChange={(event)=>{
                                               this.addflightData.origin = event.target.value;
                                           }}
                                    />
                                    <input type="text" className="form-input" placeholder="Destination"
                                           onChange={(event)=>{
                                               this.addflightData.destination = event.target.value;
                                           }}
                                    />
                                    Business Class:
                                    <div>
                                        <input type="text" className="form-input" placeholder="Capacity"
                                               onChange={(event)=>{
                                                   this.addflightData.classes[0].noOfSeats=event.target.value;
                                               }}
                                        />
                                        <input type="text" className="form-input" placeholder="Fare"
                                               onChange={(event)=>{
                                                   this.addflightData.classes[0].price=event.target.value;
                                               }}
                                        />
                                    </div>
                                    {/*<br/>*/}
                                    FirstClass:
                                    <div>
                                        <input type="text" className="form-input" placeholder="Capacity"
                                               onChange={(event)=>{
                                                   this.addflightData.classes[1].noOfSeats=event.target.value;
                                               }}
                                        />
                                        <input type="text" className="form-input" placeholder="Fare"
                                               onChange={(event)=>{
                                                   this.addflightData.classes[1].price=event.target.value;
                                               }}
                                        />
                                    </div>
                                    {/*<br/>*/}
                                    Economy:
                                    <div >
                                        <input type="text" className="form-input" placeholder="Capacity"
                                               onChange={(event)=>{
                                                   this.addflightData.classes[2].noOfSeats=event.target.value;
                                               }}
                                        />
                                        <input type="text" className="form-input" placeholder="Fare"
                                               onChange={(event)=>{
                                                   this.addflightData.classes[2].price=event.target.value;
                                               }}
                                        />
                                    </div>
                                    {/*<br/>*/}
                                    {/*<input type="password" className="form-input" placeholder="Password"/>*/}
                                    <input type="button" value="Add Flight" className="btn btn-primary"
                                           onClick={(()=>{this.addflight(this.addflightData)})}
                                    />

                                    <input type="button" value="Cancel"
                                           className="btn btn-primary"
                                           onClick={(()=>{this.setState({
                                               ...this.state,
                                               showAddFlight : false
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

    render() {
        window.onclick = (() => {
            // console.log(this.state.showAddFlight);
            // if(this.state.showAddFlight){
            //     this.setState({
            //         showAddFlight:false
            //     })
            // }
        });

        return (
            <div className="container-fluid">
                <h1>Flight</h1>
                <div>
                    {
                        this.showAddFlight()
                    }
                    <button className="btn btn-primary" onClick={(()=>{
                        this.setState({
                            ...this.state,
                            showAddFlight:true
                        })
                    })}>Add Flight</button>
                </div>
            </div>
        );
    }
}

export default FlightPage;