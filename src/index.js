import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing Bootstrap CSS
import './index.css'; // Custom CSS for your app
import App from './App'; // Main App component
import reportWebVitals from './reportWebVitals'; // Performance measurement function
import { BrowserRouter } from 'react-router-dom'; // For routing
import ContextApi from './ContextApi'; // Context API setup

// Create a root for the React application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ContextApi>
        <BrowserRouter>
            <App /> {/* Main application component */}
        </BrowserRouter>
    </ContextApi>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(); // Optional performance logging