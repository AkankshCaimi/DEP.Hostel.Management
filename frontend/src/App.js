import { Routes, Route } from 'react-router-dom';
import Login from './screens/Login';
import Form from './screens/Form';
import AboutUs from './screens/AboutUs';
import Headers from './components/Headers';
import 'bootstrap/dist/css/bootstrap.min.css';
import StudentSignup from './screens/Signup';
import Home from './screens/Home';
import Contact from './screens/Contact';
import AdminDashboard from './screens/AdminDashboard';
import AddStudents from './screens/AddStudents';
import AddFaculty from './screens/AddFaculty';
import { useState } from 'react';
import Test from './screens/Test';
import ApplicationStatus from './screens/ApplicationStatus';
import ComplaintStatus from './screens/ComplaintStatus';
import ProfessorDashboard from './screens/ProfessorDashboard';
import ProfAppStatus from './screens/ProfAppStatus';

function App() {
  const [showPopup, setShowPopup] = useState(false);
  return (
    <>
      <Headers showPopup={showPopup} setShowPopup={setShowPopup} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<StudentSignup/>} />
        <Route path='/form' element={<Form />} />
        <Route path='/test' element={<Test/>} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/admin-dashboard' element={<AdminDashboard />} />
        <Route path='/admin-dashboard/add-student' element={<AddStudents />} />
        <Route path='/admin-dashboard/add-faculty' element={<AddFaculty />} />
        <Route path='/admin-dashboard/application-status' element={<ApplicationStatus />} />
        <Route path='/admin-dashboard/complaint-status' element={<ComplaintStatus />} />
        <Route path='/professor-dashboard' element={<ProfessorDashboard/>} />
        <Route path='/professor-dashboard/application-status' element={<ProfAppStatus/>} />
      </Routes>
    </>
  );
}

export default App;
