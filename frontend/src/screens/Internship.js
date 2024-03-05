import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Internship = () => {
  const [application, setApplication] = useState(null);
  const backendUrl = process.env.REACT_APP_BASE_URL;
  useEffect(() => {
    // Dummy API call to fetch application status
    const fetchApplicationStatus = async () => {
      try {
        // Replace this with your actual API call to fetch application status
        const data = await axios.get(
          `${backendUrl}/api/get_application_status`,
          { withCredentials: true }
        );
        setApplication(data.data.data[0]);
        // setApplicationStatus(data.status);
      } catch (error) {
        console.error("Error fetching application status:", error);
      }
    };

    fetchApplicationStatus();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Internship Application</h1>

      {application && (
        <div className="grid grid-cols-2 gap-4">
          <div className="text-base">
            <p>ID:</p>
            <p>Faculty:</p>
            <p>Status:</p>
            <p>Affiliation:</p>
          </div>
          <div className="text-base">
            <p>{application.application_id}</p>
            <p>{application.faculty}</p>
            <p>{application.status}</p>
            <p>{application.affiliation}</p>
          </div>
        </div>
      )}

        <div>
          {/* <p className="text-base">No application found.</p> */}
          <NavLink
            to="/form"
            className="text-blue-500 underline hover:text-blue-700"
          >
            Submit an application
          </NavLink>
        </div>
    </div>
  );
};

export default Internship;
