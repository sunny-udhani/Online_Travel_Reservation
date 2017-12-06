import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from "react-redux"
import {editProfile} from "../../../../api/user/API_EditProfile";
import {Link} from 'react-router-dom';
import '../bootstrap/dist/css/bootstrap.min.css';


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


class EditUserInfo extends Component {

    static propTypes = {
        //handleSubmitRegister: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
    }

    componentWillMount() {
        if (!this.props.isLoggedIn) {
            this.props.handlePageChange("/u");
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleSubmitClick() {
        console.log(this.state);

        let userdata = new FormData();

        userdata.append("firstname", this.state.firstname);
        userdata.append("lastname", this.state.lastname);
        userdata.append("dob", this.state.dob);
        userdata.append("gender", this.state.gender);
        userdata.append("street", this.state.street);
        userdata.append("city", this.state.city);
        userdata.append("state", this.state.state);
        userdata.append("zipCode", this.state.zipCode);
        userdata.append("phnumber", this.state.phonenumber);

        editProfile(userdata)
            .then((res) => {
                if (res.status === 200) {

                    // console.log(this.props);
                    this.props.handlePageChange("/pref");
                }

                else if (res.status === 401) {
                    console.log("User not found");
                    alert("User Info Already Exists");
                }
                else {
                    console.log("Failed to Add  ");
                }
            })
            .catch((err) => {
                console.log(err);
            })
    };


    render() {

        return (
            <Modal isOpen={true} className="signup-modal">
                <ModalHeader>Edit Details</ModalHeader>
                <ModalBody>
                    <Row>

                        <Col xs="12">
                            <FormGroup>
                                <input type="text" name="firstname" className="form-input" placeholder="FirstName"
                                       required={true}
                                       onChange={(event) => {
                                           this.handleChange(event);
                                       }}
                                />
                            </FormGroup>
                        </Col>
                        <Col xs="12">
                            <FormGroup>
                                <input type="text" name="lastname" className="form-input" placeholder="LastName"
                                       required
                                       onChange={(event) => {
                                           this.handleChange(event);
                                       }}
                                />
                            </FormGroup>
                        </Col>
                        <Col xs="12">
                            <FormGroup>
                                <input type="date" name="dob" className="form-input" placeholder="DOB" required
                                       onChange={(event) => {
                                           this.handleChange(event);
                                       }}
                                />
                            </FormGroup>
                        </Col>
                        <Col xs="12">
                            <FormGroup>
                                <input onChange={(e) => this.handleChange(e)} type="radio"
                                       id="genderChoice1"
                                       name="gender" value="male"/>
                                <label className=""><h6>Male</h6></label>
                                <input onChange={(e) => this.handleChange(e)} type="radio"
                                       id="genderChoice2"
                                       name="gender" value="female"/>
                                <label className=""><h6>Female</h6></label>
                                <input onChange={(e) => this.handleChange(e)} type="radio"
                                       id="genderChoice4"
                                       name="gender" value="notSpecified"/>
                                <label className=""><h6>Prefer not to say</h6></label>
                            </FormGroup>
                        </Col>
                        <Col xs="12">
                            <FormGroup>
                                <input type="text" name="street" className="form-input" placeholder="Street" required
                                       onChange={(event) => {
                                           this.handleChange(event);
                                       }}
                                />
                            </FormGroup>
                        </Col>
                        <Col xs="12">
                            <FormGroup>
                                <input type="text" name="city" required className="form-input" placeholder="City"
                                       onChange={(event) => {
                                           this.handleChange(event);
                                       }}
                                />
                            </FormGroup>
                        </Col>
                        <Col xs="12">
                            <FormGroup>
                                <input type="text" name="state" className="form-input" placeholder="State" required
                                       onChange={(event) => {
                                           this.handleChange(event);
                                       }}
                                />
                            </FormGroup>
                        </Col>
                        <Col xs="12">
                            <FormGroup>
                                <input type="text" name="zipCode" className="form-input" placeholder="zipcode" required
                                       onChange={(event) => {
                                           this.handleChange(event);
                                       }}
                                />
                            </FormGroup>
                        </Col>
                        <Col xs="12">
                            <FormGroup>
                                <input type="text" name="phonenumber" minlength="10" maxlength="10"
                                       className="form-input" placeholder="Phn No" required
                                       onChange={(event) => {
                                           this.handleChange(event);
                                       }}
                                />
                            </FormGroup>
                        </Col>

                    </Row>
                </ModalBody>
                <ModalFooter>
                    <input type="button" value="Edit" className="btn btn-primary"
                           onClick={() => this.handleSubmitClick()}
                    />
                    <Link className="btn btn-danger" id="cancelcard" to="/pref">Cancel</Link>


                </ModalFooter>
            </Modal>
        );
    }
}

function mapStateToProps(state) {
    return {
        username: state.username,
        isLoggedIn: state.isLoggedIn,
    }
}


export default withRouter(connect(mapStateToProps, null)(EditUserInfo));