// ApplicationView.js
import React from "react";
import "../styles/tailwind.css";

const ApplicationView = () => {
  // Dummy data for testing
  const formData = {
    studentName: "John Doe",
    gender: "male",
    affiliation: "Example University",
    address: "123 Street, City",
    contactNumber: "123-456-7890",
    email: "john@example.com",
    facultyMentorName: "Dr. Mentor",
    facultyEmail: "mentor@example.com",
    arrivalDate: "2024-03-04",
    departureDate: "2024-03-15",
    instituteID: "institute-id.pdf",
    instituteLetter: "institute-letter.pdf",
    remarks: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  };

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
    <div className="container mx-auto mt-10 p-18 bg-gray-100 rounded mb-16">
      <h1 className="text-2xl font-bold mb-8">Application</h1>

      <div className="grid grid-cols-2 gap-8">
        {/* Left side: Field names */}
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

        {/* Right side: Information */}
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
