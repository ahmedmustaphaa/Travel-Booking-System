import React, { useEffect } from 'react';
import './hero.css';
import { FaSearch } from "react-icons/fa";
import AOS from 'aos'; // Import AOS for animations
import 'aos/dist/aos.css'; // Import AOS styles

function Hero() {
    useEffect(() => {
        AOS.init();
    }, []);
    
    return (
        <div className="hero">
            <video autoPlay loop muted>
                <source src={require('../assets/hero.mp4')} type="video/mp4" />
            </video>
            <div className="welcome" data-aos="fade-up" data-aos-duration="1000">
                <h1>welcome to <span>safari</span> website</h1>
                <p>Explore the origins, history and meaning of the famous passage,
                and learn how Lorem Ipsum went from scrambled Latin passage</p>
                <button>
                    <FaSearch /> Search
                </button>
                <div className="destination-container">
                    <div className="destination" data-aos="fade-right" data-aos-duration="1000">
                        <label htmlFor="destination-input">Enter your destination</label>
                        <input type="text" id="destination-input" placeholder="Destination..." />
                    </div>
    
                    <div className="destination" data-aos="fade-right" data-aos-duration="1000" data-aos-delay="200">
                        <label htmlFor="date-input">Select your date</label>
                        <input type="date" id="date-input" />
                    </div>
    
                    <div className="destination" data-aos="fade-right" data-aos-duration="1000" data-aos-delay="400">
                        <label htmlFor="range-input">Select a range</label>
                        <input type="range" id="range-input" min="0" max="100" />
                        <span className="range-value">50</span> {/* Display current value */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;