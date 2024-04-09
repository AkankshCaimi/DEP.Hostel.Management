import { useEffect } from "react";
import React, { useState } from "react";
import axios from "axios";
import {
  Tabs,
  TabsHeader,
  Tab,
  TabsBody,
  TabPanel,
  Card,
  Typography,
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

  const TABLE_HEAD = ["Name", "Email", "Gender", "Department", "Year","Phone No."];

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
      })
      .catch((error) => {
        console.error("Error:", error.name);
        alert(`Error: ${error.name}`);
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
                  Name *
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
                  required
                />
              </div>
              <div className={`mb-4 ${isManual ? "" : "cursor-not-allowed"}`}>
                <label
                  htmlFor="email"
                  className={`block font-bold mb-2 ${
                    isManual ? "" : "cursor-not-allowed"
                  }`}
                >
                  Email *
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
                  required
                />
              </div>
              <div className={`mb-4 ${isManual ? "" : "cursor-not-allowed"}`}>
                <label
                  htmlFor="gender"
                  className={`block font-bold mb-2 ${
                    isManual ? "" : "cursor-not-allowed"
                  }`}
                >
                  Gender *
                </label>
                <select
                  id="gender"
                  className={`border border-gray-300 rounded px-4 py-2.5 w-full ${
                    isManual ? "" : "cursor-not-allowed"
                  }`}
                  value={oneData.gender}
                  name="gender"
                  onChange={isManual ? handleChange : null}
                  disabled={!isManual}
                  required
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
                  Department *
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
                  required
                />
              </div>
              <div className={`mb-4 ${isManual ? "" : "cursor-not-allowed"}`}>
                <label
                  htmlFor="year"
                  className={`block font-bold mb-2 ${
                    isManual ? "" : "cursor-not-allowed"
                  }`}
                >
                  Year of admission *
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
                  required
                />
              </div>
              <div className={`mb-4 ${isManual ? "" : "cursor-not-allowed"}`}>
                <label
                  htmlFor="PhoneNumber"
                  className={`block font-bold mb-2 ${
                    isManual ? "" : "cursor-not-allowed"
                  }`}
                >
                  Phone No. *
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
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-color hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
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
                  Upload File *
                </label>
                <input
                  type="file"
                  id="file"
                  className={`border border-gray-300 rounded px-4 py-2 w-full ${
                    isManual ? "cursor-not-allowed" : ""
                  }`}
                  onChange={isManual ? null : handleFileChange}
                  disabled={isManual}
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-color hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded"
              >
                Submit
              </button>
            </form>
            <div>
                  <h2 className="text-xl mt-10 font-semibold">
                    Excel Template:
                  </h2>
                  <Typography
                    variant="small"
                    color="gray"
                    className="mt-2 flex items-center gap-1 font-normal"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="-mt-px h-4 w-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Make sure to flow the below template for uploading the excel
                  </Typography>
                </div>
                <Card className="mt-10 h-full w-full overflow-x-scroll lg:overflow-none rounded-none">
                  <table className="w-full min-w-max table-auto text-left bg-white">
                    <thead>
                      <tr>
                        {TABLE_HEAD.map((head) => (
                          <th
                            key={head}
                            className=" p-4 border border-gray-800 w-20 h-4"
                          >
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal leading-none opacity-100"
                            >
                              {head}
                            </Typography>
                          </th>
                        ))}
                      </tr>
                    </thead>
                  </table>
                </Card>
          </TabPanel>
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default AddStudent;
