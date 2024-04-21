import React from 'react';
import "../../styles/tailwind.css";
import { Link } from "react-router-dom";
function AdminDashboard() {
  return (
      <>
        <div className="min-h-40 flex items-center justify-center -mb-1">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6 text-black">Admin Dashboard</h1>
            <p className="text-xl text-left flex flex-center text-gray-700 mb-6 px-4 justify-center lg:justify-start">
              Welcome to the admin dashboard. Please select an option below to get started.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start space-y-4 px-4 pb-8">
          <Link to="add-student" className="no-underline  bg-color hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded w-full lg:w-56 lg:ml-10">
            Add Student
          </Link>
          <Link to="add-faculty" className="no-underline  bg-color hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded w-full lg:w-56 lg:ml-10">
            Add Faculty
          </Link>
          <Link to="application-status" className="no-underline  bg-color hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded w-full lg:w-56 lg:ml-10">
            Application Status
          </Link>
          <Link to="/warden" className="no-underline  bg-color hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded w-full lg:w-56 lg:ml-10">
            Warden's Dashboard
          </Link>
          <Link to="complaint-status" className="no-underline  bg-color hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded w-full lg:w-56 lg:ml-10">
            Complaint Status
          </Link>
        </div>
      </>
  );
}

export default AdminDashboard;
