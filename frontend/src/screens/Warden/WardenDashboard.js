import React from 'react';
import "../../styles/tailwind.css";
import { Link } from "react-router-dom";
function AdminDashboard() {
  const [hostels, setHostels]=React.useState(['Chenab', 'Beas', 'Satluj', 'Brahmaputra'])
  React.useEffect(()=>{

  },[])
  return (
      <>
        <div className="min-h-40 flex items-center justify-center -mb-1">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6 text-black">Chief Warden Dashboard</h1>
            <p className="text-xl text-left flex flex-center text-gray-700 mb-6 px-4 justify-center lg:justify-start">
              Welcome to the Chief Warden dashboard. Please select an option below to get started.
            </p>
          </div>
        </div>
        <div className='flex flex-row justify-around px-4 pb-8'>
        <div className="flex flex-col items-start space-y-4 px-4 pb-8">
          <Link to="allotment-table/boys" className="no-underline  bg-color hover:bg-blue-800 text-white font-medium py-2 px-4 rounded w-full lg:w-72 lg:ml-10">
            Allocation Students (Boys)
          </Link>
          <Link to="allotment-table/girls" className="no-underline  bg-color hover:bg-blue-800 text-white font-medium py-2 px-4 rounded w-full lg:w-72 lg:ml-10">
            Allocation Students (Girls)
          </Link>
          <Link to="complaint-status" className="no-underline  bg-color hover:bg-blue-800 text-white font-MEDIUM py-2 px-4 rounded w-full lg:w-72 lg:ml-10">
            Complaint Status
          </Link>
        </div>
        <div className="flex flex-col items-start space-y-4 px-4 pb-8">
          {
            hostels && hostels.map((hostel, idx)=>

              <Link to={`room-deatils/${idx+1}`} className="no-underline  bg-color hover:bg-blue-800 text-white font-medium py-2 px-4 rounded w-full lg:w-72 lg:ml-10">
                {hostel} Rooms
              </Link>
            )
          }
        </div>
        </div>
      </>
  );
}

export default AdminDashboard;
