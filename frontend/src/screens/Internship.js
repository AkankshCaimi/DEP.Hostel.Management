import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import Modal from "react-modal";

Modal.setAppElement("#root");

const Internship = () => {
  const { currentUser } = useAuth();
  const [application, setApplication] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpen2, setModalIsOpen2] = useState(false);
  const [editButton, setEditButton] = useState(false);
  const navigate = useNavigate();
  const backendUrl = process.env.REACT_APP_BASE_URL;
  useEffect(() => {
    // Dummy API call to fetch application status
    const fetchApplicationStatus = async () => {
      try {
        // Replace this with your actual API call to fetch application status
        axios
          .get(`${backendUrl}/api/get_application_status`, {
            withCredentials: true,
          })
          .then((data) => {
            // console.log("Data:", data.data.data, typeof data.data.data.status);
            setApplication(data.data.data);
            if (data.data.data.status.includes("Rejected")) {
              // alert(
              //   `Your application has been ${data.data.data.status}! Edit your application`
              // );
              // navigate("/form", { state: { filled: data.data.data } });
              setEditButton(true);
            }
            // console.log("here:", data.data.data);
          })
          .catch((error) => {
            console.error("Error fetching application status:", error);
            setApplication(null);
          });
      } catch (error) {
        console.error("Error fetching application status:", error);
      }
    };

    currentUser && fetchApplicationStatus();
  }, []);
  // if (application && application.status.includes("Rejected")) {
  //   console.log(application);
  //   alert(
  //     `Your application has been ${application.status}! Edit your application`
  //   );
  //   navigate("/form", { state: { filled: application } });
  // }
  return currentUser ? (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Internship Application</h1>

      {application ? (
        <>
          <table className="w-full mb-4 border border-black">
            <tbody>
              <tr className="border-b border-black">
                <th className="border-r border-black px-2 py-1">ID:</th>
                <td className="px-2 py-1">{application.application_id}</td>
              </tr>
              <tr className="border-b border-black">
                <th className="border-r border-black px-2 py-1">
                  Student Name:
                </th>
                <td className="px-2 py-1">{application.student}</td>
              </tr>
              <tr className="border-b border-black">
                <th className="border-r border-black px-2 py-1">Faculty:</th>
                <td className="px-2 py-1">{application.faculty}</td>
              </tr>
              <tr className="border-b border-black">
              <th className="border-r border-black px-2 py-1">Status:</th>
              <td className="px-2 py-1">
                {application.status}
                {application.status === "Pending Payment Action" && (
                    <>
                      <span>,&nbsp;&nbsp;&nbsp;</span>
                      <button
                        onClick={() => {
                          window.open("https://www.onlinesbi.sbi/sbicollect/icollecthome.htm", "_blank");
                        }}
                        className="text-blue-500 underline hover:text-blue-700"
                      >
                        Pay here
                      </button>
                    </>
                  )}
                {application.status && application.status.includes("Rejected") && " - Edit your application!"}
              </td>
            </tr>
              <tr className="border-b border-black">
                <th className="border-r border-black px-2 py-1">
                  Affiliation:
                </th>
                <td className="px-2 py-1">{application.affiliation}</td>
              </tr>
              <tr className="border-b border-black">
                <th className="border-r border-black px-2 py-1">
                  Arrival Date:
                </th>
                <td className="px-2 py-1">{application.arrival}</td>
              </tr>
              <tr className="border-b border-black">
                <th className="border-r border-black px-2 py-1">
                  Departure Date:
                </th>
                <td className="px-2 py-1">{application.departure}</td>
              </tr>
              <tr className="border-b border-black">
                <th className="border-r border-black px-2 py-1">
                  Institute ID:
                </th>
                <td className="px-2 py-1 hover:cursor-pointer text-blue-500">
                  <span
                    className="underline hover:text-blue-700"
                    onClick={() => {
                      setModalIsOpen(true);
                    }}
                  >
                    View PDF
                  </span>
                </td>
                <Modal
                  isOpen={modalIsOpen}
                  onRequestClose={() => setModalIsOpen(false)}
                  contentLabel="Institute ID"
                >
                  <iframe
                    title="Institute ID"
                    src={`data:application/pdf;base64,${application.instiId}`}
                    width="80%"
                    height="500px"
                  />
                  <button
                    onClick={() => setModalIsOpen(false)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 no-underline mt-2"
                  >
                    Close
                  </button>
                </Modal>
              </tr>
              <tr className="border-b border-black">
                <th className="border-r border-black px-2 py-1">
                  Institute Letter:
                </th>
                <td className="px-2 py-1 hover:cursor-pointer text-blue-500">
                  <span
                    className="underline hover:text-blue-700"
                    onClick={() => {
                      setModalIsOpen2(true);
                    }}
                  >
                    View PDF
                  </span>
                </td>
                <Modal
                  isOpen={modalIsOpen2}
                  onRequestClose={() => setModalIsOpen2(false)}
                  contentLabel="Institute Letter"
                >
                  <iframe
                    title="Institute Letter"
                    src={`data:application/pdf;base64,${application.letter}`}
                    width="80%"
                    height="500px"
                  />
                  <button
                    onClick={() => setModalIsOpen2(false)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 no-underline mt-2"
                  >
                    Close
                  </button>
                </Modal>
              </tr>
            </tbody>
          </table>
          {editButton && (
            <NavLink
              to="/form"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 no-underline"
              state={{ filled: application }}
            >
              Edit Application
            </NavLink>
          )}
        </>
      ) : (
        <>
          <p>No submitted applications!</p>
          <NavLink
            to="/form"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 no-underline"
            // state={{ filled: application }}
          >
            Submit an Application
          </NavLink>
        </>
      )}
    </div>
  ) : (
    <>
      <p className="text-m text-left text-gray-600 mb-6">
        You are not authorized to view this page. Please login to continue.
      </p>
    </>
  );
};

export default Internship;
