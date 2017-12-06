import React, {Component} from 'react';
import * as API from "../../../api/admin/API";
import ShowFlightClass from "./ShowFlightClass";
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

class EditFlight extends Component {

    constructor() {
        super();
        this.state = {
            edit: {},
            classes: [],
            flight: {},
            modal: false,
            flightId: ""
        };
    }

    componentWillMount() {
        let flightId = this.props.match.params.flightId;
        this.setState({
            ...this.state,
            flightId: this.props.match.params.flightId
        });
        this.fetchHotelToModify(flightId);
    }

    fetchHotelToModify = ((flightId) => {
        let flight = {"_id": flightId};
        API.fetchFlights(flight).then((response) => {
            console.log(response.status);
            if (response.status === 200) {
                response.json().then((data) => {
                    console.log(data);
                    console.log(data[0]);
                    this.editFlightData = data[0];
                    this.setState(({
                        // ...this.state,
                        edit: data[0],
                        classes: data[0].classes
                    }));
                    console.log(data[0].classes);
                    console.log(this.editFlightData);
                    // console.log(data[0].departureDate.substring(0,data[0].departureDate.indexOf("T")))
                });
            }
            else {
                console.log("Error While fetching data");
            }
        });
    });

    toggle = (() => {
        this.setState({
            ...this.state,
            modal: !this.state.modal
        })
    });

    // editFlightClassData = {};

    // changeShowModifyClassStatus = ((show, flightId, classType, noOfSeats, price)=>{
    changeShowModifyClassStatus = ((show, flightClass) => {
        // this.roomdata.roomType = room.roomType;
        // this.roomdata.roomId = room.roomid;
        // if(show){
        // console.log(flightClass);
        console.log(flightClass);
        this.editFlightClassData = flightClass;
        // this.editFlightClassData.flightId = flightId;
        // this.editFlightClassData.classType = classType;
        // this.editFlightClassData.noOfSeats = noOfSeats;
        // this.editFlightClassData.price = price;
        this.setState({
            // ...this.state,
            ...this.state,
            flightClass: this.editFlightClassData,
            // changeRoom : true
        });
        // }
        // else {
        //
        // }
        this.toggle();

        // this.setState({
        //     modal : show
        // });

    });

    editFlight = ((data) => {

        let zipCodePattern = /^\d{5}$|^\d{5}-\d{4}$/;

        let zipCode = parseInt(data.zipCode);

        console.log(" Validating zip code ..... " + zipCodePattern.test(zipCode));

        if (zipCodePattern.test(zipCode)) {
            console.log("Successful - entry");
            API.modifyFlightData(data).then((response) => {
                console.log(response.status);
                if (response.status === 200) {
                    // this.props.fetchFlights({flightId:data._id});
                    this.props.fetchFlights({"_id": data._id});
                    this.props.handlePageChange("/admin/flight");
                }
                else if (response.status === 300) {
                    console.log("Nothing to Change");
                }
                else {
                    console.log("Error");

                }
            });

        }
        else {
            this.validate.errors = "zipCode,";
            document.getElementById("errors").innerHTML = "<p style=\"color:#FF0000\"> ***** Wrong input - " + this.validate.errors + " ***** </p>"
        }
        // });
    });

    editFlightData = {};

    editFlightClass = ((flightData, flightId) => {
        console.log(flightId);
        console.log(flightData);
        let data = flightData;
        data.flightId = this.state.flightId;
        console.log(data);
        API.modifyFlightClassData(data).then((response) => {
            console.log(response.status);
            if (response.status === 200) {
                this.props.fetchFlights();
            }
            else if (response.status === 300) {
                console.log("Nothing to Change");
            }
            else if (response.status === 400) {
                console.log("Error");
            }
            this.setState({
                ...this.state,
                modal: false
            })
        });
        this.toggle();
    });

    showModifyFlightClass = (() => {
        console.log(this.state.modal);
        if (this.state.modal) {
            return (
                <Modal isOpen={this.state.modal} toggle={this.modal} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Add Hotel</ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col xs="12">
                                <FormGroup>
                                    Flight Class:
                                    <input type="text" value={this.editFlightClassData.classType}
                                           disabled
                                        /*onChange={(event)=>{
                                               this.setState({
                                                   ...this.state
                                               });
                                               this.roomdata.roomPrice = event.target.value;
                                           }}*/
                                    />
                                </FormGroup>
                            </Col>
                            <Col xs="12">
                                <FormGroup>
                                    Price:
                                    <input type="number" placeholder="Price" value={this.editFlightClassData.price}
                                           onChange={(event) => {
                                               this.setState({
                                                   ...this.state,
                                                   // price : event.target.value
                                               });
                                               this.editFlightClassData.price = event.target.value;
                                           }}
                                    />
                                </FormGroup>
                            </Col>
                            <Col xs="12">
                                <FormGroup>
                                    Number of Seats:
                                    <input type="number" placeholder="Number of Seats"
                                           value={this.editFlightClassData.noOfSeats}
                                           onChange={(event) => {
                                               this.setState({
                                                   ...this.state
                                               });
                                               this.editFlightClassData.noOfSeats = event.target.value;
                                           }}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <input type="button" value="Save" className="btn btn-primary"
                            // onClick={(()=>{this.editFlightClass(this.flightClass, this.props.match.params.flightId)})}
                               onClick={(() => {
                                   this.editFlightClass(this.editFlightClassData, this.props.match.params.flightId)
                               })}
                        />
                        <input type="button" value="Cancel"
                               className="btn btn-primary"
                               onClick={(() => {
                                   this.setState({
                                       ...this.state,
                                       modal: false
                                   });
                                   this.fetchHotelToModify(this.state.flightId);
                               })}

                        />
                    </ModalFooter>
                </Modal>
            )
        }
    });

