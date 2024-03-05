import React from "react";
import "../styles/tailwind.css";
import { useParams } from "react-router-dom";
const ApplicationView = () => {
  // Dummy data for testing
  const formData = {
    studentName: "Devanshu Dhawan",
    gender: "male",
    affiliation: "ITI Ropar",
    address: "Sector 52, Chandigarh",
    contactNumber: "9873524686",
    email: "2021csb1082@iitrpr.ac.in",
    facultyMentorName: "Dr. Puneet Goyal",
    facultyEmail: "puneet.goyal@iitrpr.ac.in",
    arrivalDate: "2024-03-04",
    departureDate: "2024-03-15",
    instituteID: "institute-id.pdf",
    instituteLetter: "institute-letter.pdf",
    remarks: "None",
  };
  const { id } = useParams();
  console.log("Application ID:", id);
  // Hardcoded field names
  const fieldNames = [
    "Student Name",
    "Gender",
    "Affiliation",
    "Address",
    "Contact Number",
    "Email",
    "Faculty Mentor Name",
    "Faculty Email",
    "Arrival Date",
    "Departure Date",
    "Institute ID",
    "Institute Letter",
    "Remarks",
  ];

  return (
    <div className="container mx-auto mt-8 p-18 bg-gray-100 rounded mb-4">
      <h1 className="text-2xl font-bold">Application</h1> {/* Remove mb-4 from here */}
      
      <div className="grid grid-cols-2 gap-8">
        <div>
          <table className="w-full border">
            <tbody>
              {fieldNames.map((fieldName, index) => (
                <tr key={index} className="border-b">
                  <td className="text-left pl-4 py-2 text-m font-medium text-gray-600 border-r" style={{ color: '#000' }}>
                    {fieldName}:
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        <div>
          <table className="w-full border">
            <tbody>
              {Object.values(formData).map((value, index) => (
                <tr key={index} className="border-b">
                  <td className="pl-4 py-2 text-m font-normal text-gray-800 border-r bg-white" style={{ color: '#000' }}>
                    {value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ApplicationView;
