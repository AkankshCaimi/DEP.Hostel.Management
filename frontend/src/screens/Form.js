import React, { useState } from "react";

const Form = () => {
  const [formData, setFormData] = useState({
    studentName: "",
    gender: "",
    affiliation: "",
    address: "",
    contactNumber: "",
    email: "",
    facultyMentorName: "",
    hostelRent: "",
    securityDeposit: "",
    arrivalDate: "",
    departureDate: "",
    remarks: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.name, e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-8 bg-gray-100 shadow-md rounded">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Name of the student Intern:</label>
        <input
          type="text"
          name="studentName"
          value={formData.studentName}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded" 
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Gender:</label>
        <select name="gender" value={formData.gender} onChange={handleChange} className="mt-1 p-2 w-full border rounded">
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Affiliation of the student intern:</label>
        <input
          type="text"
          name="affiliation"
          value={formData.affiliation}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded" 
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Address:</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded" 
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Contact Number:</label>
        <input
          type="text"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded" 
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Email:</label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded" 
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Name of the Faculty Mentor:</label>
        <input
          type="text"
          name="facultyMentorName"
          value={formData.facultyMentorName}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded" 
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Date of arrival:</label>
        <input
          type="date"
          name="arrivalDate"
          value={formData.arrivalDate}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded" 
        />
        
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Copy of your Institute ID</label>
        <input type="file" name="instituteID" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Copy of Official Letter from your Institute</label>
        <input type="file" name="instituteID" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Date of departure: </label>
        <input
          type="date"
          name="departureDate"
          value={formData.departureDate}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Remarks: </label>
        <textarea
          name="remarks"
          value={formData.remarks}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded" 
        />
      </div>
      <div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">Submit</button>
      </div>
      <div className="mt-4 text-sm text-gray-500">
        Hostel room rent: Rs. 150/- per day/per person or Rs. 3000/- per month
        which is less. Security (refundable) Rs. 10000/-
      </div>
    </form>
  );
};

export default Form;
