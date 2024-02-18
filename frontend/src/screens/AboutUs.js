import React from 'react';
import "../styles/tailwind.css";

const AboutUs = () => {
    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-4">About Us</h1>
            <p className="mb-4">
                Welcome to our Hostel! Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="mb-4">
                Our mission is to provide a comfortable and friendly environment for students and travelers.
                We strive to create a home away from home, where everyone can focus on their studies, work, or simply enjoy their stay.
            </p>
            <p>
                Feel free to explore our website for more information about our facilities and services.
                If you have any questions or inquiries, don't hesitate to contact us.
            </p>
        </div>
    );
};

export default AboutUs;
