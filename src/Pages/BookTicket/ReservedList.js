import React from 'react';

class ReservedList extends React.Component {
    render() {
        return(
            <div className="right">
                <h4>Reserved Seats: ({this.props.reserved.length})</h4>
                <ul>
                    { this.props.reserved.map(res => <li key={res} >{res}</li>) }
                </ul>
            </div>
        )
    }



}

export default ReservedList;
