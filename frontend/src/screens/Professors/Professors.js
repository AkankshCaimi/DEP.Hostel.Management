import React from 'react'
import { useAuth } from '../../contexts/authContext'
import { Outlet } from 'react-router-dom';
function Professor() {
  const { currentUser } = useAuth();
  return currentUser && (currentUser.roles.includes('faculty') || currentUser.roles.includes('admin'))?(
    <Outlet/>
  ):(
    <>
      <h1 className="text-4xl font-bold mb-6 text-black">Professor Dashboard</h1>
      <p className="text-m text-left text-gray-600 mb-6">
        You are not authorized to view this page. Please login as an faculty to continue.
      </p>
    </>
  );
}

export default Professor