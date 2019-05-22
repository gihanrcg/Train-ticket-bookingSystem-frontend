import React, {Component} from 'react';
import './HeaderStyles.css'


class Header extends Component {


    render() {
        return (
            <div>
                <ul className="topnavBar">
                    <li><a className="siteName" href="/"> Online Train Ticket Booking System</a></li>
                    <li><a href="#home">Home</a></li>
                    <li><a href="/timeTable">Time Tables</a></li>
                    <li><a href="/booking">Book Tickets</a></li>
                    <li><a href="/about">Contact Us</a></li>
                    <li className="login-style"><a href="/login">  | Login</a></li>
                    <li className="signUp-style"><a href="/signup">SignUp</a></li>
                </ul>

                <hr className="new5"/>

            </div>
        );
    }
}

export default Header;
