import React, {Component} from 'react';
import * as API from "../../../../api/admin/API";
import {Link} from 'react-router-dom';


class ShowBookings extends Component {

    constructor(){
        super();
        this.state = {
            modal : false
        }
    }

    render() {

        const {hotel} = this.props;
        console.log(hotel);
        return (
            <tbody>
            <tr>
                <td>
                    {hotel.bookingId}
                </td>
                <td>
                    {hotel.hostName}
                </td>
                <td>
                    {hotel.username}
                </td>
                <td>
                    <span>
                       <Link
                           to={`/admin/hotelbooking/${hotel.bookingId}`}
                           className="btn btn-link"
                           key={hotel.bookingId}
                       >
                        Edit
                        </Link>
                    </span>
                    <span>
                        <Link
                            to={`/admin/hotelbooking/${hotel.bookingId}`}
                            className="btn btn-link"
                            key={hotel.bookingId}
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

export default ShowBookings;