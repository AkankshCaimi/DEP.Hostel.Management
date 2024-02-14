import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "../styles/tailwind.css";

const FacultySignup = () => {
  const [facultyName, setFacultyName] = useState('');
  const [facultyEmail, setFacultyEmail] = useState('');
  const [facultyPassword, setFacultyPassword] = useState('');
  const navigate = useNavigate();


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
      <div className="fixed top-20 right-0 w-full h-full flex items-center justify-center bg-gray-200 bg-opacity-75">
        <div className="bg-white p-8 rounded shadow-md">
        <span className="close-btn text-right cursor-pointer hover:text-blue-500" onClick={() => navigate('/')}>X</span>
                  <div className="text-center mb-4">
            <h2 className="text-2xl font-bold">Faculty Signup</h2>
          </div>
          <h2 className="text-xl mb-4">SIGNUP</h2>
          <form onSubmit={handleFacultySignup}>
            <div className="mb-4">
              <label>Faculty Name</label>
              <input
                type="text"
                required
                value={facultyName}
                onChange={handleFacultyNameChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label>Faculty Email</label>
              <input
                type="email"
                required
                value={facultyEmail}
                onChange={handleFacultyEmailChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label>Faculty Password</label>
              <input
                type="password"
                required
                value={facultyPassword}
                onChange={handleFacultyPasswordChange}
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

export default FacultySignup;
