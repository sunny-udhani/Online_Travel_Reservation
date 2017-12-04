import React, {Component} from 'react';
import * as API from "../../../../api/admin/API";
import ShowCars from "./ShowBookings";
import EditCarBooking from "./EditCarBooking";
import {Switch, Route, withRouter} from 'react-router-dom';
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
    InputGroupButton
} from 'reactstrap';
import {setCarBookingData_Success} from "../../../../actions";


class CarBookingsPage extends Component {

    constructor(){
        super();
        this.state = {
            modal : false,
            searchModal : false
        };
    }

    toggle = (()=>{
        this.setState({
            ...this.state,
            modal : !this.state.modal
        })
    });

    toggleSearch = (()=> {
        this.setState({
            searchModal: !this.state.searchModal
        });
    });

    fetchCarBookings = ((data)=> {
        console.log("Wil Mount CarPage");
        API.fetchCarBookings(data).then((response) => {
            console.log(response.status);
            if(response.status===200){
                response.json().then((data)=>{
                    console.log(data);
                    /*this.setState({
                        ...this.state,
                        cars : data
                    });*/
                    this.props.setCarBookingData_Success(data);
                });
            }
            else if(response.status === 204){
                console.log("No booking exist");
                this.props.setCarBookingData_Success([]);
            }
            else {
                console.log("Error");
            }
        });
    });

    searchCarData = {};

    searchCar = ((data)=>{
        console.log(data);
        let searchQuery = {
        };
        searchQuery[data.searchBy] = data.searchCriteria;
        console.log(searchQuery);
        this.fetchCars(searchQuery);
        this.toggleSearch();
    });

    componentWillMount(){
        this.fetchCarBookings();
    }

    showSearchCar = (()=>{
        return(
            <Modal isOpen={this.state.searchModal} toggle={this.modal} className={this.props.className}>
                <ModalHeader toggle={this.toggleSearch}>Search Car</ModalHeader>
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
                                            this.searchCarData.searchBy = event.target.value
                                        })}>
                                            <option value="host" selected="true">select</option>
                                            <option value="bookingId">bookingId</option>
                                            <option value="searchbyusername">username</option>
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
                                                   this.searchCarData.searchCriteria = event.target.value;
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
                    <input type="button" value="Search" className="btn btn-primary"
                           onClick={(()=>{this.searchCar(this.searchCarData)})}
                    />
                    <input type="button" value="Cancel"
                           className="btn btn-primary"
                           onClick={(()=>{this.toggleSearch()})}
                    />
                </ModalFooter>
            </Modal>
        )
    });

    render() {
        return (
            <div className="container-fluid">
                <Switch>
                    <Route exact path="/admin/carbooking" render={(()=>{
                        return (
                            <div>
                                <div>
                                    {
                                        this.showSearchCar()
                                    }
                                </div>
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
                                                    this.fetchCarBookings()
                                                })}>Clear</Button>
                                                <label className="h4"><b>Car Booking</b></label>
                                            </CardHeader>
                                            <CardBody>
                                                <Table>
                                                    <thead>
                                                    <tr>
                                                        <th>
                                                            <b>Booking Id</b>
                                                        </th>
                                                        <th>
                                                            <b>Car Company</b>
                                                        </th>
                                                        <th>
                                                            <b>Booked By Username</b>
                                                        </th>
                                                    </tr>
                                                    </thead>
                                                    {
                                                        this.props.state.carBookingData.map((car, index)=>{
                                                            return(
                                                                <ShowCars
                                                                    key = {index}
                                                                    car = {car}
                                                                    fetchCars = {this.fetchCars}
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
                    <Route path="/admin/carbooking/:bookingId" render={((match)=>{
                        return(
                            <EditCarBooking
                                // groups={this.state.groups}
                                // context={match}
                                {...match}
                                handlePageChange = {this.props.handlePageChange}
                                fetchCars = {this.fetchCars}
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
        setCarBookingData_Success : (data) => {
            dispatch(setCarBookingData_Success(data))
        }
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CarBookingsPage));
