import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './DatePickerStyles.css'

import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class InputDate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date()
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {

        this.setState({
            startDate: date
        });
    }

    render() {
        return (
            <div className="customDatePickerWidth">
                <DatePicker
                    dateFormat="yyyy-MM-dd"
                    selected={this.state.startDate}
                    onChange={this.handleChange}
                    placeholderText="Click to select a date"
                    minDate={(new Date() - 5)}
                />
            </div>
        );
    }
}

export default InputDate;
