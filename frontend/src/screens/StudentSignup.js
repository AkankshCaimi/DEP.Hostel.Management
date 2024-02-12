import React, { useState } from 'react';

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
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Student Signup</h2>
      <form onSubmit={handleStudentSignup}>
        <label className="block mb-4">
          Student Name:
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={studentName}
            onChange={handleStudentNameChange}
          />
        </label>
        <label className="block mb-4">
          Student Email:
          <input
            type="email"
            className="w-full border rounded px-3 py-2"
            value={studentEmail}
            onChange={handleStudentEmailChange}
          />
        </label>
        <label className="block mb-4">
          Student Password:
          <input
            type="password"
            className="w-full border rounded px-3 py-2"
            value={studentPassword}
            onChange={handleStudentPasswordChange}
          />
        </label>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Signup
        </button>
      </form>
    </div>
  );
};

export default StudentSignup;
