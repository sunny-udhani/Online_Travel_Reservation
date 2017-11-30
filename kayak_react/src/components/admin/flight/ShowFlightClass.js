import React, {Component} from 'react';

class ShowRooms extends Component {

    render() {

        const {item} = this.props;
        console.log(item);
        return (
            <tbody>
            <tr>
                <td>
                    Flight Class :
                </td>
                <td>
                    {item.classType}
                </td>
                <td rowSpan="4" className="text-center">
                    <button className="btn btn-primary" onClick={(()=>{
                        // this.props.changeShowModifyClassStatus(true, item._id, item.classType, item.noOfSeats, item.price);
                        this.props.changeShowModifyClassStatus(true, item);
                    })}>
                        Change
                    </button>
                </td>
            </tr>
            <tr>
                <td>
                    Capacity:
                </td>
                <td>
                    {item.noOfSeats}
                </td>
            </tr>
            <tr>
                <td>
                    Price :
                </td>
                <td>
                    {item.price}
                </td>
            </tr>
            </tbody>
        );
    }
}

export default ShowRooms;