import React from 'react';

class MyReservedList extends React.Component {



    render() {
        return(
            <div className="right">
                <h4>My Reserved Seats: ({this.props.myReserved.length})</h4>

                <ul>
                    { this.props.myReserved.map(res => <li key={res} >{res}</li>)}
                </ul>
            </div>
        )
    }
}
export default MyReservedList
