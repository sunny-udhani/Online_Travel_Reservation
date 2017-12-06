import React, {Component} from 'react';
import * as API from "../../../api/admin/API";
import ShowCars from "./ShowCars";
import EditCar from "./EditCar";
import {Switch, Route, withRouter} from 'react-router-dom';
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
    InputGroupButton
} from 'reactstrap';
import {setCarData_Success, addCarData_Success, setHostData_Success} from "../../../actions";


class CarPage extends Component {

    constructor(){
        super();
        this.state = {
            modal : false,
            searchModal : false
        };
    }

    addCarData = {
        hostId: "",
        carName: "",
        carType: "",
        carMake: "",
        carModel: "",
        capacity: "",
        city: "",
        state: "",
        zipCode: 0,
        price: 0,
    };

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

    validate = {
        errors: "default"
    };

    addCar = ((carData)=>{

        console.log(carData);

        //---------------------------- Zip Code Validation -----------------------------------

        let zipCodePattern = /^\d{5}$|^\d{5}-\d{4}$/;

        let zipCode = parseInt(this.addCarData.zipCode);

        console.log(" Validating zip code ..... "+zipCodePattern.test(zipCode));

        if(zipCodePattern.test(zipCode)){
            console.log("Successful - entry");
            API.addCar(carData).then((response)=>{
                console.log(response.status);
                if(response.status===200){
                    response.json().then((data)=>{
                        console.log(data);
                        this.setState({
                            ...this.state,
                            modal : false
                        });
                        this.props.addCarData_Success(data);
                    });
                    showAlert("Car added successfully", "info", this);
                }
                else {
                    showAlert("Error while adding Car", "error", this);
                    console.log("Error while adding Car");
                }
            });
        }
        else {
            showAlert("Invalid Zipcode", "error", this);
        }
    });

