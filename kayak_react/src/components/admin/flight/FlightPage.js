import React, {Component} from 'react';
import * as API from "../../../api/admin/API";
import ShowFlights from "./ShowFlights";
import {Switch, Route, withRouter} from 'react-router-dom';
import {
    Badge,
    Row,
    Col,
    Card,
    CardHeader,
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
import {setFlightData_Success, addFlightData_Success} from "../../../actions";
import {connect} from "react-redux"
import EditFlight from "./EditFlight";

class FlightPage extends Component {

    constructor(){
        super();
        this.state = {
            flights : [],
            modal : false
        };
    }

    toggle = (()=> {
        this.setState({
            modal: !this.state.modal
        });
    });

    addflightData = {
        flightOperator : "",
        flightNo : "",
        hostId : "",
        departureDate : "",
        arrivalDate : "",
        departureTime : "",
        arrivalTime : "",
        duration : "",
        origin : "",
        destination : "",
        classes: [
            {
                classType: "business",
                price: 0,
                noOfSeats: 0
            },
            {
                classType: "firstclass",
                price: 0,
                noOfSeats: 0
            },
            {
                classType: "economy",
                price: 0,
                noOfSeats: 0
            },
        ]
    };

    addflight = ((flightdata)=>{
        console.log(flightdata);
        API.addflightData(flightdata).then((response)=>{
            console.log(response.status);
            if(response.status===200){
                response.json().then((data)=>{
                    console.log(data);
                    // this.setState((state)=>{
                    //     state.flights.push(data);
                    // });
                    this.props.addFlightData_Success(data);
                });
                this.toggle();
            }
            else {
                console.log("Error while adding flight data");
            }
        });
    });

    showAddFlight = (()=>{
        console.log(this.state.modal);
        if(this.state.modal){
            return(
                <Modal isOpen={this.state.modal} toggle={this.modal} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Add Flight</ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col xs="12">
                                <FormGroup>
                                    <input type="text" className="form-control form-input1" placeholder="Flight Operator" required
                                           onChange={(event)=>{
                                               this.addflightData.flightOperator = event.target.value;
                                           }}
                                    />
                                    <input type="text" className="form-control form-input1" placeholder="Host Id"
                                           onChange={(event)=>{
                                               this.addflightData.hostId = event.target.value;
                                           }}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12">
                                <FormGroup>
                                    <input type="text" className="form-control form-input1" placeholder="Flight Number"
                                           onChange={(event)=>{
                                               this.addflightData.flightNo = event.target.value;
                                           }}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>


                        <Row>
                            <Col xs="12">
                                Departure:
                                <FormGroup>
                                    <input type="date" className="form-control form-input1"
                                           onChange={(event)=>{
                                               this.addflightData.departureDate = event.target.value;
                                           }}
                                    />
                                    <input type="time" className="form-control form-input1" placeholder="Flight Departure Time"
                                           onChange={(event)=>{
                                               this.addflightData.departureTime = event.target.value;
                                           }}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12">
                                Arrival:
                                <FormGroup>

                                    <input type="date" className="form-control form-input1" placeholder="Arrival Date"
                                           onChange={(event)=>{
                                               this.addflightData.arrivalDate = event.target.value;
                                           }}
                                    />
                                    <input type="time" className="form-control form-input1" placeholder="Flight Arrival Time"
                                           onChange={(event)=>{
                                               this.addflightData.arrivalTime = event.target.value;
                                           }}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12">
                                <FormGroup>
                                    <input type="text" className="form-control form-input" width="10px" placeholder="Flight Duration"
                                           onChange={(event)=>{
                                               this.addflightData.duration = event.target.value;
                                           }}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12">
                                <FormGroup>
                                    <input type="text" className="form-control form-input1" placeholder="Origin"
                                           onChange={(event)=>{
                                               this.addflightData.origin = event.target.value;
                                           }}
                                    />

                                    <input type="text" placeholder="Destination" className="form-control form-input1"
                                           onChange={(event)=>{
                                               this.addflightData.destination = event.target.value;
                                           }}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        Business Class:
                        <Row>
                            <Col xs="12">
                                <FormGroup>
                                    <input className="form-control form-input1" type="text" placeholder="Capacity"
                                           onChange={(event)=>{
                                               this.addflightData.classes[0].noOfSeats=event.target.value;
                                           }}
                                    />
                                    {/*&nbsp;&nbsp;&nbsp;&nbsp;*/}
                                    <input type="text" className="form-control form-input1" placeholder="Fare"
                                           onChange={(event)=>{
                                               this.addflightData.classes[0].price=event.target.value;
                                           }}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        {/*<br/>*/}
                        FirstClass:
                        <Row>
                            <Col xs="12">
                                <FormGroup>
                                    <input type="text" className="form-control form-input1" placeholder="Capacity"
                                           onChange={(event)=>{
                                               this.addflightData.classes[1].noOfSeats=event.target.value;
                                           }}
                                    />
                                    {/*&nbsp;&nbsp;&nbsp;&nbsp;*/}
                                    <input type="text" className="form-control form-input1" placeholder="Fare"
                                           onChange={(event)=>{
                                               this.addflightData.classes[1].price=event.target.value;
                                           }}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        {/*<br/>*/}
                        Economy:
                        <Row>
                            <Col xs="12">
                                <FormGroup>
                                    <input type="text" className="form-control form-input1" placeholder="Capacity"
                                           onChange={(event)=>{
                                               this.addflightData.classes[2].noOfSeats=event.target.value;
                                           }}
                                    />
                                    {/*&nbsp;&nbsp;&nbsp;&nbsp;*/}
                                    <input type="text" className="form-control form-input1" placeholder="Fare"
                                           onChange={(event)=>{
                                               this.addflightData.classes[2].price=event.target.value;
                                           }}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <input type="button" value="Add Flight" className="btn btn-primary"
                               onClick={(()=>{this.addflight(this.addflightData)})}
                        />
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="button" value="Cancel"
                               className="btn btn-primary"
                               onClick={(()=>{this.setState({
                                   ...this.state,
                                   modal : false
                               })})}
                        />
                    </ModalFooter>
                </Modal>
            )
        }
        else {
            return(
                <div>
                </div>
            )
        }

    });

    fetchFlights = ((data)=>{
        API.fetchFlights(data).then((response) => {
            console.log(response.status);
            if(response.status===200){
                response.json().then((data)=>{
                    console.log(data);
                    this.props.setFlightData_Success(data);
                });
            }
            else {
                console.log("Error while fetching flight data");
            }
        })
    });

    componentWillMount(){
        this.fetchFlights();
    }

    render() {
        window.onclick = (() => {
            // console.log(this.state.showAddFlight);
            // if(this.state.showAddFlight){
            //     this.setState({
            //         showAddFlight:false
            //     })
            // }
        });
        console.log(this.props.state);

        return (
            <div className="container-fluid">
                <Switch>
                    <Route exact path="/admin/flight" render={(()=>{
                        return (
                            <div>
                                <div>
                                    {
                                        this.showAddFlight()
                                    }
                                </div>
                                <div className="animated fadeIn">
                                    <Row>
                                        <Col xs="12" lg="12">
                                            <Card>
                                                <CardHeader>
                                                    Flights
                                                    <Button className="btn-primary pull-right" onClick={(()=>{
                                                        this.setState({
                                                            ...this.state,
                                                            modal : true
                                                        })
                                                    })}>Add Flight</Button>
                                                </CardHeader>
                                                <CardBody>
                                                    <Table responsive>
                                                        <thead>
                                                        <tr>
                                                            <th>Host</th>
                                                            <th>flight Number</th>
                                                            <th>flight Origin</th>
                                                            <th>flight Destination</th>
                                                            <th>flight Duration</th>
                                                            {/*<th></th>*/}
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {
                                                            this.props.state.flightData.map((flight, index)=>{
                                                                return(
                                                                    <ShowFlights
                                                                        key={index}
                                                                        flight={flight}
                                                                    />
                                                                )
                                                            })
                                                        }
                                                        </tbody>
                                                    </Table>
                                                    <Pagination>
                                                        <PaginationItem>
                                                            <PaginationLink previous href="#"></PaginationLink>
                                                        </PaginationItem>
                                                        <PaginationItem active>
                                                            <PaginationLink href="#">1</PaginationLink>
                                                        </PaginationItem>
                                                        <PaginationItem>
                                                            <PaginationLink href="#">2</PaginationLink>
                                                        </PaginationItem>
                                                        <PaginationItem>
                                                            <PaginationLink href="#">3</PaginationLink>
                                                        </PaginationItem>
                                                        <PaginationItem>
                                                            <PaginationLink href="#">4</PaginationLink>
                                                        </PaginationItem>
                                                        <PaginationItem>
                                                            <PaginationLink next href="#"></PaginationLink>
                                                        </PaginationItem>
                                                    </Pagination>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        )
                    })}/>

                    <Route path="/admin/flight/:flightId" render={((match)=>{
                        return(
                            <EditFlight
                                // groups={this.state.groups}
                                // context={match}
                                {...match}
                                handlePageChange = {this.props.handlePageChange}
                                fetchFlights = {this.fetchFlights}
                            />
                        )
                    })}/>
                </Switch>
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log(state);
    return {
        state: state
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setFlightData_Success: (data) => {
            dispatch(setFlightData_Success(data))
        }
        ,
        addFlightData_Success: (data) => {
            console.log(data);
            dispatch(addFlightData_Success(data))
        }
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FlightPage));

