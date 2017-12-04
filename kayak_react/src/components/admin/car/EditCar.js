import React, {Component} from 'react';
import * as API from "../../../api/admin/API";
import {
    Badge,
    Row,
    Col,
    Card,
    CardHeader,
    CardFooter,
    CardBody,
    Table,
    Pagination,
    PaginationItem,
    PaginationLink,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    FormText,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupButton
} from 'reactstrap';

class EditCar extends Component {

    constructor(){
        super();
        this.state = {
            edit : {},
            modal : false,
            carId : ""
        };
    }

    toggle = (()=>{
        this.setState({
            ...this.state,
            modal : !this.state.modal
        })
    });

    changeShowAddRoomStatus = ((show, room)=>{
        // this.roomdata.roomType = room.roomType;
        // this.roomdata.roomId = room.roomid;
        if(show){
            this.roomdata = room;
            this.setState({
                room : room
            });
        }
        else {

        }
        this.toggle();

        // this.setState({
        //     modal : show
        // });

    });

    validate = {
        errors: "default"
    };

    editCar = ((data)=>{
        console.log(data);

        console.log(data.zipCode);

        //---------------------------- Zip Code Validation -----------------------------------

        let zipCodePattern = /^\d{5}$|^\d{5}-\d{4}$/;

        let zipCode = parseInt(data.zipCode);

        console.log(" Validating zip code ..... "+zipCodePattern.test(zipCode));

        if(zipCodePattern.test(zipCode)){
            console.log("Successful - entry");
            API.modifyCarData(data).then((response) => {
                console.log(response.status);
                if(response.status===200){
                    this.props.fetchCars({_id:data._id});
                    this.props.handlePageChange("/admin/car");
                }
                else if(response.status===300)
                {
                    console.log("Nothing to Change");
                }
                else {
                    console.log("Error");
                }
            });
        }
        else {
            this.validate.errors = "zipCode,";
            document.getElementById("errors").innerHTML = "<p style=\"color:#FF0000\"> ***** Wrong input - "+this.validate.errors+" ***** </p>"
        }
    });

    editCarData = {};


    fetchCarToModify = ((carId)=>{
        let car = {"_id" : carId};
        API.fetchCars(car).then((response)=>{
            console.log(response.status);
            if(response.status===200) {
                response.json().then((data)=>{
                    console.log(data[0]);
                    this.editCarData = data[0];
                    this.setState(({
                        edit : data[0]
                    }));
                    console.log(this.editCarData);
                });
            }
            else {
                console.log("Error While fetching data");
            }
        });
    });

    componentWillMount(){
        let carId=this.props.match.params.carId;
        this.setState({
            ...this.state,
            carId : carId
        });
        this.fetchCarToModify(carId);
    }

    render() {

        return (
            <div className="container-fluid">
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                Edit Car
                            </CardHeader>

                            <CardBody>
                                <div align="center">
                                    <Table>
                                        <tr>
                                            <th>
                                                <label className="h4">Host:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1" value={this.state.edit.hostId}
                                                       onChange={((event)=>{
                                                           this.setState({
                                                               ...this.state
                                                               // hostId : event.target.value
                                                           });
                                                           this.editCarData.hostId = event.target.value;
                                                       })}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">Car Name:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1" value={this.state.edit.carName}
                                                       onChange={((event)=>{
                                                           this.setState({
                                                               ...this.state
                                                           });
                                                           this.editCarData.carName = event.target.value;
                                                       })}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">Car Type:</label>
                                            </th>
                                            <td>
                                                <textarea type="text" className="form-control form-input1" value={this.state.edit.carType}
                                                          onChange={((event)=>{
                                                              this.setState({
                                                                  ...this.state
                                                              });
                                                              this.editCarData.carType = event.target.value;
                                                          })}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">Car Make:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1" value={this.state.edit.carMake}
                                                       onChange={((event)=>{
                                                           this.setState({
                                                               ...this.state
                                                           });
                                                           this.editCarData.carMake = event.target.value;
                                                       })}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">Car Model:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1" value={this.state.edit.carModel}
                                                       onChange={((event)=>{
                                                           this.setState({
                                                               ...this.state
                                                           });
                                                           this.editCarData.carModel = event.target.value;
                                                       })}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">Capacity in Car:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1" value={this.state.edit.capacity}
                                                       onChange={((event)=>{
                                                           this.setState({
                                                               ...this.state
                                                           });
                                                           this.editCarData.capacity = event.target.value;
                                                       })}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">Price per Day:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1" value={this.state.edit.price}
                                                       onChange={((event)=>{
                                                           this.setState({
                                                               ...this.state
                                                           });
                                                           this.editCarData.price = event.target.value;
                                                       })}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">City:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1" value={this.state.edit.city}
                                                       onChange={((event)=>{
                                                           this.setState({
                                                               ...this.state
                                                           });
                                                           this.editCarData.city = event.target.value;
                                                       })}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">State:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1" value={this.state.edit.state}
                                                       onChange={((event)=>{
                                                           this.setState({
                                                               ...this.state
                                                           });
                                                           this.editCarData.state = event.target.value;
                                                       })}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">Zip Code:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1" value={this.state.edit.zipCode}
                                                       onChange={((event)=>{
                                                           this.setState({
                                                               ...this.state
                                                           });
                                                           this.editCarData.zipCode = event.target.value;
                                                       })}
                                                />
                                            </td>
                                        </tr>
                                    </Table>
                                </div>
                                <div id="errors">

                                </div>
                            </CardBody>
                            <CardFooter className="text-center">
                                <Button type="button" className="btn-primary" value="Edit"
                                        onClick={(()=>{this.editCar(this.editCarData)})}>Save</Button>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Button type="button" className="btn-primary"
                                        onClick={(()=>{this.props.handlePageChange("/admin/car")})}
                                >Back</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default EditCar;
