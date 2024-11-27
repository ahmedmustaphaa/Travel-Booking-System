import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api';
import './singleprod.css';
import Loading from '../Loading';
import { useShareData } from '../ContextApi';
import { imageApi } from '../Singleapi';
import AOS from 'aos'; // Import AOS for animations
import 'aos/dist/aos.css'; // Import AOS styles

function Singleprod() {
    const { id } = useParams();
    const [getSingleitem, setSingleItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState('');
    const { increaseQuantity } = useShareData();

    useEffect(() => {
        AOS.init();  // Initialize AOS animations
    }, []);
    
    useEffect(() => {
        const fetchItem = () => {
            const item = api.find((item) => item.id === parseInt(id));
            setSingleItem(item);
            setLoading(false);
            if (item) {
                setSelectedImage(item.img); 
            }
        };
        setTimeout(() => {
            fetchItem();
        }, 3000);
    }, [id]);

    if (loading) {
        return <div className="loading-message" style={{ color: 'red' }}><Loading /></div>;
    }

    if (!getSingleitem) {
        return <div className="error-message">Product not found.</div>;
    }

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    return (
        <div>
            <div className='single-product'>
                <div className='product-container'>
                    <div className="image-single" data-aos="fade-right" data-aos-duration="1000">
                        <img src={selectedImage} alt={getSingleitem.title} className="main-image" />
                    </div>
                    <div className="product-details" data-aos="fade-left" data-aos-duration="1000">
                        <h2 className="product-title">{getSingleitem.title}</h2>
                        <p className="product-tour">{getSingleitem.tour}</p>
                        <p className="product-price">Price: ${getSingleitem.price}</p>
                        <div className="additional-images">
                            {getSingleitem.images.map((image, index) => (
                                <img 
                                    key={index} 
                                    src={image} 
                                    alt={`Additional view of ${getSingleitem.title}`} 
                                    className="additional-image"
                                    onClick={() => handleImageClick(image)} 
                                    data-aos="zoom-in" // Adding zoom-in effect to images
                                    data-aos-duration="500"
                                />
                            ))}
                        </div>
                        <h3 className="product-description">
                            Tourism is a social, cultural, and economic phenomenon which entails the movement of people to countries or places outside their usual environment for personal or business/professional purposes.
                        </h3>
                        <button className='booking' onClick={() => increaseQuantity(getSingleitem.id)} data-aos="fade-up" data-aos-duration="800">
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
            
            <div className="product-description-text" data-aos="fade-up" data-aos-duration="1000">
                <p style={{ textAlign: 'center' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>
                <p style={{ padding: '10px 40px', letterSpacing: '2px', color: 'gray' }}>
                    Traveling is an integral part of the human experience. It allows us to explore new cultures, meet new people, and discover breathtaking landscapes. Tours, whether they are guided or self-directed, play a vital role in shaping our travel experiences. They offer structure, convenience, and the opportunity to learn about a destination from knowledgeable locals or experts. In this piece, we will delve into the various types of tours, their benefits, tips for choosing the right one, and how to make the most of your travel experience...
                </p>
            </div>

            <div style={{ display: 'flex' }} className='image-slider' data-aos="fade-up" data-aos-duration="1500">
                {imageApi.map((imag, index) => (
                    <div className='imageApi' key={index}>
                        <img src={imag.image} alt={`Image ${index + 1}`} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Singleprod;
