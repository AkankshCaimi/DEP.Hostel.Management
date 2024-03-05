import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../styles/tailwind.css";
import { useAuth } from "../contexts/authContext";
import { Button } from "bootstrap";
import { useNavigate } from "react-router-dom";
const excludedRoutes = ["/login", "/signup"];
const Headers = () => {
    const [openDropdown, setOpenDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const handleDropdownToggle = () => {
        setOpenDropdown(!openDropdown);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setOpenDropdown(false);
        }
    };
    const location = useLocation();
    const { currentUser, logout } = useAuth();
    const [shouldRenderNavbar, setShouldRenderNavbar] = useState(
      !excludedRoutes.includes(location.pathname) // Initial render based on route
    );
      const handleLogout=async()=>{
          try{
              console.log('inside handleLogout')
              await logout();
              navigate('/');
          }
          catch(err){
              console.log(err)
          }
      }
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            setShouldRenderNavbar(!excludedRoutes.includes(location.pathname));
        };
    }, [location]);

    return (
        <>
            <nav className="p-2 flex items-center justify-between bg-color">
                <NavLink to="/" className="flex items-center text-white text-2xl font-bold no-underline ml-10">
                    <img src={require('../images/iitropar.png')} alt="logo" className="w-16 h-16 mr-2" />
                    Hostel IIT Ropar
                </NavLink>
                <ul className="hidden md:flex space-x-6 font-semibold text-lg mt-2 ml-8 mr-8">
                    <li><NavLink to="/" className="text-gray-300 no-underline">Home</NavLink></li>
                    <div className="relative group" ref={dropdownRef}>
                        <button
                            type="button"
                            className={`text-gray-300 flex items-center`}
                            onClick={handleDropdownToggle}
                        >
                            Programs
                            <svg
                                className={`ml-2 h-4 w-4 transition-transform ${openDropdown ? 'transform rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        {openDropdown && (
                            <ul className="absolute z-10 bg-gray-300 text-red border border-2 p-0 space-y-0 mt-2 w-32">
                                <li><NavLink to="/" className="block px-4 py-2 no-underline hover:bg-color border-b border-gray-800">UG Program</NavLink></li>
                                <li><NavLink to="" className="block px-4 py-2 no-underline hover:bg-color border-b border-gray-800">PG Program</NavLink></li>
                                <li><NavLink to="/intern" className="block px-4 py-2 no-underline hover:bg-color border-b border-gray-800">Intern Student</NavLink></li>
                                <li><NavLink to="/intern" className="block px-4 py-2 no-underline hover:bg-color ">Student Exchange</NavLink></li>
                            </ul>
                        )}
                    </div>
                    <li><NavLink to="/contact" className="text-gray-300 no-underline">Contact us</NavLink></li>
                    <li>{!currentUser ? (
                <NavLink to="/login" className="text-gray-300 no-underline">
                  Login
                </NavLink>
              ) : (
                <span onClick={handleLogout} className="text-gray-300 no-underline hover:cursor-pointer">Logout</span>
              )}</li>
                </ul>
            </nav>
        </>
    );
}

export default Headers;
