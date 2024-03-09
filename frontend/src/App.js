import { Routes, Route } from 'react-router-dom';
import Login from './screens/Login';
import Form from './screens/Form';
import AboutUs from './screens/AboutUs';
import Headers from './components/Headers';
import 'bootstrap/dist/css/bootstrap.min.css';
import StudentSignup from './screens/Signup';
import Home from './screens/Home';
import Contact from './screens/Contact';
import AdminDashboard from './screens/Admin/AdminDashboard';
import AddStudents from './screens/Admin/AddStudents';
import AddFaculty from './screens/Admin/AddFaculty';
// import AdminRoutes from './screens/Admin/AdminRoutes';
import { useState } from 'react';
import Test from './screens/Test';
import ApplicationStatus from './screens/Admin/ApplicationStatus';
import ComplaintStatus from './screens/ComplaintStatus';
import ProfessorDashboard from './screens/Professors/ProfessorDashboard';
import ProfAppStatus from './screens/Professors/ProfAppStatus';
import Footer from './components/Footer';
import Cal from './components/Calendar';
import ApplicationView from './screens/ApplicationView';
import Internship from './screens/Internship';
import { useAuth } from './contexts/authContext';
import CaretakerDashboard from './screens/Caretaker/CaretakerDashboard';
function App() {
  const {currentUser}=useAuth();
  const [showPopup, setShowPopup] = useState(false);
  return (
    <>
      <Headers showPopup={showPopup} setShowPopup={setShowPopup} />
      <Routes>
      <Route
          path="/"
          element={
            currentUser
              ? (currentUser.is_superuser
                ? <AdminDashboard />
                : currentUser.is_staff
                  ? <ProfessorDashboard />
                  : <Home />)
              : (<Login />)
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/Calendar" element={<Cal />} />
        <Route path="/signup" element={<StudentSignup/>} />
        <Route path='/form' element={<Form />} />
        <Route path='/test' element={<Test/>} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/contact' element={<Contact />} />
        {/* Admin Routes */}
        <Route path='/admin-dashboard' element={<AdminDashboard />} />
        <Route path='/admin-dashboard/add-student' element={<AddStudents />} />
        <Route path='/admin-dashboard/add-faculty' element={<AddFaculty />} />
        <Route path='/admin-dashboard/application-status' element={<ApplicationStatus />} />
        <Route path='/admin-dashboard/complaint-status' element={<ComplaintStatus />} />
        <Route path='/admin-dashboard/application-status/application/:id' element={<ApplicationView/>} />
        {/* Professor Routes includes wardens */}
        <Route path='/professor-dashboard' element={<ProfessorDashboard/>} />
        <Route path='/professor-dashboard/application-status' element={<ProfAppStatus/>} />
        <Route path='/application/:id' element={<ApplicationView/>} />
        <Route path='/professor-dashboard/complaint-status' element={<ComplaintStatus />} />
        <Route path='/internship' element={<Internship/>} />
        {/* Caretaker Routes */}
        <Route path='/caretaker-dashboard' element={<CaretakerDashboard />} />

      </Routes>
      <Footer showPopup={showPopup} setShowPopup={setShowPopup} />
    </>
  );
}

export default App;
