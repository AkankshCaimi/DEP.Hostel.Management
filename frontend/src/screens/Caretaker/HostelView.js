import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/tailwind.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import {
  Spinner,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Button,
  IconButton,
} from "@material-tailwind/react";
function Card({ children }) {
  return <div className=" rounded-md py-2">{children}</div>;
}

function CardHeader({ children }) {
  return <div className="">{children}</div>;
}

function CardTitle({ children }) {
  return <p className="text-sm font-bold">{children}</p>;
}

function CardFooter({ children }) {
  return <div>{children}</div>;
}

function GroupIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 7V5c0-1.1.9-2 2-2h2" />
      <path d="M17 3h2c1.1 0 2 .9 2 2v2" />
      <path d="M21 17v2c0 1.1-.9 2-2 2h-2" />
      <path d="M7 21H5c-1.1 0-2-.9-2-2v-2" />
      <rect width="7" height="5" x="7" y="7" rx="1" />
      <rect width="7" height="5" x="10" y="12" rx="1" />
    </svg>
  );
}

const people = [
  { name: "Aarav Patel", email: "aaravpatel@example.com" },
  { name: "Aditya Sharma", email: "adityasharma@example.com" },
  { name: "Arjun Gupta", email: "arjungupta@example.com" },
  { name: "Devanand Singh", email: "devanandsingh@example.com" },
  { name: "Hrithik Kumar", email: "hrithikkumar@example.com" },
  { name: "Jayesh Desai", email: "jayeshdesai@example.com" },
  { name: "Karthik Reddy", email: "karthikreddy@example.com" },
  { name: "Krish Sharma", email: "krishsharma@example.com" },
  { name: "Neel Mehta", email: "neelmehta@example.com" },
  { name: "Nirav Shah", email: "niravshah@example.com" },
  { name: "Pranav Choudhury", email: "pranavchoudhury@example.com" },
  { name: "Rajat Verma", email: "rajatverma@example.com" },
  { name: "Rohan Malhotra", email: "rohanmalhotra@example.com" },
  { name: "Sahil Thakur", email: "sahilthakur@example.com" },
  { name: "Siddharth Joshi", email: "siddharthjoshi@example.com" },
  { name: "Suraj Mishra", email: "surajmishra@example.com" },
  { name: "Tarun Bhatia", email: "tarunbhatia@example.com" },
  { name: "Utkarsh Singhania", email: "utkarshsinghania@example.com" },
  { name: "Varun Saxena", email: "varunsaxena@example.com" },
  { name: "Vicky Rana", email: "vickyrana@example.com" },
  { name: "Vivek Patel", email: "vivekpatel@example.com" },
  { name: "Yash Dubey", email: "yashdubey@example.com" },
  { name: "Zaid Khan", email: "zaidkhan@example.com" },
  { name: "Akash Varma", email: "akashvarma@example.com" },
  { name: "Rohit Singh", email: "rohitsingh@example.com" },
  { name: "Virat Kapoor", email: "viratkapoor@example.com" },
];

function HostelRoomCard({ room_no, students,room_current_occupancy , room_occupancy}) {
  // const navigate= useNavigate();
  function handleClick() {
    console.log("Room number here:", room_no);
    // navigate(`/room-details/${parseInt(room_no)}`);
    // navigate('')
  }
  const backgroundColorClass =
    room_current_occupancy === room_occupancy ? "bg-gray-300" : "bg-green-200";
  const backgroundColorClass2 =
    room_current_occupancy === room_occupancy ? "hover:bg-gray-400" : "hover:bg-green-300";
  return (
    <Link
      to={`../room-details/${room_no}`}
      className="no-underline text-black py-1"
    >
      <div
        className={`${backgroundColorClass} border-none rounded-md flex items-center justify-center mr-1 border border-black hover:cursor-pointer ${backgroundColorClass2}`}
      >
        <Card>
          {" "}
          {/* Adjust width and height as needed */}
          <CardHeader>
            <CardTitle>{room_no}</CardTitle>
          </CardHeader>
          <CardFooter>
            <div className="flex items-center space-x-1">
              <GroupIcon className="h-3 w-3 text-gray-700" />
              <p className="h-1 w-2 pt-0.5 text-xs text-gray-700 mb-3">
                {room_current_occupancy}
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </Link>
  );
}

