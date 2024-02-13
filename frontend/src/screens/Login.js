import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../all_css/Login.css';
import axios from 'axios';
const Login = ({ showPopup, setShowPopup }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your login logic here
        console.log('Email:', email, 'Password:', password);
        axios.post('http://localhost:8000/api/login', {
            email: email,
            password: password
        }).then((response) => {
            console.log(response);
            alert('Login Successful');
            setShowPopup(false);
            navigate('/');
        });
    }
    return (
        <div>
            {showPopup && (
                <div className={`form-popup ${showPopup? 'show-popup':''}`}>
                    <span className="close-btn" onClick={() => setShowPopup(!showPopup)}>Close</span>
                    <div className="form-box login">
                        <div className="form-details">
                            <h2>Welcome Back</h2>
                            <p>Please log in using your personal information to stay connected with us.</p>
                        </div>
                        <div className="form-content">
                            <h2>LOGIN</h2>
                            <form>
                                <div className="input-field">
                                    <input type="text" required onChange={(e)=>setEmail(e.target.value)}/>
                                    <label>Email</label>
                                </div>
                                <div className="input-field">
                                    <input type="password" required onChange={(e)=>setPassword(e.target.value)} />
                                    <label>Password</label>
                                </div>
                                <NavLink to="/forgot-password" className="forgot-pass-link">Forgot password?</NavLink>
                                <button type="submit" onClick={handleSubmit}>Log In</button>
                            </form>
                            <div class="bottom-link">
                    Don't have an account?
                    <NavLink to='/signup' id="login-link"> Signup</NavLink>
                </div>
                </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Login;

