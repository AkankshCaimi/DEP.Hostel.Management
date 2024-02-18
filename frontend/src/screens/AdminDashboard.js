import React from 'react';
import "../styles/tailwind.css";

const AdminDashboard = () => {
  // Dummy data for pending applications and complaints
  const pendingApplications = [
    "Application 1",
    "Application 2",
    "Application 3",
    "Application 4",
    "Application 5",
    "Application 6",
    "Application 7",
    "Application 8",
    "Application 9",
    "Application 10",
    "Application 11",
    "Application 12",
    "Application 13",
    "Application 14",
    "Application 15",
    // Add more pending applications as needed
  ];

  const raisedComplaints = [
    "Complaint 1",
    "Complaint 2",
    "Complaint 3",
    "Complaint 4",
    "Complaint 5",
    "Complaint 6",
    "Complaint 7",
    "Complaint 8",
    "Complaint 9",
    "Complaint 10",
    "Complaint 11",
    "Complaint 12",
    "Complaint 13",
    "Complaint 14",
    "Complaint 15",

    // Add more complaints as needed
  ];

  return (
    <div className="container mx-auto mt-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-500">Welcome, Admin Name</p>
      </div>

      <div className="flex">
        {/* First Column - Pending Applications */}
        <div className="w-1/2 pr-4">
          <div className="border p-4 h-96 overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Pending Applications</h2>
            <ul>
              {pendingApplications.map((application, index) => (
                <li key={index} className="mb-2">{application}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Second Column - Raised Complaints */}
        <div className="w-1/2 pl-4">
          <div className="border p-4 h-96 overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Complaints</h2>
            <ul>
              {raisedComplaints.map((complaint, index) => (
                <li key={index} className="mb-2">{complaint}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
