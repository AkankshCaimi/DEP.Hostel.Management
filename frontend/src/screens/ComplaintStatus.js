import React, { useState } from 'react';
import "../styles/tailwind.css";

const ComplaintList = ({ complaints }) => {
  return (
    <div className="overflow-y-auto">
      <ul className="divide-y divide-gray-300">
        {complaints.map((complaint) => (
          <li key={complaint.id} className="py-2">
            <div className="border border-gray-200 p-3 rounded bg-gray-100">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                </div>
                <div className="ml-3">
                  <p className="text-m font-medium text-gray-900">{complaint.title}</p>
                  <p className={`text-sm text-${complaint.status === 'Resolved' ? 'green' : 'gray'}-600`}>
                    Status: {complaint.status}
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

const ComplaintStatus = () => {
  // Sample data for complaints
  const initialComplaints = [
    { id: 1, title: 'Complaint 1', status: 'Resolved' },
    { id: 2, title: 'Complaint 2', status: 'Resolved' },
    { id: 3, title: 'Complaint 3', status: 'Pending' },
    { id: 4, title: 'Complaint 4', status: 'Resolved' },
    { id: 5, title: 'Complaint 5', status: 'Pending' },
    { id: 6, title: 'Complaint 6', status: 'Pending' },
    { id: 7, title: 'Complaint 7', status: 'Resolved' },
    { id: 8, title: 'Complaint 8', status: 'Pending' },
    { id: 9, title: 'Complaint 9', status: 'Resolved' },
    // Add more complaints as needed
  ];

  // State to manage complaints
  const [complaints] = useState(initialComplaints);

  return (
    <div className="p-8 border border-gray-200 rounded">
      <h1 className="text-3xl font-bold mb-4">Complaint Status</h1>
      <ComplaintList complaints={complaints} />
    </div>
  );
};

export default ComplaintStatus;
