import React, { useState } from 'react';
import '../styles/tailwind.css';

const AdminSignup = () => {
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

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
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Admin Signup</h2>
      <form onSubmit={handleAdminSignup}>
        <label className="block mb-4">
          Admin Name:
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={adminName}
            onChange={handleAdminNameChange}
          />
        </label>
        <label className="block mb-4">
          Admin Email:
          <input
            type="email"
            className="w-full border rounded px-3 py-2"
            value={adminEmail}
            onChange={handleAdminEmailChange}
          />
        </label>
        <label className="block mb-4">
          Admin Password:
          <input
            type="password"
            className="w-full border rounded px-3 py-2"
            value={adminPassword}
            onChange={handleAdminPasswordChange}
          />
        </label>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Signup
        </button>
      </form>
    </div>
  );
};

export default AdminSignup;
