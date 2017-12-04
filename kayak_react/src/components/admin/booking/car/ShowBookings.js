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

        const {car} = this.props;
        console.log(car);
        return (
            <tbody>
            <tr>
                <td>
                    {car.bookingId}
                </td>
                <td>
                    {car.hostName}
                </td>
                <td>
                    {car.username}
                </td>
                <td>
                    <span>
                       <Link
                           to={`/admin/carbooking/${car.bookingId}`}
                           className="btn btn-link"
                           key={car.bookingId}
                       >
                        Edit
                        </Link>
                    </span>
                    <span>
                        <Link
                            to={`/admin/carbooking/${car.bookingId}`}
                            className="btn btn-link"
                            key={car.bookingId}
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