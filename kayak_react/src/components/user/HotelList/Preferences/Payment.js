import React, {Component} from 'react';
import './styles-user/payment.css';
import {Route, withRouter} from 'react-router-dom';
import '../bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';
import {connect} from "react-redux"
import {addUserCard} from "../../../../api/user/API_AddUserCard"


export default class Payment extends Component {

    state={

        nameoncard:'',
        cardnumber:'',
        monthexpiry:'',
        yearexpiry:'',
        streetone:'',
        streettwo:'',
        city:'',
        stateuser:'',
        postcode:'',
        country:'',
        cvv:'',
    };

    handleCancel(){
        this.props.history.push('/u/payinfo');
    }

    handleSubmitCard(e){
        e.preventDefault();

        console.log(this.state.nameoncard);

        var formdata=new FormData();
        formdata.append("username","Pritam@gmail.com");
        formdata.append("nameoncard",this.state.nameoncard);
        formdata.append("cardnumber",this.state.cardnumber);
        formdata.append("monthexpiry",this.state.monthexpiry);
        formdata.append("yearexpiry",this.state.yearexpiry);
        formdata.append("streetone",this.state.streetone);
        formdata.append("streettwo",this.state.streettwo);
        formdata.append("city",this.state.city);
        formdata.append("stateuser",this.state.stateuser);
        formdata.append("postcode",this.state.postcode);
        formdata.append("country",this.state.country);
        formdata.append("cvv",this.state.cvv);
        console.log(formdata);
          /* addUserCard(formdata)
               .then((res) => {
                   console.log("gotya");

            }).catch((err) => {

            console.log(err);
        })*/




    }
    handleName(event){
        this.setState({
            nameoncard: event.currentTarget.value
        })
   }

    handleCardNumber(event){
        this.setState({
            cardnumber:event.currentTarget.value
        })
    }
    handleMonth(event){
        this.setState({
            monthexpiry:event.currentTarget.value
        })
    }
    handleYear(event){
        this.setState({
           yearexpiry :event.currentTarget.value
        })
    }

    handleStreetOne(event){
        this.setState({
            streetone :event.currentTarget.value
        })
    }
    handleStreetTwo(event){
        this.setState({
            streettwo :event.currentTarget.value
        })
    }
    handleCity(event){
        this.setState({
            city :event.currentTarget.value
        })
    }
    handleState(event){
        this.setState({
            stateuser :event.currentTarget.value
        })
    }
    handlePostcode(event){
        this.setState({
            postcode :event.currentTarget.value
        })
    }
    handleCountry(event){
        this.setState({
            country :event.currentTarget.value
        })
    }

    handleCvvNumber(event){
        this.setState({
            cvv :event.currentTarget.value
        })
    }


    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3-paymentnavbar">
                        <Navbar/>
                    </div>
                    <div className="col-md-8-paymentnavbar">
                        <div className="heading-container1">
                            <h2 className="header0-preferences">Payment-Methods</h2>
                        </div>

                        <div className="heading-container2">
                            <h5 className="header1-preferences">Credit and Debit cards</h5>
                        </div>
                        <div className="heading-container3">
                            <h5 className="header2-preferences">Billing Information</h5>
                        </div>

                        <form className="payment-details" method="POST" onSubmit={this.handleSubmitCard.bind(this)} >
                            <div className="informationofcard">
                                <div className="form-group pull-left">
                                    <input id="textinput" name="nameoncard" placeholder="Name on Card"
                                           className="form-control" required="" type="text" onChange={this.handleName.bind(this)}/>
                                </div>
                                <div className="form-group">
                                    <input id="textinput" name="cardnumber" placeholder="Credit Card Number"
                                           className="form-control" required="" type="text" onChange={this.handleCardNumber.bind(this)}   />
                                </div>
                                <div className="form-grouppp">
                                    <input id="textinput" name="cvv" placeholder="CVV"
                                           className="form-control" required="" type="text" onChange={this.handleCvvNumber.bind(this)}   />
                            </div>
                            </div>
                            <div className="month-picker">
                                <select className="month-picker-value" onChange={this.handleMonth.bind(this)}>

                                    <option value="01">Jan</option>
                                    <option value="02">Feb</option>
                                    <option value="03">March</option>
                                    <option value="04">April</option>
                                    <option value="05">May</option>
                                    <option value="06">June</option>
                                    <option value="07">July</option>
                                    <option value="08">August</option>
                                    <option value="09">September</option>
                                    <option value="10">October</option>
                                    <option value="11">November</option>
                                    <option value="12">December</option>
                                </select>

                                <select className="year-picker-value" onChange={this.handleYear.bind(this)}>

                                    <option value="17">2017</option>
                                    <option value="18">2018</option>
                                    <option value="19">2019</option>
                                    <option value="20">2020</option>
                                    <option value="21">2021</option>
                                    <option value="22">2022</option>
                                    <option value="23">2023</option>
                                    <option value="24">2024</option>
                                    <option value="25">2025</option>
                                    <option value="26">2026</option>
                                    <option value="27">2027</option>
                                    <option value="28">2028</option>
                                </select>
                                <div className="mastercardd">
                                <img className="visaimages" src="/img/Capture.PNG"/>
                            </div>
                            </div>
                            <div className="heading-container4">
                                <h5 className="header3-preferences">Billing Address
                                </h5>
                            </div>
                            <div className="informationofcard">
                                <div className="form-group pull-left">
                                    <input id="textinput" name="streetone" placeholder="Street (line1)"
                                           className="form-control" required="" type="text" onChange={this.handleStreetOne.bind(this)}/>
                                </div>
                                <div className="form-group">
                                    <input id="textinput" name="streettwo" placeholder="Street (line2)"
                                           className="form-control" required="" type="text" onChange={this.handleStreetTwo.bind(this)}/>
                                </div>
                            </div>
                            <div className="informationofcard">
                                <div className="form-group pull-left">
                                    <input id="textinput" name="city" placeholder="City"
                                           className="form-control" required="" type="text" onChange={this.handleCity.bind(this)}/>
                                </div>
                                <div className="form-group-state">
                                    <input id="textinput" name="stateinfo" placeholder="State"
                                           className="form-control" required="" type="text" onChange={this.handleState.bind(this)}/>
                                </div>
                                <div className="form-group-state">
                                    <input id="textinput" name="zipcode" placeholder="Postal Code"
                                           className="form-control" required="" type="text" onChange={this.handlePostcode.bind(this)}/>
                                </div>
                            </div>
                                <div className="informationofcard">
                                    <div className="form-group pull-left">
                                        <input id="textinput" name="country" placeholder="Country"
                                               className="form-control" required="" type="text" onChange={this.handleCountry.bind(this)}/>
                                    </div>
                                </div>

                            <div className="informationofcard">
                                <div className="form-group-add pull-left">
                                    <button type="submit" id="addcard" className="btn btn-primary">Add</button>

                                </div>
                                <div className="form-group-cancel">
                                    <a href="/u/payinfo" id="cancelcard" className="btn btn-danger">Cancel</a>
                            </div>
                            </div>
                        </form>
                    </div>


                    </div>
                </div>




        );


    }
}
