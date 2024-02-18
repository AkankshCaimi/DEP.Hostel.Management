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
      <div className="flex items-center justify-center h-screen">
  <div className="w-full max-w-md p-6 bg-gray-100 bg-opacity-75 rounded shadow-md">
    <div className="text-center mb-4">
      <h2 className="text-2xl font-bold">Register your Account</h2>
    </div>
    <form onSubmit={handleStudentSignup}>
      <div className="mb-4">
        <input
          type="text"
          required
          value={studentName}
          onChange={handleStudentNameChange}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Name"
        />
      </div>
      <div className="mb-4">
        <input
          type="email"
          required
          value={studentEmail}
          onChange={handleStudentEmailChange}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Email"
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          required
          value={studentPassword}
          onChange={handleStudentPasswordChange}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Password"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
        Signup
      </button>
    </form>
    <div className="mt-4 text-center">
      Already have an account? <NavLink to='/login' className="text-blue-500">Login</NavLink>
    </div>
  </div>
</div>

    </div>
  );
};

export default StudentSignup;
