import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      'client_secret_from_backend_here',  // client secret from backend
      {
        payment_method: {
          card: cardElement,
        },
      }
    );

    if (error) {
      console.log(error.message);
      // Show error message to user
    } else if (paymentIntent.status === 'succeeded') {
      console.log('Payment successful!');
      // Show success message to user
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>Pay</button>
    </form>
  );
};

export default CheckoutForm;
