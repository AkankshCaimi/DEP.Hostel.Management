import React, { useEffect, useState } from 'react';
import "../styles/tailwind.css";
import axios from 'axios';
import { useAuth } from '../contexts/authContext';
const ApplicationList = ({ applications }) => {
    if (!applications){
      return <div>Loading...</div>;
    }
    return (
      <div className="overflow-y-auto">
        <ul className="divide-y divide-gray-300">
          {applications.map((app) => (
            <li key={app.id} className="py-2">
              <div className="border border-gray-200 p-3 rounded bg-gray-100">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                  </div>
                  <div className="ml-3">
                    <p className="text-m font-medium text-gray-900">{app.fields.student}</p>
                    <p className={`text-sm text-${app.status === 'Active' ? 'green' : 'gray'}-600`}>
                      Status: {app.fields.status}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

const ProfAppStatus = () => {
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
    // Add more applications as needed
  ];
  const backendUrl = process.env.REACT_APP_BASE_URL;
  // State to manage applications
  const { currentUser } = useAuth();
  const [applications, setApplications] = useState(null);
  useEffect(() => {
      axios.get(`${backendUrl}/api/view_applications`, {withCredentials: true})
        .then((res) => {
          console.log("here:", (res.data.data));
          setApplications(res.data.data);
          
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
  }, []);
  return (
    <div className="p-8 border border-gray-200 rounded">
      <h1 className="text-3xl font-bold mb-4">Application Status</h1>
      <ApplicationList applications={applications} />
    </div>
  );
};

export default ProfAppStatus;
