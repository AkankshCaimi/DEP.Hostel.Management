import { Routes, Route } from 'react-router-dom';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Form from './screens/Form';
import Headers from './components/Headers';
import 'bootstrap/dist/css/bootstrap.min.css';
import StudentSignup from './screens/StudentSignup';
import FacultySignup from './screens/FacultySignup';
import AdminSignup from './screens/AdminSignup';
import { useState } from 'react';

function App() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <Headers showPopup={showPopup} setShowPopup={setShowPopup} />
      <Routes>
        <Route path="/" element={<Login showPopup={showPopup} setShowPopup={setShowPopup} />} />
        <Route path="/login" element={<Login showPopup={showPopup} setShowPopup={setShowPopup} />} />
        <Route path="/signup" element={<Signup showPopup={showPopup} setShowPopup={setShowPopup}/>} />
        <Route path="/signup/student" element={<StudentSignup />} />
        <Route path="/signup/faculty" element={<FacultySignup/>} />
        <Route path="/signup/admin" element={<AdminSignup/>} />
        <Route path='/test' element={<Form />} />
      </Routes>
    </>
  );
}

export default App;
