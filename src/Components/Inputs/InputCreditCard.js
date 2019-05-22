import React from 'react';
import Card from 'react-credit-cards';
import swal from 'sweetalert';

import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate,
} from './creditCardUtils';
import './creditCardStyles.css';

import 'react-credit-cards/es/styles-compiled.css';
import axios from "axios";
import {NotificationManager,NotificationContainer} from "react-notifications";



class InputCreditCard extends React.Component {

    state = {
        number: '',
        name: '',
        expiry: '',
        cvc: '',
        issuer: '',
        focused: '',
        formData: null,
        cost : ''
    };

    componentDidMount() {
        this.calculateCost()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.data !== prevProps.data){
            this.calculateCost()
        }
    }

    handleCallback = ({issuer}, isValid) => {
        if (isValid) {
            this.setState({issuer});
        }
    };

    handleInputFocus = ({target}) => {
        this.setState({
            focused: target.name,
        });
    };

    handleInputChange = ({target}) => {
        if (target.name === 'number') {
            target.value = formatCreditCardNumber(target.value);
        } else if (target.name === 'expiry') {
            target.value = formatExpirationDate(target.value);
        } else if (target.name === 'cvc') {
            target.value = formatCVC(target.value);
        }

        this.setState({[target.name]: target.value});
    };

    handleSubmit = e => {

         e.preventDefault();
         this.onClickConfirmPay();

    };

    onClickConfirmPay() {


        var url = "http://localhost:8080/seat/bookSeats?timeTableId=" + this.props.data.timeTableId + "&seatList=" + this.props.data.myRecerved.toString()+ "&email="+this.props.data.email +"&cost="+this.state.cost;
        axios.post(url).then(
            response => {
                NotificationManager.success("Booking successful. You will be received an email soon ","Done",5000);

                swal({
                    title: "Done!",
                    text: "Seats are reserved successfully..!",
                    icon: "success",
                    button: "Go back to home",
                }).then((value)=>{
                    if(value){
                        window.location.replace("/");
                    }
                });

            }
        ).catch(error => {
            console.log(error)
        })
    }

    calculateCost() {
        if (this.props.data.email !== '') {
            var url = "http://localhost:8080/seat/getCost?email=" + this.props.data.email + "&timaTableId=" + this.props.data.timeTableId + "&noOfSeats=" + this.props.data.myRecerved.length + "&SeatClass=" + this.props.data.seatClass;

            axios.post(url).then(
                response => {

                    this.setState({
                        cost: response.data
                    })
                }
            ).catch(error => {
                console.log(error)
            })
        } else {
            NotificationManager.error("Error", "Please input your email", 1500);
        }
    }



    render() {

        const {name, number, expiry, cvc, focused} = this.state;
        return (
            <div key="Payment">
                <NotificationContainer/>
                <div className="App-payment" style={{width: '700px'}}>

                    <div style={{float: 'left'}}>
                        <Card
                            number={number}
                            name={name}
                            expiry={expiry}
                            cvc={cvc}
                            focused={focused}
                            callback={this.handleCallback}
                        />
                    </div>
                    <div style={{float: 'right'}}>
                        <form ref={c => (this.form = c)} onSubmit={this.handleSubmit}>

                            <div className="form-group">
                                <input
                                    type="text"
                                    name="cost"
                                    className="form-control"
                                    placeholder="Cost"
                                    value={"Rs. "+this.state.cost}
                                    disabled
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="number"
                                    className="form-control"
                                    placeholder="Card Number"
                                    pattern="[\d| ]{16,22}"
                                    required
                                    onChange={this.handleInputChange}
                                    onFocus={this.handleInputFocus}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    placeholder="Name"
                                    required
                                    onChange={this.handleInputChange}
                                    onFocus={this.handleInputFocus}
                                />
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <input
                                        type="text"
                                        name="expiry"
                                        className="form-control"
                                        placeholder="Valid Thru"
                                        pattern="\d\d/\d\d"
                                        required
                                        onChange={this.handleInputChange}
                                        onFocus={this.handleInputFocus}
                                    />
                                </div>
                                <div className="col-6">
                                    <input
                                        type="text"
                                        name="cvc"
                                        className="form-control"
                                        placeholder="CVC"
                                        pattern="\d{3,4}"
                                        required
                                        onChange={this.handleInputChange}
                                        onFocus={this.handleInputFocus}
                                    />
                                </div>
                            </div>
                            <div className="form-actions">
                                <button className="btn btn-primary btn-block">Confirm Booking</button>
                            </div>
                        </form>
                    </div>

                </div>

            </div>
        );
    }

}

export default InputCreditCard;
