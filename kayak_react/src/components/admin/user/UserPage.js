import React, {Component} from 'react';
import * as API from "../../../api/admin/API";
import ShowUsers from "./ShowUsers";
import {Switch, Route, withRouter} from 'react-router-dom';
import {connect} from "react-redux"
import EditUser from "./EditUser";
import {setUserData_Success} from "../../../actions";
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


class UserPage extends Component {

    constructor(){
        super();
        this.state = {
            modal : false,
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

    searchUserData = {};

    searchUser = ((data)=>{
        console.log(data);
        let searchQuery = {};
        searchQuery[data.searchBy] = data.searchCriteria;
        console.log(searchQuery);
        this.fetchUsers(searchQuery);
        this.toggleSearch();
    });

    showSearchUser = (()=>{
        if(this.state.searchModal){
            return(
                <Modal isOpen={this.state.searchModal} toggle={this.modal} className={this.props.className}>
                    <ModalHeader toggle={this.toggleSearch}>Search User</ModalHeader>
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
                                                this.searchUserData.searchBy = event.target.value
                                            })}>
                                                <option value="select">select</option>
                                                <option value="username">Username</option>
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
                                                       this.searchUserData.searchCriteria = event.target.value;
                                                   }}
                                            />
                                        </td>
                                    </tr>
                                </Table>
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <input type="button" value="Search User" className="btn btn-primary"
                               onClick={(()=>{this.searchUser(this.searchUserData)})}
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

    fetchUsers = ((data)=> {
        console.log(data);
        API.fetchUsers(data).then((response) => {
            console.log(response.status);
            if(response.status===200){
                response.json().then((data)=>{
                    console.log(data);
                    this.props.setUserData_Success(data);
                });
                showAlert("Users Fetched Successfully", "info", this);
            }
            else if(response.status===204){
                showAlert("Users Not Found", "error", this);
                this.props.setUserData_Success([]);
            }
            else {
                console.log("Error");
            }
        });
    });

    componentWillMount(){
        this.fetchUsers();
    }

    render() {
        return (
            <div className="container-fluid">
                <Switch>
                    <Route exact path="/admin/user" render={(()=>{
                        return (
                            <div>
                                <AlertContainer ref={a => this.msg = a} {...alertOptions}/>
                                <div>
                                    {
                                        this.showSearchUser()
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
                                                    this.fetchUsers()
                                                })}>Clear</Button>
                                                <label className="h4"><b>Users</b></label>
                                            </CardHeader>
                                            <CardBody>
                                                <Table>
                                                    <thead>
                                                    <tr>
                                                        <th>
                                                            <b>Username</b>
                                                        </th>
                                                        <th>
                                                            <b>First Name</b>
                                                        </th>
                                                        <th>
                                                            <b>Last Name</b>
                                                        </th>
                                                        <th>
                                                            <b>Date of Birth</b>
                                                        </th>
                                                    </tr>
                                                    </thead>
                                                    {
                                                        this.props.state.userData.map((user, index)=>{
                                                            return(
                                                                <ShowUsers
                                                                    key = {index}
                                                                    user = {user}
                                                                    fetchUsers = {this.fetchUsers}
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
                    <Route path="/admin/user/:username" render={((match)=>{
                        return(
                            <EditUser
                                {...match}
                                handlePageChange = {this.props.handlePageChange}
                                fetchUsers = {this.fetchUsers}
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
        setUserData_Success : (data) => {
            dispatch(setUserData_Success(data))
        }
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserPage));
