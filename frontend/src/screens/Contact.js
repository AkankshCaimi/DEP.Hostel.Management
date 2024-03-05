import React from 'react';
import "../styles/tailwind.css";

const Contact = () => {
    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
            <p className="mb-4">
                Contact Detail for Hostel realted queries:
            </p>
            <div className="flex items-center mb-4">
                <span className="mr-2">Email:</span>
                <a href="mailto:hostelmanagement@iitrpr.ac.in" className="text-blue-500">hostelmanagement@iitrpr.ac.in</a>
            </div>
            <div className="flex items-center mb-4">
                <span className="mr-2">Phone:</span>
                <span className="">+91-934682XXXX</span>
            </div>
            <div className="flex items-center mb-4">
                <span className="mr-2">Address:</span>
                <span className="">Indian Institute of Technology Ropar (Main Campus), Bara Phool, Ropar, India</span>
            </div>
            <div className="flex items-center mb-4">
                <span className="mr-2">Postal Code:</span>
                <span className="">140001</span>
            </div>
        </div>
    );
};

export default Contact;
