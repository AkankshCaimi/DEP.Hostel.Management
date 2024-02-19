import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../styles/tailwind.css';
import { useAuth } from '../contexts/authContext';
const Login = ({ setShowPopup }) => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {currentUser, login, setCurrentUser}=useAuth();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Email:', email, 'Password:', password);
        try{
            const resp = await login(email, password);
            console.log('in login: ', resp.data)
            console.log('in login: ', currentUser)
            setCurrentUser(resp.data)
            setShowPopup(false)
            navigate('/')
        }
        catch(err){
            console.log(err)
        }
    }
    // const login=
    //     useGoogleLogin({
    //         onSuccess: (response) => console.log(response.data),
    //         onFailure: (response) => console.log(response)
    //     })
    
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-full max-w-md p-6 bg-gray-100 rounded shadow-md">
                <div className="text-center mb-4">
                    <h2 className="text-2xl font-bold">Login to your Account</h2>
                </div>
                <h2 className="text-xl mb-4">LOGIN</h2>
                <form>
                    <div className="mb-4">
                        <input
                            type="text"
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <NavLink to="/forgot-password" className="text-blue-500 block mb-4">Forgot password?</NavLink>
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
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
    );
}

export default Login;