    fetchCars = ((data)=> {
        console.log("Wil Mount CarPage");
        API.fetchCars(data).then((response) => {
            console.log(response.status);
            if(response.status===200){
                response.json().then((data)=>{
                    console.log(data);
                    /*this.setState({
                        ...this.state,
                        cars : data
                    });*/
                    this.props.setCarData_Success(data);
                });
            }
            else if(response.status===204){
                this.props.setCarData_Success([]);
                showAlert("No Record found","info",this);
            }
            else {
                showAlert("Error while fetching Hotel data","error",this);
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

    fetchHosts = (()=>{
        API.fetchHosts({serviceType:"car"}).then((response) => {
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
                console.log("Error");
            }
        });
    });

    componentWillMount(){
        this.fetchHosts();
        this.fetchCars();
    }

    showAddCar = (()=>{
        if(this.state.modal){
            return(
                <Modal isOpen={this.state.modal} toggle={this.modal} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Add Car</ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col xs="12">
                                <FormGroup>
                                    Host :
                                    <select onChange={((event)=>{
                                        this.addCarData.hostId = event.target.value;
                                    })}>
                                        <option>Select Host</option>
                                        {
                                            this.props.state.hostData.map((host)=>{
                                                console.log(host);
                                                if(host.serviceType==="car"){
                                                    return(
                                                        <option value={host.hostId}>{host.hostName}</option>
                                                    )
                                                }
                                            })
                                        }
                                    </select>
                                    {/*<input type="text" className="form-input" placeholder="Host Id"
                                           onChange={(event)=>{
                                               this.addCarData.hostId = event.target.value;
                                           }}
                                    />*/}
                                </FormGroup>
                            </Col>
                            <Col xs="12">
                                <FormGroup>
                                    <input type="text" className="form-input" placeholder="Car Name"
                                           onChange={(event)=>{
                                               this.addCarData.carName = event.target.value;
                                           }}
                                    />
                                </FormGroup>
                            </Col>
                            <Col xs="12">
                                <FormGroup>
                                    <input type="text" className="form-input" placeholder="Car Type"
                                           onChange={(event)=>{
                                               this.addCarData.carType = event.target.value;
                                           }}
                                    />
                                </FormGroup>
                            </Col>
                            <Col xs="12">
                                <FormGroup>
                                    <input type="text" className="form-input" placeholder="Car Make"
                                           onChange={(event)=>{
                                               this.addCarData.carMake = event.target.value;
                                           }}
                                    />
                                </FormGroup>
                            </Col>
                            <Col xs="12">
                                <FormGroup>
                                    <input type="text" className="form-input" placeholder="Car Model"
                                           onChange={(event)=>{
                                               this.addCarData.carModel = event.target.value;
                                           }}
                                    />
                                </FormGroup>
                            </Col>
                            <Col xs="12">
                                <FormGroup>
                                    <input type="number" className="form-input" placeholder="Passenger Capacity"
                                           onChange={(event)=>{
                                               this.addCarData.capacity = event.target.value;
                                           }}
                                    />
                                </FormGroup>
                            </Col>
                            <Col xs="12">
                                <FormGroup>
                                    <input type="number" className="form-input" placeholder="Price"
                                           onChange={(event)=>{
                                               this.addCarData.price = event.target.value;
                                           }}
                                    />
                                </FormGroup>
                            </Col>
                            <Col xs="12">
                                <FormGroup>
                                    <input type="text" className="form-input" placeholder="City"
                                           onChange={(event)=>{
                                               this.addCarData.city = event.target.value;
                                           }}
                                    />
                                </FormGroup>
                            </Col>
                            <Col xs="12">
                                <FormGroup>
                                    <input type="text" className="form-input" placeholder="State"
                                           onChange={(event)=>{
                                               this.addCarData.state = event.target.value;
                                           }}
                                    />
                                </FormGroup>
                            </Col>
                            <Col xs="12">
                                <FormGroup>
                                    <input type="number" className="form-input" placeholder="ZipCode"
                                           onChange={(event)=>{
                                               this.addCarData.zipCode = event.target.value;
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
                        <input type="button" value="Add Car" className="btn btn-primary"
                               onClick={(()=>{this.addCar(this.addCarData)})}
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
                                            <option value="select " selected="true">select</option>
                                            <option value="carType">Car Type</option>
                                            <option value="carMake">Car Make</option>
                                            <option value="carName">Car Name</option>
                                            <option value="city">City</option>
                                            <option value="capacity">Capacity</option>
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
                    <Route exact path="/admin/car" render={(()=>{
                        return (
                            <div>
                                <div>
                                    {
                                        this.showAddCar()
                                    }
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
                                                    this.fetchCars()
                                                })}>Clear</Button>
                                                <label className="h4"><b>Cars</b></label>
                                                <Button className="btn btn-link pull-right" onClick={(()=>{
                                                    this.setState({
                                                        ...this.state,
                                                        modal:true
                                                    })
                                                })}>Add Car</Button>
                                            </CardHeader>
                                            <CardBody>
                                                <Table>
                                                    <thead>
                                                    <tr>
                                                        <th>
                                                            <b>Host</b>
                                                        </th>
                                                        <th>
                                                            <b>Car Name</b>
                                                        </th>
                                                        <th>
                                                            <b>Car Type</b>
                                                        </th>
                                                        <th>
                                                            <b>Car Make</b>
                                                        </th>
                                                        <th>
                                                            <b>City</b>
                                                        </th>
                                                        <th>
                                                            <b>Zipcode</b>
                                                        </th>
                                                    </tr>
                                                    </thead>
                                                    {console.log(this.props.state.carData)}
                                                    {

                                                        this.props.state.carData.map((car, index)=>{
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
                                            <AlertContainer ref={a => this.msg = a} {...alertOptions}/>
                                        </Card>
                                    </Col>
                                </Row>
                            </div>
                        )
                    })}/>
                    <Route path="/admin/car/:carId" render={((match)=>{
                        return(
                            <EditCar
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
        setCarData_Success : (data) => {
            dispatch(setCarData_Success(data))
        }
        ,
        addCarData_Success: (data) => {
            dispatch(addCarData_Success(data))
        },
        setHostData_Success: (data) => {
            dispatch(setHostData_Success(data))
        }

    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CarPage));