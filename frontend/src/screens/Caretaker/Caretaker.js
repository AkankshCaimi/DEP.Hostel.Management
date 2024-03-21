import React from 'react'
import { useAuth } from '../../contexts/authContext'
import { Outlet } from 'react-router-dom';
function Caretaker() {
  const { currentUser } = useAuth();
  return currentUser && (currentUser.roles.includes('caretaker') || currentUser.is_superuser)?(
    <Outlet/>
  ):(
    <>
      <h1 className="text-4xl font-bold mb-6 text-black">Caretaker Dashboard</h1>
      <p className="text-m text-left text-gray-600 mb-6">
        You are not authorized to view this page. Please login as a caretaker to continue.
      </p>
    </>
  );
}

export default Caretaker