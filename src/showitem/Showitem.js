import React, { useState } from 'react';
import './showitem.css';
import { FaStar } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useShareData } from '../ContextApi';
import Swal from 'sweetalert2';  // Import SweetAlert2

function Showitem({ tour, title, img, price, id }) {
  const [loading, setLoading] = useState(false);
  const { increaseQuantity, cartItem, getItemQuantity } = useShareData();
  const quantot = getItemQuantity(id);

  // Function to show confirmation message
  const handleBookNow = () => {
    increaseQuantity(id);  // Increase quantity when clicked

    // Show the SweetAlert2 confirmation message
    Swal.fire({
      title: 'Booking Confirmed!',
      text: 'Your tour has been successfully booked.',
      icon: 'success',
      confirmButtonText: 'Okay',
      confirmButtonColor: '#28a745',  // Green confirm button color
      background: '#f8f9fa',  // Light background for the popup
      backdrop: 'rgba(0, 0, 0, 0.4)',  // Darker backdrop
    });
  };

  return (
    <div className="tour">
      <img src={img} alt={title} />
      <h3 style={{ color: 'gray' }}>{title}</h3>

      <button 
        className="success" 
        onClick={handleBookNow} 
        style={{ backgroundColor: 'darkolivegreen' }}>
        Book Now
      </button>

      <h4 style={{ color: 'gray' }}>{tour}</h4>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h5 style={{ color: 'red', paddingTop: '10px' }}>{price}$</h5>
        <div className="get-start" style={{ display: 'flex' }}>
          {Array(5).fill().map((_, i) => (
            <div className="rating-star" key={i}>
              <FaStar className="fsstar" />
            </div>
          ))}
        </div>
      </div>
      <Link to={`product/${id}`}>
        <button className="btn" >See More</button>
      </Link>
    </div>
  );
}

export default Showitem;
