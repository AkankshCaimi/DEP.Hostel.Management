import React from 'react';
import { NavLink, useLocation } from "react-router-dom";
import logo from '../images/logo.jpg'
import './Headers.css';
import { useNavigate } from 'react-router-dom';
const Headers = ({ showPopup, setShowPopup }) => {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <>
            <nav className="navbar">
                <span className="hamburger-btn material-symbols-rounded">menu</span>
                <NavLink to="/" className="logo">
                    <img src={logo} alt="logo" />
                    <h2>Hostel</h2>
                </NavLink>
                <ul className="links">
                    <span className="close-btn material-symbols-rounded">close</span>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/">Portfolio</NavLink></li>
                    <li><NavLink to="/">Courses</NavLink></li>
                    <li><NavLink to="/">About us</NavLink></li>
                    <li><NavLink to="/">Contact us</NavLink></li>
                </ul>
                {location.pathname === '/signup' && (
                    <button className="login-btn" onClick={() => { setShowPopup(true); navigate('/signup'); }}>SIGN UP</button>
                )}
                {(location.pathname === '/login') && (
                    <button className="login-btn" onClick={() => { setShowPopup(true); navigate('/login'); }}>LOG IN</button>
                )}
            </nav>
        </>
    )
}

export default Headers
