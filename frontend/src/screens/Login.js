import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../styles/tailwind.css';
import axios from 'axios';
const Login = ({ showPopup, setShowPopup }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your login logic here
        console.log('Email:', email, 'Password:', password);
        axios.post('http://localhost:8000/api/login', {
            email: email,
            password: password
        }).then((response) => {
            console.log(response);
            alert('Login Successful');
            setShowPopup(false);
            navigate('/');
        });
    }
    return (
        <div>
        {showPopup && (
            <div className="fixed top-20 left-0 w-full h-full flex items-center justify-center bg-gray-200 bg-opacity-75">
                <div className="bg-white p-8 rounded shadow-md">
                <span
                            className="close-btn text-right cursor-pointer hover:text-blue-500"
                            onClick={() => setShowPopup(!showPopup)}
                        >
                            X
                        </span>
                    <div className="text-center mb-4">
                        <h2 className="text-2xl font-bold">Login to your Account</h2>
                        {/* <p>Please log in using your personal information to stay connected with us.</p> */}
                    </div>
                    <h2 className="text-xl mb-4">LOGIN</h2>
                    <form>
                        <div className="mb-4">
                            <input
                                type="text"
                                required
                                className="w-full p-2 border border-gray-300 rounded"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label>Email</label>
                        </div>
                        <div className="mb-4">
                            <input
                                type="password"
                                required
                                className="w-full p-2 border border-gray-300 rounded"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label>Password</label>
                        </div>
                        <NavLink to="/forgot-password" className="text-blue-500 block mb-4">Forgot password?</NavLink>
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Log In
                        </button>
                    </form>
                    <div className="mt-4 text-center">
                        Don't have an account?
                        <NavLink to='/signup' className="text-blue-500"> Signup</NavLink>
                    </div>
                </div>
            </div>
        )}
    </div>
    )
}

export default Login;

