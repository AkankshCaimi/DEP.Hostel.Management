import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/tailwind.css';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
function Card({ children }) {
  return (
    <div className="border border-black rounded-md p-1">
      {children}
    </div>
  );
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
  'Aarav Patel', 'Aditya Sharma', 'Arjun Gupta', 'Devanand Singh', 'Hrithik Kumar',
  'Jayesh Desai', 'Karthik Reddy', 'Krish Sharma', 'Neel Mehta', 'Nirav Shah',
  'Pranav Choudhury', 'Rajat Verma', 'Rohan Malhotra', 'Sahil Thakur', 'Siddharth Joshi',
  'Suraj Mishra', 'Tarun Bhatia', 'Utkarsh Singhania', 'Varun Saxena', 'Vicky Rana',
  'Vivek Patel', 'Yash Dubey', 'Zaid Khan', 'Akash Varma', 'Rohit Singh', 'Virat Kapoor'
];

function HostelRoomCard({ roomNumber, occupants }) {
  // const navigate= useNavigate();
  function handleClick() {
    console.log('Room number here:', roomNumber);
    // navigate(`/room-details/${parseInt(roomNumber)}`);
    // navigate('')
  }
  const backgroundColorClass =
    occupants.length === 2 ? "bg-gray-300" : "bg-green-200";
  const backgroundColorClass2 =
    occupants.length === 2 ? "hover:bg-gray-400" : "hover:bg-green-300";
  return (
    <Link to={`../room-details/CE-${roomNumber}`} className="no-underline text-black">
    <div className={`${backgroundColorClass} rounded-md w-12 h-17 flex items-center justify-center mr-1 hover:cursor-pointer ${backgroundColorClass2}`} onClick={handleClick}>
      <Card>
        <CardHeader>
          <CardTitle>CE-{roomNumber}</CardTitle>
        </CardHeader>
        <CardFooter>
        <div className="flex items-center space-x-1">
            <GroupIcon className="h-3 w-3 text-gray-700" />
            <p className="h-1 w-2 pt-0.5 text-xs text-gray-700">{occupants.length}</p>
          </div>
        </CardFooter>
      </Card>
    </div>
      </Link>
  );
}

export default function HostelRooms() {
  const rooms = [
    { roomNumber: '101', occupants: [people[0], people[1]] },
    { roomNumber: '102', occupants: [people[2], people[3]] },
    { roomNumber: '103', occupants: [people[4], people[5]] },
    { roomNumber: '104', occupants: [people[6], people[7]] },
    { roomNumber: '105', occupants: [people[8], people[9]] },
    { roomNumber: '106', occupants: [people[10]] },
    { roomNumber: '107', occupants: [people[11], people[12]] },
    { roomNumber: '108', occupants: [people[13], people[14]] },
    { roomNumber: '109', occupants: [people[15], people[16]] },
    { roomNumber: '110', occupants: [people[17], people[18]] },
    { roomNumber: '111', occupants: [people[19], people[20]] },
    { roomNumber: '112', occupants: [people[21], people[22]] },
    { roomNumber: '113', occupants: [people[23], people[24]] },
    { roomNumber: '114', occupants: [people[25], people[26]] },
    { roomNumber: '115', occupants: [people[27], people[28]] },
    { roomNumber: '116', occupants: [people[29], people[30]] },
    { roomNumber: '117', occupants: [people[31], people[32]] },
    { roomNumber: '118', occupants: [people[33], people[34]] },
    { roomNumber: '119', occupants: [people[35], people[36]] },
    { roomNumber: '120', occupants: [people[37], people[38]] },
    { roomNumber: '121', occupants: [people[39], people[40]] },
    { roomNumber: '122', occupants: [people[41], people[42]] },
    { roomNumber: '123', occupants: [people[43], people[44]] },
    { roomNumber: '124', occupants: [people[45], people[46]] },
    { roomNumber: '125', occupants: [people[47], people[48]] },
    { roomNumber: '126', occupants: [people[49], people[50]] },
    { roomNumber: '127', occupants: [people[51], people[52]] },
    { roomNumber: '128', occupants: [people[53], people[54]] },
    { roomNumber: '129', occupants: [people[55], people[56]] },
    { roomNumber: '130', occupants: [people[57], people[58]] },
    { roomNumber: '131', occupants: [people[59], people[60]] },
    { roomNumber: '132', occupants: [people[61], people[62]] },
    { roomNumber: '133', occupants: [people[63], people[64]] },
    { roomNumber: '134', occupants: [people[65], people[66]] },
    { roomNumber: '135', occupants: [people[67], people[68]] },
    { roomNumber: '136', occupants: [people[69]] },
    { roomNumber: '137', occupants: [people[71], people[72]] },
    { roomNumber: '138', occupants: [people[73], people[74]] },
    { roomNumber: '139', occupants: [people[75], people[76]] },
    { roomNumber: '140', occupants: [people[77], people[78]] },
    { roomNumber: '141', occupants: [people[79], people[80]] },
    { roomNumber: '142', occupants: [people[81], people[82]] },
    { roomNumber: '143', occupants: [people[83], people[84]] },
    { roomNumber: '144', occupants: [people[85], people[86]] },
    { roomNumber: '145', occupants: [people[87], people[88]] },
    { roomNumber: '146', occupants: [people[89], people[90]] },
    { roomNumber: '147', occupants: [people[91], people[92]] },
    { roomNumber: '148', occupants: [people[93], people[94]] },
  ];

  return (
    <div className="container mx-auto px-8 m-4">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Hostel Rooms</h1>
        <p className="text-gray-500 pb-0">
          Here are all the rooms in the hostel along with the number of occupants in each room.
        </p>
        <div className="flex items-center space-x-8">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-200 mr-2 border border-black"></div>
            <p className='mt-3'>Vacant</p>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-300 mr-2 border border-black"></div>
            <p className='mt-3'>Occupied</p>
          </div>
        </div>
      </div>
      <div className='bg-gray-200 p-4 overflow-x-auto rounded-md' >
        {/* Hostel room display */}
        <div className="flex flex-row space-x-1">
          <div className="flex">
            {rooms.slice(0, 24).map((room, index) => (
              <HostelRoomCard key={index} {...room} />
            ))}
          </div>
        </div>
        <div className="flex flex-row space-x-1 mt-2">
          <div className="flex">
            {rooms.slice(24).reverse().map((room, index) => (
              <HostelRoomCard key={index + 24} {...room} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
