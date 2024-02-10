import React, { useState } from 'react'
import AdminSignup from './AdminSignup'
import FacultySignup from './FacultySignup'
import StudentSignup from './StudentSignup'

function Signup() {
  const [type, setType] = useState('');
  const handleTypeChange = (e) => {
    setType(e.target.value);
  }
  switch (type) {
    case 'student':
      return <StudentSignup />
    case 'faculty':
      return <FacultySignup />
    case 'admin':
      return <AdminSignup />
    default:
      return <div>
        <h1>Signup</h1>
        <div>
          <form>
            <label>
              Signup as:
              <select value={type} onChange={handleTypeChange}>
                <option value="">Select...</option>
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
                <option value="admin">Admin</option>
              </select>
            </label>
          </form>
        </div>
      </div>
  }
}

export default Signup