import React from 'react';
import axios from "axios";
import ReactTable from 'react-table';
import 'react-table/react-table.css';



class TimeTableData extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            timetableRows : []
         }
    }

    updateTable(){
        var url = "http://localhost:8080/timetable/getValidRows?from="+this.props.details.from+"&to="+this.props.details.to+"&date="+this.props.details.date;
        console.log(url)
        axios.post(url).then(
            response => {
                console.log(response);
                this.setState({
                    timetableRows : response.data
                })
            }
        )
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if((prevProps.details.from !== this.props.details.from) || (prevProps.details.to !==  this.props.details.to) || (prevProps.details.date !== this.props.details.date)){
            this.updateTable();
        }



            //this.updateTable();

    }



    componentDidMount() {

        const details = this.props.details;
        console.log("Gihan  : " )
        console.log(details);

        var url = "http://localhost:8080/timetable/getAll";
        axios.post(url).then(
            response => {
                console.log(response);
                this.setState({
                    timetableRows : response.data
                })
            }
        )

    }


    render() {
        const columns = [

            {
                Header : "From",
                accessor : "from"
            },
            {
                Header : "To",
                accessor : "to"
            },

            {
                Header : "Arrival Time",
                accessor : 'arrivalTime'
            },
            {
                Header : "Departure Time",
                accessor : 'departureTime'
            },
            {
                Header : "Arrival Time",
                accessor : 'arrivalTime'
            },
            {
                Header : "Cost",
                accessor : 'cost'
            },
            {
                Header : "Date",
                accessor : 'date'
            },
            {
                Header : "Actions",
                Cell : props =>{
                    return(

                        <a href={"/addDetails/" + props.original.timeTableId}> <button

                        >Book Now</button></a>
                    );
                }
            }


        ]

        return(
            <ReactTable
            columns={columns}
            data={this.state.timetableRows}
            ></ReactTable>

        )

    }

}

export default TimeTableData;
