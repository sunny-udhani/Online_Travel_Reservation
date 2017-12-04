import React, {Component} from 'react';

class ShowPassengersInfo extends Component {

    render() {

        const {passenger} = this.props;
        console.log(passenger);
        return (
            <tbody>
            <tr>
                <td>
                    Room Type :
                </td>
                <td>
                    {passenger.firstname}
                </td>
            </tr>
            <tr>
                <td>
                    Room Capacity :
                </td>
                <td>
                    {passenger.lastname}
                </td>
            </tr>
            <tr>
                <td>
                    Room Price :
                </td>
                <td>
                    {passenger.email}
                </td>
            </tr>
            <tr>
                <td>
                    Numer of Rooms :
                </td>
                <td>
                    {passenger.phonenumber}
                </td>
            </tr>
            </tbody>
        );
    }
}

export default ShowPassengersInfo;