import React, {Component} from 'react';
import * as API from "../../../api/admin/API";
import ShowHotels from "./ShowHotels";
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
    InputGroupButton
} from 'reactstrap';
import {setHotelData_Success, addHotelData_Success} from "../../../actions";
import EditHotel from "./EditHotel";
import withRouter from "react-router-dom/es/withRouter";

class HotelPage extends Component {

    constructor(){
        super();
        this.state = {
            modal : false,
            hotels : []
        };
    }


    handleSubmit = () => {
    };

    addHotelData = {
        hostId : "",
        hotelName : "",
        hotelAddress : "",
        city : "",
        state : "",
        zipCode : "",
        totalRooms : 0,
        stars : 0
    };

    toggle = (()=>{
        this.setState({
            ...this.state,
            modal : !this.state.modal
        })
    });

    addHotel = ((flightdata)=>{
        console.log(flightdata);
        API.addHotel(flightdata).then((response)=>{
            console.log(response.status);
            if(response.status===200){
                response.json().then((data)=>{
                    console.log(data);
                    this.setState({
                        ...this.state,
                        modal : false
                    });
                    // this.fetchHotels();
                    this.props.addHotelData_Success(data);
                });
            }
            else {
                console.log("Error while adding hotel");
            }
        });
    });

    showAddHotel = (()=>{
        if(this.state.modal){
            return(
                <Modal isOpen={this.state.modal} toggle={this.modal} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Add Hotel</ModalHeader>
                    <ModalBody>
                        <Row>

                            <Col xs="12">
                                <FormGroup>

                                    <input type="text" className="form-input" placeholder="Host Id"
                                           onChange={(event)=>{
                                               this.addHotelData.hostId = event.target.value;
                                           }}
                                    />
                                </FormGroup>
                            </Col>
                            <Col xs="12">
                                <FormGroup>
                                    <input type="text" className="form-input" placeholder="Hotel Name"
                                           onChange={(event)=>{
                                               this.addHotelData.hotelName = event.target.value;
                                           }}
                                    />
                                </FormGroup>
                            </Col>
                            <Col xs="12">
                                <FormGroup>
                                    <input type="text" className="form-input" placeholder="Hotel Address"
                                           onChange={(event)=>{
                                               this.addHotelData.hotelAddress = event.target.value;
                                           }}
                                    />
                                </FormGroup>
                            </Col>
                            <Col xs="12">
                                <FormGroup>
                                    <input type="text" className="form-input" placeholder="City"
                                           onChange={(event)=>{
                                               this.addHotelData.city = event.target.value;
                                           }}
                                    />
                                </FormGroup>
                            </Col>
                            <Col xs="12">
                                <FormGroup>
                                    <input type="text" className="form-input" placeholder="State"
                                           onChange={(event)=>{
                                               this.addHotelData.state = event.target.value;
                                           }}
                                    />
                                </FormGroup>
                            </Col>
                            <Col xs="12">
                                <FormGroup>
                                    <input type="number" className="form-input" placeholder="ZipCode"
                                           onChange={(event)=>{
                                               this.addHotelData.zipCode = event.target.value;
                                           }}
                                    />
                                </FormGroup>
                            </Col>
                            <Col xs="12">
                                <FormGroup>
                                    <input type="number" max="5" className="form-input" placeholder="Stars"
                                           onChange={(event)=>{
                                               this.addHotelData.stars = event.target.value;
                                           }}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <input type="button" value="Add Hotel" className="btn btn-primary"
                               onClick={(()=>{this.addHotel(this.addHotelData)})}
                        />


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

    fetchHotels = (()=> {
        console.log("Wil Mount HotelPage");
        API.fetchHotels().then((response) => {
            console.log(response.status);
            if(response.status===200){
                response.json().then((data)=>{
                    console.log(data);
                    this.setState({
                        ...this.state,
                        hotels : data
                    });
                    this.props.setHotelData_Success(data);
                });
            }
        });
    });


    componentWillMount(){
        this.fetchHotels();
    }

    render() {
        return (
            <div className="container-fluid">
                <Switch>
                    <Route exact path="/admin/hotel" render={(()=>{
                        return (
                            <div>
                                <div>
                                    {
                                        this.showAddHotel()
                                    }
                                    <button className="btn btn-primary" onClick={(()=>{
                                        this.setState({
                                            ...this.state,
                                            modal:true
                                        })
                                    })}>Add Hotel</button>
                                </div>
                                {/*<div>*/}
                                <Row>
                                    <Col xs="12" lg="12">
                                        <Card>
                                            <CardHeader>
                                                Hotels
                                            </CardHeader>
                                            <CardBody>
                                                <Table>
                                                    <thead>
                                                    <tr>
                                                        <th>
                                                            Host
                                                        </th>
                                                        <th>
                                                            Hotel Name
                                                        </th>
                                                        <th>
                                                            City
                                                        </th>
                                                        <th>
                                                            State
                                                        </th>
                                                    </tr>
                                                    </thead>
                                                    {
                                                        this.props.state.hotelData.map((hotel, index)=>{
                                                            return(
                                                                <ShowHotels
                                                                    key = {index}
                                                                    hotel = {hotel}
                                                                    fetchHotels = {this.fetchHotels}
                                                                    handlePageChange = {this.props.handlePageChange}
                                                                    editHotel = {this.editHotel}
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
                    <Route path="/admin/hotel/:hotelId" render={((match)=>{
                        return(
                            <EditHotel
                                // groups={this.state.groups}
                                // context={match}
                                {...match}
                                handlePageChange = {this.props.handlePageChange}
                                fetchHotels = {this.fetchHotels}
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
        setHotelData_Success : (data) => {
            dispatch(setHotelData_Success(data))
        }
        ,
        addHotelData_Success: (data) => {
            dispatch(addHotelData_Success(data))
        }
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HotelPage));
