import React, {Component} from 'react';
import axios from 'axios';
import swal from 'sweetalert';


import './SignUpStyle.css';


class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        }
    }

    changeHandler = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = e => {
        e.preventDefault();
        var url = new URL("http://localhost:8080/createUser");
        Object.keys(this.state).forEach(key => url.searchParams.append(key, this.state[key]))


        axios.post(url)
            .then(response => {
                console.log(response);
                swal({
                    title: "Nice!",
                    text: "You are registered successfully..!",
                    icon: "success",
                    button: "Go back to home",
                }).then((value)=>{
                    if(value){
                        window.location.replace("/");
                    }
                });


            })
            .catch(error => {
                console.log(error);
            })

    }


    render() {
        const {firstName, lastName, email, password} = this.state;
        return (
            <div align="center">
                <div style={{width: '40%'}}>
                    <form onSubmit={this.submitHandler} style={{border: '1px solid #ccc'}}>
                        <div className="container">
                            <h1>Sign Up</h1>
                            <p>Please fill in this form to create an account.</p>
                            <hr/>

                            <label><b>First Name</b></label>
                            <input type="text" value={firstName} placeholder="first name..." name="firstName"
                                   onChange={this.changeHandler}/>

                            <label><b>Last Name</b></label>
                            <input type="text" value={lastName} placeholder="Enter National ID Card Number "
                                   name="lastName" onChange={this.changeHandler}/>

                            <label htmlFor="email"><b>Email</b></label>
                            <input type="text" value={email} placeholder="Enter Email" name="email"
                                   onChange={this.changeHandler}/>

                            <label htmlFor="psw"><b>Password</b></label>
                            <input type="password" value={password} placeholder="Enter Password" name="password"
                                   onChange={this.changeHandler}/>

                            <label htmlFor="psw-repeat"><b>Repeat Password</b></label>
                            <input type="password" placeholder="Repeat Password" name="psw-repeat"
                                   onChange={this.changeHandler}/>

                            <label>
                                <input type="checkbox" name="remember"
                                       style={{marginBottom: '15px'}}/> Remember me
                            </label>



                            <div className="clearfix">

                                <button type="submit" className="signupbtn">Sign Up</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default SignUp;
