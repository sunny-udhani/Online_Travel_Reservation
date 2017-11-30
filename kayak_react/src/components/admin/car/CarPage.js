import React, {Component} from 'react';
import * as API from "../../../api/admin/API";
import ShowCars from "./ShowCars";
import EditCar from "./EditCar";
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
import {setCarData_Success, addCarData_Success} from "../../../actions";


class CarPage extends Component {

    constructor(){
        super();
        this.state = {
            modal : false
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

    addCar = ((carData)=>{
        console.log(carData);
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
            }
            else {
                console.log("Error while adding Car");
            }
        });
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
            else {
                console.log("Error");
            }
        });
    });


    componentWillMount(){
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

                                    <input type="text" className="form-input" placeholder="Host Id"
                                           onChange={(event)=>{
                                               this.addCarData.hostId = event.target.value;
                                           }}
                                    />
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

                                </div>
                                <Row>
                                    <Col xs="12" lg="12">
                                        <Card>
                                            <CardHeader>
                                                Cars

                                                <Button className="btn-primary pull-right" onClick={(()=>{
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
                                                            Host
                                                        </th>
                                                        <th>
                                                            Car Name
                                                        </th>
                                                        <th>
                                                            Car Type
                                                        </th>
                                                        <th>
                                                            Car Make
                                                        </th>
                                                        <th>
                                                            City
                                                        </th>
                                                        <th>
                                                            Zipcode
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
        }
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CarPage));