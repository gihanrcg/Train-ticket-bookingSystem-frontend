import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import './App.css';
import Header from "./Components/Navigator/Header";
import Home from "./Pages/Home";

import TimeTablePage from "./Pages/TimeTablePage";
import SignUpPage from "./Pages/SignUpPage";
import Login from './Pages/LoginPage'

import BookingTable from "./Pages/BookTicket/BookingTable";
import AddDetails from "./Pages/BookTicket/AddDetails";
import PickSeats from "./Pages/BookTicket/PickSeats";

function App() {

    const TestComp =({match}) =>{
        console.log(match.params)
        return (
            <AddDetails a={match.params.id}  />
        )
    }

    return (
        <Router>
            <div className="App">
                <div className="container">
                    <Header/>
                    <Route exact path="/" render={() => (
                        <Home/>
                    )}/>
                    {/*<Route path="/about" component={About}/>*/}
                    <Route path="/timeTable" component={TimeTablePage}/>
                    <Route path="/signup" component={SignUpPage}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/booking" component={BookingTable}/>
                    <Route path="/bookingTable" component={BookingTable}/>
                    <Route path="/addDetails/:id" component={TestComp}/>
                    <Route path="/pickSeats/:timeTableId" component={PickSeats}/>


                </div>
            </div>
        </Router>
    );
}

export default App;
