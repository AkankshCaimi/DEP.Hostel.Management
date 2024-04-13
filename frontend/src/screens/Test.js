import React, { useState, useEffect } from "react";
import { Accordion, AccordionHeader, AccordionBody, Button } from "@material-tailwind/react";
import axios from "axios";
import AllotmentTable from "./Warden/AllotmentTable";
import { NavLink } from "react-router-dom";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

export default function DefaultAccordion() {
  const [open, setOpen] = useState({});
  const backendUrl = process.env.REACT_APP_BASE_URL;
  const [accordions, setAccordions] = useState([]);

  const handleOpen = (id) => {
    setOpen((prevState) => ({
      ...prevState,
      [id]: !prevState[id] // Toggle the open state of the clicked accordion
    }));
  };

  useEffect(() => {
    axios.get(`${backendUrl}/api/get_saved_mappings`, { withCredentials: true })
      .then((res) => {
        const mappedData = res.data.data.map(item => ({
          id: item.pk,
          title: item.pk, // Extract title from the first row of mapping
          tableData: item.fields.mapping, // Extract table data excluding the first row
        }));
        console.log(mappedData);
        setAccordions(mappedData);
        // Initialize open state for all accordions to false
        setOpen(Object.fromEntries(mappedData.map(item => [item.id, false])));
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const handleNew = () => {
    axios.get(`${backendUrl}/api/get_saved_mapping?name=new&gender=Girls`, {withCredentials: true}).then((res) => {
    })
    axios.get(`${backendUrl}/api/get_saved_mapping?name=new&gender=Boys`, { withCredentials: true }).then((res)=>{
      window.location.reload();
    })
  }
  return (
    <div className="mx-24 sm:mx-24">
      {accordions.length===0?
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold mb-6 text-black">No Saved Mappings</h1>
          <p className="text-m text-left text-gray-600 mb-6">
            You have not saved any mappings yet. Please save a mapping to view it here.
          </p>
          <Button to='/warden/sandbox/new' type="gradient" className="mx-4 py-2 mb-5 px-4 bg-color hover:bg-blue-800" onClick={handleNew}>
            Create a New Mapping
          </Button>
        </div>
      :
        accordions.map((accordion) => (
        <Accordion key={accordion.id} open={open[accordion.id] === true} icon={<Icon id={1} open={open[accordion.id]} />}>
          <AccordionHeader onClick={() => handleOpen(accordion.id)}>
            {accordion.title}
          </AccordionHeader>
          <AccordionBody>
            <AllotmentTable data={accordion.tableData} heading={accordion.title}/>
          </AccordionBody>
        </Accordion>
      ))}
    </div>
  );
}
