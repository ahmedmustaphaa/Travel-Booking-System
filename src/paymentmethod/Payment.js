import React, { useEffect, useState } from 'react';
import './payment.css';
import { useShareData } from '../ContextApi';
import { api } from '../api';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../Firebase';

function Payment() {
    const { cartItem } = useShareData();
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const getTotalPrice = cartItem.reduce((total, item) => {
        const foundItem = api.find((it) => it.id === item.id);
        if (foundItem) {
            total += foundItem.price * item.quantity;
        }
        return total;
    }, 0);

    useEffect(() => {
        const getUserSecret = async () => {
            if (getTotalPrice > 0) { // Ensure we only call this if there's a valid price
                try {
                    const response = await fetch('/payments/create', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ total: getTotalPrice * 100 }), // Convert to cents
                    });
    
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
    
                    const data = await response.json(); // Parse response data
                    setClientSecret(data.clientSecret);  // Store the clientSecret here
                } catch (err) {
                    console.error('Error fetching client secret:', err);
                    setError('Failed to create payment. Please try again.');
                }
            }
        };
        getUserSecret();
    }, [getTotalPrice]); // Re-run effect when total price changes
    

    const handleChange = (e) => {
        setDisabled(e.empty);
        setError(e.error ? e.error.message : "");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        setError(null); // Reset any previous errors
    
        if (!clientSecret) {
            setError('Client secret is missing. Please try again.');
            setProcessing(false);
            return;
        }
    
        const cardElement = elements.getElement(CardElement);
        const { error: paymentError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
            },
        });
    
        if (paymentError) {
            setError(paymentError.message);
            setProcessing(false);
        } else {
            // Successfully confirmed payment
            const ref = doc(db, "users", "orders", paymentIntent.id);
            await setDoc(ref, {
                cartItem,
                amount: paymentIntent.amount,
                created: paymentIntent.created,
            });
    
            setSuccess(true);
            setProcessing(false);
            navigate('/order', { replace: true });
        }
    };
    

    return (
        <form onSubmit={handleSubmit}>
            <CardElement onChange={handleChange} />
            <div className='Payment'>
                <h1>Payment Method</h1>
                <div className='payment-stripe'>
                    <h3 style={{ color: 'red' }}>Order Total: ${getTotalPrice.toFixed(2)}</h3>
                    <button disabled={success || processing || disabled}>
                        {processing ? "Processing..." : "Buy Now"}
                    </button>
                    {error && <div className="error-message">{error}</div>}
                </div>
            </div>
        </form>
    );
}

export default Payment;