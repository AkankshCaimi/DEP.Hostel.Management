import React from 'react';
import "../styles/tailwind.css";
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-500 text-white p-4">
            <div className="container mx-auto flex flex-wrap justify-between">
                <div className="w-full md:w-1/3 mb-4 md:mb-0 border-r border-gray-100 pr-4">
                    <h3 className="text-xl font-bold mb-2">Chief Warden</h3>
                    <p className="text-base mb-1">Prof abcd</p>
                    <p className="text-base">IIT Ropar</p>
                </div>
                <div className="w-full md:w-1/3 mb-4 md:mb-0 border-r border-gray-100 pr-4 pl-8">
                    <h3 className="text-xl font-bold mb-2 ">QUICK LINKS</h3>
                    <ul className="list-none pl-0">
                        <li className="text-l mb-1"><NavLink to="/about" className="text-white hover:text-gray-300">About</NavLink></li>
                        <li><NavLink to="/contact" className="text-white hover:text-gray-300">Contact Us</NavLink></li>
                    </ul>
                </div>
                <div className="w-full md:w-1/3 mb-4 md:mb-0 pl-8">
                    <h3 className="text-xl font-bold mb-2">WRITE TO US</h3>
                    <form action="#" method="post">
                        <div className="mb-2">
                            <label htmlFor="name" className="block text-white">Name:</label>
                            <input type="text" id="name" name="name" className="w-full p-1 border rounded" required />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="email" className="block text-white">Email:</label>
                            <input type="email" id="email" name="email" className="w-full p-1 border rounded" required />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="message" className="block text-white">Message:</label>
                            <textarea id="message" name="message" className="w-full p-2 border rounded" rows="2" required></textarea>
                        </div>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Submit</button>
                    </form>
                </div>
            </div>
            <div className="container mx-auto flex justify-center items-center mt-4 border-t border-gray-100 pt-2">
                <a href="https://www.iitrpr.ac.in" className="mr-4 text-white hover:text-gray-300">IIT Ropar</a>
            </div>
        </footer>
    );
};

export default Footer;
