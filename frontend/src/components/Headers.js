import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../styles/tailwind.css";
import { useAuth } from "../contexts/authContext";
import { Button } from "bootstrap";
import { useNavigate } from "react-router-dom";
const excludedRoutes = ["/login", "/signup"];
const Headers = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownClose = () => {
    setDropdownOpen(false);
  };
  const location = useLocation(); // Get current route information
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
    // Update state on route change
    setShouldRenderNavbar(!excludedRoutes.includes(location.pathname));
  }, [location]);
  return (
    <>
      <nav className="p-2 flex items-center justify-between bg-color relative z-10">
        <NavLink
          to="/"
          className="flex items-center text-white text-2xl font-bold no-underline ml-10"
        >
          <img
            src={require("../images/iitropar.png")}
            alt="logo"
            className="w-16 h-16 mr-2"
          />{" "}
          {/* Increase image size */}
          Hostel IIT Ropar
        </NavLink>

        {shouldRenderNavbar && (
          <ul className="hidden md:flex space-x-6 font-semibold text-lg mt-2 ml-8 mr-8">
            {" "}
            {/* Adjust font styles and spacing */}
            <li>
              <NavLink to="/" className="text-gray-300 no-underline">
                Home
              </NavLink>
            </li>
            <li
              className="relative group"
              onMouseEnter={() => setDropdownOpen(true)}
              onClick={handleDropdownToggle}
              // onMouseLeave={handleDropdownClose}
            >
              <span className="text-gray-300 cursor-pointer no-underline">
                Programs
              </span>
              <ul
                className={`absolute ${
                  isDropdownOpen ? "block" : "hidden"
                } bg-color text-gray-300 p-2 space-y-2 mt-2 rounded`}
                onMouseLeave={handleDropdownClose}
              >
                <li>
                  <NavLink
                    to="/"
                    className="block text-gray-300 px-4 py-2 no-underline hover:bg-color rounded"
                  >
                    UG Program
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/"
                    className="block text-gray-300 px-4 py-2 no-underline hover:bg-color rounded"
                  >
                    PG Program
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/internship"
                    className="block text-gray-300 px-4 py-2 no-underline hover:bg-color rounded"
                  >
                    Intern Student
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/form"
                    className="block text-gray-300 px-4 py-2 no-underline hover:bg-color rounded"
                  >
                    Student Exchange
                  </NavLink>
                </li>
              </ul>
            </li>
            <li>
              <NavLink to="/contact" className="text-gray-300 no-underline">
                Contact us
              </NavLink>
            </li>
            <li>
              {!currentUser ? (
                <NavLink to="/login" className="text-gray-300 no-underline">
                  Login
                </NavLink>
              ) : (
                <span onClick={handleLogout} className="text-gray-300 no-underline hover:cursor-pointer">Logout</span>
              )}
            </li>
          </ul>
        )}
      </nav>
    </>
  );
};

export default Headers;
