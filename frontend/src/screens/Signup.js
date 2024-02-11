import React, { useState } from 'react'
import AdminSignup from './AdminSignup'
import FacultySignup from './FacultySignup'
import StudentSignup from './StudentSignup'
import '../styles/tailwind.css';

function Signup() {
  const [type, setType] = useState('');

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  switch (type) {
    case 'student':
      return <StudentSignup />;
    case 'faculty':
      return <FacultySignup />;
    case 'admin':
      return <AdminSignup />;
    default:
      return (
        <div className="max-w-md mx-auto my-10 p-6 bg-white rounded shadow-md">
          <h1 className="text-2xl font-semibold mb-6">Signup</h1>
          <div>
            <form>
              <label className="block mb-4">
                Signup as:
                <select
                  value={type}
                  onChange={handleTypeChange}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="">Select...</option>
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                  <option value="admin">Admin</option>
                </select>
              </label>
            </form>
          </div>
        </div>
      );
  }
}

export default Signup;