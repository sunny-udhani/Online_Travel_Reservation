import React, {Component} from 'react';
import * as API from "../../../api/admin/API";
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

class EditHost extends Component {

    constructor(){
        super();
        this.state = {
            edit : {},
            hostId : ""
        };
    }

    editHost = ((data)=>{
        console.log(data);
        API.modifyHostData(data).then((response) => {
            console.log(response.status);
            if(response.status===200){
                this.props.fetchHosts({hostId:data.hostId});
                this.props.handlePageChange("/admin/host");
            }
            else if(response.status===300)
            {
                console.log("Nothing to Change");
            }
            else if(response.status===204)
            {
                console.log("Record Exist with edited pair already in database");
            }
            else if(response.status===400)
            {
                console.log("Error while updating data");
            }
            else {
                console.log("Error");
            }
        });
    });

    editHostData = {};

    fetchHostToModify = ((hostId)=>{
        let host = {"hostId" : hostId};
        API.fetchHosts(host).then((response)=>{
            console.log(response.status);
            if(response.status===200) {
                response.json().then((data)=>{
                    console.log(data[0]);
                    this.editHostData = data[0];
                    this.setState(({
                        edit : data[0]
                    }));
                    console.log(this.editHostData);
                });
            }
            else {
                console.log("Error While fetching data");
            }
        });
    });

    componentWillMount(){
        let hostId = this.props.match.params.hostId;
        this.setState({
            ...this.state,
            hostId : hostId
        });
        this.fetchHostToModify(hostId);
    }

    render() {
        return (
            <div className="container-fluid">
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                Edit Host
                            </CardHeader>

                            <CardBody>
                                <div align="center">
                                    <Table>
                                        <tr>
                                            <th>
                                                <label className="h4">Host Id:</label>
                                            </th>
                                            <td>
                                                <input type="text" disabled className="form-control form-input1" value={this.state.edit.hostId}/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">Host Name:</label>
                                            </th>
                                            <td>
                                                <input type="text" className="form-control form-input1" value={this.state.edit.hostName}
                                                       onChange={((event)=>{
                                                           this.setState({
                                                               hostName : event.target.value
                                                           });
                                                           this.editHostData.hostName = event.target.value;
                                                       })}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label className="h4">Host Service Type:</label>
                                            </th>
                                            <td>
                                                <select value={this.state.edit.serviceType} onChange={((event)=>{
                                                    this.setState({
                                                        serviceType : event.target.value
                                                    });
                                                    this.editHostData.serviceType = event.target.value;
                                                })}>
                                                    <option value="flight">flight</option>
                                                    <option value="hotel">hotel</option>
                                                    <option value="car">car</option>
                                                </select>
                                            </td>
                                        </tr>
                                    </Table>
                                </div>
                            </CardBody>
                            <CardFooter className="text-center">
                                <Button type="button" className="btn-primary" value="Edit"
                                        onClick={(()=>{this.editHost(this.editHostData)})}>Save</Button>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Button type="button" className="btn-primary"
                                        onClick={(()=>{this.props.handlePageChange("/admin/host")})}
                                >Back</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default EditHost;
