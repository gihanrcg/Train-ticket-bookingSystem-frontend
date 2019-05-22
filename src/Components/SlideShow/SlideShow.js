import React from 'react';
import {Zoom} from 'react-slideshow-image';

import img1 from './SlideShowImages/1.jpg';
import img2 from './SlideShowImages/2.jpg';
import img3 from './SlideShowImages/3.jpg';
import './slideStyles.css'

const images = [
    img1,
    img2,
    img3
];

const zoomOutProperties = {
    duration: 2000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    scale: 0.4,
    arrows: true
}

const Slideshow = () => {
    return (
        <div align="center">
            <div className="slide-container-inner">
                <p className="slideshow-inner-main-text">NEVER STOP EXPLORING</p>
                <button className="button button2">join with us</button>
            </div>
            <div className="mock"></div>
            <Zoom {...zoomOutProperties}>
                {
                    images.map((each, index) => <img key={index} style={{width: "100%", height: '550px'}} src={each}
                                                     alt="test"/>)

                }

            </Zoom>


        </div>
    )
}


export default Slideshow;
