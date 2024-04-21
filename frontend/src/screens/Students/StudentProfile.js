import React, {useState, useEffect} from 'react';
import { Avatar } from '@material-tailwind/react';
import img from '../../images/default_user.jpg';
import axios from 'axios';
const StudentProfile = () => {
  const backendUrl = process.env.REACT_APP_BASE_URL;
  const [student, setStudent] = useState({
    name: 'Ajaybeer Singh',
    entryNumber: '2021CSB1063',
    email: '2021csb1063@iitrpr.ac.in',
    phone: '+91-9562792911',
    roomNumber: 'CE-202',
    hostelName: 'Chenab Hostel',
    department: 'Computer Science',
    dateOfBirth: '10/08/2001',
    guardianName: 'Guardian',
    guardianPhone: '+91-9562782911',
  })
  useEffect(()=>{
    axios.get(`${backendUrl}/api/profile`, { withCredentials: true})
    .then((res)=>{
      console.log(res.data.data)
      const user=res.data.data
      const role=user.role
      if(role==='student'){
        setStudent({
          ...student,
          name: user.name,
          email: user.email,
          phone: user.phone,
          roomNumber: user.room,
          hostelName: user.hostel,
        })
      }
      else if(role==='outside student'){
        setStudent({
          ...student,
          name: user.name,
          email: user.email,
          phone: user.phone,
          roomNumber: user.room,
          hostelName: user.hostel,
        })
      }
    })
  }, [])

  return (
    <div className="mt-4 flex flex-col items-center justify-center bg-white"> 
      <h1 className="text-xl md:text-2xl lg:text-3xl mb-8 font-bold text-center">Student Profile</h1>
      <div className="bg-white border border-gray-200 shadow-md rounded-lg p-8 w-full lg:w-3/4 xl:w-2/3 flex flex-col lg:flex-row items-center mb-8"> 
        {/* Student Profile */}
        <div className="w-full mb-8 lg:mb-0 lg:w-1/2 flex flex-col items-center justify-center">
          <img
            src={img}
            alt="image"
            className="w-32 h-32 mb-4 border border-black shadow-xl rounded-md"
          />
          <h2 className="text-l md:text-xl lg:text-2xl font-semibold mb-2">{student.name}</h2>
          <p className="text-md md:text-l lg:text-xl font-semibold mb-2">{student.entryNumber}</p>
        </div>

        {/* Student Information */}
        <div className="w-full lg:w-1/2 xl:border-l lg:border-l">
          <p className="text-gray-800 mb-4 ml-4">
            <span className="font-semibold">Room Number:</span> {`${student.roomNumber}, ${student.hostelName}`}
          </p>
          <p className="text-gray-800 mb-4 ml-4">
            <span className="font-semibold">Email:</span> {student.email}
          </p>
          <p className="text-gray-800 mb-4 ml-4">
            <span className="font-semibold">Phone Number:</span> {student.phone}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
