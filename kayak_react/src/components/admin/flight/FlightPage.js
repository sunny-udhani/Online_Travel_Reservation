import React, {Component} from 'react';
import * as API from "../../../api/admin/API";
import ShowFlights from "./ShowFlights";
import {Switch, Route, withRouter} from 'react-router-dom';
import AlertContainer from 'react-alert';
import {alertOptions, showAlert} from "../../../alertConfig";
import admincss from './admin.css'
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
import {setFlightData_Success, addFlightData_Success, setHostData_Success} from "../../../actions";
import {connect} from "react-redux"
import EditFlight from "./EditFlight";

class FlightPage extends Component {

    constructor(){
        super();
        this.state = {
            flights : [],
            modal : false,
            searchModal : false
        };
    }

    toggle = (()=> {
        this.setState({
            modal: !this.state.modal
        });
    });

    toggleSearch = (()=> {
        this.setState({
            searchModal: !this.state.searchModal
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
                showAlert("Flight Added Successfully", "info", this);
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
                showAlert("Error while adding Flight Data", "error", this);
                console.log("Error while adding flight data");
            }
        });
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
            else if(response.status===204){
                this.props.setFlightData_Success([]);
                showAlert("No Record found","info",this);
            }
            else {
                showAlert("Error while fetching Hotel data","error",this);
            }
        })
    });

    searchFlightData = {};

    searchFlight = ((data)=>{
        console.log(data);
        let searchQuery = {
        };
        searchQuery[data.searchBy] = data.searchCriteria;
        console.log(searchQuery);
        this.fetchFlights(searchQuery);
        this.toggleSearch();
    });

    componentWillMount(){
        API.fetchHosts({serviceType:"flight"}).then((response) => {
            console.log(response.status);
            if(response.status===200){
                response.json().then((data)=>{
                    console.log(data);
                    this.props.setHostData_Success(data);
                });
            }
            else if(response.status===204){
                showAlert("No Host found","info",this);
            }
            else {
                showAlert("Error while fetching Host data","error",this);
            }
        });
        this.fetchFlights();
    }

    showAddFlight = (()=>{
        console.log(this.state.modal);
        if(this.state.modal){
            return(
                <Modal isOpen={this.state.modal} toggle={this.modal} className={'modal-primary ' + this.props.className}>
                    <ModalHeader toggle={this.toggle}>Add Flight</ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col xs="12">
                                <FormGroup>
                                    Flight Operator:
                                    <select onChange={((event)=>{
                                        let a = event.target.value.split("_");
                                        this.addflightData.flightOperator = a[1];
                                        this.addflightData.hostId = a[0];
                                        console.log(this.addflightData);
                                    })} name="select">
                                        <option value="select" name="select">Select Flight Operator</option>
                                        {
                                            this.props.state.hostData.map((host)=>{
                                                return(
                                                    <option value={host.hostId+"_"+host.hostName}>
                                                        {host.hostName}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12">
                                <FormGroup>
                                    <input type="text" className="form-controlpritamadmin form-input1" placeholder="Flight Number"
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
                                    <input type="date" className="form-controlpritamadmin form-input1"
                                           onChange={(event)=>{
                                               this.addflightData.departureDate = event.target.value;
                                           }}
                                    />
                                    <input type="time" className="form-controlpritamadmin form-input1" placeholder="Flight Departure Time"
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

                                    <input type="date" className="form-controlpritamadmin form-input1" placeholder="Arrival Date"
                                           onChange={(event)=>{
                                               this.addflightData.arrivalDate = event.target.value;
                                           }}
                                    />
                                    <input type="time" className="form-controlpritamadmin form-input1" placeholder="Flight Arrival Time"
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
                                    <input type="text" className="form-controlpritamadmin form-input" width="10px" placeholder="Flight Duration"
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
                                    <input type="text" className="form-controlpritamadmin form-input1" placeholder="Origin"
                                           onChange={(event)=>{
                                               this.addflightData.origin = event.target.value;
                                           }}
                                    />

                                    <input type="text" placeholder="Destination" className="form-controlpritamadmin form-input1"
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
                                    <input className="form-controlpritamadmin form-input1" type="text" placeholder="Capacity"
                                           onChange={(event)=>{
                                               this.addflightData.classes[0].noOfSeats=event.target.value;
                                           }}
                                    />
                                    {/*&nbsp;&nbsp;&nbsp;&nbsp;*/}
                                    <input type="text" className="form-controlpritamadmin form-input1" placeholder="Fare"
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
                                    <input type="text" className="form-controlpritamadmin form-input1" placeholder="Capacity"
                                           onChange={(event)=>{
                                               this.addflightData.classes[1].noOfSeats=event.target.value;
                                           }}
                                    />
                                    {/*&nbsp;&nbsp;&nbsp;&nbsp;*/}
                                    <input type="text" className="form-controlpritamadmin form-input1" placeholder="Fare"
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
                                    <input type="text" className="form-controlpritamadmin form-input1" placeholder="Capacity"
                                           onChange={(event)=>{
                                               this.addflightData.classes[2].noOfSeats=event.target.value;
                                           }}
                                    />
                                    {/*&nbsp;&nbsp;&nbsp;&nbsp;*/}
                                    <input type="text" className="form-controlpritamadmin    form-input1" placeholder="Fare"
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

    showSearchFlight = (()=>{
        if(this.state.searchModal){
            return(
                <Modal isOpen={this.state.searchModal} toggle={this.modal} className={this.props.className}>
                    <ModalHeader toggle={this.toggleSearch}>Search Flight</ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col xs="12">
                                <Table border="0" className="table-responsive">
                                    <tr>
                                        <td>
                                            <label>Search By:</label>
                                        </td>
                                        <td>
                                            <select className="dropdown" onChange={((event)=>{
                                                this.searchFlightData.searchBy = event.target.value
                                            })}>
                                                <option value="select" selected="true">select</option>
                                                <option value="flightNo">Flight Number</option>
                                                <option value="flightOperator">Flight Operator</option>
                                                <option value="origin">Origin City</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label>Search Criteria:</label>
                                        </td>
                                        <td>
                                            <Input type="text" className="form-control form-input1" placeholder="Search Criteria"
                                                   onChange={(event)=>{
                                                       this.searchFlightData.searchCriteria = event.target.value;
                                                   }}
                                            />
                                        </td>
                                    </tr>
                                </Table>
                                <FormGroup>

                                </FormGroup>
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <input type="button" value="Search Flight" className="btn btn-primary"
                               onClick={(()=>{this.searchFlight(this.searchFlightData)})}
                        />
                        <input type="button" value="Cancel"
                               className="btn btn-primary"
                               onClick={(()=>{this.toggleSearch()})}
                        />
                    </ModalFooter>
                </Modal>
            )
        }
        else {
            return(<span></span>)
        }
    });

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
                                    {
                                        this.showSearchFlight()
                                    }
                                </div>
                                <div className="animated fadeIn">
                                    <Row>
                                        <Col xs="12" lg="12">
                                            <Card>
                                                <CardHeader className="text-center">
                                                    <Button className="btn btn-link pull-left" onClick={(()=>{
                                                        this.setState({
                                                            ...this.state,
                                                            searchModal : true
                                                        })
                                                    })}>Filter</Button>
                                                    <Button className="btn btn-link pull-left" onClick={(()=>{
                                                        this.fetchFlights()
                                                    })}>Clear</Button>
                                                    <label className="h4"><b>Flights</b></label>
                                                    <Button className="btn btn-link pull-right" onClick={(()=>{
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
                                                            <th><b>Flight Operator</b></th>
                                                            <th><b>Flight Number</b></th>
                                                            <th><b>Flight Origin</b></th>
                                                            <th><b>Flight Destination</b></th>
                                                            <th><b>Flight Duration</b></th>
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
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </Row>
                                </div>
                                <AlertContainer ref={a => this.msg = a} {...alertOptions}/>
                            </div>
                        )
                    })}/>

                    <Route path="/admin/flight/:flightId" render={((match)=>{
                        return(
                            <EditFlight
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
        },
        setHostData_Success: (data) => {
            dispatch(setHostData_Success(data))
        }
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FlightPage));

