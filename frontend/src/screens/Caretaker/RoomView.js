import React from 'react';
import '../../styles/tailwind.css';

function Card({ children }) {
  return (
    <div className="border border-gray-300 rounded-md p-4 pb-1">
      {children}
    </div>
  );
}

function CardHeader({ children }) {
  return <div className="mb-4">{children}</div>;
}

function CardTitle({ children }) {
  return <h2 className="text-xl font-bold">{children}</h2>;
}

function CardContent({ children }) {
  return <div className="h-16">{children}</div>;
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

// Define 20 people
const people = [
  'John Smith',
  'Jane Johnson',
  'Alice Brown',
  'Bob Lee',
  'Charlie Wilson',
  'Emma Anderson',
  'Ethan Taylor',
  'Olivia Clark',
  'William Martinez',
  'Sophia Lewis',
  'Michael White',
  'Emily Harris',
  'Daniel King',
  'Isabella Wright',
  'Matthew Lopez',
  'Mia Hill',
  'David Scott',
  'Ava Green',
  'James Adams',
  'Sophie Baker'
];

function HostelRoomCard({ roomNumber, roomType, occupants }) {
  const backgroundColorClass =
    occupants.length === 2 ? "bg-red-100" : "bg-green-100";
  return (
    <div className={`${backgroundColorClass} border border-gray-300 rounded-md`}>
    <Card className={`grid gap-4 p-0`}>
      <CardHeader className="pb-0">
        <CardTitle className="text-2xl">CE-{roomNumber}</CardTitle>
        <CardTitle className="text-sm font-normal leading-none">{roomType}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center space-x-4 ">
        {occupants.map((occupant, index) => (
          <div className="flex items-center space-x-2" key={index}>
            <div className="space-y-0 leading-tight">
              <p className="text-sm text-gray-700 dark:text-gray-400">{`- `+occupant}</p>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <GroupIcon className="h-4 w-4 text-gray-700 dark:text-gray-400" />
          <p className="pt-3 text-sm text-gray-700 dark:text-gray-400">{occupants.length} Occupants</p>
        </div>
      </CardFooter>
    </Card>
    </div>
  );
}

export default function HostelRooms() {
  // Define rooms and occupants
  const rooms = [
    { roomNumber: '101', occupants: [people[0]] },
    { roomNumber: '102', occupants: [people[1], people[2]] },
    { roomNumber: '103', occupants: [] },
    { roomNumber: '104', occupants: [people[3]] },
    { roomNumber: '105', occupants: [] },
    { roomNumber: '106', occupants: [people[4], people[5]] },
    { roomNumber: '107', occupants: [] },
    { roomNumber: '108', occupants: [people[6]] },
    { roomNumber: '109', occupants: [people[7]] },
    { roomNumber: '110', occupants: [] },
    { roomNumber: '111', occupants: [people[8], people[9]] },
    { roomNumber: '112', occupants: [] },
    { roomNumber: '113', occupants: [] },
    { roomNumber: '114', occupants: [people[10]] },
    { roomNumber: '115', occupants: [] }
  ];

  return (
    <div className="container mx-auto px-8 m-4">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Hostel Rooms</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Here are all the rooms in the hostel along with the number of occupants in each room.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start">
        {rooms.map((room, index) => (
          <HostelRoomCard key={index} roomType="Double Room" {...room} />
        ))}
      </div>
    </div>
  );
}
