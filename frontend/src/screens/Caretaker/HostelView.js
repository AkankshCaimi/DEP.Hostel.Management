import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/tailwind.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
function Card({ children }) {
  return <div className="border border-black rounded-md p-1">{children}</div>;
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

function HostelRoomCard({ room_no, students }) {
  // const navigate= useNavigate();
  function handleClick() {
    console.log("Room number here:", room_no);
    // navigate(`/room-details/${parseInt(room_no)}`);
    // navigate('')
  }
  const backgroundColorClass =
    students.length === 2 ? "bg-gray-300" : "bg-green-200";
  const backgroundColorClass2 =
    students.length === 2 ? "hover:bg-gray-400" : "hover:bg-green-300";
  return (
    <Link to={`../room-details/${room_no}`} className="no-underline text-black py-1">
      <div
        className={`${backgroundColorClass} rounded-md w-12 h-17 flex items-center justify-center mr-1 hover:cursor-pointer ${backgroundColorClass2}`}
        onClick={handleClick}
      >
        <Card>
          <CardHeader>
            <CardTitle>{room_no}</CardTitle>
          </CardHeader>
          <CardFooter>
            <div className="flex items-center space-x-1">
              <GroupIcon className="h-3 w-3 text-gray-700" />
              <p className="h-1 w-2 pt-0.5 text-xs text-gray-700">
                {students.length}
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
  const { currentUser } = useAuth();
  // console.log(hostel);
  const backendUrl = process.env.REACT_APP_BASE_URL;
  useEffect(() => {
    axios
      .get(`${backendUrl}/api/get_hostel_rooms/${currentUser.hostel}`, {
        withCredentials: true,
      })
      .then((response) => {
        // handle the response data
        console.log(response.data);
        setRooms(response.data.data);
      })
      .catch((error) => {
        // handle the error
      });
  }, []);
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
  ]);

  return (
    <div className="container mx-auto px-8 m-4">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">
          {currentUser.hostel_name} Hostel Rooms
        </h1>
        <p className="text-gray-500 pb-0">
          Here are all the rooms in the hostel along with the number of students
          in each room.
        </p>
        <div className="flex items-center space-x-8">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-200 mr-2 border border-black"></div>
            <p className="mt-3">Vacant</p>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-300 mr-2 border border-black"></div>
            <p className="mt-3">Occupied</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-200 p-4 overflow-x-auto rounded-md">
        {/* Hostel room display */}
        {/* <div className="flex flex-row space-x-1">
          <div className="flex">
            {rooms.slice(0, 24).map((room, index) => (
              <HostelRoomCard key={index} {...room} />
            ))}
          </div>
        </div> */}
        <div className="flex flex-row space-x-1">
          <div className="flex flex-wrap">
            {rooms.reverse().map((room, index) => (
              <HostelRoomCard key={index} {...room} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
