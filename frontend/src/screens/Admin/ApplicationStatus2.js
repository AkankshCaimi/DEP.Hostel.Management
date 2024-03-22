import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";
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

const TABLE_HEAD = ["ID", "Name", "Professor", "Status", "Change Status"];
const backendUrl = process.env.REACT_APP_BASE_URL; // Define backendUrl

export default function MembersTable() {
  const [applications, setApplications] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [currentTab, setCurrentTab] = useState("Pending Faculty Approval");

  useEffect(() => {
    axios
      .get(`${backendUrl}/api/get_applications`, { withCredentials: true })
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

  const handleOption = (appId, e) => {
    setSelectedOptions({ ...selectedOptions, [appId]: e });
    console.log(selectedOptions);
  };

  if (!applications) {
    return <div>Loading...</div>;
  }

  const filteredApplications = currentTab === "all" ? applications : applications.filter(app => app.status === currentTab);

  // Define options based on the current tab
  const options = currentTab === "Pending Faculty Approval" ? ["Approve Faculty", "Reject"] :
                  currentTab === "Pending HOD Approval" ? ["Approve HOD", "Reject"] :
                  currentTab === "Pending Admin Approval" ? ["Approve Admin", "Reject"] : [];

  return (
    <div className="flex justify-center h-full mt-4 mb-4">
      <Card className="h-full w-full lg:w-4/5">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Application Status
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all applications
              </Typography>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <Tabs value="Pending Faculty Approval" className="w-full md:w-max">
              <TabsHeader>
                <Tab value="Pending Faculty Approval" onClick={() => setCurrentTab("Pending Faculty Approval")}>
                  &nbsp;&nbsp;Faculty&nbsp;&nbsp;
                </Tab>
                <Tab value="Pending HOD Approval" onClick={() => setCurrentTab("Pending HOD Approval")}>
                  &nbsp;&nbsp;HOD&nbsp;&nbsp;
                </Tab>
                <Tab value="Pending Admin Approval" onClick={() => setCurrentTab("Pending Admin Approval")}>
                  &nbsp;&nbsp;Admin&nbsp;&nbsp;
                </Tab>
              </TabsHeader>
            </Tabs>
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
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
            <tbody>
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
                      <Select
                        label="Change Status"
                        onChange={(e) => handleOption(application_id, e)}
                      >
                        {options.map((option) => (
                          <Option key={option} value={option}>
                            {option}
                          </Option>
                        ))}
                      </Select>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page 1 of 1
          </Typography>
          <Button variant="outlined" size="sm" className="bg-blue-600 text-white" >
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
