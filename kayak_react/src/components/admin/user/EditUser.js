import React, {Component} from 'react';
import * as API from "../../../api/admin/API";
import AlertContainer from 'react-alert';
import {alertOptions, showAlert} from "../../../alertConfig";
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

class EditUser extends Component {

    constructor(){
        super();
        this.state = {
            edit : {},
            username : ""
        };
    }

    validate = {
        errors: "default"
    };

    editUser = ((data)=>{
        console.log(data);
        data.accessInd = "user";

        console.log(data.zipCode);

        //---------------------------- Zip Code Validation -----------------------------------

        let zipCodePattern = /^\d{5}$|^\d{5}-\d{4}$/;

        let zipCode = parseInt(data.zipCode);

        console.log(" Validating zip code ..... "+zipCodePattern.test(zipCode));

        if(zipCodePattern.test(zipCode)){
            console.log("Successful - entry");
            API.modifyUserData(data).then((response) => {
                console.log(response.status);
                if(response.status===200){
                    this.props.fetchUsers({username:data.username});
                    this.props.handlePageChange("/admin/user");
                    showAlert("User Details Edited successfully", "info", this);
                }
                else if(response.status===300)
                {
                    showAlert("Failed to edit user details", "error", this);
                    console.log("Nothing to Change");
                }
                else if(response.status===204)
                {
                    showAlert("Failed to edit user details", "error", this);
                    console.log("Record Exist with edited pair already in database");
                }
                else if(response.status===400)
                {
                    showAlert("Failed to edit user details", "error", this);
                    console.log("Error while updating data");
                }
                else {
                    showAlert("Failed to edit user details", "error", this);
                    console.log("Error");
                }
            });
        }
        else {
            showAlert("Invalid Zipcode.", "error", this);
        }
    });

    editUserData = {};

    fetchUserToModify = ((username)=>{
        let user = {"username" : username};
        API.fetchUsers(user).then((response)=>{
            console.log(response.status);
            if(response.status===200) {
                response.json().then((data)=>{
                    console.log(data[0]);
                    this.editUserData = data[0];
                    this.setState(({
                        edit : data[0]
                    }));
                    console.log(this.editUserData);
                });
            }
            else {
                showAlert("Failed to fetch user details", "error", this);
                console.log("Error While fetching data");
            }
        });
    });

    componentWillMount(){
        let username = this.props.match.params.username;
        this.setState({
            ...this.state,
            username : username
        });
        this.fetchUserToModify(username);
    }

    render() {
        return (
            <div className="container-fluid">
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <AlertContainer ref={a => this.msg = a} {...alertOptions}/>
                            <CardHeader>
                                User
                            </CardHeader>

                            <CardBody>
                                <div align="center">
                                    <Table>
                                        <tr>
                                            <th>
                                                <label className="h4">Username:</label>
                                            </th>
                                            <td>
                                                <input type="text" disabled className="form-control form-input1" value={this.state.edit.username}/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">First Name:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1" value={this.state.edit.firstName}
                                                       onChange={((event)=>{
                                                           this.setState({
                                                               ...this.state
                                                           });
                                                           this.editUserData.firstName = event.target.value;
                                                       })}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">Last Name:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1" value={this.state.edit.lastName}
                                                       onChange={((event)=>{
                                                           this.setState({
                                                               ...this.state
                                                           });
                                                           this.editUserData.lastName = event.target.value;
                                                       })}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">Date Of Birth:</label>
                                            </th>
                                            <td>
                                                <input type="date" className="form-control form-input1"
                                                       value={this.state.edit.dateofbirth === undefined ? "" : this.state.edit.dateofbirth.substring(0, this.state.edit.dateofbirth.indexOf('T'))}
                                                       onChange={((event)=>{
                                                           this.setState({
                                                               ...this.state
                                                           });
                                                           this.editUserData.dateofbirth = event.target.value;
                                                       })}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">Gender:</label>
                                            </th>
                                            <td>
                                                <select value={this.state.edit.gender}
                                                        onChange={((event)=>{
                                                            this.setState({
                                                                ...this.state
                                                            });
                                                            this.editUserData.gender = event.target.value
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
                                                <input type="number" className="form-control form-input1" value={this.state.edit.phoneNumber}
                                                       onChange={((event)=>{
                                                           this.setState({
                                                               ...this.state
                                                           });
                                                           this.editUserData.phoneNumber = event.target.value;
                                                       })}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">Street:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1" value={this.state.edit.street}
                                                       onChange={((event)=>{
                                                           this.setState({
                                                               ...this.state
                                                           });
                                                           this.editUserData.street = event.target.value;
                                                       })}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">City:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1" value={this.state.edit.city}
                                                       onChange={((event)=>{
                                                           this.setState({
                                                               ...this.state
                                                           });
                                                           this.editUserData.city = event.target.value;
                                                       })}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">State:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1" value={this.state.edit.state}
                                                       onChange={((event)=>{
                                                           this.setState({
                                                               ...this.state
                                                           });
                                                           this.editUserData.state = event.target.value;
                                                       })}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">Zip Code:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1" value={this.state.edit.zipCode}
                                                       onChange={((event)=>{
                                                           this.setState({
                                                               ...this.state
                                                           });
                                                           this.editUserData.zipCode = event.target.value;
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
                                        onClick={(()=>{this.editUser(this.editUserData)})}>Save</Button>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Button type="button" className="btn-primary"
                                        onClick={(()=>{this.props.handlePageChange("/admin/user")})}
                                >Back</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default EditUser;
