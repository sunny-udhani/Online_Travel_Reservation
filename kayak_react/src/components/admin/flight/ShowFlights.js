import React, {Component} from 'react';
import * as API from "../../../api/admin/API";
import {Link} from 'react-router-dom';

class ShowFlights extends Component {

    constructor(){
        super();
        this.state = {
            // showAddRoom : false
        }
    }

    render() {

        const {flight} = this.props;
        console.log(flight);
        return (
            <tr>
                <td>
                    {flight.flightOperator}
                </td>
                <td>
                    {flight.flightNo}
                </td>
                <td>
                    {flight.origin}
                </td>
                <td>
                    {flight.destination}
                </td>
                <td>
                    {flight.duration}
                </td>
                <td>
                    <span>
                        <Link
                            to={`/admin/flight/${flight._id}`}
                            className="btn btn-link"
                            key={flight._id}
                        >
                            Edit
                        </Link>
                    </span>
                    <span>
                        <Link
                            to={`/admin/flight/${flight._id}`}
                            className="btn btn-link"
                            key={flight._id}
                        >
                            View
                        </Link>
                    </span>
                </td>
            </tr>
        );
    }
}

export default ShowFlights;