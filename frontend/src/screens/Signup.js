import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../all_css/Signup.css';

const Signup = ({ showPopup, setShowPopup }) => {
  const [type, setType] = useState('');

  const handleTypeChange = (e) => {
    setType(e.target.value);
  }

  return (
    <div>
      {showPopup && (
        <div className={`form-popup ${showPopup ? 'show-popup' : ''}`}>
          <span className="close-btn" onClick={() => setShowPopup(!showPopup)}>Close</span>
          <div className="form-box signup">
            <div className="form-details">
              <h2>Welcome</h2>
              <p>Please sign up using your personal information to stay connected with us.</p>
            </div>
            <div className="form-content">
              <h2>SIGNUP</h2>
              <form>
                <label>
                  Signup as:
                  <div>
                    <input type="radio" id="student" name="type" value="student" onChange={handleTypeChange} />
                    <label for="student">Student</label>
                  </div>
                  <div>
                    <input type="radio" id="faculty" name="type" value="faculty" onChange={handleTypeChange} />
                    <label for="faculty">Faculty</label>
                  </div>
                  <div>
                    <input type="radio" id="admin" name="type" value="admin" onChange={handleTypeChange} />
                    <label for="admin">Admin</label>
                  </div>
                </label>
                <NavLink to={`/signup/${type}`}>
                  <button type="submit">Submit</button>
                </NavLink>
              </form>
              <div class="bottom-link">
                    Already have an account?
                    <NavLink to='/login' id="login-link"> Login</NavLink>
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Signup;
