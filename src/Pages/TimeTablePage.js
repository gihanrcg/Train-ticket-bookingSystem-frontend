import React from 'react';

import Select from 'react-select';
import './TimeTableStyle.css'
import TimeTableData from "../Components/TimetableData/TimeTableData";
import DatePicker from "react-datepicker/es";
import '../Components/Inputs/DatePickerStyles.css';

import "react-datepicker/dist/react-datepicker.css";


class TimeTablePage extends React.Component {


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


    setFrom = e => {
        console.log(e.label)
        this.setState({
            from: e.label
        })
    }

    setTo = e => {
        console.log(e.label)
        this.setState({
            to: e.label
        })
    }


    handleChangeDate(d) {
        console.log("it changed dates");

        var myDate = new Date(d);
        let formattedDate = myDate.getFullYear() + "-" + (myDate.getMonth() + 1) + "-" + myDate.getDate();
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

        return (

            <React.Fragment>
                <div align="center">
                    <div>

                        <table style={{width: '100%', tableLayout: 'fixed', borderSpacing: '80px 0'}}>
                            <tbody>
                            <tr>

                                <td>From<Select onChange={this.setFrom}
                                                options={options}

                                /></td>
                                <td>To<Select onChange={this.setTo} options={options}/></td>
                                <td>Date <DatePicker
                                    dateFormat="yyyy-MM-dd"
                                    selected={this.state.startDate}
                                    onChange={this.handleChangeDate}
                                    placeholderText="Click to select a date"
                                    minDate={(new Date() - 5)}
                                /></td>
                            </tr>
                            </tbody>
                        </table>



                    </div>

                </div>
                <br/><br/>
                {console.log("re render")}
                <TimeTableData details={this.state}/>

            </React.Fragment>
        )
    }
}

export default TimeTablePage;
