import React from 'react';
import { Route, Routes } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './header/Header';
import Services from './services/Services';
import Hero from './heroheader/Hero';
import About from './about/About';
import Contact from './contact/Contact';
import ImageGallary from './gallary/ImageGallary';
import Footer from './footer/Footer';
import Singleprod from './Singleproduct/Singleproduct';
import OffcanvasExample from './offcanvas/Offcanvace';
import Login from './Login/Login';
import Checkout from './checkout/Checkout';
import Order from './order/Order';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';


// Load Stripe outside of a component’s render to avoid recreating the object on every render

function App() {
    const stripePromise = loadStripe("pk_test_51Q5bi709J47FAh4sAVhwH5701bL7PiGvLFLy8PieXVet9D4vn31VAYuaFAfgKbvqL5XxSuiH7VKvU42ZB30mB22F00eGqIzaea");
    return (
        <div>
           
            <Routes>
                <Route path="/" element={
                    <>
                    <Header />
                        <Hero />
                        <Services />
                        <About />
                        <Contact />
                        <ImageGallary />
                        <Footer />
                    </>
                } />
                <Route path="product/:id" element={ <><Header /><Singleprod /></>  } />
                <Route path="/login" element={<Login />} />
                <Route path="/order" element={<Order />} />
                
                {/* Wrap the Checkout route with Elements */}
                <Route path="/checkout" element={
                       <>
                       <Header />
                       <Elements stripe={stripePromise}>
                       <Checkout />
                       </Elements>
                       </>
                       
                  
                } />
            </Routes>
            <OffcanvasExample />
        </div>
    );
}

export default App;