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
                    {hotel.hotelName}
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