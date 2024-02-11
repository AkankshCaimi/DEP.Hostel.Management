import React, { useState } from 'react';
import '../styles/tailwind.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can add your authentication logic here
    console.log('Username:', username, 'Password:', password);
    // For a real application, you would typically send a request to a server for authentication
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded shadow-md">
    <h2 className="text-2xl font-semibold mb-6">Login</h2>
    <form onSubmit={handleSubmit}>
      <label className="block mb-4">
        Username:
        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          value={username}
          onChange={handleUsernameChange}
        />
      </label>
      <label className="block mb-4">
        Password:
        <input
          type="password"
          className="w-full border rounded px-3 py-2"
          value={password}
          onChange={handlePasswordChange}
        />
      </label>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Login
      </button>
    </form>
  </div>
  );
};

export default Login;
