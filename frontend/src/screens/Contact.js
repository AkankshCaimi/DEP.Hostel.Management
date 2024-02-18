import React from 'react';
import "../styles/tailwind.css";

const Contact = () => {
    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
            <p className="mb-4">
                We'd love to hear from you! If you have any questions, suggestions, or feedback,
                feel free to reach out to us using the contact information below.
            </p>
            <div className="flex items-center mb-4">
                <span className="mr-2">Email:</span>
                <a href="mailto:info@example.com" className="text-blue-500">info@example.com</a>
            </div>
            <div className="flex items-center mb-4">
                <span className="mr-2">Phone:</span>
                <span className="text-blue-500">123-456-7890</span>
            </div>
            <div className="flex items-center mb-4">
                <span className="mr-2">Address:</span>
                <span className="text-blue-500">123 Main Street, Cityville, Country</span>
            </div>
            <p>
                We look forward to hearing from you and will do our best to respond promptly!
            </p>
        </div>
    );
};

export default Contact;
