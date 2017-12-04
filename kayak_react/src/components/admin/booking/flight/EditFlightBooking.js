import React, {Component} from 'react';
import * as API from "../../../../api/admin/API";
import ShowPassengersInfo from "./ShowPassengersInfo";
import {
    Badge,
    Row,
    Col,
    Card,
    CardHeader,
    CardFooter,
    CardBody,
    Table,
    Pagination,
    PaginationItem,
    PaginationLink,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    FormText,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupButton
} from 'reactstrap';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

class EditFlightBooking extends Component {

    constructor(){
        super();
        this.state = {
            flightBookingInfo : {},
            modal : false,
            flightBookingId : "",
            passengerInfo : []
        };
    }

    toggle = (()=>{
        this.setState({
            ...this.state,
            modal : !this.state.modal
        })
    });

    changeShowAddRoomStatus = ((show, room)=>{
        // this.roomdata.roomType = room.roomType;
        // this.roomdata.roomId = room.roomid;
        if(show){
            this.roomdata = room;
            this.setState({
                room : room
            });
        }
        else {

        }
        this.toggle();

        // this.setState({
        //     modal : show
        // });

    });

    editFlight = ((data)=>{
        console.log(data);
        if(this.roomdata!==undefined){
            data.room = this.roomdata;
        }
        // delete data["_id"];
        // console.log(data);
        API.modifyHotelData(data).then((response) => {
            console.log(response.status);
            if(response.status===200){
                this.props.fetchHotels({_id:data._id});
                this.props.handlePageChange("/admin/hotel");
            }
            else if(response.status===300)
            {
                console.log("Nothing to Change");
            }
            else {
                console.log("Error");
            }
        });
    });

    flightBookingInfo = {};

    fetchFlightBooking = ((data)=>{
        console.log(data);
        API.fetchFlightBookings(data).then((response)=>{
            console.log(response.status);
            if(response.status===200) {
                response.json().then((data)=>{
                    console.log(data);
                    this.flightBookingInfo = data.flightInfo;
                    this.passengerInfo = data.passengerInfo;
                    this.setState({
                        flightBookingInfo : data.flightInfo,
                        passengerInfo : data.passengerInfo
                    });
                });
            }
            else if(response.status===204){
                this.setState(({
                    flightBookingData : {}
                }));
                console.log("Booking Data does not exist for given Booking Id");
            }
            else {
                console.log("Error While fetching data");
            }
        });
    });

    fetchFlightBookingToModify = ((flightBookingId)=>{
        let query = {
            bookingId : flightBookingId,
            fetchFullData : true
        };
        this.fetchFlightBooking(query);
    });

    componentWillMount(){
        let flightBookingId=this.props.match.params.bookingId;
        this.setState({
            ...this.state,
            flightBookingId : flightBookingId
        });
        this.fetchFlightBookingToModify(flightBookingId);
    }

    render() {
        return (
            <div className="container-fluid">
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                Edit Car
                            </CardHeader>

                            <CardBody>
                                <div>
                                    <Table>
                                        <tr>
                                            <th>
                                                <label className="h4">Booking Id:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1"
                                                       value={this.state.flightBookingInfo.bookingId}
                                                       disabled
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">Bill Date:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1"
                                                       value={this.state.flightBookingInfo.bill_month+"/"+this.state.flightBookingInfo.bill_day+"/"+this.state.flightBookingInfo.bill_year}
                                                       disabled
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">Airline Operator:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1"
                                                       value={this.state.flightBookingInfo.hostName}
                                                       disabled
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4"> Reservation Made By:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1" value={this.state.flightBookingInfo.username}
                                                       disabled
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4"> Flight No:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1" value={this.state.flightBookingInfo.flightNo}
                                                       disabled
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4"> Origin</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1" value={this.state.flightBookingInfo.origin}
                                                       disabled
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4"> Destination</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1" value={this.state.flightBookingInfo.destination}
                                                       disabled
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4"> Departure:</label>
                                            </th>
                                            <tr>
                                                <td>
                                                    <input type="text" className="form-control form-input1" value={this.state.flightBookingInfo.fromDate}
                                                           disabled
                                                    />
                                                </td>
                                                <td>
                                                    <input type="text" className="form-control form-input1" value={this.state.flightBookingInfo.departureTime}
                                                           disabled
                                                    />
                                                </td>
                                            </tr>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4"> Arrival:</label>
                                            </th>
                                            <tr>
                                                <td>
                                                    <input type="text" className="form-control form-input1" value={this.state.flightBookingInfo.toDate}
                                                           disabled
                                                    />
                                                </td>
                                                <td>
                                                    <input type="text" className="form-control form-input1" value={this.state.flightBookingInfo.arrivalTime}
                                                           disabled
                                                    />
                                                </td>
                                            </tr>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">Booked Class</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1" value={this.state.flightBookingInfo.flightClass}
                                                       disabled
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">Ticket Price</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1" value={this.state.flightBookingInfo.ticketPrice}
                                                       disabled
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">Ticket Amount</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1" value={this.state.flightBookingInfo.totalAmount}
                                                       disabled
                                                />
                                            </td>
                                        </tr>
                                        <table>
                                            {
                                                this.state.passengerInfo.map((passenger, index)=>{
                                                    return(
                                                        <ShowPassengersInfo
                                                            key = {index}
                                                            passenger = {passenger}
                                                        />
                                                    )
                                                })
                                            }
                                        </table>
                                    </Table>
                                </div>
                            </CardBody>
                            <CardFooter className="text-center">
                                {/*<Button type="button" className="btn-primary" value="Edit"
                                        onClick={(()=>{this.editCar(this.editHotelData)})}>Save</Button>*/}
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Button type="button" className="btn-primary"
                                        onClick={(()=>{this.props.handlePageChange("/admin/flightbooking")})}
                                >Back</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log(state);
    return {
        state: state
    }
}

export default withRouter(connect(mapStateToProps, null)(EditFlightBooking));
