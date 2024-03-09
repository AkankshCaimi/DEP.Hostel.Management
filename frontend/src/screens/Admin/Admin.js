import React from 'react'
import { useAuth } from '../../contexts/authContext'
import { Outlet } from 'react-router-dom';
function Admin() {
  const { currentUser } = useAuth();
  return currentUser && currentUser.is_superuser?(
    <Outlet/>
  ):(
    <>
      <h1 className="text-4xl font-bold mb-6 text-black">Admin Dashboard</h1>
      <p className="text-m text-left text-gray-600 mb-6">
        You are not authorized to view this page. Please login as an admin to continue.
      </p>
    </>
  );
}

export default Admin