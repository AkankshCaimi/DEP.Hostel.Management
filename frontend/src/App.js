import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
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
import Admin from './screens/Admin/Admin';
import Professor from './screens/Professors/Professors';
function App() {
  const {currentUser}=useAuth();
  const [showPopup, setShowPopup] = useState(false);
  return (
    <section className="bg-Hero bg-cover
    font-[Poppins] md:bg-top bg-center">
      <Headers showPopup={showPopup} setShowPopup={setShowPopup} />
      <Routes>
      <Route
          path="/"
          // element={
          //   currentUser
          //     ? (currentUser.is_superuser
          //       ? <AdminDashboard />
          //       : currentUser.is_staff
          //         ? <ProfessorDashboard />
          //         : <Home />)
          //     : (<Login />)
          // }
          element={<Home/>}
        />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<StudentSignup/>} />
        <Route path='/form' element={<Form />} />
        <Route path='/test' element={<Test/>} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/contact' element={<Contact />} />
        {/* Admin Routes */}
        <Route path='/admin/*' element={<Admin/>}>
          <Route index element={<AdminDashboard />} />
          <Route path='add-student' element={<AddStudents />} />
          <Route path='add-faculty' element={<AddFaculty />} />
          <Route path='application-status' element={<ApplicationStatus />} />
          <Route path='complaint-status' element={<ComplaintStatus />} />
          <Route path='application-status/application/:id' element={<ApplicationView/>} />
        </Route>
        {/* Professor Routes includes wardens */}
        <Route path='/professor/*' element={<Professor/>}>
          <Route index element={<ProfessorDashboard/>} />
          <Route path='application-status' element={<ProfAppStatus/>} />
          <Route path='application-status/application/:id' element={<ApplicationView/>} />
          <Route path='complaint-status' element={<ComplaintStatus />} />
        </Route>
      <Route path='/internship' element={<Internship/>} />
        {/* Caretaker Routes */}
        <Route path='/caretaker-dashboard' element={<CaretakerDashboard />} />

      </Routes>
      <Footer showPopup={showPopup} setShowPopup={setShowPopup} />
    </section>
  );
}

export default App;
