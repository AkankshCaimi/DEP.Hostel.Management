import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../styles/tailwind.css";
import { useAuth } from '../contexts/authContext';

function AdminDashboard() {
  const { currentUser } = useAuth();
  console.log(currentUser)
  return (
    currentUser && currentUser.is_superuser?
    <>
      <div className="min-h-40 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-6 text-black">Admin Dashboard</h1>
          <p className="text-m text-left text-gray-600 mb-6">
            Welcome to the admin dashboard. Please select an option below to get started.
          </p>
        </div>
      </div>
      <div className="flex flex-col items-start space-y-4 pl-4 pb-8">
        <Link to="/admin-dashboard/add-student" className="no-underline w-25 bg-color hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
          Add Student
        </Link>
        <Link to="/admin-dashboard/add-faculty" className="no-underline w-25 bg-color hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
          Add Faculty
        </Link>
        <Link to="/admin-dashboard/application-status" className="no-underline w-25 bg-color hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
          Application Status
        </Link>
        <Link to="/admin-dashboard/complaint-status" className="no-underline w-25 bg-color hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
          Complaint Status
        </Link>
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

export default AdminDashboard;
