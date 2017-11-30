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
                    {flight.hostId}
                </td>
                <td>
                    {flight._id}
                </td>
                <td>
                    {flight.flightNo}
                </td>
                <td>
                    {flight.flightOperator}
                </td>
                <td>
                    <Link
                        to={`/admin/flight/${flight._id}`}
                        className="btn btn-link"
                        key={flight._id}
                    >
                        Edit
                    </Link>
                </td>
            </tr>
        );
    }
}

export default ShowFlights;