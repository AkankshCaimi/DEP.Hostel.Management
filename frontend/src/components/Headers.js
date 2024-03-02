import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import "../styles/tailwind.css";

const Headers = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const handleDropdownToggle = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handleDropdownClose = () => {
        setDropdownOpen(false);
    };

    return (
        <>
            <nav className="bg-gray-800 p-4 flex items-center justify-between">

                <NavLink to="/" className="flex items-center text-white text-xl font-bold no-underline">
                    <img src={require('../images/iitropar.jpg')} alt="logo" className="w-12 h-12 mr-2" />
                    Hostel IIT Ropar
                </NavLink>

                <ul className="hidden md:flex space-x-4">
                    <li><NavLink to="/" className="text-gray-300 no-underline">Home</NavLink></li>
                    <li
                        className="relative group"
                        onMouseEnter={handleDropdownToggle}
                        onMouseLeave={handleDropdownClose}
                    >
                        <span className="text-gray-300 cursor-pointer no-underline">Programs</span>
                        <ul
                            className={`absolute ${isDropdownOpen ? 'block' : 'hidden'} bg-gray-500 text-gray-300 p-2 space-y-2 mt-2 rounded`}
                        >
                            <li><NavLink to="/programs/ug" className="block text-gray-300 px-4 py-2 no-underline hover:bg-gray-500 rounded">UG Program</NavLink></li>
                            <li><NavLink to="/programs/pg" className="block text-gray-300 px-4 py-2 no-underline hover:bg-gray-500 rounded">PG Program</NavLink></li>
                            <li><NavLink to="/programs/intern" className="block text-gray-300 px-4 py-2 no-underline hover:bg-gray-500 rounded">Intern Student</NavLink></li>
                            <li><NavLink to="/programs/exchange" className="block text-gray-300 px-4 py-2 no-underline hover:bg-gray-500 rounded">Student Exchange</NavLink></li>
                        </ul>
                    </li>
                    <li><NavLink to="/contact" className="text-gray-300 no-underline">Contact us</NavLink></li>
                    <li><NavLink to="/login" className="text-gray-300 no-underline">Login</NavLink></li>
                </ul>
            </nav>
        </>
    );
}

export default Headers;
