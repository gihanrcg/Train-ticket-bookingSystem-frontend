import React from 'react'

class About extends React.Component{

    constructor(props) {
        super(props);
        console.log(props)
    }


    render() {
        return (
            <React.Fragment>
                <h1>My name is </h1>
                <p>My first react application</p>
            </React.Fragment>
        );
    }
}

export default About;
