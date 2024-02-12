import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../all_css/Login.css';

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
    <div>
      <div className="form-popup">
        <div className="form-box signup">
          <div className="form-details">
            <h2>Admin Signup</h2>
            <p>Please provide your information to create an admin account.</p>
          </div>
          <div className="form-content">
            <h2>SIGNUP</h2>
            <form onSubmit={handleAdminSignup}>
              <div className="input-field">
                <input
                  type="text" required
                  value={adminName}
                  onChange={handleAdminNameChange}
                />
                <label>Admin Name</label>
              </div>
              <div className="input-field">
                <input
                  type="email" required
                  value={adminEmail}
                  onChange={handleAdminEmailChange}
                />
                <label>Admin Email</label>
              </div>
              <div className="input-field">
                <input
                  type="password" required
                  value={adminPassword}
                  onChange={handleAdminPasswordChange}
                />
                <label>Admin Password</label>
              </div>
              <button type="submit" className="custom-button">
                Signup
              </button>
            </form>
            <div className="bottom-link">
              Already have an account?
              <NavLink to='/login' id="signup-link"> Login</NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSignup;
