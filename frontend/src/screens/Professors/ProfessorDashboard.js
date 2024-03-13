import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../../styles/tailwind.css";
import { useAuth } from '../../contexts/authContext';

function ProfessorDashboard() {
  const { currentUser } = useAuth();
  // console.log(currentUser)
  return (
    currentUser && currentUser.is_staff?
    <>
      <div className="min-h-40 flex items-center justify-center -mb-1">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-6 text-black">Professor Dashboard</h1>
          <p className="text-m text-center text-gray-600 mb-6">
            Welcome to the professor dashboard. Please select an option below to get started.
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-center items-start space-y-4 pl-4 px-3 pb-3">
        {/* <Link to="/admin-dashboard/add-student" className="no-underline w-25 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
          Add Student
        </Link>
        <Link to="/admin-dashboard/add-faculty" className="no-underline w-25 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
          Add Faculty
        </Link> */}
        <Link to="application-status" className="no-underline w-25 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
          Application Status
        </Link>
        {currentUser.roles.includes('chief warden')&&(<Link to="complaint-status" className="no-underline w-25 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
          Chief Warden Hostel View
        </Link>)}
        {currentUser.roles.includes('warden') && (<Link to="complaint-status" className="no-underline w-25 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
          Warden Hostel View
        </Link>)}
        {currentUser.roles.includes('warden') && (<Link to="complaint-status" className="no-underline w-25 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded my-3">
          Warden Complaint status
        </Link>)}
      </div>
    </>:
    <>
      <h1 className="text-4xl font-bold mb-6 text-black">Admin Dashboard</h1>
      <p className="text-m text-left text-gray-600 mb-6">
        You are not authorized to view this page. Please login as an admin to continue.
      </p>
    </>
  );
}

export default ProfessorDashboard;
