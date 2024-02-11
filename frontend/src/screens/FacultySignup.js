import React, { useState } from 'react';

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
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Faculty Signup</h2>
      <form onSubmit={handleFacultySignup}>
        <label className="block mb-4">
          Faculty Name:
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={facultyName}
            onChange={handleFacultyNameChange}
          />
        </label>
        <label className="block mb-4">
          Faculty Email:
          <input
            type="email"
            className="w-full border rounded px-3 py-2"
            value={facultyEmail}
            onChange={handleFacultyEmailChange}
          />
        </label>
        <label className="block mb-4">
          Faculty Password:
          <input
            type="password"
            className="w-full border rounded px-3 py-2"
            value={facultyPassword}
            onChange={handleFacultyPasswordChange}
          />
        </label>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Signup
        </button>
      </form>
    </div>
  );
};

export default FacultySignup;
