import React, { useMemo } from "react";
import "../../styles/tailwind.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/authContext";
function AdminDashboard() {
  const { currentUser } = useAuth();
  // console.log(currentUser)
  const [hostels, setHostels] = React.useState([
    { Chenab: 0 },
    { Beas: 1 },
    { Satluj: 2 },
    { Brahmaputra: 3 },
  ]);
  const backendUrl = process.env.REACT_APP_BASE_URL;
  const isChief = useMemo(() => {
    if (!currentUser) {
      return undefined; // Or any other default value you prefer
    }
    if (!currentUser.roles) {
      return false;
    }
    console.log(currentUser);
    if (currentUser.roles.includes("chief warden")) return true;
    else {
      setHostels([{ [currentUser.hostel_name]: currentUser.hostel }]);
      return false;
    }
  }, [currentUser]);
  React.useEffect(() => {
    if (isChief){
      axios
        .get(`${backendUrl}/api/get_hostels`, { withCredentials: true })
        .then((response) => {
          console.log('here',response.data);
          const temp = response.data.data;
          const tempArr = [];
          for (const key in temp) {
            // console.log(key, temp[key]);
            tempArr.push({[temp[key]["hostel_name"]]: temp[key]["hostel_no"]});
          }
          setHostels(tempArr);
        });
    }
  }, [isChief]);
  return (
    <>
      <div className="min-h-40 flex items-center justify-center -mb-1">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-6 text-black">
            {isChief && <span>Chief</span>} Warden Dashboard
          </h1>
          <p className="text-xl text-left flex flex-center text-gray-700 mb-6 px-4 justify-center lg:justify-start">
            Welcome to the {isChief && <span>Chief</span>} Warden dashboard.
            Please select an option below to get started.
          </p>
        </div>
      </div>
      <div className="flex flex-row justify-around px-4 pb-8">
        <div className="flex flex-col items-start space-y-4 px-4 pb-8">
          {isChief && (<Link
            to="allotments"
            className="no-underline  bg-color hover:bg-blue-800 text-white font-medium py-2 px-4 rounded w-full lg:w-72 lg:ml-10"
          >
            Allocation Students
          </Link>)}
          <Link
            to="complaint-status"
            className="no-underline  bg-color hover:bg-blue-800 text-white font-MEDIUM py-2 px-4 rounded w-full lg:w-72 lg:ml-10"
          >
            Complaint Status
          </Link>
        </div>
        <div className="flex flex-col items-start space-y-4 px-4 pb-8">
          {hostels &&
            hostels.map((hostelObj, idx) => {
              console.log(hostelObj);
              const hostelName = Object.keys(hostelObj)[0]; // Extract hostel name from object
              const linkTo = `hostel-view/${hostelObj[hostelName]}`; // Use room count as part of link

              return (
                <Link
                  to={linkTo}
                  className="no-underline bg-color hover:bg-blue-800 text-white font-medium py-2 px-4 rounded w-full lg:w-72 lg:ml-10"
                >
                  {hostelName} Rooms
                </Link>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
