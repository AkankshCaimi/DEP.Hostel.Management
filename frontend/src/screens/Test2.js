import React from "react";
<<<<<<< HEAD
const data = {
  '2021b': {'Chenab': 3},
  '2020b': {'Chenab': 1, 'Beas': 1},
  '2019b': {'Beas': 5}
};

const RiverMatrixTable = () => {
  // Extract years and rivers from the data
  const years = Object.keys(data);
  const rivers = Array.from(new Set(years.flatMap(year => Object.keys(data[year]))));

  // Construct the matrix data
  const matrixData = years.map(year => {
    const rowData = rivers.map(river => data[year][river] || 0);
    return { year, rowData };
  });
  return (
    <div style={{ overflowX: 'auto', margin: '20px' }}>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2', textAlign: 'center' }}>Year</th>
            {rivers.map(river => (
              <th key={river} style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2', textAlign: 'center' }}>{river}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {matrixData.map(({ year, rowData }) => (
            <tr key={year}>
              <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{year}</td>
              {rowData.map((value, index) => (
                <td key={index} style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RiverMatrixTable;
=======
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
 
export function DefaultAccordion() {
  const [open, setOpen] = React.useState(1);
 
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
 
  return (
    <>
      <Accordion open={open === 1}>
        <AccordionHeader onClick={() => handleOpen(1)}>What is Material Tailwind?</AccordionHeader>
        <AccordionBody>
          We&apos;re not always in the position that we want to be at. We&apos;re constantly
          growing. We&apos;re constantly making mistakes. We&apos;re constantly trying to express
          ourselves and actualize our dreams.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2}>
        <AccordionHeader onClick={() => handleOpen(2)}>
          How to use Material Tailwind?
        </AccordionHeader>
        <AccordionBody>
          We&apos;re not always in the position that we want to be at. We&apos;re constantly
          growing. We&apos;re constantly making mistakes. We&apos;re constantly trying to express
          ourselves and actualize our dreams.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 3}>
        <AccordionHeader onClick={() => handleOpen(3)}>
          What can I do with Material Tailwind?
        </AccordionHeader>
        <AccordionBody>
          We&apos;re not always in the position that we want to be at. We&apos;re constantly
          growing. We&apos;re constantly making mistakes. We&apos;re constantly trying to express
          ourselves and actualize our dreams.
        </AccordionBody>
      </Accordion>
    </>
  );
}
>>>>>>> 8b6a8acee47ea0d7f5458e5e54a357ec1b9f3467
