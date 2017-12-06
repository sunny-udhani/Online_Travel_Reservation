import React, {Component} from 'react';
import * as API from "../../../api/admin/API";
import ShowHotels from "./ShowHotels";
import {Switch, Route} from 'react-router-dom';
import {connect} from "react-redux"
import AlertContainer from 'react-alert';
import {alertOptions, showAlert} from "../../../alertConfig";
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
import {setHotelData_Success, addHotelData_Success, setHostData_Success} from "../../../actions";
import EditHotel from "./EditHotel";
import withRouter from "react-router-dom/es/withRouter";

class HotelPage extends Component {

    constructor(){
        super();
        this.state = {
            modal : false,
            hotels : [],
            searchModal : false
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

    validate = {
      errors: "default"
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

    searchHotelData = {};

    searchHotel = ((data)=>{
        console.log(data);
        let searchQuery = {};
        searchQuery[data.searchBy] = data.searchCriteria;
        console.log(searchQuery);
        this.fetchHotels(searchQuery);
        this.toggleSearch();
    });

    addHotel = ((hotelData)=>{

        console.log(hotelData);

        //---------------------------- Zip Code Validation -----------------------------------

        let zipCodePattern = /^\d{5}$|^\d{5}-\d{4}$/;

        let zipCode = parseInt(this.addHotelData.zipCode);

        console.log(" Validating zip code ..... "+zipCodePattern.test(zipCode));

        if(zipCodePattern.test(zipCode)){
            console.log("Successful - entry");
            API.addHotel(hotelData).then((response)=>{
                console.log(response.status);
                if(response.status===200){
                    showAlert("Hotel Added Successfully", "info", this);
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
                    showAlert("Error while adding Hotels", "error", this);
                    console.log("Error while adding hotel");
                }
            });
        }
        else {
            showAlert("Invalid Zipcode.", "error", this);
        }
    });

    showAddHotel = (()=>{
        // alert(this.props.className);
        if(this.state.modal){
            return(
                <Modal isOpen={this.state.modal} toggle={this.modal} className={this.props.className || "admin-modal"}>
                    <ModalHeader toggle={this.toggle}>Add Hotel</ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col xs="12">
                                <FormGroup>
                                    Select Host:
                                    <select onChange={((event)=>{
                                        let temp = event.target.value.split("_");
                                        console.log(temp);
                                        this.addHotelData.hostId = temp[0];
                                        this.addHotelData.hotelName = temp[1];

                                    })}>
                                        <option>Select Host</option>
                                        {
                                            this.props.state.hostData.map((host) => {
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
                            <Col xs="12">
                                <div id="errors">

                                </div>
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

    showSearchHotel = (()=>{
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
                                                this.searchHotelData.searchBy = event.target.value
                                            })}>
                                                <option value="select " selected="true">select</option>
                                                <option value="hotelName">Hotel Name</option>
                                                <option value="city">City</option>
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
                                                       this.searchHotelData.searchCriteria = event.target.value;
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
                               onClick={(()=>{this.searchHotel(this.searchHotelData)})}
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

    fetchHotels = ((data)=> {
        console.log("Wil Mount HotelPage");
        console.log(data);
        API.fetchHotels(data).then((response) => {
            console.log(response.status);
            if(response.status===200){
                response.json().then((data)=>{
                    console.log(data);
                    this.props.setHotelData_Success(data);
                });
            }
            else if(response.status===204){
                this.props.setHotelData_Success([]);
                showAlert("No Record found","info",this);
            }
            else {
                showAlert("Error while fetching Hotel data","error",this);
            }
        });
    });


    componentWillMount(){
        API.fetchHosts({serviceType:"hotel"}).then((response) => {
            console.log(response.status);
            if(response.status===200){
                response.json().then((data)=>{
                    console.log(data);
                    this.props.setHostData_Success(data);
                });
            }
            else if(response.status===204){
                showAlert("No Host found","info",this);
                console.log("Hosts Not Found");
            }
            else {
                console.log("Error");
            }
        });
        this.fetchHotels();
    }

    render() {
        return (
            <div className="container-fluid">
                <Switch>
                    <Route exact path="/admin/hotel" render={(()=>{
                        return (
                            <div>
                                <AlertContainer ref={a => this.msg = a} {...alertOptions}/>
                                <div>
                                    {
                                        this.showAddHotel()
                                    }
                                    {
                                        this.showSearchHotel()
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
                                                    this.fetchHotels();
                                                })}>Clear</Button>
                                                <label className="h4"><b>Hotels</b></label>
                                                <Button className="btn btn-link pull-right" onClick={(()=>{
                                                    this.setState({
                                                        ...this.state,
                                                        modal:true
                                                    })
                                                })}>Add Hotel</Button>
                                            </CardHeader>
                                            <CardBody>
                                                <Table>
                                                    <thead>
                                                    <tr>
                                                        <th>
                                                            <b>Host</b>
                                                        </th>
                                                        <th>
                                                            <b>Hotel Name</b>
                                                        </th>
                                                        <th>
                                                            <b>City</b>
                                                        </th>
                                                        <th>
                                                            <b>State</b>
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
        },
        setHostData_Success: (data) => {
            dispatch(setHostData_Success(data))
        }
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HotelPage));
