import React, {Component} from 'react';
import {getcreditcarddetails} from "../../../../api/user/API_GetCreditCardDetails";

export default class PaymentMethods extends Component {
    constructor() {
        super();
    }

    state = {
        paymentMethods: []
    }

    componentWillMount() {
        getcreditcarddetails().then(function(res) {
            // console.log(res)
            this.setState({
                paymentMethods: res
            });
        }.bind(this)).catch((err) => {

            // console.log(err);
        })
    }

    handleAddPaymentMethod () {
        // debugger;
        this.props.handleAddPaymentMethod("payment-form");
    }

    render() {
        // debugger;
        return (
            <div className="payment-methods-container">
                <div className="row">
                    <div className="col-md-12">
                        <button onClick={this.handleAddPaymentMethod.bind(this)} className="btn btn-primary">Add a payment method</button>
                    </div>
                </div>
                {this.state.paymentMethods.map((method) =>
                (<div className="row">
                        <div className="col-md-12">
                            <label>Name:</label>
                            <span>{method.nameoncard}</span>
                        </div>

                        <div className="col-md-12">
                            <label>Card Number:</label>
                            <span>{method.creditCardNumber}</span>
                        </div>
                        <div className="col-md-12">
                            <label>Valid Through:</label>
                            <span>{method.validThrough}</span>
                        </div>
                        <div className="col-md-12">
                            <label>CVV:</label>
                            <span>{method.cvv}</span>
                        </div>
                    </div>)
                )}
            </div>
        )
    }
}