import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "../styles/tailwind.css";
import { useAuth } from "../contexts/authContext";
import { useLocation, useNavigate } from "react-router-dom";
const Form = () => {
  const backendUrl = process.env.REACT_APP_BASE_URL;
  const [commentDiv, setCommentDiv] = useState(false);
  const { currentUser } = useAuth();
  const navigate=useNavigate();
  const location=useLocation();
  const { filled } = location.state || {};
  // console.log("state:", filled)
  // if(filled.comments){
  //   // alert(`Your application has been ${filled.status}. Comments: ${filled.comments}`)
  //   setCommentDiv(true)
  //   console.log("Comments:", filled.comments)
  // }
  // console.log(currentUser);
  const [formData, setFormData] = useState({
    studentName: '',
    gender: "",
    affiliation: "",
    address: "",
    contactNumber: "",
    email: "",
    facultyMentorName: "",
    facultyEmail: "",
    arrivalDate: "",
    departureDate: "",
    remarks: "",
  });
  const [file1Data, setFile1Data] = useState(null);
  const file1Ref= useRef(null);
  const [file2Data, setFile2Data] = useState(null);
  const file2Ref= useRef(null);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // console.log(e.target.name, e.target.value);
  };
  const handleFileChange = (e, i) => {
    if(e.target.files[0].type !== "application/pdf") {
      alert("Please upload a PDF file");
      if(i===1)
        file1Ref.current.value = "";
      else
        file2Ref.current.value = "";
      return;
    }
    if (i === 1) setFile1Data(e.target.files[0]);
    else setFile2Data(e.target.files[0]);

    // console.log(e.target.files[0])
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Form submitted:", formData);
    if((formData.arrivalDate > formData.departureDate || formData.arrivalDate <= new Date().toISOString().split('T')[0] || formData.departureDate <= new Date().toISOString().split('T')[0]) && (!filled) ) {
      alert("Please enter valid dates");
      return;
    }
    const data = new FormData();
    data.append("studentName", formData.studentName);
    data.append("gender", formData.gender);
    data.append("affiliation", formData.affiliation);
    data.append("address", formData.address);
    data.append("contactNumber", formData.contactNumber);
    data.append("studentEmail", formData.email);
    data.append("facultyMentorName", formData.facultyMentorName);
    data.append("facultyEmail", formData.facultyEmail)
    data.append("arrivalDate", formData.arrivalDate);
    data.append("departureDate", formData.departureDate);
    data.append("instituteID", file1Data);
    data.append("instituteLetter", file2Data);
    data.append("remarks", formData.remarks);
    if (filled) {
      data.append("correction", filled.application_id);
    }
    axios.post(`${backendUrl}/api/internship`, data,{withCredentials: true}, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      
    }).then((res) => {
      console.log(res)
      alert('Form Submitted Successfully')
      navigate('/internship')
    })
    .catch((err)=>{
      console.log(err);
    })
  };
  useEffect(() => {
    if (currentUser) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        studentName: currentUser.name,
        email: currentUser.email,
        // Update other fields accordingly
      }));
    }
    if (filled && filled.comments) {
      setCommentDiv(true);
      console.log("Comments:", filled.comments);
    }
  }, [currentUser, filled]);
  return (
    <div >
      {filled && (<div className="text-red-500">Your application has been {filled.status}. Comments: {filled.comments}</div>)}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto mt-0 p-8 rounded bg-white lg:px-20"
      >
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600" style={{ color: '#000' }}>
          Name of the student Intern: {filled ? null : <span className="text-red-500">*</span>}
        </label>
        <input
          type="text"
          name="studentName"
          value={formData.studentName}
          onChange={handleChange}
          aria-required="true"
          className="mt-1 p-2 w-full border rounded"
          required={filled && filled.comments ? false : true}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600" style={{ color: '#000' }}>
          Gender: {filled ? null : <span className="text-red-500">*</span>}
        </label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          aria-required="true"
          className="mt-1 p-2 w-full border rounded"
          required={filled && filled.comments ? false : true}
        >
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600" style={{ color: '#000' }}>
          Affiliation of the student intern: {filled ? null : <span className="text-red-500">*</span>}
        </label>
        <input
          type="text"
          name="affiliation"
          value={formData.affiliation}
          onChange={handleChange}
          aria-required="true"
          className="mt-1 p-2 w-full border rounded"
          required={filled && filled.comments ? false : true}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600" style={{ color: '#000' }}>
          Address: {filled ? null : <span className="text-red-500">*</span>}
        </label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          aria-required="true"
          className="mt-1 p-2 w-full border rounded"
          required={filled && filled.comments ? false : true}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600" style={{ color: '#000' }}>
          Contact Number: {filled ? null : <span className="text-red-500">*</span>}
        </label>
        <input
          type="text"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          aria-required="true"
          className="mt-1 p-2 w-full border rounded"
          required={filled && filled.comments ? false : true}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600" style={{ color: '#000' }}>
          Email: {filled ? null : <span className="text-red-500">*</span>}
        </label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          aria-required="true"
          className="mt-1 p-2 w-full border rounded"
          required={filled && filled.comments ? false : true}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600" style={{ color: '#000' }}>
          Name of the Faculty Mentor: {filled ? null : <span className="text-red-500">*</span>}
        </label>
        <input
          type="text"
          name="facultyMentorName"
          value={formData.facultyMentorName}
          onChange={handleChange}
          aria-required="true"
          className="mt-1 p-2 w-full border rounded"
          required={filled && filled.comments ? false : true}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600" style={{ color: '#000' }}>
          Faculty Mentor's Email: {filled ? null : <span className="text-red-500">*</span>}
        </label>
        <input
          type="text"
          name="facultyEmail"
          value={formData.facultyEmail}
          onChange={handleChange}
          aria-required="true"
          className="mt-1 p-2 w-full border rounded"
          required={filled && filled.comments ? false : true}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600" style={{ color: '#000' }}>
          Date of arrival: {filled ? null : <span className="text-red-500">*</span>}
        </label>
        <input
          type="date"
          name="arrivalDate"
          value={formData.arrivalDate}
          onChange={handleChange}
          aria-required="true"
          className="mt-1 p-2 w-full border rounded"
          required={filled && filled.comments ? false : true}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600" style={{ color: '#000' }}>
          Date of departure: {filled ? null : <span className="text-red-500">*</span>}
        </label>
        <input
          type="date"
          name="departureDate"
          value={formData.departureDate}
          onChange={handleChange}
          aria-required="true"
          className="mt-1 p-2 w-full border rounded"
          required={filled && filled.comments ? false : true}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600" style={{ color: '#000' }}>
          Copy of your Institute ID Card (pdf): {filled ? null : <span className="text-red-500">*</span>}
        </label>
        <input
          type="file"
          name="instituteID"
          accept=".pdf"
          ref={file1Ref}
          onChange={(e) => handleFileChange(e, 1)}
          aria-required="true"
          className="text-sm text-stone-500 file:mr-5 file:py-1 file:px-3 file:border-[1px] file:text-xs file:font-medium file:bg-stone-50 file:text-stone-700 hover:file:cursor-pointer hover:file:bg-blue-50 hover:file:text-blue-700" style={{ color: '#000' }}
          required={filled && filled.comments ? false : true}
          />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600" style={{ color: '#000' }}>
          Copy of Official Letter from your Institute (pdf): {filled ? null : <span className="text-red-500">*</span>}
        </label>
        <input
          type="file"
          name="instituteID"
          accept=".pdf"
          ref={file2Ref}
          onChange={(e) => handleFileChange(e, 2)}
          aria-required="true"
          className="text-sm text-stone-500 file:mr-5 file:py-1 file:px-3 file:border-[1px] file:text-xs file:font-medium file:bg-stone-50 file:text-stone-700 hover:file:cursor-pointer hover:file:bg-blue-50 hover:file:text-blue-700" style={{ color: '#000' }}
          required={filled && filled.comments ? false : true}
          />
      </div>
      <div className="mb-4">
    <label className="block text-sm font-medium text-gray-600" style={{ color: '#000' }}>
      Remarks:
    </label>
    <textarea
      name="remarks"
      value={formData.remarks}
      onChange={handleChange}
      className="mt-1 p-2 w-full border rounded"
    />
  </div>
    

      <div className="mt-4 text-sm text-gray-500" style={{ color: '#000' }}>
    *Hostel room rent: Rs. 150/- per day per person or Rs. 3000/- per month which is less. Security (refundable) Rs. 10000/-
  </div>
  <div className="mt-8 my-10 flex justify-center">
  <button
    type="submit"
    className="bg-color text-white px-6 py-2 rounded-lg w-80 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
  >
    Submit
  </button>
</div>
    </form>
    </div>
  );
};

export default Form;
