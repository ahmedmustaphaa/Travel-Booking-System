import React from 'react';
import './about.css'
function ImageComponent() {
    return (
        <div>
            <div className="image-asset">
                <img src={require('../assets/tour.jpg')}></img>
                <h1>dubai is wating for you</h1>
            </div>
        </div>
    );
}

export default ImageComponent;