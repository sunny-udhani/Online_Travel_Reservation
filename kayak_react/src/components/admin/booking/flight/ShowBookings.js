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

        const {flight} = this.props;
        console.log(flight);
        return (
            <tr>
                <td>
                    {flight.bookingId}
                </td>
                <td>
                    {flight.hostName}
                </td>
                <td>
                    {flight.fromDate === undefined || flight.fromDate === null ? "" : flight.fromDate.substr(0, flight.fromDate.indexOf("T"))}
                </td>
                <td>
                    {flight.toDate === undefined || flight.toDate === null ? "" : flight.toDate.substr(0, flight.toDate.indexOf("T"))}
                </td>
                <td>
                    {flight.noOfPassengers}
                </td>
                <td>
                    {flight.username}
                </td>
                <td>
                    <span>
                       <Link
                           to={`/admin/flightbooking/${flight.bookingId}`}
                           className="btn btn-link"
                           key={flight.bookingId}
                       >
                        Edit
                        </Link>
                    </span>
                    <span>
                        <Link
                            to={`/admin/flightbooking/${flight.bookingId}`}
                            className="btn btn-link"
                            key={flight.bookingId}
                        >
                        View
                        </Link>
                    </span>
                </td>
            </tr>
        );
    }
}

export default ShowBookings;