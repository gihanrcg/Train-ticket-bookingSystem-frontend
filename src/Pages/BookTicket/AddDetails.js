import React from 'react';
import axios from "axios";


class AddDetails extends React.Component {




    constructor(props) {
        super(props);

        this.state =  {
            timeTableId : '',
            user : '',
            from:'',
            to : '',
            date:'',
            arrivalTime : '',
            departureTime : '',
            noOfSeats : '',
            cost : '',
            seatClass : '',
        }

    }

    getDetails(){
        var url = "http://localhost:8080/timetable/byId?id="+this.props.a;
        console.log(url)
        axios.post(url).then(
            response => {
                this.setState({
                    timeTableId:response.data.timeTableId,
                    from:response.data.from,
                    to : response.data.to,
                    date:response.data.date,
                    arrivalTime : response.data.arrivalTime,
                    departureTime : response.data.departureTime,
                    noOfSeats : '',
                    cost : response.data.cost,
                    seatClass : '',
                })

            }
        )

    }

    componentDidMount() {
        this.getDetails();
    }
    cancel(){
        window.location.replace("/timetable")
    }

    render() {



        return (
            <div>
                <h2>Please double check your details...</h2>
                <div align="center">
                    <div style={{width: '40%'}}>
                        <form  style={{border: '1px solid #ccc'}} onSubmit={(e) => {
                            e.preventDefault();
                            window.location.replace("/pickSeats/"+this.state.timeTableId)
                        }}>
                            <div className="container">


                                <label><b>From</b></label>
                                <input type="text" value={this.state.from}
                                       disabled/>

                                <label><b>To</b></label>
                                <input type="text" value={this.state.to}
                                        disabled/>

                                <label htmlFor="email"><b>Date</b></label>
                                <input type="text" value={this.state.date}
                                       disabled/>

                                <label htmlFor="psw"><b>Arrival Time</b></label>
                                <input type="text" value={this.state.arrivalTime + " Hour"} disabled/>

                                <label htmlFor="psw"><b>Departure Time</b></label>
                                <input type="text" value={this.state.departureTime + " Hour"} disabled/>



                                <div className="clearfix">
                                    <button type="button" className="cancelbtn" onClick={this.cancel}>Cancel</button>
                                    <button type="submit" className="signupbtn">Continue</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        );
    }

}

export default AddDetails;
