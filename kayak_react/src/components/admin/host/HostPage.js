import React, {Component} from 'react';
import * as API from "../../../api/admin/API";
import ShowHosts from "./ShowHosts";
import {Switch, Route, withRouter} from 'react-router-dom';
import {connect} from "react-redux"
import EditHost from "./EditHost";
import {setHostData_Success, addHostData_Success} from "../../../actions";
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


class HostPage extends Component {

    constructor(){
        super();
        this.state = {
            modal : false,
            searchModal : false
        };
    }

    handleSubmit = () => {
    };

    addHostData = {
        hostName : "",
        serviceType : ""
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

    searchHostData = {};

    searchHost = ((data)=>{
        console.log(data);
        let searchQuery = {};
        searchQuery[data.searchBy] = data.searchCriteria;
        console.log(searchQuery);
        this.fetchHosts(searchQuery);
        this.toggleSearch();
    });

    addHost = ((hostData)=>{
        if(hostData.hostServiceType!=="select"){
            console.log(hostData);
            API.addHost(hostData).then((response)=>{
                console.log(response.status);
                if(response.status===200){
                    response.json().then((data)=>{
                        console.log(data);
                        // this.fetchHotels();
                        showAlert("Host Added Successfully", "info", this);
                        this.props.addHostData_Success(data[0]);
                    });
                }
                else if(response.status===201){
                    showAlert("Failed to add new Host", "error", this);
                    console.log("Data inserted successfully. But failed to fetch added data. Refresh")
                }
                else if(response.status===300){
                    showAlert("Failed to add new Host", "error", this);
                    console.log("Host already exist");
                }
                else {
                    showAlert("Failed to add new Host", "error", this);
                    console.log("Error while adding hotel");
                }
                this.toggle();
            });
        }
        else {
            console.log("Please select Host Service Type");
        }

    });

    showAddHost = (()=>{
        if(this.state.modal){
            return(
                <Modal isOpen={this.state.modal} toggle={this.modal} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Add Host</ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col xs="12">
                                <Table>
                                    <tr>
                                        <td>
                                            <label>Host Name</label>
                                        </td>
                                        <td>
                                            <input type="text" className="form-control form-input1" placeholder="Host Id"
                                                   onChange={(event)=>{
                                                       this.addHostData.hostName = event.target.value;
                                                   }}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label>Service Type:</label>
                                        </td>
                                        <td>
                                            <select
                                                onChange={(event)=>{
                                                    this.addHostData.serviceType = event.target.value;
                                                }}
                                            >
                                                <option value="select">select</option>
                                                <option value="flight">flight</option>
                                                <option value="hotel">hotel</option>
                                                <option value="car">car</option>
                                            </select>
                                        </td>
                                    </tr>
                                </Table>
                                <FormGroup>

                                </FormGroup>
                            </Col>
                            <Col xs="12">
                                <FormGroup>

                                </FormGroup>
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <input type="button" value="Add Host" className="btn btn-primary"
                               onClick={(()=>{this.addHost(this.addHostData)})}
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

    showSearchHost = (()=>{
        if(this.state.searchModal){
            return(
                <Modal isOpen={this.state.searchModal} toggle={this.modal} className={this.props.className}>
                    <ModalHeader toggle={this.toggleSearch}>Search Host</ModalHeader>
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
                                                this.searchHostData.searchBy = event.target.value
                                            })}>
                                                <option value="select">select</option>
                                                <option value="hostId">Host </option>
                                                <option value="hostName">Host Name</option>
                                                <option value="serviceType">Host Service Type</option>
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
                                                       this.searchHostData.searchCriteria = event.target.value;
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
                        <input type="button" value="Search Host" className="btn btn-primary"
                               onClick={(()=>{this.searchHost(this.searchHostData)})}
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

    fetchHosts = ((data)=> {
        console.log("Wil Mount HostPage");
        console.log(data);
        API.fetchHosts(data).then((response) => {
            console.log(response.status);
            if(response.status===200){
                response.json().then((data)=>{
                    console.log(data);
                    this.props.setHostData_Success(data);
                });
            }
            else if(response.status===204){
                console.log("Hosts Not Found");
            }
            else {
                console.log("Error");
            }
        });
    });

    componentWillMount(){
        this.fetchHosts();
    }

    render() {
        return (
            <div className="container-fluid">
                <Switch>
                    <Route exact path="/admin/host" render={(()=>{
                        return (
                            <div>
                                <AlertContainer ref={a => this.msg = a} {...alertOptions}/>
                                <div>
                                    {
                                        this.showAddHost()
                                    }
                                    {
                                        this.showSearchHost()
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
                                                    this.fetchHosts()
                                                })}>Clear</Button>
                                                <label className="h4"><b>Hosts</b></label>
                                                <Button className="btn btn-link pull-right" onClick={(()=>{
                                                    this.setState({
                                                        ...this.state,
                                                        modal:true
                                                    })
                                                })}>Add Host</Button>
                                            </CardHeader>
                                            <CardBody>
                                                <Table>
                                                    <thead>
                                                    <tr>
                                                        <th>
                                                            <b>Host Id</b>
                                                        </th>
                                                        <th>
                                                            <b>Host Name</b>
                                                        </th>
                                                        <th>
                                                            <b>Service Provided</b>
                                                        </th>
                                                    </tr>
                                                    </thead>
                                                    {
                                                        this.props.state.hostData.map((host, index)=>{
                                                            return(
                                                                <ShowHosts
                                                                    key = {index}
                                                                    host = {host}
                                                                    fetchHosts = {this.fetchHosts}
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
                    <Route path="/admin/host/:hostId" render={((match)=>{
                        return(
                            <EditHost
                                {...match}
                                handlePageChange = {this.props.handlePageChange}
                                fetchHosts = {this.fetchHosts}
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
        setHostData_Success : (data) => {
            dispatch(setHostData_Success(data))
        }
        ,
        addHostData_Success: (data) => {
            dispatch(addHostData_Success(data))
        }
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HostPage));
