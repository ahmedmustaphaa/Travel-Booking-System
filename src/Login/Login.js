import React, { useState } from 'react';
import './login.css';
import { auth } from '../Firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();

    const handleRegister = async () => {
        setLoading(true);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            toast.success("Account created successfully!");
            nav('/');
        } catch (error) {
            toast.error("Email is already in use or invalid.");
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async () => {
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast.success("Login successful!");
            nav('/');
        } catch (error) {
            toast.error("Invalid email or password.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="login-page">
            <div className="container">
                <form onSubmit={handleSubmit} className="login-form">
                    <h2 style={{color:'red'}}>{loading ? "Please wait..." : "Login"}</h2>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="button-group">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleRegister}
                            disabled={loading}
                        >
                            {loading ? "Creating Account..." : "Create Account"}
                        </button>

                        
                    </div>

                    <p className="info-text">
                        In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or 
                        a typeface without relying on meaningful content.
                    </p>
                    <button
                            type="button"
                            className="btn btn-secondary ms-2"
                            onClick={handleLogin}
                            disabled={loading}
                        >
                            {loading ? "Logging In..." : "Login"}
                        </button>
                </form>
            </div>

            <ToastContainer />
        </div>
    );
};

export default Login;