import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect, useMemo } from "react";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Select,
  Option,
} from "@material-tailwind/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useComments } from "../../contexts/commentsContext";
import { useAuth } from "../../contexts/authContext";
const backendUrl = process.env.REACT_APP_BASE_URL; // Define backendUrl

export default function MembersTable() {
  const [applications, setApplications] = useState([]);
  const { currentUser } = useAuth();
  // const [selectedOptions, setSelectedOptions] = useState({});
  const [currentTab, setCurrentTab] = useState(currentUser && currentUser.is_hod ? "Pending HOD Approval" : "Pending Faculty Approval");
  const { comments, selectedOptions, setSelectedOptions } = useComments();
  // const [filteredApplications, setFilteredApplications] = useState([]);
  // const filteredApplications = currentTab === "All" ? applications : applications.filter(app => app.status === currentTab);
  const TABLE_HEAD = ["ID", "Name", "Professor", "Status", "Change Status"];
  const TABLE_HEAD2 = ["ID", "Name", "Professor", "Status"];
  const renderHeading = ()=>{
    if(currentTab==="Pending Admin Approval")
      return TABLE_HEAD2;
    else return TABLE_HEAD;
  }
  const filteredApplications = useMemo(() => {
    if (!applications.own) return [];
    if (currentTab === "Pending HOD Approval") {
      return applications.hod;
    } else if (currentTab === "Pending Faculty Approval") {
      return applications.own.filter((app) => app.status === "Pending Faculty Approval");
    } else if(currentTab === "Pending Admin Approval"){
      if (currentUser.is_hod) {
        return applications.own.filter((app) => app.status === "Pending Admin Approval" || app.status === "Pending Caretaker Action" || app.status.includes('Rejected'));
      }
      return applications.own.filter((app) => app.status === "Pending Admin Approval" || app.status === "Pending Caretaker Action" || app.status === "Pending HOD Approval" || app.status.includes('Rejected') );
    }
  }, [applications, currentTab]);
  useEffect(() => {
    axios
      .get(`${backendUrl}/api/view_applications`, { withCredentials: true })
      // .get(`${backendUrl}/api/get_applications`, { withCredentials: true })
      .then((res) => {
        console.log("here:", res.data.data);
        setApplications(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const navigate = useNavigate();
  const handleApplicationClick = (appId) => {
    navigate(`./application/${appId}`);
  };
  const setEvent = (e) => {
    if (e === "Approve") {
      if(currentUser.is_hod)
        return "Pending Admin Approval";
      else return "Pending HOD Approval";
    }
    else {
      if (currentUser.is_hod) return "Rejected by HOD";
      else return "Rejected by Faculty";
    }
  };
  const handleOption = (appId, e) => {
    if (e === "Reject") {
      if (!comments[appId]) {
        alert("Please add comments for rejection");
        // setSelectedOptions({ ...selectedOptions, [appId]: {value: e} });
        navigate(`./application/${appId}`);
      } else {
        setSelectedOptions({
          ...selectedOptions,
          [appId]: { value: e, comments: comments[appId] },
        });
      }
    } else {
      setSelectedOptions({ ...selectedOptions, [appId]: { value: e } });
    }
    console.log(selectedOptions);
  };

  if (!applications) {
    return <div>Loading...</div>;
  }

  // Define options based on the current tab
  // const options = currentTab === "Pending Faculty Approval" ? ["Approve Faculty", "Reject"] :
  //                 currentTab === "Pending HOD Approval" ? ["Approve HOD", "Reject"] :
  //                 currentTab === "Pending Admin Approval" ? ["Approve Admin", "Reject"] : [];
  const handleSubmit = () => {
    console.log("Data to be submitted:", selectedOptions);
    const updatedSelectedOptions = {};

    for (const id in selectedOptions) {
      if (selectedOptions.hasOwnProperty(id)) {
        updatedSelectedOptions[id] = { ...selectedOptions[id] };
        updatedSelectedOptions[id].value = setEvent(selectedOptions[id].value);
        console.log(updatedSelectedOptions[id].value);
      }
    }
    axios
      .post(
        `${backendUrl}/api/update_application`,
        { updatedSelectedOptions },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        alert("Data submitted successfully");
        window.location.reload();
      });
  };
  return (
    <div className="flex justify-center h-full mt-4 ">
      <Card className="h-full w-full lg:w-4/5">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className=" flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Application Status
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all applications
              </Typography>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Tabs className="w-full md:w-max pt-3">
              <TabsHeader>
                {currentUser && currentUser.is_hod && (<Tab
                  value="Pending HOD Approval"
                  onClick={() => setCurrentTab("Pending HOD Approval")}
                >
                  &nbsp;&nbsp;HOD&nbsp;&nbsp;
                </Tab>)}
                <Tab
                  value="Pending Faculty Approval"
                  onClick={() => setCurrentTab("Pending Faculty Approval")}
                >
                  &nbsp;&nbsp;Unreviewed&nbsp;&nbsp;
                </Tab>
                <Tab
                  value="Pending Admin Approval"
                  onClick={() => setCurrentTab("Pending Admin Approval")}
                >
                  &nbsp;&nbsp;Reviewed&nbsp;&nbsp;
                </Tab>
              </TabsHeader>
            </Tabs>
            {/* <div className="w-full md:w-max">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div> */}
          </div>
        </CardHeader>
        <CardBody className="px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {renderHeading().map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            {/* insert here */}
            {filteredApplications && (<tbody>
              {filteredApplications.map(
                ({ application_id, student, faculty, status, affiliation }) => (
                  <tr
                    key={application_id}
                    className="hover:bg-gray-200 hover:cursor-pointer"
                    onClick={() => handleApplicationClick(application_id)}
                  >
                    <td className="p-4 border-b border-blue-gray-50">
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {application_id}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {student}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {affiliation}
                        </Typography>
                      </div>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {faculty}
                        </Typography>
                      </div>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {status}
                        </Typography>
                      </div>
                    </td>
                    <td
                      className="p-4 border-b border-blue-gray-50 w-10"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {currentTab!=="Pending Admin Approval" && (<Select
                        label={
                          selectedOptions[application_id]?.value || "Select"
                        }
                        onChange={(e) => handleOption(application_id, e)}
                      >
                        <Option value="Approve">Approve</Option>
                        <Option value="Reject">Reject</Option>
                        {/* <Option>Material Tailwind Svelte</Option> */}
                      </Select>)}
                    </td>
                  </tr>
                )
              )}
            </tbody>)}
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page 1 of 1
          </Typography>
          <Button
            variant="outlined"
            size="sm"
            className="bg-blue-600 text-white"
            onClick={handleSubmit}
          >
            Submit
          </Button>
          <div className="flex gap-2">
            <Button variant="outlined" size="sm">
              Previous
            </Button>
            <Button variant="outlined" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
