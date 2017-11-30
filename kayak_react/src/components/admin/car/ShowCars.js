import React, {Component} from 'react';
import {Link} from 'react-router-dom';


class ShowCars extends Component {

    render() {

        const {car} = this.props;
        console.log(car);
        return (
            <tbody>
            <tr>
                <td>
                    {car.hostId}
                </td>
                <td>
                    {car.carName}&nbsp;&nbsp; {car.carModel}
                </td>
                <td>
                    {car.carType}
                </td>
                <td>
                    {car.carMake}
                </td>
                <td>
                    {car.city}
                </td>
                <td>
                    {car.zipCode}
                </td>
                <td>
                    <Link
                        to={`/admin/car/${car._id}`}
                        className="btn btn-link"
                        key={car._id}
                    >
                        Edit
                    </Link>
                </td>
            </tr>
            </tbody>
        );
    }
}

export default ShowCars;