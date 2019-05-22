import React, {Component} from 'react';
import axios from 'axios';
import swal from 'sweetalert';

import './SignUpStyle.css';



class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isLoggedIn: true
        }
    }

    changeHandler = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = e => {
        e.preventDefault();
        var url = new URL("http://localhost:8080/isValidUser");
        Object.keys(this.state).forEach(key => url.searchParams.append(key, this.state[key]))
        axios.post(url)
            .then(response => {
                console.log(response)
                if (response.data) {
                    console.log(response)

                    swal({
                        title: "Nice!",
                        text: "You are logged in",
                        icon: "success",
                        button: "Go back to home",
                    }).then((value)=>{
                        if(value){
                            window.location.replace("/");
                        }
                    });



                } else {
                    console.log(response)
                    swal({
                        title: "Oops!",
                        text: "It seems you have entered invalid credentials..!",
                        icon: "error",
                        button: "Retry",
                    }).then((value)=>{
                        if(value){
                            window.location.replace("/login");
                        }
                    });

                }
            })
            .catch(error => {
                console.log(error);
            })

    }


    render() {
        const {email, password} = this.state;
        return (
            <div>
                <div align="center">
                    <div style={{width: '45%'}}>
                        <div id="id01" className="modal">

                            <form onSubmit={this.submitHandler} className="modal-content animate">
                                <div className="imgcontainer">
                                </div>

                                <div className="container">
                                    <label htmlFor="uname"><b>Username</b></label>
                                    <input type="text" placeholder="Enter email" value={email} name="email"
                                           onChange={this.changeHandler} required/>

                                    <label htmlFor="psw"><b>Password</b></label>
                                    <input type="password" placeholder="Enter Password" value={password} name="password"
                                           onChange={this.changeHandler} required/>

                                    <button type="submit">Login</button>
                                </div>


                            </form>
                        </div>
                    </div>
                </div>

            </div>
        );
    }

}

export default SignUp;
