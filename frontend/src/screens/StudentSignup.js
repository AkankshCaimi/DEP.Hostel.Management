import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../all_css/Login.css';

const StudentSignup = () => {
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPassword, setStudentPassword] = useState('');

  const handleStudentNameChange = (event) => {
    setStudentName(event.target.value);
  };

  const handleStudentEmailChange = (event) => {
    setStudentEmail(event.target.value);
  };

  const handleStudentPasswordChange = (event) => {
    setStudentPassword(event.target.value);
  };

  const handleStudentSignup = (event) => {
    event.preventDefault();
    // Add your student signup logic here
    console.log('Student Name:', studentName, 'Student Email:', studentEmail, 'Student Password:', studentPassword);
  };

  return (
    <div>
      <div className="form-popup">
        <div className="form-box signup">
          <div className="form-details">
            <h2>Student Signup</h2>
            <p>Please provide your information to create a student account.</p>
          </div>
          <div className="form-content">
            <h2>SIGNUP</h2>
            <form onSubmit={handleStudentSignup}>
              <div className="input-field">
              <input type="text" required
                value={studentName}
                onChange={handleStudentNameChange} />
                <label>Student Name</label>
              </div>
              <div className="input-field">
                <input
                  type="email" required
                  value={studentEmail}
                  onChange={handleStudentEmailChange}
                />
                <label >Student Email</label>
              </div>
              <div className="input-field">
                <input
                  type="password" required
                  value={studentPassword}
                  onChange={handleStudentPasswordChange}
                />
                <label >Student Password</label>
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

export default StudentSignup;
