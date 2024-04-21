// Imports
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {CommentsProvider} from "./contexts/commentsContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "./contexts/authContext";

// Screens and Components
import Home from "./screens/Home";
import Login from "./screens/Login";
import AboutUs from "./screens/AboutUs";
// import Headers from "./components/Headers";
import Headers from "./components/Headers";
import Contact from "./screens/Contact";
import Test from "./screens/Test";
import Footer from "./components/Footer";

// Student Routes
import StudentSignup from "./screens/Signup";
import Form from "./screens/Form";
import Internship from "./screens/Internship";
import ApplicationView from "./screens/ApplicationView";

//Admin Routes
import Admin from "./screens/Admin/Admin";
import AdminDashboard from "./screens/Admin/AdminDashboard";
import AddStudents from "./screens/Admin/AddStudents";
import AddFaculty from "./screens/Admin/AddFaculty";
import ComplaintStatus from "./screens/ComplaintStatus";

//Warden Routes
import Warden from "./screens/Warden/Warden";
import WardenDashboard from "./screens/Warden/WardenDashboard";
import AllotmentTable from "./screens/Warden/AllotmentTable";
import Allotment from "./screens/Warden/Allotment";
import Allotments from "./screens/Warden/Allotments";

// Professor Routes
import ProfessorDashboard from "./screens/Professors/ProfessorDashboard";
import ProfAppStatus from "./screens/Professors/ProfAppStatus";
import Professor from "./screens/Professors/Professors";

// Caretaker Routes
import CaretakerDashboard from "./screens/Caretaker/CaretakerDashboard";
import HostelView from "./screens/Caretaker/HostelView";
import RoomDetails from "./screens/Caretaker/RoomDetails";
import FinalAppStatus from "./screens/Caretaker/FinalAppStatus";
import Caretaker from "./screens/Caretaker/Caretaker";
import ApplicationStatus2 from "./screens/Admin/ApplicationStatus2";
import StudentProfile from "./screens/Students/StudentProfile";



// Landing Page
function LandingPage(){
  const { currentUser, loading } = useAuth();
  const [redirectTo, setRedirectTo] = useState(null);
  useEffect(()=>{
    if(!loading){
      if(currentUser){
        const role=currentUser.roles
        if(role.includes('admin'))
            setRedirectTo('/admin')
        else if(role.includes('faculty'))
            setRedirectTo('/professor')
        else if(role.includes('student'))
            setRedirectTo('/home')
        else if(role.includes('caretaker'))
            setRedirectTo('/caretaker')
        else if(role.includes('warden'))
            setRedirectTo('/warden')
        else
            setRedirectTo('/home')
      }
      else
        setRedirectTo('/login')
    }
  }, [currentUser, loading])
  if (redirectTo) return <Navigate to={redirectTo} />;
  return <div>Loading...</div>;
}


function App() {
  const {currentUser, loading}=useAuth();
  const [showPopup, setShowPopup] = useState(false);
  if(loading)
    return <div>Loading...</div>
  return (
    <section
      className="bg-Hero bg-cover
    font-[Poppins] md:bg-top bg-center p-0 m-0"
    >
      <Headers showPopup={showPopup} setShowPopup={setShowPopup} />
      <CommentsProvider>
      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path="/home" element={<Home />} />
        <Route path="/student-profile" element={<StudentProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<StudentSignup />} />
        <Route path="/form" element={<Form />} />
        <Route path="/test" element={<Test />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        {/* Admin Routes */}
        <Route path="/admin/*" element={<Admin />}>
          <Route index element={<AdminDashboard />} />
          <Route path="add-student" element={<AddStudents />} />
          <Route path="add-faculty" element={<AddFaculty />} />
          <Route path="application-status" element={<ApplicationStatus2 />} />
          {/* <Route path="application-status-2" element={<ApplicationStatus2 />} /> */}
          <Route path="complaint-status" element={<ComplaintStatus />} />
          <Route path="application-status/application/:id" element={<ApplicationView />}/>
        </Route>
        {/* Professor Routes includes wardens */}
        <Route path="/professor/*" element={<Professor />}>
          <Route index element={<ProfessorDashboard />} />
          <Route path="application-status" element={<ProfAppStatus />} />
          <Route path="application-status/application/:id" element={<ApplicationView />}/>
          <Route path="complaint-status" element={<ComplaintStatus />} />
        </Route>
        <Route path="/internship" element={<Internship />} />
        {/* Caretaker Routes */}
        <Route path='caretaker/*' element={<Caretaker/>}>
          <Route index element={<CaretakerDashboard />} />
          <Route path='application-status' element={<FinalAppStatus />} />
          <Route path='application-status/application/:id' element={<ApplicationView />} />
          <Route path="hostel-view/:hostel" element={<HostelView />} />
          <Route path="room-details/:id" element={<RoomDetails />} />
        </Route>
        {/* Chief Warden Routes */}
        <Route path='warden/*' element={<Warden/>}>
          <Route index element={<WardenDashboard />} />
          <Route path="hostel-view/:hostel" element={<HostelView />} />
          <Route path="room-details/:id" element={<RoomDetails />} />
          <Route path="allotments" element={<Allotments />} />
          <Route path="sandbox/:name/:gender?" element={<Allotment />} />
          <Route path="hostel-view/:hostel" element={<HostelView />} />
          <Route path="room-details/:id" element={<RoomDetails />} />
        </Route>

      </Routes>
      </CommentsProvider>
      <Footer showPopup={showPopup} setShowPopup={setShowPopup} />
    </section>
  );
}

export default App;
