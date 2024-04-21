import React, { useState, useEffect } from "react";
import { Accordion, AccordionHeader, AccordionBody, Button } from "@material-tailwind/react";
import axios from "axios";
import AllotmentTable from "./AllotmentTable";
import { NavLink } from "react-router-dom";
function transformGender(genderInput) {
  // Convert the input to lowercase
  genderInput = genderInput.toLowerCase();

  // Apply transformations based on conditions
  let genderOutput;
  if (genderInput === "boys" || genderInput === "girls") {
      // Convert first letter capital
      genderOutput = genderInput.charAt(0).toUpperCase() + genderInput.slice(1);
  } else if (genderInput === "male") {
      genderOutput = "Boys";
  } else if (genderInput === "female") {
      genderOutput = "Girls";
  } else if (genderInput === "m") {
      genderOutput = "Boys";
  } else if (genderInput === "f") {
      genderOutput = "Girls";
  }else if(genderInput === "b"){
    genderOutput = "Boys";
  } else if(genderInput === "g"){
    genderOutput = "Girls";
  } else {
      genderOutput = "Unknown";
  }

  return genderOutput;
}

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
  const handleNew = (e) => {
    if(e==1){
      axios.get(`${backendUrl}/api/create_saved_mapping?name=new&gender=Girls`, {withCredentials: true}).then((res) => {
      })
      axios.get(`${backendUrl}/api/create_saved_mapping?name=new&gender=Boys`, { withCredentials: true }).then((res)=>{
        window.location.reload();
      })
    }else{
      const name=prompt("Enter the name of the mapping");
      if(!name){
        return
      }
      var gender=prompt("Enter gender of mapping");
      if(!gender){
        return
      }
      gender=transformGender(gender);
      if(gender!=="Unknown" && name!==null && name!=="")
        axios.get(`${backendUrl}/api/create_saved_mapping?name=${name}&gender=${gender}`, { withCredentials: true }).then((res)=>{
          window.location.reload();
        })
    
    }
  }
  
  return (
    <div className="mx-24 sm:mx-24">
      {accordions.length===0?
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold mb-6 text-black">No Saved Mappings</h1>
          <p className="text-m text-left text-gray-600 mb-6">
            You have not saved any mappings yet. Please save a mapping to view it here.
          </p>
          <Button to='/warden/sandbox/new' type="gradient" className="mx-4 py-2 mb-5 px-4 bg-color hover:bg-blue-800" onClick={()=>handleNew(1)}>
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
      <button className="hover-button relative" onClick={()=>handleNew(2)}>
      +
      <span className="tooltip absolute bg-black text-white text-xs px-2 py-1 rounded-md bottom-full left-1/2 transform -translate-x-1/2 opacity-0 pointer-events-none transition-opacity duration-300">
        Create a new mapping
      </span>
    </button>
    </div>
  );
}
