import React, {useState, useEffect} from "react";
import "../styles/tailwind.css";
import { useParams } from "react-router-dom";
import axios from "axios";
const ApplicationView = () => {
  // Dummy data for testing
  const backendUrl=process.env.REACT_APP_BASE_URL;
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
  })
  const [application, setApplication] = useState(null);
  const { id } = useParams();
  const variableClassName=(idx)=>idx<=7?"border-b":"border-b hover:cursor-pointer";
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
  useEffect(()=>{
    // Fetch application data from backend using the application ID
    axios.get(`${backendUrl}/api/get_application/${id}`, {withCredentials: true})
    .then((res)=>{
      console.log(res.data);
      setApplication({
        instiId: res.data.data.instiId,
        letter: res.data.data.letter
      });
      const newObj={...res.data.data};
      newObj.instiId="View PDF";
      newObj.letter="View PDF";
      setFormData(newObj);
    })
    .catch((err)=>{
      console.log(err);
    })
  },[])
  const handleClick=(e, idx)=>{
    if(idx<=7) return;
    if(application){
      console.log('here', application)
      const urls=[`data:application/pdf;base64,${application.instiId}`, `data:application/pdf;base64,${application.letter}`];
      window.open(urls[idx-8])
    }
  }
  return (
    <div className="container mx-auto mt-8 p-18 bg-gray-100 rounded mb-4">
      <h1 className="text-2xl font-bold">Application</h1> {/* Remove mb-4 from here */}
      
      <div className="grid grid-cols-2 gap-8">
        <div>
          <table className="w-full border">
            <tbody>
              {fieldNames.map((fieldName, index) => (
                <tr key={index} className="border-b">
                  <td className="text-left pl-4 py-2 text-m font-medium text-gray-600 border-r" style={{ color: '#000' }} >
                    {fieldName}:
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        <div>
          <table className="w-full border">
            <tbody>
              {Object.values(formData).map((value, index) => (
                <tr key={index} className={variableClassName(index)}>
                  <td className="pl-4 py-2 text-m font-normal text-gray-800 border-r bg-white" style={{ color: '#000' }} onClick={(e)=>handleClick(e,index)}>
                    {value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ApplicationView;

{`data:application/pdf;base64,${value}`}