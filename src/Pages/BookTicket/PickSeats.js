import React from 'react'
import ReactDOM from 'react-dom';
import DrawGrid from "./DrawGrid";
import './PickSeatStyles.css';
import axios from "axios";
import Select from "react-select";
import InputCreditCard from "../../Components/Inputs/InputCreditCard";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

class PickSeats extends React.Component {

    //
    // 'Front1','Front2','Front3',
    // 'Middle1','Middle2','Middle3',
    // 'Back1','Back2','Back3', 'Front1','Front2','Front3',
    constructor(props) {
        super(props);
        this.state = {
            seat: [],
            seatAvailable: [],
            seatReserved: [],
            seatClass: '',
            alreadyReserved: [],
            myRecerved: [],
            cost: '',
            email: '',
            timeTableId:''
        }
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.seatClass !== this.state.seatClass) {
            this.updateGrid()
        }
        if(prevState.cost !== this.state.cost){
            const card = <InputCreditCard data={this.state}/>
            ReactDOM.render(card, document.getElementById('pay'))
        }
    }


    classChanged = e => {
        this.setState({
            seatClass: e.label
        })

    }

    paymentTypeChanged = e => {
        if (e.label === 'Card Payment') {
            const card = <InputCreditCard data={this.state}/>
            ReactDOM.render(card, document.getElementById('pay'))
        } else {
            const card = <h1>Dialog pay</h1>
            ReactDOM.render(card, document.getElementById('pay'))
        }
    }


    updateGrid() {

        this.setState({
            timeTableId: this.props.match.params.timeTableId
        });

        var url = "http://localhost:8080/seat/getAllSeats?timetableId=" + this.props.match.params.timeTableId + "&seatClass=" + this.state.seatClass;
        axios.post(url).then(
            response => {
                this.setState({
                    seat: response.data,
                })
            }
        )
        var url2 = "http://localhost:8080/seat/getAvailableSeats?timetableId=" + this.props.match.params.timeTableId + "&seatClass=" + this.state.seatClass;
        axios.post(url2).then(
            response => {
                this.setState({
                    seatAvailable: response.data,
                })
            }
        )
        var url3 = "http://localhost:8080/seat/getReservedSeats?timetableId=" + this.props.match.params.timeTableId + "&seatClass=" + this.state.seatClass;
        axios.post(url3).then(
            response => {

                if (this.state.alreadyReserved.length === 0) {
                    this.setState({
                        alreadyReserved: response.data,
                        seatReserved: response.data,
                    });
                } else {
                    this.setState({
                        seatReserved: response.data,
                    });
                }
            }
        )

    }

    onClickData(seat) {

        if (this.state.alreadyReserved.includes(seat)) {

            NotificationManager.error("Sorry", "Already reserved", 1500);

        } else {

            this.calculateCost();
            if (this.state.seatReserved.indexOf(seat) > -1) {

                this.setState({
                    seatAvailable: this.state.seatAvailable.concat(seat),
                    seatReserved: this.state.seatReserved.filter(res => res !== seat),
                    myRecerved: this.state.myRecerved.filter(res => res !== seat),


                })

            } else {
                this.setState({
                    seatReserved: this.state.seatReserved.concat(seat),
                    seatAvailable: this.state.seatAvailable.filter(res => res !== seat),
                    myRecerved: this.state.myRecerved.concat(seat),
                })

            }


        }


    }

    calculateCost() {
        if (this.state.email !== '') {
            var url = "http://localhost:8080/seat/getCost?email=" + this.state.email + "&timaTableId=" + this.props.match.params.timeTableId + "&noOfSeats=" + this.state.myRecerved.length + "&SeatClass=" + this.state.seatClass;

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


    // onClickConfirmPay(x) {
    //
    //     console.log(this.state)
    //     var url = "http://localhost:8080/seat/bookSeats?timeTableId=" + this.state.timeTableId + "&seatList=" + this.state.myRecerved.toString();
    //     axios.post(url).then(
    //         response => {
    //             console.log('success')
    //         }
    //     ).catch(error => {
    //         console.log(error)
    //     })
    // }

    setEmail = e => {
        this.setState({
            email: e.target.value
        })

    }
    btnCalcCost = e => {
        this.calculateCost();
    }

    render() {
        const clases = [
            {label: "1", value: '1'},
            {label: "2", value: '2'},
            {label: "3", value: '3'},


        ]

        const paymentTypes = [
            {label: "Card Payment", value: "Card Payment"},
            {label: "Dialog Pay", value: "Dialog Pay"}
        ]

        return (
            <div align="center">
                <NotificationContainer/>
                <div>
                    <div style={{width: '20%'}}>
                        <table>
                            <tbody>
                            <tr>
                                <td><label>Email</label></td>
                                <td><input type="text" onChange={this.setEmail} required/></td>
                            </tr>
                            <tr>
                                <td><label>Class</label></td>
                                <td><Select options={clases} onChange={this.classChanged}/></td>

                            </tr>
                            </tbody>
                        </table>
                        {/*<label>Class</label> <Select options={clases} onChange={this.classChanged}/>*/}
                        {/*<label>Email</label> <input type="text" value={this.calculateCost}  />*/}
                    </div>


                    <DrawGrid
                        seat={this.state.seat}
                        available={this.state.seatAvailable}
                        reserved={this.state.seatReserved}
                        myReserved={this.state.myRecerved}
                        onClickData={this.onClickData.bind(this)}
                    />

                    <div style={{width: '20%'}}>
                        <h5>Payment Method</h5>
                        <Select options={paymentTypes} onChange={this.paymentTypeChanged}/>
                    </div>

                    <br/><br/><br/><br/><br/><br/><br/>

                    <div id="pay"></div>


                </div>

            </div>
        )
    }
}

export default PickSeats;






