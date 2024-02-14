import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../styles/tailwind.css";

const StudentSignup = () => {
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const navigate = useNavigate();

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
    axios.post('http://localhost:8000/api/signup', {
      name: studentName,
      email: studentEmail,
      password: studentPassword,
      role: 'student'
    }).then((response) => {
      console.log(response);
      alert('Student Signup Successful'); 
      navigate('/');
    });
  };

  return (
    <div>
      <div className="fixed top-20 right-0 w-full h-full flex items-center justify-center bg-gray-200 bg-opacity-75">
        <div className="bg-white p-8 rounded shadow-md">
          <span className="close-btn text-right cursor-pointer hover:text-blue-500" onClick={() => navigate('/')}>X</span>
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold">Student Signup</h2>
          </div>
          <h2 className="text-xl mb-4">SIGNUP</h2>
          <form onSubmit={handleStudentSignup}>
            <div className="mb-4">
              <label>Student Name</label>
              <input
                type="text"
                required
                value={studentName}
                onChange={handleStudentNameChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label>Student Email</label>
              <input
                type="email"
                required
                value={studentEmail}
                onChange={handleStudentEmailChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label>Student Password</label>
              <input
                type="password"
                required
                value={studentPassword}
                onChange={handleStudentPasswordChange}
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

export default StudentSignup;
