import axios from 'axios';
import { Button,  Dialog, Card, CardBody, Typography, Input, CardFooter, Select, Option} from "@material-tailwind/react";
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
const extractHostel=(id)=>{
  const acronym= id.split('-')[0]
  const mapping={
    'CE': 'Chenab',
    'CW': 'Chenab',
    'BE': 'Beas',
    'BW': 'Beas',
    'SE': 'Sutlej',
    'SW': 'Sutlej',
    'BG': 'Brahmaputra',
    'BB': 'Brahmaputra',
    'TG': 'T6',
    'TB': 'T6',
    'RE': 'Ravi',
    'RW': 'Ravi',
    'RC': 'Ravi',
  }
  return mapping[acronym]
}
const RoomDetails = () => {
  const { id } = useParams();
  const backendUrl = process.env.REACT_APP_BASE_URL;
  const [room, setRoom] = useState({});
  const [open, setOpen] = useState(false);
  const [applications, setApplications] = useState([]);
  const [option, setOption] = useState(null);
  const [isGuest, setIsGuest] = useState(false);
  const [currentOccupancy, setCurrentOccupancy] = useState(null);
  const [totalOccupancy, setTotalOccupancy] = useState(null);
  const openDialog = () => {
    if (!open) {
      axios
        .get(`${backendUrl}/api/view_final_applications`, { withCredentials: true })
        .then((res) => {
          console.log("here:", res.data.data.own);
          const temp = res.data.data.own.filter(app => app.status !== "Room Allotted");
          setApplications(temp);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
    setOpen(!open);
  };

  const allotRoom = () => {
    console.log(option);
    axios
      .get(`${backendUrl}/api/allot_room?application_id=${option}&room_id=${id}`, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        alert('Room Allotted Successfully');
        window.location.reload();
      });
  };

  useEffect(() => {
    axios.get(`${backendUrl}/api/rooms/${id}`, { withCredentials: true }).then((res) => {
      console.log(res.data);
      if (res.data.data.length == 0) {
        setRoom(null);
        return;
      }
      console.log('here');
      setIsGuest(res.data.guest);
      setCurrentOccupancy(res.data.current_occupancy)
      setTotalOccupancy(res.data.room_occupancy)
      setRoom({
        roomNumber: id,
        students: res.data.data.map((student) => ({
          name: student.name,
          email: student.email,
          phone: student.phone,
          arrival: student.arrival,
          departure: student.departure
        })),
      });
    });
  }, [id]);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">{extractHostel(id)}</h1>
      <h1 className="text-2xl font-bold mb-4">Room Information</h1>
      {room && room.students && room.students.length > 0 ? (
        <table className="min-w-full mb-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border border-black">Room Number</th>
              <th className="py-2 px-4 border border-black">Person Name</th>
              <th className="py-2 px-4 border border-black">Email</th>
              {isGuest && (<><th className="py-2 px-4 border border-black">Phone</th>
              <th className="py-2 px-4 border border-black">Arrival</th>
              <th className="py-2 px-4 border border-black">Departure</th></>)}

            </tr>
          </thead>
          <tbody>
            {room.students.map((student, index) => (
              <tr className="border-b" key={index}>
                <td className="py-2 px-4 border border-black">{room.roomNumber}</td>
                <td className="py-2 px-4 border border-black">{student.name}</td>
                <td className="py-2 px-4 border border-black">{student.email}</td>
                {isGuest && (<><td className="py-2 px-4 border border-black">{student.phone}</td>
                <td className="py-2 px-4 border border-black">{student.arrival}</td>
                <td className="py-2 px-4 border border-black">{student.departure}</td></>)}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="container mx-auto mt-8 mb-3 flex flex-col">
          <h1 className="text-2xl font-bold mb-4">Room Information</h1>
          <h2 className="text-xl">No Info Available</h2>
        </div>
      )}
      {isGuest && currentOccupancy<totalOccupancy && 
      <>
      <Button className="bg-blue-500 hover:bg-blue-700 text-white mt-4 font-bold py-2 px-4 mb-4 rounded w-25" onClick={openDialog}>
        Allot This Room
      </Button>
      <Dialog
        size="xs"
        open={open}
        handler={openDialog}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Select Application
            </Typography>
            <Typography className="-mb-1 -mt-5" variant="h6">
              Applications
            </Typography>
            <Select label="Select Application id" size="lg" onChange={(e) => setOption(e)}>
              {applications.map((app) => (
                <Option value={app.application_id.toString()} key={app.application_id}>
                  {app.student}
                </Option>
              ))}
            </Select>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth onClick={allotRoom}>
              Select
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
      </>
      }
    </div>
  );
};

export default RoomDetails;
