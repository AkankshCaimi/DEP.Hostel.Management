import React, { useState } from 'react';
import '../styles/tailwind.css';
// import axios from 'axios';
// import { useAuth } from '../contexts/authContext';

const ApplicationList = ({ applications }) => {
  const [openDropdown, setOpenDropdown] = useState({});

  const handleButtonClick = (appId) => {
    setOpenDropdown({ ...openDropdown, [appId]: !openDropdown[appId] });
  };

  const handleApplicationClick = (appId) => {
    // Add logic for handling the click on an application
    console.log(`Application ${appId} clicked`);
  };

  if (!applications) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-y-auto">
      <ul className="divide-y divide-gray-300">
        {applications.map((app) => (
          <li key={app.id} className="py-2">
            <div className="border border-gray-200 p-3 rounded bg-gray-100 flex items-center justify-between">
              <div>
                <p
                  className="text-m font-medium text-gray-900 cursor-pointer"
                  onClick={() => handleApplicationClick(app.id)}
                >
                  {app.name}
                </p>
                <p className={`text-sm text-${app.status === 'Active' ? 'green' : 'gray'}-600`}>Status: {app.status}</p>
              </div>
              <div className="mt-2 relative group">
                <button
                  type="button"
                  className={`bg-blue-500 text-white px-4 py-2 rounded group-hover:bg-blue-600 flex items-center`}
                  onClick={() => handleButtonClick(app.id)}
                >
                  Action
                  <svg
                    className={`ml-2 h-4 w-4 transition-transform ${
                      openDropdown[app.id] ? 'transform rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>
                {openDropdown[app.id] && (
                  <div className="absolute z-10 mt-2 space-y-2">
                    <button
                      type="button"
                      className="block w-full text-left px-4 py-1 text-gray-800 bg-white hover:bg-gray-700 border border-gray-200"
                    >
                      Button 1
                    </button>
                    <button
                      type="button"
                      className="block w-full text-left px-4 py-1 text-gray-800 bg-white hover:bg-gray-700 border border-gray-200"
                    >
                      Button 2
                    </button>
                    <button
                      type="button"
                      className="block w-full text-left px-4 py-1 text-gray-800 bg-white hover:bg-gray-700 border border-gray-200"
                    >
                      Button 3
                    </button>
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ApplicationStatus = () => {
  // Sample data for applications
  const initialApplications = [
    { id: 1, name: 'Application 1', status: 'Active' },
    { id: 2, name: 'Application 2', status: 'Active' },
    { id: 3, name: 'Application 3', status: 'Inactive' },
    { id: 4, name: 'Application 4', status: 'Active' },
    { id: 5, name: 'Application 5', status: 'Inactive' },
    { id: 6, name: 'Application 6', status: 'Pending' },
    { id: 7, name: 'Application 7', status: 'Active' },
    { id: 8, name: 'Application 8', status: 'Pending' },
    { id: 9, name: 'Application 9', status: 'Inactive' },
  ];

  // const backendUrl = process.env.REACT_APP_BASE_URL;
  // // State to manage applications
  // const { currentUser } = useAuth();
  // const [applications, setApplications] = useState(null);
  const [applications] = useState(initialApplications);

//   useEffect(() => {
//     axios.get(`${backendUrl}/api/get_applications`, {withCredentials: true})
//       .then((res) => {
//         console.log("here:", (res.data.data));
//         setApplications(res.data.data);
        
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//       });
// }, []);

  return (
    <div className="p-8 border border-gray-200 rounded">
      <h1 className="text-3xl font-bold mb-4">Application Status</h1>
      <ApplicationList applications={applications} />
      <div className="mt-4 flex justify-center">
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default ApplicationStatus;
