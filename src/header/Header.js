import React, { useEffect, useState } from 'react';
import { FaHome } from "react-icons/fa";
import { AiFillCamera } from "react-icons/ai";
import { IoIosLogIn } from "react-icons/io";
import { FaPerson } from "react-icons/fa6";
import { IoMdMenu } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import './header.css';
import { MdOutlineTravelExplore } from "react-icons/md";
import { useShareData } from '../ContextApi';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase';
import { useNavigate } from 'react-router-dom';

function Header() {
    const [toggle, setToggle] = useState(false);
    const [showLogoutMessage, setShowLogoutMessage] = useState(false); // New state for the logout message
    const { handleShow, cartItem } = useShareData();
    const nav = useNavigate();

    useEffect(() => {
        const head = document.getElementById('head');
        const ahmed = () => {
            if (head) {
                if (window.scrollY > 120) {
                    head.style.backgroundColor = "#fff";
                } else {
                    head.style.backgroundColor = ""; // Reset to original color
                }
            }
        };
        window.addEventListener('scroll', ahmed);

        return () => {
            window.removeEventListener('scroll', ahmed);
        };
    }, []);

    const handleLogout = async () => {
       setTimeout(async()=>{
        try {
            await signOut(auth);
            nav('/login');
            setShowLogoutMessage(true); // Show logout message
            setTimeout(() => {
                setShowLogoutMessage(false); // Hide the message after 3 seconds
            }, 3000);
        } catch (err) {
            console.log(err);
        }
       },[])
    };
    

    return (
        <div className="header" id="head">
            <div className='logo'>
                <div className="logo-text">
   <Link to='/'>   <h2><MdOutlineTravelExplore className='travel-icon' /><span>travel</span></h2></Link>
                </div>
                <div className='menu'>
                    <IoMdMenu onClick={() => setToggle(!toggle)} />
                </div>
            </div>
            <ul className="navbar-links" style={{ clipPath: toggle && 'polygon(0 0, 100% 0%, 100% 100%, 0 100%)' }}>
                <li>
                    <a href="#">home</a>
                </li>
                <li>
                    <a href="#">about</a>
                </li>
                <li>
                    <Link to='login'> login</Link>
                </li>
                <li>
                    <a href="#">register</a>
                </li>
                <li>
                    <a href="#">contact</a>
                </li>
            </ul>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0px 20px' }}>
                <button onClick={handleLogout}>logout</button>
                <li onClick={handleShow}>
                    <button className="shopping-cart">
                        booking
                    </button>
                    <h3 className='item-count'> {cartItem.length}</h3>
                </li>
            </div>
            {/* Display the logout message */}
            {showLogoutMessage && (
                <div className="logout-message">
                    You have logged out.
                </div>
            )}
        </div>
    );
}

export default Header;
