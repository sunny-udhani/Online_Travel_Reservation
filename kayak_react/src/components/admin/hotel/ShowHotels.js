import React, {Component} from 'react';
import * as API from "../../../api/admin/API";
import {Link} from 'react-router-dom';


class ShowHotels extends Component {

    constructor(){
        super();
        this.state = {
            modal : false
        }
    }

    /*roomdata = {
        roomId : "",
        roomType : "",
        roomCapacity : 0,
        roomPrice : 0,
        noOfRooms : 0
    };

    toggle = (()=>{
        this.setState({
            ...this.state,
            modal : !this.state.modal
        });
    });*/

    /*changeShowAddRoomStatus = ((show, room)=>{
        // this.roomdata.roomType = room.roomType;
        // this.roomdata.roomId = room.roomid;
        this.roomdata = room;
        this.setState({
            room : room
        });
        this.toggle();
    });*/

    /*addRoom = ((roomdata, hotelid) => {
        console.log(hotelid);
        let hotel = roomdata;
        hotel.hotelId = hotelid;
        console.log(hotel);
        API.addRoomInHotel(hotel).then((response)=>{
            console.log(response.status);
            if(response.status===200){
                this.props.fetchHotels();
            }
            else if(response.status===400){

            }
            this.setState({
                ...this.state,
                modal : false
            })
        });
    });*/

    /*showAddRoom = ((hotel)=>{
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
                                               this.roomdata.noOfRooms = event.target.value;
                                           }}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <input type="button" value="Add Room" className="btn btn-primary"
                               onClick={(()=>{this.addRoom(this.roomdata, hotel._id)})}
                        />
                        <input type="button" value="Cancel"
                               className="btn btn-primary"
                               onClick={(()=>{this.setState({
                                   ...this.state,
                                   modal : false
                               })})}
                        />
                    </ModalFooter>
                </Modal>
            )
        }
    });*/

    render() {

        const {hotel} = this.props;
        console.log(hotel);
        return (
            <tbody>
            <tr>
                {/*<td>
                    {hotel.hostId}
                </td>*/}
                <td>
                    {hotel.hotelName}
                </td>
                <td>
                    {hotel.hotelAddress}
                </td>
                <td>
                    {hotel.city}
                </td>
                <td>
                    {hotel.state}
                </td>
                <td>
                    <span>
                       <Link
                           to={`/admin/hotel/${hotel._id}`}
                           className="btn btn-link"
                           key={hotel._id}
                       >
                        Edit
                        </Link>
                    </span>
                    <span>
                        <Link
                            to={`/admin/hotel/${hotel._id}`}
                            className="btn btn-link"
                            key={hotel._id}
                        >
                        View
                        </Link>
                    </span>
                </td>
            </tr>
            </tbody>
        );
    }
}

export default ShowHotels;