import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../../styles/tailwind.css";

function AdminHome() {
  return (
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
        <Link to="add-student" className="no-underline w-25 bg-color hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
          Add Student
        </Link>
        <Link to="add-faculty" className="no-underline w-25 bg-color hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
          Add Faculty
        </Link>
        <Link to="application-status" className="no-underline w-25 bg-color hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
          Application Status
        </Link>
        <Link to="complaint-status" className="no-underline w-25 bg-color hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
          Complaint Status
        </Link>
      </div>
    </>
  );
}

export default AdminHome;
