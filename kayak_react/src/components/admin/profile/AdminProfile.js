import React, {Component} from 'react';
import * as API from '../../../api/admin/API';
import AlertContainer from 'react-alert';
import {alertOptions, showAlert} from "../../../alertConfig";
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {
    Badge,
    Row,
    Col,
    Card,
    CardHeader,
    CardFooter,
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

class AdminProfile extends Component {

    constructor(){
        super();
        this.state = {
            admin : {}
        };
    }

    fetchProfile = (()=>{
        API.fetchProfile().then((response) => {
            console.log(response.status);
            if(response.status===200){
                response.json().then((data)=>{
                    console.log(data);
                    this.setState({
                        admin : data[0]
                    });
                    this.editAdminData = data[0];
                });
            }
            else if(response.status===204){
                console.log("No data found for the admin");
            }
            else if(response.status===400){
                console.log("Error while fetching admin data");
            }
            else {
                console.log("Unrecognized Error")
            }
        });
    });

    componentWillMount(){
        this.fetchProfile();
    }

    validate = {
        errors: "default"
    };

    editAdmin = ((data) => {
       console.log(data);
       data.accessInd = "admin";

        console.log(data.zipCode);

        //---------------------------- Zip Code Validation -----------------------------------

        let zipCodePattern = /^\d{5}$|^\d{5}-\d{4}$/;

        let zipCode = parseInt(data.zipCode);

        console.log(" Validating zip code ..... "+zipCodePattern.test(zipCode));

        if(zipCodePattern.test(zipCode)){
            console.log("Successful - entry");
            API.modifyUserData(data).then((response)=>{
                console.log(response.status);
                if(response.status===200){
                    this.fetchProfile();
                    showAlert("Admin details Edited Successfully", "info", this);
                }
                else {
                    showAlert("Admin details modification Unsuccessfully", "error", this);
                }
            });
        }
        else {
            showAlert("Zipcode invalid. Please enter zipcode in valid format ", "error", this);
        }

    });

    editAdminData = {};

    render() {
        return (
            <div className="container-fluid">
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                Admin
                            </CardHeader>

                            <CardBody>
                                <div align="center">
                                    <AlertContainer ref={a => this.msg = a} {...alertOptions}/>
                                    <Table>
                                        <tr>
                                            <th>
                                                <label className="h4">Username:</label>
                                            </th>
                                            <td>
                                                <input type="text" disabled className="form-control form-input1" value={this.state.admin.username}/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">First Name:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1" value={this.state.admin.firstName}
                                                       onChange={((event)=>{
                                                           this.setState({
                                                               ...this.state
                                                           });
                                                           this.editAdminData.firstName = event.target.value;
                                                       })}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">Last Name:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1" value={this.state.admin.lastName}
                                                       onChange={((event)=>{
                                                           this.setState({
                                                               ...this.state
                                                           });
                                                           this.editAdminData.lastName = event.target.value;
                                                       })}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">Date Of Birth:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1"
                                                       value={(this.state.admin.dateofbirth === undefined
                                                       ||  this.state.admin.dateofbirth === null)
                                                           ?
                                                            "" : this.state.admin.dateofbirth.substring(0,
                                                               this.state.admin.dateofbirth.indexOf('T'))}
                                                       onChange={((event)=>{
                                                           this.setState({
                                                               ...this.state
                                                           });
                                                           this.editAdminData.dateofbirth = event.target.value;
                                                       })}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">Gender:</label>
                                            </th>
                                            <td>
                                                <select value={this.state.admin.gender}
                                                        onChange={((event)=>{
                                                            this.setState({
                                                                ...this.state
                                                            });
                                                            this.editAdminData.gender = event.target.value
                                                        })}
                                                >
                                                    <option value="female">Female</option>
                                                    <option value="male">Male</option>
                                                    <option value="notSpecified">Prefer Not to Say</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">Phone Number:</label>
                                            </th>
                                            <td>
                                                <input type="number" className="form-control form-input1"
                                                       value={this.state.admin.phoneNumber}
                                                       onChange={((event)=>{
                                                           this.setState({
                                                               ...this.state
                                                           });
                                                           this.editAdminData.phoneNumber = event.target.value;
                                                       })}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">Street:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1" value={this.state.admin.street}
                                                       onChange={((event)=>{
                                                           this.setState({
                                                               ...this.state
                                                           });
                                                           this.editAdminData.street = event.target.value;
                                                       })}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">City:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1"
                                                       value={this.state.admin.city}
                                                       onChange={((event)=>{
                                                           this.setState({
                                                               ...this.state
                                                           });
                                                           this.editAdminData.city = event.target.value;
                                                       })}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">State:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1"
                                                       value={this.state.admin.state}
                                                       onChange={((event)=>{
                                                           this.setState({
                                                               ...this.state
                                                           });
                                                           this.editAdminData.state = event.target.value;
                                                       })}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">Zip Code:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1"
                                                       value={this.state.admin.zipCode}
                                                       onChange={((event)=>{
                                                           this.setState({
                                                               ...this.state
                                                           });
                                                           this.editAdminData.zipCode = event.target.value;
                                                       })}
                                                />
                                            </td>
                                        </tr>
                                    </Table>
                                </div>
                                <div id="errors">

                                </div>
                            </CardBody>
                            <CardFooter className="text-center">
                                <Button type="button" className="btn-primary" value="Edit"
                                        onClick={(()=>{this.editAdmin(this.editAdminData)})}>Save</Button>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Button type="button" className="btn-primary"
                                        onClick={(()=>{this.props.handlePageChange("/admin/profile")})}
                                >Reset</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}


export default AdminProfile;