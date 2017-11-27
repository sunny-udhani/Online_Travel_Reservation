import React, {Component} from 'react';
import "../../../flight.css";

class ShowRooms extends Component {

    render() {

        const {room} = this.props;
        console.log(room);
        return (
            <tbody>
            <tr>
                <td>
                    {room.roomType}
                </td>
                <td>
                    {room.roomCapacity}
                </td>
                <td>
                    {room.roomPrice}
                </td>
                <td>
                    {room.noOfRooms}
                </td>
                <td>
                <button className="btn btn-primary" onClick={(()=>{
                    this.props.changeShowAddRoomStatus(true, room.roomType, room._id);
                })}>
                    Change
                </button>
                </td>
            </tr>
            </tbody>
        );
    }
}

export default ShowRooms;