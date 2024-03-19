import { Card, Typography } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import "../styles/tailwind.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";

Modal.setAppElement("#root");
export default function TableWithStripedColumns() {
  const backendUrl = process.env.REACT_APP_BASE_URL;
  const [formData, setFormData] = useState({
    student: "Devanshu Dhawan",
    application_id: "23",
    affiliation: "ITI Ropar",
    faculty: "Dr. Puneet Goyal",
    status: "Loading...",
    address: "Ropar, Punjab",
    arrival: "2024-03-04",
    departure: "2024-03-15",
    instiId: "institute-id.pdf",
    letter: "institute-letter.pdf",
  });
  const [application, setApplication] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpen2, setModalIsOpen2] = useState(false);
  const { id } = useParams();
  const variableClassName = (idx) =>
    idx <= 7 ? "border-b" : "border-b hover:cursor-pointer";
  console.log("Application ID:", id);
  // Hardcoded field names
  const fieldNames = [
    "Student Name",
    "Application ID",
    "Affiliation",
    "Faculty",
    "Status",
    "Address",
    "Arrival Date",
    "Departure Date",
    "Institute ID",
    "Institute Letter",
  ];
  useEffect(() => {
    // Fetch application data from backend using the application ID
    axios
      .get(`${backendUrl}/api/get_application/${id}`, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setApplication({
          instiId: res.data.data.instiId,
          letter: res.data.data.letter,
        });
        const newObj = { ...res.data.data };
        newObj.instiId = "View PDF";
        newObj.letter = "View PDF";
        setFormData(newObj);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex flex-column justify-center items-center mb-5 w-full">
      <h1 className="text-3xl font-bold my-4">Application Status</h1>
      <Card className="max-w-screen-2xl lg:w-full ">
        <table className="lg:w-full min-w-max table-auto text-left border-4 border-gray-800">
          <tbody>
            {fieldNames.map((fieldName, index) => {
              const isLast = index === fieldNames.length - 1;
              const classes = isLast
                ? "p-4 border border-blue-gray-50"
                : "p-4 border border-blue-gray-50";

              // Access the corresponding value from formData based on fieldName
              const value =
                formData[fieldName.toLowerCase().replaceAll(" ", "_")];

              return (
                <tr key={fieldName}>
                  <td className={classes}>
                    <Typography
                      variant="medium"
                      color="blue-gray"
                      className="font-bold"
                    >
                      {fieldName}
                    </Typography>
                  </td>
                  {/* Render the corresponding value from formData */}
                  <td className={classes}>
                    <Typography
                      variant="medium"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {fieldName === "Institute ID" ? (
                        <>
                          <button
                            onClick={() => {
                              setModalIsOpen(true);
                            }}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline text-blue-500 hover:text-blue-800"
                          >
                            View PDF
                          </button>
                          <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={() => setModalIsOpen(false)}
                            contentLabel="Institute ID"
                            className="h-full flex flex-col justify-center items-center bg-transparent"
                          >
                            <div className="hidden md:block">
                              <iframe
                                title="Institute Letter"
                                src={`data:application/pdf;base64,${value}`}
                                width="80%"
                                height="80%"
                              />
                            </div>
                            <div className="md:hidden">
                              <a
                                href={`data:application/pdf;base64,${value}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline text-blue-500 hover:text-blue-800"
                              >
                                Open in New Tab
                              </a>
                            </div>
                            <button
                              onClick={() => setModalIsOpen(false)}
                              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 my-4"
                            >
                              Close
                            </button>
                          </Modal>
                        </>
                      ) : fieldName === "Institute Letter" ? (
                        <>
                          <button
                            onClick={() => {
                              setModalIsOpen2(true);
                            }}
                            target="_blank"
                            rel="noopener noreferrer "
                            className="underline text-blue-500 hover:text-blue-800"
                          >
                            View PDF
                          </button>
                          <Modal
                            isOpen={modalIsOpen2}
                            onRequestClose={() => setModalIsOpen2(false)}
                            contentLabel="Institute Letter"
                            className="h-full flex flex-col justify-center items-center bg-transparent"
                          >
                            <div className="hidden md:block">
                              <iframe
                                title="Institute Letter"
                                src={`data:application/pdf;base64,${value}`}
                                width="80%"
                                height="80%"
                              />
                            </div>
                            <div className="md:hidden">
                              <a
                                href={`data:application/pdf;base64,${value}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline text-blue-500 hover:text-blue-800"
                              >
                                Open in New Tab
                              </a>
                            </div>
                            <button
                              onClick={() => setModalIsOpen2(false)}
                              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
                            >
                              Close
                            </button>
                          </Modal>
                        </>
                      ) : (
                        value // Render normal value if not PDF
                      )}
                    </Typography>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
