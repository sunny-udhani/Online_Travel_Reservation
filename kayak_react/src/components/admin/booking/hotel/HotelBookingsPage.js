import React, {Component} from 'react';
import * as API from "../../../../api/admin/API";
import ShowBookings from "./ShowBookings";
import {Switch, Route} from 'react-router-dom';
import {connect} from "react-redux"
import {
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
    InputGroupButton,
    Dropdown
} from 'reactstrap';
import {setHotelBookingsData_Success} from "../../../../actions";
import EditHotelBooking from "./EditHotelBooking";
import withRouter from "react-router-dom/es/withRouter";

class HotelBookingsPage extends Component {

    constructor(){
        super();
        this.state = {
            modal : false,
            hotelBookings : [],
            searchModal : false
        };
    }


    handleSubmit = () => {
    };

    toggle = (()=>{
        this.setState({
            ...this.state,
            modal : !this.state.modal
        })
    });

    toggleSearch = (()=>{
        this.setState({
            ...this.state,
            searchModal : !this.state.searchModal
        })
    });

    searchHotelBookingData = {};

    searchHotelBooking = ((data)=>{
        console.log(data);
        let searchQuery = {
        };
        searchQuery[data.searchBy] = data.searchCriteria;
        console.log(searchQuery);
        this.fetchHotelBookings(searchQuery);
        this.toggleSearch();
    });

    showSearchBooking = (()=>{
        if(this.state.searchModal){
            return(
                <Modal isOpen={this.state.searchModal} toggle={this.modal} className={this.props.className}>
                    <ModalHeader toggle={this.toggleSearch}>Search Hotel</ModalHeader>
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
                                                this.searchHotelBookingData.searchBy = event.target.value
                                            })}>
                                                <option value="host" selected="true">select</option>
                                                <option value="bookingId">Booking Id</option>
                                                <option value="searchbyusername">Username</option>
                                                {/*<option value="city">City</option>*/}
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
                                                       this.searchHotelBookingData.searchCriteria = event.target.value;
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
                        <input type="button" value="Search Hotel" className="btn btn-primary"
                               onClick={(()=>{this.searchHotelBooking(this.searchHotelBookingData)})}
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

    fetchHotelBookings = ((data)=> {
        console.log("Wil Mount HotelBookingPage");
        console.log(data);
        API.fetchHotelBookings(data).then((response) => {
            console.log(response.status);
            if(response.status===200){
                response.json().then((data)=>{
                    console.log(data);
                    this.props.setHotelBookingsData_Success(data);
                });
            }
            else if(response.status===204){
                console.log("No Booking Found");
                this.props.setHotelBookingsData_Success([]);
            }
            else {
                console.log("Error while fetching data");
            }
        });
    });


    componentWillMount(){
        this.fetchHotelBookings();
    }

    render() {
        return (
            <div className="container-fluid">
                <Switch>
                    <Route exact path="/admin/hotelbooking" render={(()=>{
                        return (
                            <div>
                                <div>
                                    {
                                        this.showSearchBooking()
                                    }
                                </div>
                                {/*<div>*/}
                                <Row>
                                    <Col xs="12" lg="12">
                                        <Card>
                                            <CardHeader className="text-center">
                                                <Button className="btn btn-link pull-left" onClick={(()=>{
                                                    this.setState({
                                                        ...this.state,
                                                        searchModal:true
                                                    })
                                                })}>Filter</Button>
                                                <Button className="btn btn-link pull-left" onClick={(()=>{
                                                    this.fetchHotelBookings()
                                                })}>Clear</Button>
                                                <label className="h4"><b>Hotel Bookings</b></label>
                                            </CardHeader>
                                            <CardBody>
                                                <Table>
                                                    <thead>
                                                    <tr>
                                                        <th>
                                                            <b>Booking Id</b>
                                                        </th>
                                                        <th>
                                                            <b>Hotel/Host Name</b>
                                                        </th>
                                                        <th>
                                                            <b>Booked By Username</b>
                                                        </th>
                                                    </tr>
                                                    </thead>
                                                    {
                                                        this.props.state.hotelBookingData.map((hotel, index)=>{
                                                            return(
                                                                <ShowBookings
                                                                    key = {index}
                                                                    hotel = {hotel}
                                                                    fetchHotelBookings = {this.fetchHotelBookings}
                                                                    handlePageChange = {this.props.handlePageChange}
                                                                />
                                                            )
                                                        })
                                                    }
                                                </Table>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                            </div>
                        )
                    })}/>
                    <Route path="/admin/hotelbooking/:bookingId" render={((match)=>{
                        return(
                            <EditHotelBooking
                                {...match}
                                handlePageChange = {this.props.handlePageChange}
                                fetchHotelBookings = {this.fetchHotelBookings}
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
        setHotelBookingsData_Success: (data) => {
            dispatch(setHotelBookingsData_Success(data))
        }
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HotelBookingsPage));
