import React, {Component} from 'react';
import * as API from "../../../api/admin/API";
import ShowRooms from "./ShowRooms";
import AlertContainer from 'react-alert';
import {alertOptions, showAlert} from "../../../alertConfig";
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

class EditHotel extends Component {

    constructor(){
        super();
        this.state = {
            edit : {},
            rooms : [],
            hotel : {},
            modal : false,
            changeRoom : false,
            hotelId : ""
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

    validate = {
        errors: "default"
    };

    editHotel = ((data)=>{
        console.log(data);
        if(this.roomdata!==undefined){
            data.room = this.roomdata;
        }
        // delete data["_id"];
        // console.log(data);

        console.log(data.zipCode);

        //---------------------------- Zip Code Validation -----------------------------------

        let zipCodePattern = /^\d{5}$|^\d{5}-\d{4}$/;

        let zipCode = parseInt(data.zipCode);

        console.log(" Validating zip code ..... "+zipCodePattern.test(zipCode));

        if(zipCodePattern.test(zipCode)){
            console.log("Successful - entry");
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
        }
        else {
            showAlert("Zipcode invalid", "error", this);
            // this.validate.errors = "zipCode,";
            // document.getElementById("errors").innerHTML = "<p style=\"color:#FF0000\"> ***** Wrong input - "+this.validate.errors+" ***** </p>"
        }

    });

    editHotelData = {};


    fetchHotelToModify = ((hotelId)=>{
        let hotel = {"_id" : hotelId};
        API.fetchHotels(hotel).then((response)=>{
            console.log(response.status);
            if(response.status===200) {
                response.json().then((data)=>{
                    console.log(data[0]);
                    this.editHotelData = data[0];
                    this.setState(({
                        // ...this.state,
                        edit : data[0],
                        rooms : data[0].rooms
                    }));
                    console.log(data[0].rooms[0].roomType);
                    console.log(this.editHotelData);
                });
            }
            else {
                console.log("Error While fetching data");
            }
        });
    });

    componentWillMount(){
        let hotelId=this.props.match.params.hotelId;
        this.setState({
            ...this.state,
            hotelId : hotelId
        });
        this.fetchHotelToModify(hotelId);
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
                                <div align="center">
                                    <Table>
                                        <tr>
                                            <th>
                                                <label className="h4">Host:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1" value={this.state.edit.hostId}
                                                       onChange={((event)=>{
                                                           this.setState({
                                                               hostId : event.target.value
                                                           });
                                                           this.editHotelData.hostId = event.target.value;
                                                       })}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">Hotel Name:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1" value={this.state.edit.hotelName}
                                                       onChange={((event)=>{
                                                           this.setState({
                                                               hotelName : event.target.value
                                                           });
                                                           this.editHotelData.hotelName = event.target.value;
                                                       })}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">Hotel Address:</label>
                                            </th>
                                            <td>
                                                <textarea type="text" className="form-control form-input1" value={this.state.edit.hotelAddress}
                                                          onChange={((event)=>{
                                                              this.setState({
                                                                  hotelAddress : event.target.value
                                                              });
                                                              this.editHotelData.hotelAddress = event.target.value;
                                                          })}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">Hotel City:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1" value={this.state.edit.city}
                                                       onChange={((event)=>{
                                                           this.setState({
                                                               city : event.target.value
                                                           });
                                                           this.editHotelData.city = event.target.value;
                                                       })}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">Zip Code:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1" value={this.state.edit.zipCode}
                                                       onChange={((event)=>{
                                                           this.setState({
                                                               zipCode : event.target.value
                                                           });
                                                           this.editHotelData.zipCode = event.target.value;
                                                       })}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">Stars:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1" value={this.state.edit.stars}
                                                       onChange={((event)=>{
                                                           this.setState({
                                                               stars : event.target.value
                                                           });
                                                           this.editHotelData.stars = event.target.value;
                                                       })}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">Room:</label>
                                            </th>
                                            <td>
                                                <Table>
                                                    {
                                                        this.state.rooms.map((room, index)=> {
                                                            return (
                                                                <ShowRooms
                                                                    key={index}
                                                                    room={room}
                                                                    changeShowAddRoomStatus = {this.changeShowAddRoomStatus}
                                                                />
                                                            )
                                                        })
                                                    }
                                                </Table>
                                            </td>
                                        </tr>
                                    </Table>
                                    <AlertContainer ref={a => this.msg = a} {...alertOptions}/>
                                    {this.showAddRoom()}
                                </div>
                                    <div id="errors">

                                    </div>
                            </CardBody>
                            <CardFooter className="text-center">
                                <Button type="button" className="btn-primary" value="Edit"
                                        onClick={(()=>{this.editHotel(this.editHotelData)})}>EDIT</Button>
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

export default EditHotel;
