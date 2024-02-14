import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "../styles/tailwind.css";

const AdminSignup = () => {
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const navigate = useNavigate();

  const handleAdminNameChange = (event) => {
    setAdminName(event.target.value);
  };

  const handleAdminEmailChange = (event) => {
    setAdminEmail(event.target.value);
  };

  const handleAdminPasswordChange = (event) => {
    setAdminPassword(event.target.value);
  };

  const handleAdminSignup = (event) => {
    event.preventDefault();
    // Add your admin signup logic here
    console.log('Admin Name:', adminName, 'Admin Email:', adminEmail, 'Admin Password:', adminPassword);
  };

  return (
    <div>
      <div className="fixed top-20 right-0 w-full h-full flex items-center justify-center bg-gray-200 bg-opacity-75">
        <div className="bg-white p-8 rounded shadow-md">
          <span className="close-btn text-right cursor-pointer hover:text-blue-500" onClick={() => navigate('/')}>X</span>
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold">Admin Signup</h2>
            <p>Please provide your information to create an admin account.</p>
          </div>
          <h2 className="text-xl mb-4">SIGNUP</h2>
          <form onSubmit={handleAdminSignup}>
            <div className="mb-4">
              <label>Admin Name</label>
              <input
                type="text"
                required
                value={adminName}
                onChange={handleAdminNameChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label>Admin Email</label>
              <input
                type="email"
                required
                value={adminEmail}
                onChange={handleAdminEmailChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label>Admin Password</label>
              <input
                type="password"
                required
                value={adminPassword}
                onChange={handleAdminPasswordChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Signup
            </button>
          </form>
          <div className="mt-4 text-center">
            Already have an account?
            <NavLink to='/login' className="text-blue-500"> Login</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSignup;
