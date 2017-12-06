import React, {Component} from 'react';
import {Link} from 'react-router-dom';


class ShowUsers extends Component {

    render() {
        const {user} = this.props;
        console.log(user);
        return (
            <tbody>
            <tr>
                <td>
                    {user.username}
                </td>
                <td>
                    {user.firstName}
                </td>
                <td>
                    {user.lastName}
                </td>
                <td>
                    {(user.dateofbirth === null || user.dateofbirth === undefined ? ""
                        :
                        user.dateofbirth.substr(0, user.dateofbirth.indexOf("T")))}
                </td>
                <td>
                    <span>
                       <Link
                           to={`/admin/user/${user.username}`}
                           className="btn btn-link"
                           key={user.username}
                       >
                        Edit
                        </Link>
                    </span>
                    <span>
                        <Link
                            to={`/admin/user/${user.username}`}
                            className="btn btn-link"
                            key={user.username}
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

export default ShowUsers;