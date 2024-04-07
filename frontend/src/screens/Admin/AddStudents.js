import { useEffect } from "react";
import React, { useState } from "react";
import axios from "axios";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Input,
} from "@material-tailwind/react";

const AddStudent = () => {
  const [oneData, setOneData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    gender: "",
    year: "",
    department: "",
  });
  const [isMobile, setIsMobile] = useState(false);
  const [file, setFile] = useState(null);
  const [isManual, setIsManual] = useState(true);

  const handleChange = (e) => {
    setOneData({ ...oneData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleOptionChange = (option) => {
    setIsManual(option === "manual");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    if (isManual) {
      Object.entries(oneData).forEach(([key, value]) => {
        data.append(key, value);
      });
    } else {
      data.append("file", file);
    }
    data.append("type", "student");

    const backendUrl = process.env.REACT_APP_BASE_URL;
    axios
      .post(`${backendUrl}/api/add_users`, data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log(res);
        alert("Students Added Successfully");
      });
  };

  useEffect(() => {
    function handleResize() {
      setIsMobile(isMobileScreen());
    }

    handleResize(); // Call it once to set initial state
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function isMobileScreen() {
    return window.innerWidth < 768; // Adjust the threshold as needed
  }

  const tabsData = [
    {
      label: "Add Manually",
      value: "manual",
    },
    {
      label: "Upload Excel File",
      value: "file",
    },
  ];

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold my-4">Add Students</h1>
      <Tabs value={isManual ? "manual" : "file"}>
        <TabsHeader className="w-80 bg-gray-300">
          {tabsData.map(({ label, value }) => (
            <Tab
              key={value}
              value={value}
              onClick={() => handleOptionChange(value)}
            >
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          <TabPanel value="manual">
            <form onSubmit={handleSubmit}>
              <h2 className="text-xl mb-2 font-semibold">Fill the Details:</h2>
              <div className={`mb-4 ${isManual ? "" : "cursor-not-allowed"}`}>
                <label
                  htmlFor="name"
                  className={`block font-bold mb-2 ${
                    isManual ? "" : " cursor-not-allowed"
                  }`}
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={`border border-gray-300 rounded px-4 py-2 w-full ${
                    isManual ? "" : " cursor-not-allowed"
                  }`}
                  value={oneData.name}
                  onChange={isManual ? handleChange : null}
                  disabled={!isManual}
                />
              </div>
              <div className={`mb-4 ${isManual ? "" : "cursor-not-allowed"}`}>
                <label
                  htmlFor="email"
                  className={`block font-bold mb-2 ${
                    isManual ? "" : "cursor-not-allowed"
                  }`}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`border border-gray-300 rounded px-4 py-2 w-full ${
                    isManual ? "" : "cursor-not-allowed"
                  }`}
                  value={oneData.email}
                  onChange={isManual ? handleChange : null}
                  disabled={!isManual}
                />
              </div>
              <div className={`mb-4 ${isManual ? "" : "cursor-not-allowed"}`}>
                <label
                  htmlFor="gender"
                  className={`block font-bold mb-2 ${
                    isManual ? "" : "cursor-not-allowed"
                  }`}
                >
                  Gender
                </label>
                <select
                  id="gender"
                  className={`border border-gray-300 rounded px-4 py-2 w-full ${
                    isManual ? "" : "cursor-not-allowed"
                  }`}
                  value={oneData.gender}
                  name="gender"
                  onChange={isManual ? handleChange : null}
                  disabled={!isManual}
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className={`mb-4 ${isManual ? "" : "cursor-not-allowed"}`}>
                <label
                  htmlFor="department"
                  className={`block font-bold mb-2 ${
                    isManual ? "" : "cursor-not-allowed"
                  }`}
                >
                  Department
                </label>
                <input
                  type="text"
                  id="Department"
                  name="department"
                  className={`border border-gray-300 rounded px-4 py-2 w-full ${
                    isManual ? "" : "cursor-not-allowed"
                  }`}
                  value={oneData.department}
                  onChange={isManual ? handleChange : null}
                  disabled={!isManual}
                />
              </div>
              <div className={`mb-4 ${isManual ? "" : "cursor-not-allowed"}`}>
                <label
                  htmlFor="year"
                  className={`block font-bold mb-2 ${
                    isManual ? "" : "cursor-not-allowed"
                  }`}
                >
                  Year of admission
                </label>
                <input
                  type="text"
                  id="Year"
                  name="year"
                  className={`border border-gray-300 rounded px-4 py-2 w-full ${
                    isManual ? "" : "cursor-not-allowed"
                  }`}
                  value={oneData.year}
                  onChange={isManual ? handleChange : null}
                  disabled={!isManual}
                />
              </div>
              <div className={`mb-4 ${isManual ? "" : "cursor-not-allowed"}`}>
                <label
                  htmlFor="PhoneNumber"
                  className={`block font-bold mb-2 ${
                    isManual ? "" : "cursor-not-allowed"
                  }`}
                >
                  Phone No.
                </label>
                <input
                  type="phone"
                  id="Phone"
                  name="phoneNumber"
                  className={`border border-gray-300 rounded px-4 py-2 w-full ${
                    isManual ? "" : "cursor-not-allowed"
                  }`}
                  value={oneData.phoneNumber}
                  onChange={isManual ? handleChange : null}
                  disabled={!isManual}
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
            </form>
          </TabPanel>
          <TabPanel value="file">
            <form onSubmit={handleSubmit}>
              <h2 className="text-xl mb-2 font-semibold">Upload Excel File:</h2>
              <div className={`mb-4 ${isManual ? "cursor-not-allowed" : ""}`}>
                <label htmlFor="file" className="block font-bold mb-2">
                  Upload File
                </label>
                <input
                  type="file"
                  id="file"
                  className={`border border-gray-300 rounded px-4 py-2 w-full ${
                    isManual ? "cursor-not-allowed" : ""
                  }`}
                  onChange={isManual ? null : handleFileChange}
                  disabled={isManual}
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
            </form>
          </TabPanel>
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default AddStudent;
