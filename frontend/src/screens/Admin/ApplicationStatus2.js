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
// import { useAuth } from "../../contexts/authContext";
import Modal from "react-modal";
const TABLE_HEAD = ["ID", "Name", "Professor", "Status", "Change Status"];
const TABLE_HEAD2 = ["ID", "Name", "Professor", "Status"];
const backendUrl = process.env.REACT_APP_BASE_URL; // Define backendUrl

const ModalComponent = ({
  showPopup,
  application_id,
  setShowPopup,
  selectedOptions,
  setSelectedOptions,
  gender
}) => {
  let options;
  if(gender==='male'){
    options = [
      <Option value="Chenab">Chenab</Option>,
      <Option value="Beas">Beas</Option>,
      <Option value="Satluj">Satluj</Option>,
      <Option value="Brahmaputra Boys">Brahmaputra Boys</Option>,
      <Option value="T6">T6</Option>
    ];
  }else{
    options = [
      <Option value="Raavi">Raavi</Option>,
      <Option value="Brahmaputra Girls">Brahmaputra Girls</Option>,
    ];
  }
  return (
    <Modal
      isOpen={showPopup}
      onRequestClose={() => setShowPopup(false)}
      contentLabel="Select Hostel"
    >
      <div className="flex flex-col gap-4 p-4">
        <Typography variant="h6" color="blue-gray">
          Select Hostel
        </Typography>
        <Select
          label="Select Hostel"
          onChange={(e) => {
            setSelectedOptions({
              ...selectedOptions,
              [application_id]: { value: "Approve", hostel: e },
            });
            setShowPopup(false);
          }}
        >
          {options}
        </Select>
      </div>
    </Modal>
  );
};
export default function MembersTable() {
  const [applications, setApplications] = useState([]);
  // const { currentUser } = useAuth();
  // const [selectedOptions, setSelectedOptions] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTab, setCurrentTab] = useState("All");
  const [showPopup, setShowPopup] = useState(false);
  const { comments, setComments, selectedOptions, setSelectedOptions } =useComments();
  const applicationsPerPage = 10;
  const [search, setSearch] = useState("");
  
  // Calculate index of the last application on the current page
  const indexOfLastApplication = currentPage * applicationsPerPage;
  // Calculate index of the first application on the current page
  const indexOfFirstApplication = indexOfLastApplication - applicationsPerPage;
  // Get current applications to display
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  // const [filteredApplications, setFilteredApplications] = useState([]);
  // const filteredApplications = currentTab === "All" ? applications : applications.filter(app => app.status === currentTab);
  const renderHeading = () => {
    if (currentTab === "Pending Caretaker Action") return TABLE_HEAD2;
    else return TABLE_HEAD;
  };
  const filteredApplications = useMemo(() => {
    if(search.length === 0){
    return currentTab === "All"
    ? applications
    : applications.filter((app) => app.status === currentTab);}
    else{
      const filteredApps = applications.filter(app => {
        const nameMatches = app.student.toLowerCase().startsWith(search.toLowerCase());
        const professorMatches = app.faculty.toLowerCase().startsWith(search.toLowerCase());
        if (currentTab === "All") {
          return nameMatches || professorMatches;
        } else {
          return app.status === currentTab && (nameMatches || professorMatches);
        }
      });
    
      return filteredApps;
    }
  }, [applications, currentTab,search]);
  
  const CurrentApplications = useMemo(() => {
    return filteredApplications.slice(indexOfFirstApplication, indexOfLastApplication);
  }, [filteredApplications, currentPage]);
  
  // const totalPages = Math.ceil(totalApplications / applicationsPerPage);
  
  const totalApplications = useMemo(() => {
    if(filteredApplications.length === 0 )
    setCurrentPage(0);
    else
    setCurrentPage(1);
    return filteredApplications.length;
  }, [filteredApplications]);
  
  const totalPages = useMemo(() => {
    return Math.ceil(totalApplications / applicationsPerPage);
  }, [totalApplications, applicationsPerPage]);
  
  useEffect(() => {
    axios
    .get(`${backendUrl}/api/get_applications`, { withCredentials: true })
    .then((res) => {
      // console.log("here:", res.data.data);
      setApplications(res.data.data);
    })
      .catch((error) => {
        // console.error("Error fetching data:", error);
      });
    }, []);
    
    const navigate = useNavigate();
    
  const handleApplicationClick = (appId) => {
    navigate(`./application/${appId}`);
  };
  const setEvent = (e) => {
    if (e === "Approve Faculty") {
      return "Pending HOD Approval";
    } else if (e === "Approve HOD") {
      return "Pending Admin Approval";
    } else if (e === "Approve") {
      return "Pending Caretaker Action";
    } else {
      return "Rejected by Admin";
    }
  };

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };


  const handleOption = (appId, e, currentStatus) => {
    // if(!isPlausible(setEvent(e), currentStatus)){}
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
    } else if (e === "Approve") {
      // setShowPopup(true);
      // console.log(appId);
    } else {
      setSelectedOptions({ ...selectedOptions, [appId]: { value: e } });
    }
    // console.log(selectedOptions);
  };

  if (!applications) {
    return <div>Loading...</div>;
  }

  // Define options based on the current tab
  // const options = currentTab === "Pending Faculty Approval" ? ["Approve Faculty", "Reject"] :
  //                 currentTab === "Pending HOD Approval" ? ["Approve HOD", "Reject"] :
  //                 currentTab === "Pending Admin Approval" ? ["Approve Admin", "Reject"] : [];
  const handleSubmit = () => {
    const updatedSelectedOptions = {};

    for (const id in selectedOptions) {
      if (selectedOptions.hasOwnProperty(id)) {
        updatedSelectedOptions[id] = { ...selectedOptions[id] };
        updatedSelectedOptions[id].value = setEvent(selectedOptions[id].value);
        // console.log(updatedSelectedOptions[id].value);
      }
    }
    // console.log("Data to be submitted:", updatedSelectedOptions);

    axios
      .post(
        `${backendUrl}/api/update_application`,
        { updatedSelectedOptions },
        { withCredentials: true }
      )
      .then((res) => {
        // console.log(res.data);
        alert("Data submitted successfully");
        window.location.reload();
      });
  };
  
  
  return (
    <div className="flex justify-center h-full mt-4 ">
      <Card className=" w-screen-max h-full w-full lg:w-4/5">
        <CardHeader floated={false} shadow={false} className="rounded-none mr-10">
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
            <Tabs className="w-full md:w-max pt-3 z-0" value="All">
              <TabsHeader className="">
                <Tab value="All" onClick={() => setCurrentTab("All")}>
                  &nbsp;All&nbsp;
                </Tab>
                <Tab
                  value="Pending Faculty Approval"
                  onClick={() => setCurrentTab("Pending Faculty Approval")}
                >
                  &nbsp;Faculty&nbsp;&nbsp;
                </Tab>
                <Tab
                  value="Pending HOD Approval"
                  onClick={() => setCurrentTab("Pending HOD Approval")}
                >
                  &nbsp;HOD&nbsp;&nbsp;
                </Tab>
                <Tab
                  value="Pending Admin Approval"
                  onClick={() => setCurrentTab("Pending Admin Approval")}
                >
                  &nbsp;Admin&nbsp;&nbsp;
                </Tab>
                <Tab
                  value="Pending Caretaker Action"
                  onClick={() => setCurrentTab("Pending Caretaker Action")}
                >
                  &nbsp;Caretaker&nbsp;
                </Tab>
              </TabsHeader>
            </Tabs>
            {/* <div className="w-full md:w-max">
              <Input
                label="Search"
                onChange= {handleInputChange}
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                className="border border-none "
              />
            </div> */}
          </div>
        </CardHeader>
        <CardBody className="px-0 mt-4 w-full overflow-x-auto">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="black"
                      className="font-normal"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CurrentApplications.map(
                ({
                  application_id,
                  student,
                  faculty,
                  status,
                  affiliation,
                  hostel,
                  gender,
                }) => {
                  // const [id, setId]=useState(null);
                  const handleApprove = () => {
                    setShowPopup(application_id);
                  };
                  return (
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
                              className="text-blue-gray-500 font-normal text-lg"
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
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal leading-none opacity-70"
                          >
                            {hostel}
                          </Typography>
                        </div>
                      </td>
                      <td
                        className="p-4 border-b border-blue-gray-50 w-10"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Select variant="static" size="lg" direction="down"
                          label={
                            selectedOptions[application_id]?.value || "Select"
                          }
                          onChange={(e) => handleOption(application_id, e, status)}
                        >
                          <Option value="Approve" onClick={handleApprove}>
                            Approve
                          </Option>
                          <Option value="Approve Faculty">
                            Approve Faculty
                          </Option>
                          <Option value="Approve HOD">Approve HOD</Option>
                          <Option value="Reject">Reject</Option>
                        </Select>
                        <ModalComponent
                          showPopup={showPopup === application_id}
                          application_id={application_id}
                          setShowPopup={setShowPopup}
                          selectedOptions={selectedOptions}
                          setSelectedOptions={setSelectedOptions}
                          gender={gender}
                        />
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
          Page {currentPage} of {totalPages}
          </Typography>
          <Button
            variant="outlined"
            size="sm"
            className="bg-color text-white hover:bg-blue-800"
            onClick={handleSubmit}
          >
            Submit
          </Button>
          <div className="flex gap-2">
              {currentPage > 1 && (
                <Button variant="outlined" size="sm" onClick={() => handlePageChange(currentPage - 1)}>
                  Previous
                </Button>
              )}
              {currentPage < totalPages && (
                <Button variant="outlined" size="sm" onClick={() => handlePageChange(currentPage + 1)}>
                  Next
                </Button>
              )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
