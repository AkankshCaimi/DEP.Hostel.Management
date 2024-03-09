import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
 
export default function DefaultAccordion() {
  const [open, setOpen] = React.useState(1);
 
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
 
  return (
    <div className="m-4">
      <Accordion open={open === 1} >
        <AccordionHeader onClick={() => handleOpen(1)}>Welcome Note</AccordionHeader>
        <AccordionBody>
        Welcome to our Hostel! Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2}>
        <AccordionHeader onClick={() => handleOpen(2)}>
          Our Mission
        </AccordionHeader>
        <AccordionBody>
        Our mission is to provide a comfortable and friendly environment for students and travelers.
        We strive to create a home away from home, where everyone can focus on their studies, work, or simply enjoy their stay.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 3}>
        <AccordionHeader onClick={() => handleOpen(3)}>
          Contact Us
        </AccordionHeader>
        <AccordionBody>
        Feel free to explore our website for more information about our facilities and services.
        If you have any questions or inquiries, don't hesitate to contact us.
        </AccordionBody>
      </Accordion>
    </div>
  );
}