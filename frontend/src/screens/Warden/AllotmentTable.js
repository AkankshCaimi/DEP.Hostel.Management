import { Card, Typography, Button } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Spinner } from "@material-tailwind/react";
// const TABLE_HEAD = {"Batches":{}, "Sutlej":{"Wings":['East','West']}, "Beas":{"Wings":['East','West']}, "Chenab":{"Wings":['East','West']}, "Ravi":{"Wings":['East','Central','West']}, "Brahmaputra":{"Wings":['North','South']}, "T6":{"Wings":['B1','B2']}};
//  console.log(TABLE_HEAD["Sutlej"].Wings["length"]);
// const TABLE_ROWS = [
//   {
//     name: "BTech 20",
//     SE: 100,
//     SW: 100,
//     BE: 100,
//     BW: 100,
//     CE: 100,
//     CW: 100,
//     RE: 100,
//     RC: 100,
//     RW: 100,
//     BN: 100,
//     BS: 100,
//     B1: 100,
//     B2: 100,
//   },
//   {
//     name: "BTech 21",
//     SE: 100,
//     SW: 100,
//     BE: 100,
//     BW: 100,
//     CE: 100,
//     CW: 100,
//     RE: 100,
//     RC: 100,
//     RW: 100,
//     BN: 100,
//     BS: 100,
//     B1: 100,
//     B2: 100,
//   },
//   {
//     name: "BTech 22",
//     SE: 100,
//     SW: 100,
//     BE: 100,
//     BW: 100,
//     CE: 100,
//     CW: 100,
//     RE: 100,
//     RC: 100,
//     RW: 100,
//     BN: 100,
//     BS: 100,
//     B1: 100,
//     B2: 100,
//   },
//   {
//     name: "BTech 23",
//     SE: 100,
//     SW: 100,
//     BE: 100,
//     BW: 100,
//     CE: 100,
//     CW: 100,
//     RE: 100,
//     RC: 100,
//     RW: 100,
//     BN: 100,
//     BS: 100,
//     B1: 100,
//     B2: 100,
//   },
//   {
//     name: "MTech 22",
//     SE: 100,
//     SW: 100,
//     BE: 100,
//     BW: 100,
//     CE: 100,
//     CW: 100,
//     RE: 100,
//     RC: 100,
//     RW: 100,
//     BN: 100,
//     BS: 100,
//     B1: 100,
//     B2: 100,
//   },
//   {
//     name: "MTech 23",
//     SE: 100,
//     SW: 100,
//     BE: 100,
//     BW: 100,
//     CE: 100,
//     CW: 100,
//     RE: 100,
//     RC: 100,
//     RW: 100,
//     BN: 100,
//     BS: 100,
//     B1: 100,
//     B2: 100,
//   },
//   {
//     name: "PHD",
//     SE: 100,
//     SW: 100,
//     BE: 100,
//     BW: 100,
//     CE: 100,
//     CW: 100,
//     RE: 100,
//     RC: 100,
//     RW: 100,
//     BN: 100,
//     BS: 100,
//     B1: 100,
//     B2: 100,
//   },
// ];
 
export default function TableWithStripedColumns({data, heading}) {
  const [TABLE_ROWS, setTABLE_ROWS] = useState([]);
  const [TABLE_HEAD, setTABLE_HEAD] = useState({});
  useEffect(()=>{
    const TABLE_ROWS = [];
    const TABLE_HEAD = {};
    TABLE_HEAD["Batches"] = {};
    for (let i = 1; i < data.length; i++) {
      const [batch, ...wingValues] = data[i];
      const rowData = { name: batch };
      
      wingValues.forEach((value, index) => {
        const hostel = data[0][index + 1].split(' ')[0]; // Extract hostel name
        const wing = data[0][index + 1].split(' ')[1]; // Extract wing name
        
        if (!TABLE_HEAD[hostel]) {
          TABLE_HEAD[hostel] = { Wings: [] };
        }
        if (!TABLE_HEAD[hostel].Wings.includes(wing)) {
          TABLE_HEAD[hostel].Wings.push(wing);
        }
        
        rowData[`${hostel} ${wing}`] = value;
      });
      
      TABLE_ROWS.push(rowData);
    }
    setTABLE_ROWS(TABLE_ROWS);
    setTABLE_HEAD(TABLE_HEAD);
  }, [data])
  const handleApply = () => {
    const confirm = window.confirm("Are you sure you want to apply this allocation?");
    if (confirm) {
      // Apply the allocation
      const backendUrl = process.env.REACT_APP_BASE_URL;
      axios.get(`${backendUrl}/api/apply_saved_mapping?name=${heading}`, { withCredentials: true })
      .then((res) => {
        alert("Allocation applied successfully!");
      })
    }
  }
  return (
  <div className="flex flex-column justify-center items-center">
    <h1 className="py">
      {heading} Allocation 
    <NavLink type="gradient" className="mx-4 rounded text-white py-2 px-4 bg-color hover:bg-blue-800" to={`/warden/sandbox/${heading}`}>View in Sandbox</NavLink>
    <Button type="gradient" className="mx-4 py-2 px-4 bg-color:red hover:bg-red-800">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>
    </Button>
    <Button type="gradient" className="mx-4 py-2 px-4 bg-red-600 hover:bg-red-800" onClick={handleApply}>
      Apply This Allocation
    </Button>
    </h1>
    
    <Card className="h-full max-w-screen-2xl overflow-scroll mb-4">
      <table className="w-full min-w-max table-auto text-left">
      <thead>
        <tr>
          {Object.entries(TABLE_HEAD).map(([head, info]) => (
            <>
            <th key={head} className="border border-gray-100 bg-white p-4 text-center" colSpan={head==="Batches"?1:info.Wings.length}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-bold leading-none opacity-70"
              >
                {head}
              </Typography>
              </th>
              </>
          ))}
        </tr>
        <tr>
          {Object.entries(TABLE_HEAD).map(([head, info]) => (
            head !== "Batches" ? (
              <>
                {info.Wings.map((wing) => (
                  <th className="border border-gray-200">
                  <Typography
                    key={wing}
                    variant="small"
                    color="blue-gray"
                    className="font-semibold leading-none opacity-70 pl-2 py-2 mb-0 text-center"
                    >
                    {wing}
                  </Typography>
                  </th>
                ))}
              </>
            ):<span>&nbsp;</span>
          ))}
        </tr>
      </thead>

      <tbody>
  {TABLE_ROWS.map(({ name, ...rowData }, index) => {
    const isLast = index === TABLE_ROWS.length - 1;
    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

    return (
      <tr key={name}>
        <td className={`${classes}`}>
          <Typography variant="small" color="blue-gray" className="font-normal">
            {name}
          </Typography>
        </td>
        {Object.entries(rowData).map(([key, value]) => (
          <td key={key} className={`${classes} ${key === 'name' ? 'bg-blue-gray-50/50' : ''}`}>
            <Typography variant="small" color="blue-gray" className="font-normal text-center">
              {value}
            </Typography>
          </td>
        ))}
      </tr>
    );
  })}
</tbody>

      </table>
    </Card>
    </div>
  );
}