import React from 'react';
import { NavLink } from "react-router-dom";
import "../styles/tailwind.css";

const Headers = ({ showPopup, setShowPopup }) => {

    return (
        <>
            <nav className="bg-gray-800 p-4 flex items-center justify-between">
                <NavLink to="/" className="text-white text-2xl font-bold no-underline">Hostel</NavLink>
                <ul className="hidden md:flex space-x-4">
                    <li><NavLink to="/" className="text-gray-300 no-underline">Home</NavLink></li>
                    <li><NavLink to="/about" className="text-gray-300 no-underline">About us</NavLink></li>
                    <li><NavLink to="/contact" className="text-gray-300 no-underline">Contact us</NavLink></li>
                    <li><NavLink to="/login" className="text-gray-300 no-underline">Login</NavLink></li>
                </ul>
            </nav>
        </>
    )
}

export default Headers;
