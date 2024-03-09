import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import "../../styles/tailwind.css";
import { useAuth } from '../../contexts/authContext';
import AdminHome from './AdminHome';
import AddStudents from './AddStudents';
import AddFaculty from './AddFaculty';
import ApplicationStatus from './ApplicationStatus';
import ComplaintStatus from '../ComplaintStatus';
import ApplicationView from '../ApplicationView';
function AdminDashboard() {
  const { currentUser } = useAuth();
  console.log(currentUser)
  return (
    currentUser && currentUser.is_superuser?
    <>
    <AdminHome/>
    </>
    :
    <>
      <h1 className="text-4xl font-bold mb-6 text-black">Admin Dashboard</h1>
      <p className="text-m text-left text-gray-600 mb-6">
        You are not authorized to view this page. Please login as an admin to continue.
      </p>
    </>
  );
}

export default AdminDashboard;
