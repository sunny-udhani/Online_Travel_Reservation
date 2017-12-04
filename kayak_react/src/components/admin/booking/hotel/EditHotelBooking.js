import React, {Component} from 'react';
import * as API from "../../../../api/admin/API";
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

class EditHotelBooking extends Component {

    constructor(){
        super();
        this.state = {
            edit : {},
            rooms : [],
            hotelBookingData : {},
            modal : false,
            changeRoom : false,
            hotelBookingId : ""
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

    editHotel = ((data)=>{
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

    editHotelBookingData = {};

    fetchHotelBooking = ((data)=>{
        API.fetchHotelBookings(data).then((response)=>{
            console.log(response.status);
            if(response.status===200) {
                response.json().then((data)=>{
                    console.log(data[0]);
                    this.editHotelBookingData = data[0];
                    this.setState(({
                        hotelBookingData : data[0]
                    }));
                });
            }
            else if(response.status===204){
                this.setState(({
                    hotelBookingData : {}
                }));
                console.log("Booking Data does not exist for given Booking Id");
            }
            else {
                console.log("Error While fetching data");
            }
        });
    });

    fetchHotelBookingToModify = ((hotelBookingId)=>{
        let query = {
            bookingId : hotelBookingId,
            fetchFullData : true
        };
        this.fetchHotelBooking(query);
    });

    componentWillMount(){
        let hotelBookingId=this.props.match.params.bookingId;
        this.setState({
            ...this.state,
            hotelBookingId : hotelBookingId
        });
        this.fetchHotelBookingToModify(hotelBookingId);
    }

    addRoom = ((roomdata, hotelId) => {
        console.log(hotelId);
        let hotel = roomdata;
        // this.roomdata = roomdata;
        // this.roomdata.hotelId = hotelId;
        hotel.hotelId = hotelId;
        console.log(this.roomdata);
        API.addRoomInHotel(hotel).then((response)=>{
            console.log(response.status);
            if(response.status===200){
                this.props.fetchHotels();
            }
            else if(response.status===300){
                console.log("Nothing to Change");
            }
            else if(response.status===400){
                console.log("Error");
            }
            this.setState({
                ...this.state,
                modal : false
            })
        });
        this.toggle();
    });

    showAddRoom = ((hotel)=>{
        console.log(this.state.modal);
        if(this.state.modal){
            return(
                <Modal isOpen={this.state.modal} toggle={this.modal} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Add Hotel</ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col xs="12">
                                <FormGroup>
                                    Capacity of the Room :
                                    <select value={this.state.room.roomCapacity} onChange={((event)=>{
                                        this.setState({
                                            ...this.state
                                        });
                                        this.roomdata.roomCapacity = event.target.value;
                                    })}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                </FormGroup>
                            </Col>
                            <Col xs="12">
                                <FormGroup>
                                    <input type="number" placeholder="Price of the Room" value={this.state.room.roomPrice}
                                           onChange={(event)=>{
                                               this.setState({
                                                   ...this.state
                                               });
                                               this.roomdata.roomPrice = event.target.value;
                                           }}
                                    />
                                </FormGroup>
                            </Col>
                            <Col xs="12">
                                <FormGroup>
                                    <input type="number" placeholder="Number of Rooms" value={this.state.room.noOfRooms}
                                           onChange={(event)=>{
                                               this.setState({
                                                   ...this.state
                                               });
                                               this.roomdata.noOfRooms = event.target.value;
                                           }}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <input type="button" value="Add Room" className="btn btn-primary"
                               onClick={(()=>{this.addRoom(this.roomdata, this.props.match.params.hotelId)})}
                        />
                        <input type="button" value="Cancel"
                               className="btn btn-primary"
                               onClick={(()=>{
                                   this.setState({
                                       ...this.state,
                                       modal : false
                                   });
                                   this.fetchHotelToModify(this.state.hotelId);
                               })}
                        />
                    </ModalFooter>
                </Modal>
            )
        }
    });

    render() {
        // console.log(this.props.editHotelData1);*/
        return (
            <div className="container-fluid">
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                Edit Hotel
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
                                                       value={this.editHotelBookingData.bookingId}
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
                                                       value={this.editHotelBookingData.bill_month+"/"+this.editHotelBookingData.bill_day+"/"+this.editHotelBookingData.bill_year}
                                                       disabled
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4"> Hotel Host:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1" value={this.editHotelBookingData.hostName}
                                                       disabled
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4"> Hotel Name:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1" value={this.editHotelBookingData.hotelName}
                                                       disabled
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4"> Hotel Address:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1" value={this.editHotelBookingData.hotelAddress}
                                                       disabled
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4"> City:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1" value={this.editHotelBookingData.city}
                                                       disabled
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4"> State:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1" value={this.editHotelBookingData.state}
                                                       disabled
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4"> Zip Code:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1" value={this.editHotelBookingData.zipCode}
                                                       disabled
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4"> Stars:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1" value={this.editHotelBookingData.stars}
                                                       disabled
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4"> Reservation Made By:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1" value={this.editHotelBookingData.username}
                                                       disabled
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">First Name:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1"
                                                       value={this.editHotelBookingData.firstname}
                                                       onChange={((event)=>{
                                                           this.setState({
                                                               ...this.state
                                                           });
                                                           this.editHotelBookingData.firstName = event.target.value;
                                                       })}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">Last Name:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1"
                                                       value={this.editHotelBookingData.lastname}
                                                       onChange={((event)=>{
                                                           this.setState({
                                                               ...this.state
                                                           });
                                                           this.editHotelBookingData.firstName = event.target.value;
                                                       })}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">No of People:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1"
                                                       value={this.editHotelBookingData.noOfPeople}
                                                       onChange={((event)=>{
                                                           this.setState({
                                                               ...this.state
                                                           });
                                                           this.editHotelBookingData.noOfPeople = event.target.value;
                                                       })}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">Contact Number:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1"
                                                       value={this.editHotelBookingData.phonenumber}
                                                       onChange={((event)=>{
                                                           this.setState({
                                                               ...this.state
                                                           });
                                                           this.editHotelBookingData.phonenumber = event.target.value;
                                                       })}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">Room Type:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1"
                                                       value={this.editHotelBookingData.roomType}
                                                       onChange={((event)=>{
                                                           this.setState({
                                                               ...this.state
                                                           });
                                                           this.editHotelBookingData.roomType = event.target.value;
                                                       })}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">Reservation From:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1"
                                                       value={this.editHotelBookingData.fromDate === undefined ? "" : this.editHotelBookingData.fromDate.substr(0,this.editHotelBookingData.fromDate.indexOf("T"))}
                                                       onChange={((event)=>{
                                                           this.setState({
                                                               ...this.state
                                                           });
                                                           this.editHotelBookingData.fromDate = event.target.value;
                                                       })}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">Reservation To:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1"
                                                       value={this.editHotelBookingData.toDate === undefined ? "" : this.editHotelBookingData.toDate.substr(0,this.editHotelBookingData.toDate.indexOf("T"))}
                                                       onChange={((event)=>{
                                                           this.setState({
                                                               ...this.state
                                                           });
                                                           this.editHotelBookingData.toDate = event.target.value;
                                                       })}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">Ticket Price:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1"
                                                       value={this.editHotelBookingData.ticketPrice}
                                                       onChange={((event)=>{
                                                           this.setState({
                                                               ...this.state
                                                           });
                                                           this.editHotelBookingData.ticketPrice = event.target.value;
                                                       })}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">Total Amount:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1"
                                                       value={this.editHotelBookingData.totalAmount}
                                                       onChange={((event)=>{
                                                           this.setState({
                                                               ...this.state
                                                           });
                                                           this.editHotelBookingData.totalAmount = event.target.value;
                                                       })}
                                                />
                                            </td>
                                        </tr>
                                    </Table>
                                </div>
                            </CardBody>
                            <CardFooter className="text-center">
                                <Button type="button" className="btn-primary" value="Edit"
                                        onClick={(()=>{this.editHotel(this.editHotelData)})}>Save</Button>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Button type="button" className="btn-primary"
                                        onClick={(()=>{this.props.handlePageChange("/admin/hotel")})}
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

export default withRouter(connect(mapStateToProps, null)(EditHotelBooking));
