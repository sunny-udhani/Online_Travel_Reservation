import React, {Component} from 'react';
import "../../../flight.css";
import * as API from "../../../api/admin/API";
import ShowRooms from "./ShowRooms"

class ShowHotels extends Component {

    constructor(){
        super();
        this.state = {
            showAddRoom : false
        }
    }

    roomdata = {
        roomId : "",
        roomType : "",
        roomCapacity : 0,
        roomPrice : 0,
        noOfRooms : 0
    };

    changeShowAddRoomStatus = ((show, roomType, roomid)=>{
       this.setState({
          showAddRoom : show
       });
       this.roomdata.roomType = roomType;
       this.roomdata.roomId = roomid;
    });

    addRoom = ((roomdata, hotelid) => {
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
                showAddRoom : false
            })
        });
    });

    showAddRoom = ((hotelid)=>{
        if(this.state.showAddRoom){
            return(
                <div className="signinform">
                    <div className="form-modal">
                        <div className="panel panel-heading">
                            <form>
                                <div className="form-group">
                                    <div>
                                        {/*roomType :
                                        <select onChange={((event)=>{
                                            this.roomdata.roomType = event.target.value
                                        })}>
                                            <option value="single">Single</option>
                                            <option value="double">Double</option>
                                            <option value="queen">Queen</option>
                                            <option value="king">King</option>
                                        </select>*/}
                                        <input type="number" className="form-input" placeholder="Capacity of the room"
                                               onChange={(event)=>{
                                                   this.roomdata.roomCapacity = event.target.value;
                                               }}
                                        />
                                        <input type="number" className="form-input" placeholder="Price of the Room"
                                               onChange={(event)=>{
                                                   this.roomdata.roomPrice = event.target.value;
                                               }}
                                        />
                                        <input type="number" className="form-input" placeholder="Number of Rooms"
                                               onChange={(event)=>{
                                                   this.roomdata.noOfRooms = event.target.value;
                                               }}
                                        />
                                    </div>
                                    <input type="button" value="Add Room" className="btn btn-primary"
                                           onClick={(()=>{this.addRoom(this.roomdata, hotelid)})}
                                    />
                                    <input type="button" value="Cancel"
                                           className="btn btn-primary"
                                           onClick={(()=>{this.setState({
                                               ...this.state,
                                               showAddRoom : false
                                           })})}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )
        }
    });

    render() {

        const {hotel} = this.props;
        console.log(hotel);
        return (
            <tbody>
            <tr>
                <td>
                    {hotel.hostId}
                </td>
                <td>
                    {hotel._id}
                </td>
                <td>
                    {hotel.hotelName}
                </td>
                <td>
                    {hotel.totalRooms}
                </td>
                <td>
                    <table>
                        <thead>
                        <tr>
                            <th>
                                Room Type
                            </th>
                            <th>
                                Room Capacity
                            </th>
                            <th>
                                Room Price
                            </th>
                            <th>
                                No of Rooms
                            </th>
                        </tr>
                        </thead>
                        {/*<tbody>*/}
                        {/*<tr>*/}
                            {hotel.rooms.map((room, index)=> {
                                return (
                                    <ShowRooms
                                        key={index}
                                        room={room}
                                        changeShowAddRoomStatus = {this.changeShowAddRoomStatus}
                                    />
                                )
                            })}
                        {/*</tr>*/}
                        {/*</tbody>*/}
                    </table>
                </td>
                {/*<td>*/}
                    {/*<button className="btn btn-primary" onClick={(()=>{*/}
                        {/*this.setState({*/}
                            {/*showAddRoom : true*/}
                        {/*});*/}
                    {/*})}>*/}
                        {/*Change*/}
                    {/*</button>*/}
                {/*</td>*/}
                <td>
                    Edit Options to be added
                </td>
            </tr>
            {this.showAddRoom(hotel._id)}
            </tbody>
        );
    }
}

export default ShowHotels;