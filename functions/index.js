// Import necessary modules
const { onRequest } = require('firebase-functions/v2/https');
const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIBE_SECRET_KEY); 
const app = express();
require('dotenv').config();
app.use(express.json());
app.use(cors({ origin: true }));
app.get('/', (req, res) => {
  res.send("Welcome to the payment API!");
});
app.post('/payments/create', async (req, res) => {
    const { total } = req.body;  // total comes from frontend
    if (!total) {
        return res.status(400).send({ error: 'Total amount is required' });
    }
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total,
            currency: 'usd',
        });
        
        res.status(201).send({
            clientSecret: paymentIntent.client_secret,  // Make sure this is sent back
        });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).send({ error: 'Payment intent creation failed' });
    }
});
