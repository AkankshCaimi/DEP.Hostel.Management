import React from 'react';
// import React, { useState, useEffect } from 'react';
// import { loadCaptchaEnginge, LoadCanvasTemplate } from 'react-simple-captcha';
import { NavLink } from 'react-router-dom';
import "../styles/tailwind.css";

const Footer = () => {
    // const [isCaptchaValid, setIsCaptchaValid] = useState(false);
    // const [captchaValue, setCaptchaValue] = useState('');

    // useEffect(() => {
    //     // Load the captcha engine when the component mounts
    //     loadCaptchaEnginge(4);
    // }, []); // Empty dependency array to ensure it runs only once when mounted

    // const handleCaptchaChange = (value) => {
    //     setCaptchaValue(value);
    //     setIsCaptchaValid(value === 'your_validation_string');
    // };

    // const handleSubmit = (event) => {
    //     // Prevent the default form submission if the captcha is not valid
    //     if (!isCaptchaValid) {
    //         event.preventDefault();
    //         alert("Please complete the captcha.");
    //         // Optionally, you can handle this differently (e.g., show an error message).
    //     }
    //     // Otherwise, proceed with form submission.
    // };

    return (
        <footer className="bg-color text-white p-4">
            <div className="container mx-auto flex flex-wrap justify-between">
                <div className="w-full md:w-1/3 mb-4 md:mb-0 border-r border-gray-100 pr-4">
                    <h3 className="text-xl font-bold mb-2">Chief Warden</h3>
                    <p className="text-base mb-1">Prof Ravi Kumar</p>
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
                            <input type="text" id="name" name="name" className="w-full p-1 border rounded text-gray-800" required />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="email" className="block text-white">Email:</label>
                            <input type="email" id="email" name="email" className="w-full p-1 border rounded text-gray-800" required />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="message" className="block text-white">Message:</label>
                            <textarea id="message" name="message" className="w-full p-2 border rounded text-gray-800" rows="2" required></textarea>
                        </div>
                        {/* <LoadCanvasTemplate />
                <input
                    type="text"
                    className='text-gray-800'
                    value={captchaValue}
                    onChange={(e) => handleCaptchaChange(e.target.value)}
                    placeholder="Enter Captcha"
                    required
                />
                <button
                    type="button"
                    className={`bg-green-500 text-white px-4 py-2 rounded ${isCaptchaValid ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
                    onClick={() => setIsCaptchaValid(true)} // Simulating verification for demonstration
                >
                    Verify Captcha
                </button>
    {isCaptchaValid && <span className="text-green-500 ml-2">&#10004;</span>}*/}

                <button
                    type="submit"
                    // className={`bg-blue-500 text-white px-4 py-2 rounded ${!isCaptchaValid && 'cursor-not-allowed opacity-50'} hover:bg-blue-700 `}
                    className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 `}
                    // disabled={!isCaptchaValid}
                > 
                    Submit
                </button>
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
