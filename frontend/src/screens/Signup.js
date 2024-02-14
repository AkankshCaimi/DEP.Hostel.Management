import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import "../styles/tailwind.css";

const Signup = ({ showPopup, setShowPopup }) => {
  const [type, setType] = useState('');

  const handleTypeChange = (e) => {
    setType(e.target.value);
  }

  return (
    <div>
      {showPopup && (
        <div className="fixed top-20 left-0 w-full h-full flex items-center justify-center bg-gray-200 bg-opacity-75">
          <div className="bg-white p-8 rounded shadow-md">
            <span className="close-btn text-right cursor-pointer hover:text-blue-500" onClick={() => setShowPopup(!showPopup)}>X</span>
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold">Registeration</h2>
            </div>
            <h2 className="text-xl mb-4">SIGNUP</h2>
            <form>
              <div className="mb-4">
                {/* <label className="block mb-2">Signup as:</label> */}
                <div className="mb-2">
                  <input type="radio" id="student" name="type" value="student" onChange={handleTypeChange} />
                  <label htmlFor="student" className="ml-2">Student</label>
                </div>
                <div className="mb-2">
                  <input type="radio" id="faculty" name="type" value="faculty" onChange={handleTypeChange} />
                  <label htmlFor="faculty" className="ml-2">Faculty</label>
                </div>
                <div className="mb-2">
                  <input type="radio" id="admin" name="type" value="admin" onChange={handleTypeChange} />
                  <label htmlFor="admin" className="ml-2">Admin</label>
                </div>
              </div>
              <NavLink to={`/signup/${type}`}>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
              </NavLink>
            </form>
            <div className="mt-4 text-center">
              Already have an account?
              <NavLink to='/login' className="text-blue-500"> Login</NavLink>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Signup;
