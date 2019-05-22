import React from 'react';

class AvailableList extends React.Component {
    render() {
        const seatCount = this.props.available.length;
        return(
            <div className="left">
                <h4>Available Seats: ({seatCount === 0? 'No seats available' : seatCount})</h4>
                <ul>
                    {this.props.available.map( res => <li key={res} >{res}</li> )}
                </ul>
            </div>
        )
    }
}

export default AvailableList;
