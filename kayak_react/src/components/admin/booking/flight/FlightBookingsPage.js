import React, {Component} from 'react';
import * as API from "../../../../api/admin/API";
import ShowBookings from "./ShowBookings";

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
import {addFlightBookingData_Success} from "../../../../actions";
import {connect} from "react-redux"
import EditFlightBooking from "./EditFlightBooking";

class FlightBookingsPage extends Component {

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

    fetchFlightBookings = ((data)=>{
        API.fetchFlightBookings(data).then((response) => {
            console.log(response.status);
            if(response.status===200){
                response.json().then((data)=>{
                    console.log(data);
                    this.props.addFlightBookingData_Success(data);
                });
            }
            else if(response.status===204){
                this.props.addFlightBookingData_Success([]);
            }
            else {
                console.log("Error while fetching flight data");
            }
        })
    });

    searchFlightData = {};

    searchFlight = ((data)=>{
        console.log(data);
        let searchQuery = {};
        searchQuery[data.searchBy] = data.searchCriteria;
        console.log(searchQuery);
        this.fetchFlights(searchQuery);
        this.toggleSearch();
    });

    componentWillMount(){
        this.fetchFlightBookings();
    }

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
                                                <option value="bookingId">Booking Id</option>
                                                <option value="searchbyusername">Username</option>
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
        console.log(this.props.state);

        return (
            <div className="container-fluid">
                <Switch>
                    <Route exact path="/admin/flightbooking" render={(()=>{
                        return (
                            <div>
                                <div>
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
                                                        this.fetchFlightBookings()
                                                    })}>Clear</Button>
                                                    <label className="h4"><b>Flight Bookings</b></label>
                                                </CardHeader>
                                                <CardBody>
                                                    <Table responsive>
                                                        <thead>
                                                        <tr>
                                                            <th><b>Booking Id</b></th>
                                                            <th><b>Flight Operator</b></th>
                                                            <th><b>flight Departure Date</b></th>
                                                            <th><b>flight Arrival Date</b></th>
                                                            <th><b>No of Passengers</b></th>
                                                            <th><b>Booked By</b></th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {
                                                            this.props.state.flightBookingData.map((flight, index)=>{
                                                                return(
                                                                    <ShowBookings
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
                            </div>
                        )
                    })}/>

                    <Route path="/admin/flightbooking/:bookingId" render={((match)=>{
                        return(
                            <EditFlightBooking
                                {...match}
                                handlePageChange = {this.props.handlePageChange}
                                fetchFlightBookings = {this.fetchFlightBookings}
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
        addFlightBookingData_Success: (data) => {
            dispatch(addFlightBookingData_Success(data))
        }
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FlightBookingsPage));

