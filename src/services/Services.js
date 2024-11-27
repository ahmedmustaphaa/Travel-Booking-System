import React, { useState, useEffect } from 'react';
import './services.css';
import { FaImages, FaPeopleArrows, FaNutritionix } from "react-icons/fa";
import { MdOutlineLocationCity } from "react-icons/md";
import Showitem from '../showitem/Showitem';
import ReactPaginate from 'react-paginate';
import { api } from '../api';
import AOS from 'aos'; // Import AOS for animations
import 'aos/dist/aos.css'; // Import AOS styles

const ITEMS_PER_PAGE = 8;

function Services() {
  const [item, setItem] = useState(''); // State for price filter
  const [dataShow, setDataShow] = useState(api); // Initial data from API
  const [currentPage, setCurrentPage] = useState(0); // Current page for pagination

  // Initialize AOS
  useEffect(() => {
    AOS.init();
  }, []);

 // Filter items based on selected category
const getItemData = (category) => {
  // Check if a category is provided
  if (category) {
      // Filter items based on the selected category
      const filteredItems = api.filter(item => item.attri === category);
      setDataShow(filteredItems); // Update the displayed data
  } else {
      // If no category is selected, show all items
      setDataShow(api);
  }
  setCurrentPage(0); // Reset the current page to the first page
};
 
  
  const filterItems = () => {
    if (item === "high") {
      return dataShow.filter(i => i.price > 300);
    } else if (item === "low") {
      return dataShow.filter(i => i.price < 300);
    }
    return dataShow; // Return all if no price filter is applied
  };

  const filteredTours = filterItems();
  const pageCount = Math.ceil(filteredTours.length / ITEMS_PER_PAGE);

  const currentItems = filteredTours.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const handlePageClick = (data) => {
    setCurrentPage(data.selected); // Update current page based on pagination click
  };

  return (
    <div className='services'>
      <div className='services-section'>
        <div className='info-section' data-aos="fade-up" onClick={() => getItemData('Adventure')}>
          <FaImages />
          <h3>Adventure</h3>
        </div>
        <div className='info-section' data-aos="fade-up" data-aos-delay="100" onClick={() => getItemData('Family Tours')}>
          <FaPeopleArrows />
          <h3>Family Tours</h3>
        </div>
        <div className='info-section' data-aos="fade-up" data-aos-delay="200" onClick={() => getItemData('City Cards')}>
          <MdOutlineLocationCity />
          <h3>City Cards</h3>
        </div>
        <div className='info-section' data-aos="fade-up" data-aos-delay="300" onClick={() => getItemData('Multi-Day Trips')}>
          <FaNutritionix />
          <h3>Multi-Day Trips</h3>
        </div>
        <div className='info-section' data-aos="fade-up" data-aos-delay="300" onClick={() => getItemData('')}>
          <FaNutritionix />
          <h3>all tours</h3>
        </div>
      </div>

      <div className="filteritem">
        <h2>{filteredTours.length} tours found</h2>
        <select value={item} onChange={(e) => { setItem(e.target.value); setCurrentPage(0); }}>
          <option value="">Select Price Range</option>
          <option value="low">Below $300</option>
          <option value="high">Above $300</option>
        </select>
      </div>

      <div>
        <h1>Desert Safari Tours</h1>
        <div className="tours">
          {currentItems.map((tour, index) => (
            <div key={index} className="tour" data-aos="fade-up">
              <Showitem img={tour.img} price={tour.price} title={tour.title} tour={tour.tour} id={tour.id} />
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Controls */}
      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        pageClassName={"pagination-item"}
        pageLinkClassName={"pagination-link"}
        previousClassName={"pagination-item"}
        previousLinkClassName={"pagination-link"}
        nextClassName={"pagination-item"}
        nextLinkClassName={"pagination-link"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default Services;