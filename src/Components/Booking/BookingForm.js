import React from 'react';
import './BookingFormStyles.css';
import DatePicker from "react-datepicker";
import 'react-dropdown/style.css'
import Select from 'react-select';


class BookingForm extends React.Component {



    constructor(props) {
        super(props);
        this.state = {
            from: "",
            to: "",
            date: "",
            seatClass: "",
        }
        this.handleChangeDate = this.handleChangeDate.bind(this);

    }
    submitHandler=e =>{
        e.preventDefault();
        console.log(this.state)
        window.location.replace("/timetable?x="+ this.state);
    }

    setFrom = e => {
        console.log(e.label)
        this.setState({
            from : e.label
        })
    }

    setTo = e => {
        console.log(e.label)
        this.setState({
            to : e.label
        })
    }
    setClass = e => {
        console.log(e)
        this.setState({
            seatClass : e.label
        })
    }

    handleChangeDate(d) {
        console.log("it changed dates");

        var myDate = new Date(d);
        let formattedDate =  myDate.getFullYear() + "-" + (myDate.getMonth() + 1) + "-" + myDate.getDate();
        console.log('date = ' + formattedDate);  //date in milliseconds logs properly
        this.setState({
            date: formattedDate
        });

    }


    render() {

        const options = [
            {label: "Fort", value: 'Fort'},
            {label: "Secretartat Halt", value: 'Secretartat Halt'},
            {label: "Kompnnavidiya", value: 'Kompnnavidiya'},
            {label: "Kumarakanda", value: 'Kumarakanda'},
            {label: "Dodanduwa", value: 'Dodanduwa'},
            {label: "Rathgama", value: 'Rathgama'},
            {label: "Boossa", value: 'Boossa'},
            {label: "Ginthota", value: 'Ginthota'},
            {label: "Galle", value: 'Galle'},

        ]

        const clases = [
            {label: "1", value: '1'},
            {label: "2", value: '2'},
            {label: "3", value: '3'},


        ]

        return (
            <div align="center">
                <div style={{width: '30%'}}>
                    <div className="container">
                        <form onSubmit={this.submitHandler}>

                            <label>Date</label>
                            <br/><br/>
                            <DatePicker

                                dateFormat="yyyy-MM-dd"
                                selected={this.state.startDate}
                                onChange={this.handleChangeDate}
                                placeholderText="Click to select a date"
                                minDate={(new Date() - 5)}
                            />

                            <br/>
                            <label>From</label>
                            <br/><br/>
                            <Select onChange={this.setFrom} options={options}/>


                            <br/>
                            <label htmlFor="lname">To</label>
                            <br/><br/>
                            <Select onChange={this.setTo} options={options}/>

                            <br/>

                            <label>Seat class</label>
                            <Select  onChange={this.setClass} options={clases} />


                            <input type="submit" value="Submit"/>
                        </form>
                    </div>
                </div>

            {/*</div>*/}
        {/*)*/}

            </div>
        )
        }

}

export default BookingForm;
