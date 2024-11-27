import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css'; // Correctly import Swiper styles
import { Navigation, Pagination } from 'swiper'; // Import required modules

const MySwiper = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination]} // Enable modules
      spaceBetween={30} // Space between slides
      slidesPerView={1} // Number of slides per view
      navigation // Enable navigation buttons
      pagination={{ clickable: true }} // Enable pagination
    >
      <SwiperSlide>
        <img src="https://via.placeholder.com/600x300?text=Slide+1" alt="Slide 1" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://via.placeholder.com/600x300?text=Slide+2" alt="Slide 2" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://via.placeholder.com/600x300?text=Slide+3" alt="Slide 3" />
      </SwiperSlide>
    </Swiper>
  );
};

export default MySwiper;