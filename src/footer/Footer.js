import React from 'react';
import './footer.css';
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <div className='footer'>
      <div className='lang'>
        <h1>Language</h1>
        <select>
          <option>English</option>
          <option>Arabic</option>
          <option>Español</option>
        </select>
        <h1>Currency</h1>
        <select>
          <option>USD</option>
          <option>Pound</option>
          <option>Dinar</option>
        </select>
      </div>
      <div className="support">
        <p>Contact</p>
        <p>Legal Notice</p>
        <p>Privacy Policy</p>
        <p>General Terms</p>
        <p>Site Map</p>
      </div>
      <div className='company'>
        <h1>Company</h1>
        <p>About Us</p>
        <p>Careers</p>
        <p>Blogs</p>
        <p>Press</p>
        <p>Gift Cards</p>
        <p>Travel Guides</p>
      </div>
      <div className='work'>
        <h2>Work with Us</h2>
        <h3>Become a Supplier</h3>
        <h3>Become a Partner</h3>
        <div className='icons'>
          <FaInstagram className='icon' />
          <FaFacebook className='icon' />
          <FaTwitter className='icon' />
          <FaLinkedin className='icon' />
        </div>
      </div>
    </div>
  );
}

export default Footer;