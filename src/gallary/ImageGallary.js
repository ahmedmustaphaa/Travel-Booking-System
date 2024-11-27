import React, { useState } from 'react';
import './gallary.css';
import { gallaryApi } from '../GallaryApi';

function ImageGallary() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % gallaryApi.length);
  };
 

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex - 1 + gallaryApi.length) % gallaryApi.length
    );
  };

  return (
    <div className="gallery-container">
      <div className="image-container">
        <img src={gallaryApi[currentIndex].img} alt={`Gallery Image ${currentIndex + 1}`} />
      </div>
      <div className="navigation">
        <button className="nav-button" onClick={handlePrev}>Previous</button>
        <button className="nav-button" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}

export default ImageGallary;