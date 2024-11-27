import React from 'react';
import './contact.css';
import { MdOutlineTravelExplore } from "react-icons/md";

function Contact() {
    return (
        <div className="contacts">
            <div className="image-contact">
                <img src={require('../assets/tanjpg.jpg')} alt="Contact" />
            </div>
            <div className="contact-info">
                <h1>Pali Island</h1>
                <p><MdOutlineTravelExplore /> Traveling</p>
                <hr />
                <p>
                    Enjoy the Best Dubai Desert Safari Experience with Our Expert Guides. Book Now! 
                    Enjoy a traditional Bedouin dinner and cultural show at a desert campsite.
                </p>
                <input type="email" placeholder="Enter your email" />
                <button className='sign-up'>Sign Up</button>
            </div>
        </div>
    );
}

export default Contact;