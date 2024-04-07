import React, { useState } from "react";
import "../../styles/tailwind.css";
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

const AddFaculty = () => {
  // const [name, setName] = useState('');
  // const [phoneNumber, setPhoneNumber] = useState('');
  // const [email, setEmail] = useState('');
  const [oneData, setOneData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    gender: "",
    department: "",
  });
  const [file, setFile] = useState(null);
  const [isManual, setIsManual] = useState(true);
  const handleChange = (e) => {
    setOneData({ ...oneData, [e.target.name]: e.target.value });
  };
  // const handleNameChange = (e) => {
  //     setName(e.target.value);
  // };

  // const handlePhoneNumberChange = (e) => {
  //     setPhoneNumber(e.target.value);
  // };

  // const handleEmailChange = (e) => {
  //     setEmail(e.target.value);
  // };
  const TABLE_HEAD = ["Name", "Email", "Entry number", "Department", "Year"];

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleOptionChange = (option) => {
    setIsManual(option === "manual");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission or file upload logic here
    // console.log('Form submitted:', {
    //     name,
    //     phoneNumber,
    //     email,
    //     file,
    //     isManual,
    // });
    console.log(oneData);
    const data = new FormData();
    if (isManual) {
      data.append("name", oneData.name);
      data.append("phoneNumber", oneData.phoneNumber);
      data.append("email", oneData.email);
      data.append("gender", oneData.gender);
      data.append("department", oneData.department);
    } else {
      data.append("file", file);
    }
    data.append("type", "faculty");
    console.log(isManual);
    const backendUrl = process.env.REACT_APP_BASE_URL;
    axios
      .post(
        `${backendUrl}/api/add_users`,
        data,
        { withCredentials: true },
        { headers: { "Content-Type": "multipart/form-data" } }
      )
      .then((res) => {
        console.log(res);
        alert("Faculty Added Successfully");
      });
  };

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
      <h1 className="text-2xl font-bold mb-4">Add Faculty</h1>
      <Tabs value={isManual ? "manual" : "file"}>
        <TabsHeader className="w-80 bg-gray-300">
          {tabsData.map(({ label, value }) => (
            <Tab
              key={value}
              value={value}
              onClick={() => handleOptionChange(value)}
              className="font"
            >
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          <TabPanel value="manual">
            <form onSubmit={handleSubmit}>
              <div className="mb-4"></div>
              <div className="flex gap-4">
                <div
                  className={`w-full mb-4 ${
                    isManual ? "" : "opacity-50 cursor-not-allowed"
                  }`}
                >
                  <h2 className="text-xl mb-2 font-semibold ">
                    Fill the Details:
                  </h2>
                  <div
                    className={`mb-4 ${isManual ? "" : "cursor-not-allowed"}`}
                  >
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
                  <div
                    className={`mb-4 ${isManual ? "" : "cursor-not-allowed"}`}
                  >
                    <label
                      htmlFor="phoneNumber"
                      className={`block font-bold mb-2 ${
                        isManual ? "" : "cursor-not-allowed"
                      }`}
                    >
                      Phone Number
                    </label>
                    <input
                      type="phone"
                      id="phoneNumber"
                      name="phoneNumber"
                      className={`border border-gray-300 rounded px-4 py-2 w-full ${
                        isManual ? "" : "cursor-not-allowed"
                      }`}
                      value={oneData.phoneNumber}
                      onChange={isManual ? handleChange : null}
                      disabled={!isManual}
                    />
                  </div>
                  <div
                    className={`mb-4 ${isManual ? "" : "cursor-not-allowed"}`}
                  >
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
                  <div
                    className={`mb-4 ${isManual ? "" : "cursor-not-allowed"}`}
                  >
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
                      id="department"
                      name="department"
                      className={`border border-gray-300 rounded px-4 py-2 w-full ${
                        isManual ? "" : "cursor-not-allowed"
                      }`}
                      value={oneData.department}
                      onChange={isManual ? handleChange : null}
                      disabled={!isManual}
                    />
                  </div>
                  <div
                    className={`mb-4 ${isManual ? "" : "cursor-not-allowed"}`}
                  >
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
                  <button
                    type="submit"
                    className={`${
                      isManual ? "hover:bg-blue-700" : "cursor-not-allowed"
                    } bg-color  text-white font-bold py-2 px-4 rounded`}
                    disabled={!isManual} // Disable button when not in manual mode
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </TabPanel>
          <TabPanel value="file">
            <form onSubmit={handleSubmit}>
              <div
                className={`w-full mb-4 ${
                  isManual ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <h2
                  className={`text-xl mb-2 font-semibold ${
                    isManual ? "cursor-not-allowed" : ""
                  }`}
                >
                  Upload Excel File:
                </h2>
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
                  className={`${
                    isManual ? "cursor-not-allowed" : "hover:bg-blue-700 "
                  } bg-color  text-white font-bold py-2 px-4 rounded`}
                  disabled={isManual}
                >
                  Submit
                </button>
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
                            className=" p-4 border border-gray-800 w-1/5 h-4"
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
              </div>
            </form>
          </TabPanel>
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default AddFaculty;
