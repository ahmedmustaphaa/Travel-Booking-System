import React, { useEffect } from 'react';
import { useShareData } from '../ContextApi';
import { Card, Stack, Button } from 'react-bootstrap';
import './checkout.css';
import { api } from '../api';
import Payment from '../paymentmethod/Payment';
import { loadStripe } from '@stripe/stripe-js';
import AOS from 'aos'; // Import AOS for animations
import 'aos/dist/aos.css'; // Import AOS styles
import Swal from 'sweetalert2';

function Checkout() {
    const { cartItem, increaseQuantity, decreaseQuantity, getItemQuantity, removeItem } = useShareData();
    const quantity = getItemQuantity;

    // Initialize AOS animations
    useEffect(() => {
        AOS.init();
    }, []);

    const delItem = (id) => {
        Swal.fire({
            title: 'Are you sure you want to remove this item?',
            text: 'This action cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, remove it!',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#d33',  // Red button color for remove action
            cancelButtonColor: '#3085d6',  // Blue color for cancel action
            reverseButtons: true,
            preConfirm: () => {
                // You can simulate a loading state during the action
                Swal.fire({
                    title: 'Removing item...',
                    text: 'Please wait while we remove the item from your cart.',
                    icon: 'info',
                    showConfirmButton: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });
    
                // Simulate the removal process (you can also make an API call here if necessary)
                return new Promise((resolve, reject) => {
                    // Use the `removeItem` method after delay to simulate processing time
                    setTimeout(() => {
                        removeItem(id);
                        resolve();
                    }, 1500); // Wait for 1.5 seconds to simulate the removal action
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // Show a success message once the item is removed
                Swal.fire({
                    title: 'Item Removed',
                    text: 'The item has been successfully removed from your cart.',
                    icon: 'success',
                    confirmButtonColor: '#3085d6', // Blue confirm button color
                });
            }
        }).catch((error) => {
            // In case of any error, show an error message
            Swal.fire({
                title: 'Error',
                text: 'Something went wrong while removing the item. Please try again.',
                icon: 'error',
                confirmButtonColor: '#d33',
            });
        });
    };
    

    return (
        <div className='checkedout'>
            <div className='cart-length'>
                <h1 data-aos="fade-up" data-aos-duration="800">Checked Out <span>({cartItem.length} items)</span></h1>
            </div>

            <div className="review" data-aos="fade-up" data-aos-duration="1000">
                <div className='item-review'>
                    <h2>Items Checked</h2>
                </div>

                {cartItem.length > 0 ? (
                    <ol className='product-list'>
                        {cartItem.map((item) => {
                            const product = api.find((product) => product.id === item.id);

                            return (
                                product ? (
                                    <li key={item.id} className='product-checkout' data-aos="fade-up" data-aos-duration="1200">
                                        <div className='products'>
                                            <div className='product-info'>
                                                <img 
                                                    src={product.img} 
                                                    alt={product.title} 
                                                    className="product-img"
                                                />
                                                <Card.Title className="product-title">{product.title}</Card.Title>
                                            </div>
                                            <div className="product-price">
                                                <Card.Text  style={{textAlign: 'center'}}>Price: ${product.price * quantity(product.id)}</Card.Text>
                                            </div>
                                            <div className="quantity-control">
                                                <Button variant="outline-secondary" onClick={() => increaseQuantity(product.id)} className="btn btn-success">+</Button>
                                                <h3>{quantity(product.id)}</h3>
                                                <Button variant="outline-danger" onClick={() => decreaseQuantity(product.id)} className="btn btn-danger">−</Button>
                                            </div>
                                            <button className='remove-btn' onClick={() => delItem(product.id)} style={{width:'15%',backgroundColor:'red'}}>Remove</button>
                                        </div>
                                    </li>
                                ) : (
                                    <p key={item.id}>Product not found</p>
                                )
                            );
                        })}
                    </ol>
                ) : (
                    <p>Your cart is empty.</p>
                )}
            </div>

            <div className="checkout-summary" data-aos="fade-up" data-aos-duration="1500">
                <Payment />
            </div>
        </div>
    );
}

export default Checkout;
