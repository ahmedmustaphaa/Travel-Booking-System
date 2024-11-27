import React from 'react';
import { Offcanvas, Button } from 'react-bootstrap';
import './offcanface.css';

import CartItem from '../cartItemShow/CartItem';
import { Link } from 'react-router-dom';
import { useShareData } from '../ContextApi';
import Cartproduct from '../cartItemShow/CartItem';
function OffcanvasExample() {
    const { open, handleClose, cartItem } = useShareData(); 

    return (
        <Offcanvas show={open} id="offcanvase" placement='end' onHide={handleClose}>
            <Offcanvas.Header closeButton className="head-title">
                <Offcanvas.Title>booking </Offcanvas.Title>
            </Offcanvas.Header>      
            <Offcanvas.Body className='bodybapser'>
                {cartItem.length > 0 ? (
                    cartItem.map((item) => (
                        <Cartproduct  key={item.id} {...item} />
                    ))
                ) : (
                    <p>Your cart is empty.</p>
                )}
                <Link to='/checkout'>
                    <Button style={{ backgroundColor: 'green',width:'40%' }} className="ms-3" >
                        Check Out
                    </Button>
                </Link>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default OffcanvasExample;