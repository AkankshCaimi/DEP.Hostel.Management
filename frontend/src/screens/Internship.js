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
  const [paymentProof, setPaymentProof] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [uploadButtonDisabled, setUploadButtonDisabled] = useState(true);
  const navigate = useNavigate();
  const backendUrl = process.env.REACT_APP_BASE_URL;
  // console.log(currentUser);
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
            if(!data || !data.data){
              setApplication(null);
            }else{
              setApplication(data.data.data);
              // console.log(data.data.data);
              if (data.data.data.status.includes("Rejected")) {
                setEditButton(true);
              }
            }
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

  // Handle upload button enable/disable based on form fields
  useEffect(() => {
    // Enable/disable upload button based on form fields
    if (application && application.status === "Pending Payment") {
      setUploadButtonDisabled(!(paymentProof && transactionId));
    }
  }, [application, paymentProof, transactionId]);


  // Handle change in payment proof input
  const handlePaymentProofChange = (event) => {
    setPaymentProof(event.target.files[0]);
  };

  // Handle change in transaction ID input
  const handleTransactionIdChange = (event) => {
    setTransactionId(event.target.value);
  };

  // Handle upload button click
  const handleUpload = () => {
    const data= new FormData();
    data.append('payment_proof', paymentProof);
    data.append('payment_id', transactionId);
    data.append('application_id', application.application_id);
    axios.post(`${backendUrl}/api/update_payment`, data, {withCredentials: true})
    .then((response) => {
    // Implement upload functionality here
    // Example: Make API call to upload payment proof and transaction ID
    console.log(response);
    alert("Payment proof and transaction ID uploaded successfully!");
    // navigate("/internship");
  })
  };

  return currentUser ? (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Internship Application</h1>

      {application&& application.status === "Pending Payment" && (
        <div>
          <span className="text-red-500">*</span> Required fields
        </div>
      )}

      {application ? (
        <>
          <table className="w-full mb-4 border border-black">
            <tbody>
              <tr className="border-b border-black">
                <th className="border-r border-black px-2 py-1">ID:</th>
                <td className="px-2 py-1">{application.application_id}</td>
              </tr>
              <tr className="border-b border-black">
                <th className="border-r border-black px-2 py-1">Student Name:</th>
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
                  {application.status && application.status.includes("Rejected") && " - Edit your application!"}
                </td>
              </tr>
              <tr className="border-b border-black">
                <th className="border-r border-black px-2 py-1">Affiliation:</th>
                <td className="px-2 py-1">{application.affiliation}</td>
              </tr>
              <tr className="border-b border-black">
                <th className="border-r border-black px-2 py-1">Arrival Date:</th>
                <td className="px-2 py-1">{application.arrival}</td>
              </tr>
              <tr className="border-b border-black">
                <th className="border-r border-black px-2 py-1">Departure Date:</th>
                <td className="px-2 py-1">{application.departure}</td>
              </tr>
              <tr className="border-b border-black">
                <th className="border-r border-black px-2 py-1">Institute ID:</th>
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
                  className="h-full flex flex-col justify-center items-center bg-transparent"
                >
                  <iframe
                    title="Institute ID"
                    src={`data:application/pdf;base64,${application.instiId}`}
                    width="80%"
                    height="500px"
                  />
                  <div className="md:hidden">
                    <a
                      href={`data:application/pdf;base64,${application.instiId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-blue-500 hover:text-blue-800"
                    >
                      Open in New Tab
                    </a>
                  </div>
                  <button
                    onClick={() => setModalIsOpen(false)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 no-underline mt-2"
                  >
                    Close
                  </button>
                </Modal>
              </tr>
              <tr className="border-b border-black">
                <th className="border-r border-black px-2 py-1">Institute Letter:</th>
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
                  className="h-full flex flex-col justify-center items-center bg-transparent"
                >
                  <iframe
                    title="Institute Letter"
                    src={`data:application/pdf;base64,${application.letter}`}
                    width="80%"
                    height="80%"
                  />
                  <div className="md:hidden">
                    <a
                      href={`data:application/pdf;base64,${application.letter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-blue-500 hover:text-blue-800"
                    >
                      Open in New Tab
                    </a>
                  </div>
                  <button
                    onClick={() => setModalIsOpen2(false)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 no-underline mt-2"
                  >
                    Close
                  </button>
                </Modal>
              </tr>
              {/* Add conditional rendering for Payment Proof and Transaction ID */}
              {application.status === "Pending Payment" && (
                <>
                  <tr className="border-b border-black">
                    <th className="border-r border-black px-2 py-1">
                      <span className="text-red-500">*</span> Upload Payment Proof:
                    </th>
                    <td className="px-2 py-1">
                      <input
                        type="file"
                        accept=".pdf"
                        className=""
                        onChange={handlePaymentProofChange} // Add onChange handler
                      />
                    </td>
                  </tr>
                  <tr className="border-b border-black">
                    <th className="border-r border-black px-2 py-1">
                      <span className="text-red-500">*</span> Transaction ID:
                    </th>
                    <td className="px-2 py-1">
                      <input
                        type="text"
                        className="bg-white border border-black p-1"
                        onChange={handleTransactionIdChange} // Add onChange handler
                      />
                    </td>
                  </tr>
                </>
              )}

            </tbody>

          </table>
          {application.status === "Pending Payment" && (
        <div> 
          <span className="text-gray-600">Fill the required fields to update the information</span>
        </div>
      )}

          {application.status === "Pending Payment" && (
            <div className="flex justify-center"> {/* Center the button */}
              <button
                className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none ${uploadButtonDisabled ? 'cursor-not-allowed opacity-50' : 'hover:cursor-pointer'}`}
                onClick={handleUpload} // Add onClick handler
                disabled={uploadButtonDisabled} // Disable button when necessary
              >
                Update
              </button>
            </div>
          )}

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
          <p className="pb-4">No submitted applications!</p>
          <NavLink
            to="/form"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 no-underline"
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
