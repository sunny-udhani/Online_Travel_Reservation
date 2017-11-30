import React, {Component} from 'react';
import * as API from "../../../api/admin/API";


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
                {/*<td>*/}
                    {/*<button className="btn btn-primary" onClick={(()=>{*/}
                        {/*this.setState({*/}
                            {/*showAddRoom : true*/}
                        {/*});*/}
                    {/*})}>*/}
                        {/*Change*/}
                    {/*</button>*/}
                {/*</td>*/}
                <td>
                    Edit Options to be added
                </td>
            </tr>
        );
    }
}

export default ShowFlights;