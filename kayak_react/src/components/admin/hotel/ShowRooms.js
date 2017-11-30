import React, {Component} from 'react';

class ShowRooms extends Component {

    render() {

        const {room} = this.props;
        console.log(room);
        return (
            <tbody>
            <tr>
                <td>
                    Room Type :
                </td>
                <td>
                    {room.roomType}
                </td>
                <td rowSpan="4">
                    <button className="btn btn-primary" onClick={(()=>{
                        // this.props.changeShowAddRoomStatus(true, room.roomType, room._id);
                        this.props.changeShowAddRoomStatus(true, room);
                    })}>
                        Change
                    </button>
                </td>
            </tr>
            <tr>
                <td>
                    Room Capacity :
                </td>
                <td>
                    {room.roomCapacity}
                </td>
            </tr>
            <tr>
                <td>
                    Room Price :
                </td>
                <td>
                    {room.roomPrice}
                </td>
            </tr>
            <tr>
                <td>
                    Numer of Rooms :
                </td>
                <td>
                    {room.noOfRooms}
                </td>
            </tr>
            </tbody>
        );
    }
}

export default ShowRooms;