    render() {
        // console.log(this.props.editHotelData1);*/
        return (
            <div className="container-fluid">
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                Edit Flight
                            </CardHeader>
                            <CardBody>
                                <div align="center">
                                    <Table>
                                        <tr>
                                            <th>
                                                <label className="h4">Host:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1"
                                                       value={this.state.edit.hostId}
                                                       onChange={((event) => {
                                                           this.setState({
                                                               ...this.state
                                                           });
                                                           this.editFlightData.hostId = event.target.value;
                                                       })}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">Flight Operator:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1"
                                                       value={this.state.edit.flightOperator}
                                                       onChange={((event) => {
                                                           this.setState({
                                                               ...this.state
                                                           });
                                                           this.editFlightData.flightOperator = event.target.value;
                                                       })}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">Flight Number:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1"
                                                       value={this.state.edit.flightNo}
                                                       onChange={((event) => {
                                                           this.setState({
                                                               ...this.state
                                                           });
                                                           this.editFlightData.flightNo = event.target.value;
                                                       })}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">Departure Date:</label>
                                            </th>
                                            <td>
                                                <input type="date" className="form-control form-input1"
                                                       value={this.state.edit.departureDate === undefined ? "" : this.state.edit.departureDate.substring(0, this.state.edit.departureDate.indexOf("T"))}
                                                       onChange={((event) => {
                                                           this.setState({
                                                               ...this.state
                                                               // departureDate : event.target.value
                                                           });
                                                           this.editFlightData.departureDate = event.target.value;
                                                       })}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">Departure Time:</label>
                                            </th>
                                            <td>
                                                <input type="time" className="form-control form-input1"
                                                       value={this.state.edit.departureTime}
                                                       onChange={((event) => {
                                                           this.setState({
                                                               ...this.state
                                                           });
                                                           this.editFlightData.departureTime = event.target.value;
                                                       })}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">Arrival Date:</label>
                                            </th>
                                            <td>
                                                <input type="date" className="form-control form-input1"
                                                       value={this.state.edit.arrivalDate === undefined ? "" : this.state.edit.arrivalDate.substring(0, this.state.edit.arrivalDate.indexOf("T"))}
                                                       onChange={((event) => {
                                                           this.setState({
                                                               ...this.state
                                                           });
                                                           this.editFlightData.arrivalDate = event.target.value;
                                                       })}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">Arrival Time:</label>
                                            </th>
                                            <td>
                                                <input type="time" className="form-control form-input1"
                                                       value={this.state.edit.arrivalTime}
                                                       onChange={((event) => {
                                                           this.setState({
                                                               ...this.state
                                                           });
                                                           this.editFlightData.arrivalTime = event.target.value;
                                                       })}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">Duration:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1"
                                                       value={this.state.edit.duration}
                                                       onChange={((event) => {
                                                           this.setState({
                                                               ...this.state
                                                           });
                                                           this.editFlightData.duration = event.target.value;
                                                       })}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">Origin:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1"
                                                       value={this.state.edit.origin}
                                                       onChange={((event) => {
                                                           this.setState({
                                                               ...this.state
                                                           });
                                                           this.editFlightData.origin = event.target.value;
                                                       })}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">Destination:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1"
                                                       value={this.state.edit.destination}
                                                       onChange={((event) => {
                                                           this.setState({
                                                               ...this.state
                                                           });
                                                           this.editFlightData.destination = event.target.value;
                                                       })}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">Classes:</label>
                                            </th>
                                            <td>
                                                <Table>
                                                    {
                                                        this.state.classes.map((item, index) => {
                                                            return (
                                                                <ShowFlightClass
                                                                    key={index}
                                                                    item={item}
                                                                    changeShowModifyClassStatus={this.changeShowModifyClassStatus}
                                                                />
                                                            )
                                                        })
                                                    }
                                                </Table>
                                            </td>
                                        </tr>
                                    </Table>
                                    {this.showModifyFlightClass()}
                                </div>
                            </CardBody>
                            <CardFooter className="text-center">
                                <Button type="button" className="btn-primary" value="Save" onClick={(() => {
                                    this.editFlight(this.editFlightData)
                                })}>Save</Button>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Button type="button" className="btn-primary"
                                        onClick={(() => {
                                            this.props.handlePageChange("/admin/flight")
                                        })}
                                >Back</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default EditFlight;
