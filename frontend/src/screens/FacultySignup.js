import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../all_css/Login.css';

const FacultySignup = () => {
  const [facultyName, setFacultyName] = useState('');
  const [facultyEmail, setFacultyEmail] = useState('');
  const [facultyPassword, setFacultyPassword] = useState('');

  const handleFacultyNameChange = (event) => {
    setFacultyName(event.target.value);
  };

  const handleFacultyEmailChange = (event) => {
    setFacultyEmail(event.target.value);
  };

  const handleFacultyPasswordChange = (event) => {
    setFacultyPassword(event.target.value);
  };

  const handleFacultySignup = (event) => {
    event.preventDefault();
    // Add your faculty signup logic here
    console.log('Faculty Name:', facultyName, 'Faculty Email:', facultyEmail, 'Faculty Password:', facultyPassword);
  };

  return (
    <div>
      <div className="form-popup">
        <div className="form-box signup">
          <div className="form-details">
            <h2>Faculty Signup</h2>
            <p>Please provide your information to create a faculty account.</p>
          </div>
          <div className="form-content">
            <h2>SIGNUP</h2>
            <form onSubmit={handleFacultySignup}>
              <div className="input-field">
                <input
                  type="text" required
                  value={facultyName}
                  onChange={handleFacultyNameChange}
                />
                <label >Faculty Name</label>
              </div>
              <div className="input-field">
                <input
                  type="email" required
                  value={facultyEmail}
                  onChange={handleFacultyEmailChange}
                />
                <label>Faculty Email</label>
              </div>
              <div className="input-field">
                <input
                  type="password" required
                  value={facultyPassword}
                  onChange={handleFacultyPasswordChange}
                />
                <label >Faculty Password</label>
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

export default FacultySignup;
