import React from 'react';

const RoomDeatils = () => {
  // Sample data for room information
  const room = {
    roomNumber: 'CE-101',
    person1: {
      name: 'Aarav Patel',
      email: 'aaravpatel@gmail.com',
      phone: '123-456-7890'
    },
    person2: {
      name: 'adityasharma',
      email: 'adityasharma@gmail.com',
      phone: '987-654-3210'
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Room Information</h1>
      <table className="min-w-full mb-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border border-black">Room Number</th>
            <th className="py-2 px-4 border border-black">Person Name</th>
            <th className="py-2 px-4 border border-black">Email</th>
            <th className="py-2 px-4 border border-black">Phone</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="py-2 px-4 border border-black">{room.roomNumber}</td>
            <td className="py-2 px-4 border border-black">{room.person1.name}</td>
            <td className="py-2 px-4 border border-black">{room.person1.email}</td>
            <td className="py-2 px-4 border border-black">{room.person1.phone}</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 px-4 border border-black"></td>
            <td className="py-2 px-4 border border-black">{room.person2.name}</td>
            <td className="py-2 px-4 border border-black">{room.person2.email}</td>
            <td className="py-2 px-4 border border-black">{room.person2.phone}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RoomDeatils;
