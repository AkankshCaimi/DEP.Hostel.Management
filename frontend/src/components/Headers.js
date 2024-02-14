import React from 'react';
import { NavLink, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import "../styles/tailwind.css";
const Headers = ({ showPopup, setShowPopup }) => {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <>
            <nav className="bg-gray-800 p-4 flex items-center justify-between">
    {/* <span className="text-white cursor-pointer">menu</span> */}
    <NavLink to="/" className="text-white text-2xl font-bold">Hostel</NavLink>
    <ul className="hidden md:flex space-x-4">
        <li><NavLink to="/" className="text-gray-300">Home</NavLink></li>
        <li><NavLink to="/" className="text-gray-300">Portfolio</NavLink></li>
        <li><NavLink to="/" className="text-gray-300">Courses</NavLink></li>
        <li><NavLink to="/" className="text-gray-300">About us</NavLink></li>
        <li><NavLink to="/" className="text-gray-300">Contact us</NavLink></li>
    </ul>
    {location.pathname === '/signup' && (
        <button className="text-white bg-blue-500 px-4 py-2 rounded" onClick={() => { setShowPopup(true); navigate('/signup'); }}>SIGN UP</button>
    )}
    {(location.pathname === '/login' || location.pathname === '/') && (
        <button className="text-white bg-blue-500 px-4 py-2 rounded" onClick={() => { setShowPopup(true); navigate('/login'); }}>LOG IN</button>
    )}
</nav>

        </>
    )
}

export default Headers
