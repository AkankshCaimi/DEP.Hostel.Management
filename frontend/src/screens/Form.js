import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "../styles/tailwind.css";
import { useAuth } from "../contexts/authContext";
import { useLocation, useNavigate } from "react-router-dom";
import { Input, Select, Option, Textarea } from "@material-tailwind/react";
const Form = () => {
  const backendUrl = process.env.REACT_APP_BASE_URL;
  const [commentDiv, setCommentDiv] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { filled } = location.state || {};
  // console.log("state:", filled)
  // if(filled.comments){
  //   // alert(`Your application has been ${filled.status}. Comments: ${filled.comments}`)
  //   setCommentDiv(true)
  //   console.log("Comments:", filled.comments)
  // }
  // console.log(currentUser);
  const [formData, setFormData] = useState({
    studentName: "",
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
    termsAccepted: false,
  });
  const [file1Data, setFile1Data] = useState(null);
  const file1Ref = useRef(null);
  const [file2Data, setFile2Data] = useState(null);
  const file2Ref = useRef(null);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // console.log(e.target.name, e.target.value);
  };
  const handleFileChange = (e, i) => {
    if (e.target.files[0].type !== "application/pdf") {
      alert("Please upload a PDF file");
      if (i === 1) file1Ref.current.value = "";
      else file2Ref.current.value = "";
      return;
    }
    if (i === 1) setFile1Data(e.target.files[0]);
    else setFile2Data(e.target.files[0]);

    // console.log(e.target.files[0])
  };

  const handleCheckboxChange = () => {
    setFormData({
      ...formData,
      termsAccepted: !formData.termsAccepted,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      alert("Please accept the terms and conditions");
      return;
    }
    // console.log("Form submitted:", formData);
    if (
      (formData.arrivalDate > formData.departureDate ||
        formData.arrivalDate <= new Date().toISOString().split("T")[0] ||
        formData.departureDate <= new Date().toISOString().split("T")[0]) &&
      !filled
    ) {
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
    data.append("facultyEmail", formData.facultyEmail);
    data.append("arrivalDate", formData.arrivalDate);
    data.append("departureDate", formData.departureDate);
    data.append("instituteID", file1Data);
    data.append("instituteLetter", file2Data);
    data.append("remarks", formData.remarks);
    if (filled) {
      data.append("correction", filled.application_id);
    }
    axios
      .post(
        `${backendUrl}/api/internship`,
        data,
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log(res);
        alert("Form Submitted Successfully");
        navigate("/internship");
      })
      .catch((err) => {
        console.log(err);
      });
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
    <div className="bg-white">
      <h1 className="text-2xl font-semibold text-center lg:text-left ml-2 lg:ml-20  mt-4 -mb-2">Internship Form</h1>
      <div className="bg-white pt-2 text-center lg:text-left">
        <span className="text-red-500 ml-2 lg:ml-20 bg-white">*</span> Required fields
      </div>
      {filled && (
        <div className="text-red-500">
          Your application has been {filled.status}. Comments: {filled.comments}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-2 mt-0 pt-8 rounded bg-white lg:px-20"
      >
        <div className="">
          <Input
            color="blue"
            variant="standard"
            label="Name of the student Intern: "
            type="text"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            aria-required="true"
            required={filled && filled.comments ? false : true}
          />
        </div>

        <div className="mb-4">
          <Select
            name="gender"
            color="blue"
            variant="standard"
            label="Gender *"
            value={formData.gender}
            onChange={(v)=>handleChange({target:{name: "gender", value:v}})}
            aria-required="true"
            required={filled && filled.comments ? false : true}
          >
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Other</Option>
          </Select>
        </div>
        <div className="mb-4">
          <Input
            label="Affiliation of the student intern:"
            type="text"
            variant="standard"
            color="blue"
            name="affiliation"
            value={formData.affiliation}
            onChange={handleChange}
            aria-required="true"
            required={filled && filled.comments ? false : true}
          />
        </div>
        <div className="mb-4">
          <Input
          label="Address"
            name="address"
            variant="standard"
            color="blue"
            value={formData.address}
            onChange={handleChange}
            aria-required="true"
            required={filled && filled.comments ? false : true}
          />
        </div>
        <div className="mb-4">
          <Input
            label="Contact Number:"
            type="text"
            variant="standard"
            color="blue"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            aria-required="true"
            required={filled && filled.comments ? false : true}
          />
        </div>
        <div className="mb-4">
          <Input
          label="Email:"
          variant="standard"
          color="blue"
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            aria-required="true"
            required={filled && filled.comments ? false : true}
          />
        </div>
        <div className="mb-4">
          <Input
            label="Name of the Faculty Mentor:"
            variant="standard"
            color="blue"
            type="text"
            name="facultyMentorName"
            value={formData.facultyMentorName}
            onChange={handleChange}
            aria-required="true"
            required={filled && filled.comments ? false : true}
          />
        </div>
        <div className="mb-4">
          <Input
          label="Faculty Mentor's Email:"
          color="blue"
          variant="standard"
            type="text"
            name="facultyEmail"
            value={formData.facultyEmail}
            onChange={handleChange}
            aria-required="true"
            required={filled && filled.comments ? false : true}
          />
        </div>
        <div className="mb-4">
          <Input
          label="Date of arrival:"
          color="blue"
          variant="standard"
            type="date"
            name="arrivalDate"
            value={formData.arrivalDate}
            onChange={handleChange}
            aria-required="true"
            required={filled && filled.comments ? false : true}
          />
        </div>
        <div className="mb-4">
          <Input
            color="blue"
            variant="standard"
            label="Date of departure:"
            type="date"
            name="departureDate"
            value={formData.departureDate}
            onChange={handleChange}
            aria-required="true"
            required={filled && filled.comments ? false : true}
          />
        </div>
        <div className="mb-4">
          <div className="text-xs text-gray-600 mb-1">Copy of your Institute ID Card (pdf):</div>
          <input
            
            color="blue"
            variant="standard"
            type="file"
            name="instituteID"
            accept=".pdf"
            ref={file1Ref}
            onChange={(e) => handleFileChange(e, 1)}
            aria-required="true"
            className="text-sm text-stone-500 pb-8 mt-2 file:mr-5 file:py-1 file:px-3 file:border-[1px] file:text-xs file:font-medium file:bg-stone-50 file:text-stone-700 hover:file:cursor-pointer hover:file:bg-blue-50 hover:file:text-blue-700"
            style={{ color: "#000" }}
            required={filled && filled.comments ? false : true}
          />
        </div>
        <div className="mb-4">
        <div className="text-xs text-gray-600 mb-1">Copy of Official Letter from your Institute (pdf):<span></span></div>
          <input
            color="blue"
            variant="standard"
            type="file"
            name="instituteID"
            accept=".pdf"
            ref={file2Ref}
            onChange={(e) => handleFileChange(e, 2)}
            aria-required="true"
            className="text-sm text-stone-500 mt-2 file:mr-5 file:py-1 file:px-3 file:border-[1px] file:text-xs file:font-medium file:bg-stone-50 file:text-stone-700 hover:file:cursor-pointer hover:file:bg-blue-50 hover:file:text-blue-700"
            style={{ color: "#000" }}
            required={filled && filled.comments ? false : true}
          />
        </div>
      </form>
      <div className="ml-2 mr-2 md:mx-20">
        <Textarea
          label="Remarks:"
          variant="standard"
          color="blue"
          name="remarks"
          value={formData.remarks}
          onChange={handleChange}
          className="p-1 w-full border rounded"
        />
        <div
          className="text-sm text-gray-500 mt-4 mb-4"
          style={{ color: "#000" }}
        >
          *Hostel room rent: Rs. 150/- per day per person or Rs. 3000/- per
          month which is less. Security (refundable) Rs. 10000/-
        </div>
        {/* Scrollable box for terms and conditions */}
        <h2 className="text-lg font-bold mb-2">Terms and Conditions:</h2>
        <div className="bg-gray-100 rounded-md max-h-48 overflow-y-auto border border-black p-2">
          <p>
            1. The request for accommodation should be submitted prior to
            arrival as per existing rules.
          </p>
          <p>
            2. The Internship students are required to pay hostel room rent and
            food charges in advance to Student Affairs Section.
          </p>
          <p>
            3. Separate rooms on shared basis are allotted for boys and girls in
            hostels.
          </p>
          <p>
            4. One day minimum charge shall be levied for all bookings unless
            these are cancelled at least 48 hrs. before the commencement of the
            occupancy. Similarly, in case a guest fails to occupy the booked
            accommodation, the same will be cancelled after one day of the
            booking date.
          </p>
          <p>
            5. Booking is not permitted for student undergoing medical
            treatment/ advice and who are suffering from communicable disease or
            bed ridden or are under post-delivery case.
          </p>
          <p>
            6. In case of cancelled one day will be counted on 24 hrs. basis or
            a part thereof commencing the time of arrival.
          </p>
          <p>7. Pets/Dogs/Cats etc. are not allowed in the hostel premises.</p>
        </div>

        {/* Checkbox for accepting terms and conditions */}
        <div className="mt-4 flex items-center">
          <input
            type="checkbox"
            id="termsCheckbox"
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleCheckboxChange}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label
            htmlFor="termsCheckbox"
            className="ml-2 block text-sm text-gray-900"
          >
            I agree to the terms and conditions
          </label>
        </div>

        {/* Submit button */}
        <div className="mt-8 my-10 flex justify-center">
          <button
            type="submit"
            className="bg-color text-white px-6 py-2 rounded-lg w-80 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800 mb-4"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Form;
