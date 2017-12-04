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

class EditCarBooking extends Component {

    constructor(){
        super();
        this.state = {
            carBookingData : {},
            modal : false,
            changeRoom : false,
            carBookingId : ""
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

    editCarBookingData = {};

    fetchCarBooking = ((data)=>{
        API.fetchCarBookings(data).then((response)=>{
            console.log(response.status);
            if(response.status===200) {
                response.json().then((data)=>{
                    console.log(data[0]);
                    this.editCarBookingData = data[0];
                    this.setState(({
                        carBookingData : data[0]
                    }));
                });
            }
            else if(response.status===204){
                this.setState(({
                    carBookingData : {}
                }));
                console.log("Booking Data does not exist for given Booking Id");
            }
            else {
                console.log("Error While fetching data");
            }
        });
    });

    fetchCarBookingToModify = ((carBookingId)=>{
        let query = {
            bookingId : carBookingId,
            fetchFullData : true
        };
        this.fetchCarBooking(query);
    });

    componentWillMount(){
        let carBookingId=this.props.match.params.bookingId;
        this.setState({
            ...this.state,
            carBookingId : carBookingId
        });
        this.fetchCarBookingToModify(carBookingId);
    }

    render() {
        // console.log(this.props.editHotelData1);*/
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
                                                       value={this.editCarBookingData.bookingId}
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
                                                       value={this.editCarBookingData.bill_month+"/"+this.editCarBookingData.bill_day+"/"+this.editCarBookingData.bill_year}
                                                       disabled
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4"> Car Company Name:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1"
                                                       value={this.editCarBookingData.hostName}
                                                       disabled
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4"> Reservation Made By:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1" value={this.editCarBookingData.username}
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
                                                       value={this.editCarBookingData.firstname}
                                                       onChange={((event)=>{
                                                           this.setState({
                                                               ...this.state
                                                           });
                                                           this.editCarBookingData.firstName = event.target.value;
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
                                                       value={this.editCarBookingData.lastname}
                                                       onChange={((event)=>{
                                                           this.setState({
                                                               ...this.state
                                                           });
                                                           this.editCarBookingData.firstName = event.target.value;
                                                       })}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">No of Days:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1"
                                                       value={this.editCarBookingData.noOfDays}
                                                       onChange={((event)=>{
                                                           this.setState({
                                                               ...this.state
                                                           });
                                                           this.editCarBookingData.noOfDays = event.target.value;
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
                                                       value={this.editCarBookingData.phonenumber}
                                                       onChange={((event)=>{
                                                           this.setState({
                                                               ...this.state
                                                           });
                                                           this.editCarBookingData.phonenumber = event.target.value;
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
                                                       value={this.editCarBookingData.fromDate === undefined ? "" : this.editCarBookingData.fromDate.substr(0,this.editCarBookingData.fromDate.indexOf("T"))}
                                                       onChange={((event)=>{
                                                           this.setState({
                                                               ...this.state
                                                           });
                                                           this.editCarBookingData.fromDate = event.target.value;
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
                                                       value={this.editCarBookingData.toDate === undefined ? "" : this.editCarBookingData.toDate.substr(0,this.editCarBookingData.toDate.indexOf("T"))}
                                                       onChange={((event)=>{
                                                           this.setState({
                                                               ...this.state
                                                           });
                                                           this.editCarBookingData.toDate = event.target.value;
                                                       })}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">Price:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1"
                                                       value={this.editCarBookingData.ticketPrice}
                                                       onChange={((event)=>{
                                                           this.setState({
                                                               ...this.state
                                                           });
                                                           this.editCarBookingData.ticketPrice = event.target.value;
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
                                                       value={this.editCarBookingData.totalAmount}
                                                       onChange={((event)=>{
                                                           this.setState({
                                                               ...this.state
                                                           });
                                                           this.editCarBookingData.totalAmount = event.target.value;
                                                       })}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">Car Make:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1"
                                                       value={this.editCarBookingData.carMake}
                                                       onChange={((event)=>{
                                                           this.setState({
                                                               ...this.state
                                                           });
                                                           this.editCarBookingData.carMake = event.target.value;
                                                       })}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">Car Name:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1"
                                                       value={this.editCarBookingData.carName}
                                                       onChange={((event)=>{
                                                           this.setState({
                                                               ...this.state
                                                           });
                                                           this.editCarBookingData.carName = event.target.value;
                                                       })}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">Car Model:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1"
                                                       value={this.editCarBookingData.carModel}
                                                       onChange={((event)=>{
                                                           this.setState({
                                                               ...this.state
                                                           });
                                                           this.editCarBookingData.carModel = event.target.value;
                                                       })}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">Car Type:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1"
                                                       value={this.editCarBookingData.carType}
                                                       onChange={((event)=>{
                                                           this.setState({
                                                               ...this.state
                                                           });
                                                           this.editCarBookingData.carType = event.target.value;
                                                       })}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">Max People Capacity:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1"
                                                       value={this.editCarBookingData.capacity}
                                                       onChange={((event)=>{
                                                           this.setState({
                                                               ...this.state
                                                           });
                                                           this.editCarBookingData.capacity = event.target.value;
                                                       })}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">City:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1"
                                                       value={this.editCarBookingData.city}
                                                       onChange={((event)=>{
                                                           this.setState({
                                                               ...this.state
                                                           });
                                                           this.editCarBookingData.city = event.target.value;
                                                       })}
                                                />
                                            </td>
                                        </tr>
                                    </Table>
                                </div>
                            </CardBody>
                            <CardFooter className="text-center">
                                {/*<Button type="button" className="btn-primary" value="Edit"
                                        onClick={(()=>{this.editCar(this.editHotelData)})}>Save</Button>*/}
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Button type="button" className="btn-primary"
                                        onClick={(()=>{this.props.handlePageChange("/admin/carbooking")})}
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

export default withRouter(connect(mapStateToProps, null)(EditCarBooking));
