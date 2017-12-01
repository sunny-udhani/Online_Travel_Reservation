import React, {Component} from 'react';
import {Link} from 'react-router-dom';


class ShowHosts extends Component {

    render() {
        const {host} = this.props;
        console.log(host);
        return (
            <tbody>
            <tr>
                <td>
                    {host.hostId}
                </td>
                <td>
                    {host.hostName}
                </td>
                <td>
                    {host.serviceType}
                </td>
                <td>
                    <span>
                        <Link
                            to={`/admin/host/${host.hostId}`}
                            className="btn btn-link"
                            key={host.hostId}
                        >
                        Edit
                    </Link>
                    </span>
                    <span>
                        <Link
                            to={`/admin/host/${host.hostId}`}
                            className="btn btn-link"
                            key={host.hostId}
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

export default ShowHosts;