export default function HostelRooms() {
  const { hostel } = useParams();
  const { currentUser, loading } = useAuth();
  const [hostelDetails, setHostelDetails] = useState({});
  const [spin, setSpin] = useState(false);
  const [rooms, setRooms] = useState([
    { room_no: "CE-101", students: [people[0], people[1]] },
    { room_no: "CE-102", students: [people[2], people[3]] },
    { room_no: "CE-103", students: [people[4], people[5]] },
    { room_no: "CE-104", students: [people[6], people[7]] },
    { room_no: "CE-105", students: [people[8], people[9]] },
    { room_no: "CE-106", students: [people[10]] },
    { room_no: "CE-107", students: [people[11], people[12]] },
    { room_no: "CE-108", students: [people[13], people[14]] },
    { room_no: "CE-109", students: [people[15], people[16]] },
    { room_no: "CE-110", students: [people[17], people[18]] },
    { room_no: "CE-111", students: [people[19], people[20]] },
    { room_no: "CE-112", students: [people[21], people[22]] },
    { room_no: "CE-113", students: [people[23], people[24]] },
    { room_no: "CE-114", students: [people[25], people[26]] },
    { room_no: "CE-115", students: [people[27], people[28]] },
    { room_no: "CE-116", students: [people[29], people[30]] },
    { room_no: "CE-117", students: [people[31], people[32]] },
    { room_no: "CE-118", students: [people[33], people[34]] },
    { room_no: "CE-119", students: [people[35], people[36]] },
    { room_no: "CE-120", students: [people[37], people[38]] },
    { room_no: "CE-121", students: [people[39], people[40]] },
    { room_no: "CE-122", students: [people[41], people[42]] },
    { room_no: "CE-123", students: [people[43], people[44]] },
    { room_no: "CE-124", students: [people[45], people[46]] },
    { room_no: "CE-125", students: [people[47], people[48]] },
    { room_no: "CE-126", students: [people[49], people[50]] },
    { room_no: "CE-127", students: [people[51], people[52]] },
    { room_no: "CE-128", students: [people[53], people[54]] },
    { room_no: "CE-129", students: [people[55], people[56]] },
    { room_no: "CE-130", students: [people[57], people[58]] },
    { room_no: "CE-131", students: [people[59], people[60]] },
    { room_no: "CE-132", students: [people[61], people[62]] },
    { room_no: "CE-133", students: [people[63], people[64]] },
    { room_no: "CE-134", students: [people[65], people[66]] },
    { room_no: "CE-135", students: [people[67], people[68]] },
    { room_no: "CE-136", students: [people[69]] },
    { room_no: "CE-137", students: [people[71], people[72]] },
    { room_no: "CE-138", students: [people[73], people[74]] },
    { room_no: "CE-139", students: [people[75], people[76]] },
    { room_no: "CE-140", students: [people[77], people[78]] },
    { room_no: "CE-141", students: [people[79], people[80]] },
    { room_no: "CE-142", students: [people[81], people[82]] },
    { room_no: "CE-143", students: [people[83], people[84]] },
    { room_no: "CE-144", students: [people[85], people[86]] },
    { room_no: "CE-145", students: [people[87], people[88]] },
    { room_no: "CE-146", students: [people[89], people[90]] },
    { room_no: "CE-147", students: [people[91], people[92]] },
    { room_no: "CE-148", students: [people[93], people[94]] },
    { room_no: "CE-201", students: [people[0], people[1]] },
    { room_no: "CE-202", students: [people[2], people[3]] },
    { room_no: "CE-203", students: [people[4], people[5]] },
    { room_no: "CE-204", students: [people[6], people[7]] },
    { room_no: "CE-205", students: [people[8], people[9]] },
    { room_no: "CE-206", students: [people[10]] },
    { room_no: "CE-207", students: [people[11], people[12]] },
    { room_no: "CE-208", students: [people[13], people[14]] },
    { room_no: "CE-209", students: [people[15], people[16]] },
    { room_no: "CE-210", students: [people[17], people[18]] },
    { room_no: "CE-211", students: [people[19], people[20]] },
    { room_no: "CE-212", students: [people[21], people[22]] },
    { room_no: "CE-213", students: [people[23], people[24]] },
    { room_no: "CE-214", students: [people[25], people[26]] },
    { room_no: "CE-215", students: [people[27], people[28]] },
    { room_no: "CE-216", students: [people[29], people[30]] },
    { room_no: "CE-217", students: [people[31], people[32]] },
    { room_no: "CE-218", students: [people[33], people[34]] },
    { room_no: "CE-219", students: [people[35], people[36]] },
    { room_no: "CE-220", students: [people[37], people[38]] },
    { room_no: "CE-221", students: [people[39], people[40]] },
    { room_no: "CE-222", students: [people[41], people[42]] },
    { room_no: "CE-223", students: [people[43], people[44]] },
    { room_no: "CE-224", students: [people[45], people[46]] },
    { room_no: "CE-225", students: [people[47], people[48]] },
    { room_no: "CE-226", students: [people[49], people[50]] },
    { room_no: "CE-227", students: [people[51], people[52]] },
    { room_no: "CE-228", students: [people[53], people[54]] },
    { room_no: "CE-229", students: [people[55], people[56]] },
    { room_no: "CE-230", students: [people[57], people[58]] },
    { room_no: "CE-231", students: [people[59], people[60]] },
    { room_no: "CE-332", students: [people[61], people[62]] },
    { room_no: "CE-333", students: [people[63], people[64]] },
    { room_no: "CE-334", students: [people[65], people[66]] },
    { room_no: "CE-335", students: [people[67], people[68]] },
    { room_no: "CE-336", students: [people[69]] },
    { room_no: "CE-337", students: [people[71], people[72]] },
    { room_no: "CE-338", students: [people[73], people[74]] },
    { room_no: "CE-339", students: [people[75], people[76]] },
    { room_no: "CE-340", students: [people[77], people[78]] },
    { room_no: "CE-341", students: [people[79], people[80]] },
    { room_no: "CE-342", students: [people[81], people[82]] },
    { room_no: "CE-343", students: [people[83], people[84]] },
    { room_no: "CE-344", students: [people[85], people[86]] },
    { room_no: "CE-345", students: [people[87], people[88]] },
    { room_no: "CE-346", students: [people[89], people[90]] },
    { room_no: "CE-347", students: [people[91], people[92]] },
    { room_no: "CE-348", students: [people[93], people[94]] },
  ]);
  // console.log(hostel);
  const backendUrl = process.env.REACT_APP_BASE_URL;
  useEffect(() => {
    setSpin(true);
    axios
      .get(`${backendUrl}/api/get_hostel/${hostel}`, { withCredentials: true })
      .then((response) => {
        // console.log("here");
        console.log("here",response.data);
        setRooms(response.data.data);
        // console.log(response.data);
        setHostelDetails(response.data.hostel);
        setSpin(false);
        // setHostelName(response.data.data.hostel_name);
        // handle the response data
      });
    // axios
    //   .get(`${backendUrl}/api/get_hostel_rooms/${currentUser.hostel}`, {
    //     withCredentials: true,
    //   })
    //   .then((response) => {
    //     // handle the response data
    //     console.log(response.data);
    //     setRooms(response.data.data);
    //   })
    //   .catch((error) => {
    //     // handle the error
    //   });
  }, []);


  function HostelRoomDetails() {
    // console.log("hello");
    const [active, setActive] = React.useState(1);

    if (!Array.isArray(rooms) || rooms.length === 0) {
      console.log("No rooms data available");
      return; // or handle this case appropriately
    }

    // Extract the first digit of the room number as the floor number
    const floorNumbers = rooms
      .filter(room => !room.is_for_guests) // Ensure room_no is defined and is a string
      .map(room => parseInt(room.room_no.match(/\d+$/)?.[0] || 0)); // Use optional chaining and fallback to handle cases where room_no might not match the expected format

    if (floorNumbers.length === 0) {
      console.log("No valid room numbers found");
      return; // or handle this case appropriately
    }

    console.log(floorNumbers, "floorNumbers");

    // Find the maximum floor number
    const maxFloorNumber = Math.max(...floorNumbers)/100;
    console.log(maxFloorNumber, "maxFloorNumber");
    const paginationNumbers = Array.from(
      { length: maxFloorNumber },
      (_, i) => i + 1
    );

    console.log(maxFloorNumber, "maxFloorNumber");
    console.log(paginationNumbers, "paginationNumbers");

    const filteredRooms = rooms.filter((room) => {
      const floorNumber = parseInt(room.room_no.match(/\d+$/)[0]);
      console.log("filtered", floorNumber.toString()[0] - "0", active);
      return floorNumber.toString()[0] - "0" === active && !room.is_for_guests;
    });

    const getItemProps = (index) => ({
      variant: active === index ? "filled" : "text",
      color: "gray",
      onClick: () => setActive(index),
    });

    return (
      <div className="bg-gray-200 p-4 overflow-x-auto rounded-md">
        <div className="flex items-center gap-4 mb-2">
          <div className="flex items-center gap-2 mx-auto">
          <span className="font-semibold text-lg">Select Floor</span>
            {paginationNumbers.map((number) => (
              <IconButton key={number} {...getItemProps(number)}>
                {number}
              </IconButton>
            ))}
          </div>
        </div>
        <div className="flex flex-row item-center space-x-1">
          <div className="flex flex-wrap">
            {filteredRooms.map((room, index) => (
              <div key={index} className="w-20 px-0 my-1">
                <HostelRoomCard {...room} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  function InternRoomDetails() {
    // console.log("hello");
    const [active, setActive] = React.useState(1);

    if (!Array.isArray(rooms) || rooms.length === 0) {
      console.log("No rooms data available");
      return; // or handle this case appropriately
    }

    // Extract the first digit of the room number as the floor number
    const floorNumbers = rooms
      .filter(room => room.is_for_guests) // Ensure room_no is defined and is a string
      .map(room => parseInt(room.room_no.match(/\d+$/)?.[0] || 0)); // Use optional chaining and fallback to handle cases where room_no might not match the expected format

    if (floorNumbers.length === 0) {
      console.log("No valid room numbers found");
      return; // or handle this case appropriately
    }

    console.log(floorNumbers, "floorNumbers");

    // Find the maximum floor number
    const maxFloorNumber = Math.max(...floorNumbers)/100;
    console.log(maxFloorNumber, "maxFloorNumber");
    const paginationNumbers = Array.from(
      { length: maxFloorNumber },
      (_, i) => i + 1
    );

    console.log(maxFloorNumber, "maxFloorNumber");
    console.log(paginationNumbers, "paginationNumbers");

    const filteredRooms = rooms.filter((room) => {
      
      const floorNumber = parseInt(room.room_no.match(/\d+$/)[0]);
      console.log("filtered", floorNumber.toString()[0] - "0", active);
      return floorNumber.toString()[0] - "0" === active && room.is_for_guests;
    });

    const getItemProps = (index) => ({
      variant: active === index ? "filled" : "text",
      color: "gray",
      onClick: () => setActive(index),
    });

    return (
      <div className="bg-gray-200 p-4 overflow-x-auto rounded-md">
        <div className="flex items-center gap-4 mb-2">
          <div className="flex items-center gap-2 mx-auto">
          <span className="font-semibold text-lg">Select Floor</span>
            {paginationNumbers.map((number) => (
              <IconButton key={number} {...getItemProps(number)}>
                {number}
              </IconButton>
            ))}
          </div>
        </div>
        <div className="flex flex-row item-center space-x-1">
          <div className="flex flex-wrap">
            {filteredRooms.map((room, index) => (
              <div key={index} className="w-20 px-0 my-1">
                <HostelRoomCard {...room} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const data = [
    {
      label: "Institute Students",
      value: "institute students",
    },
    {
      label: "Interns",
      value: "interns",
    },
  ];

  return loading || spin ? (
    <Spinner />
  ) : (
    !loading && (
      <div className="container mx-auto px-8 m-4">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">
            {hostelDetails.hostel_name} Hostel Rooms
          </h1>
          <p className="text-gray-600 pb-0">
            Here are all the rooms in the hostel along with the number of
            students in each room.
          </p>
        </div>
        <div>
          <Tabs id="custom-animation" value={data[0].value} className="">
            <TabsHeader className="w-full lg:w-96 mx-auto mt-4">
              {data.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  {label}
                </Tab>
              ))}
            </TabsHeader>
            <div className="flex items-center space-x-8 mt-2 -mb-4">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-200 mr-2 border border-black"></div>
                <p className="">Vacant</p>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gray-300 mr-2 border border-black"></div>
                <p className="">Occupied</p>
              </div>
            </div>
            <TabsBody
              animate={{
                initial: { y: 250 },
                mount: { y: 0 },
                unmount: { y: 250 },
              }}
            >
              {data.map(({ value, desc }) => (
                <TabPanel key={value} value={value}>
                  <div className="bg-gray-200 p-4 overflow-x-auto rounded-md">
                    <div className="flex flex-row item-center space-x-1">
                      <div className="flex flex-wrap">
                        {value === "institute students" || !value ? (
                          <HostelRoomDetails />
                        ) : (
                          <InternRoomDetails />
                        )}
                      </div>
                    </div>
                  </div>
                </TabPanel>
              ))}
            </TabsBody>
          </Tabs>
        </div>
      </div>
    )
  );
}
