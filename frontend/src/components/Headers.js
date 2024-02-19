import React from 'react';
import { NavLink } from "react-router-dom";
import "../styles/tailwind.css";

const Headers = () => {
    return (
        <>
            <nav className="bg-gray-800 p-4 flex items-center justify-between">

                <NavLink to="/" className="flex items-center text-white text-xl font-bold no-underline">
                    <img src={require('../images/iitropar.jpg')} alt="logo" className="w-12 h-12 mr-2" />
                    Hostel IIT Ropar
                </NavLink>

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
