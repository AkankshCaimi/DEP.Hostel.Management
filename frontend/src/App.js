import { Routes, Route } from 'react-router-dom';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Form from './screens/Form';
import Headers from './components/Headers';
import 'bootstrap/dist/css/bootstrap.min.css';
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
        <Route path="/signup/student" element={<Signup type="student" />} />
        <Route path="/signup/faculty" element={<Signup type="faculty" />} />
        <Route path="/signup/admin" element={<Signup type="admin" />} />
        <Route path='/test' element={<Form />} />
      </Routes>
    </>
  );
}

export default App;
