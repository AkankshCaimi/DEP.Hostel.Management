import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
  import { useState } from "react";
  
  export default function CardWithForm() {
    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Check if all fields are filled
      if (
        formData.firstName.trim() === "" ||
        formData.lastName.trim() === "" ||
        formData.email.trim() === "" ||
        formData.message.trim() === ""
      ) {
        alert("Please fill in all fields");
        return;
      }
      // Handle form submission here
      console.log(formData);
    };
  
    return (
      <div className="flex flex-col lg:flex-row justify-center items-center gap-10">
        <Card className="my-10 lg:w-96 w-full mx-0">
          <CardHeader color="white" className="mt-10 relative h-60 py-4 flex items-center justify-center">
            <img src={require('../images/iitropar.jpg')} alt="logo" className="h-full" /> 
          </CardHeader>
          <CardBody className="">
            <Typography variant="h5" color="blue-gray" className="mb-2 text-center">
              Contact Details
            </Typography>
            <Typography>
    <div className="container mx-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="px-0 py-1 whitespace-nowrap">
              <span className="font-bold">Email:</span>
            </td>
            <td className="px-0 py-1 whitespace-nowrap">
              <a href="mailto:hostelmanagement@iitrpr.ac.in" className="text-blue-500">hostelmanagement@iitrpr.ac.in</a>
            </td>
          </tr>
          <tr>
            <td className="px-0 py-1 whitespace-nowrap">
              <span className="font-bold">Phone:</span>
            </td>
            <td className="px-0 py-1 whitespace-nowrap">
              +91-934682XXXX
            </td>
          </tr>
          <tr>
            <td className="px-0 py-1 whitespace-nowrap">
              <span className="font-bold">Address:</span>
            </td>
            <td className="px-0 py-1 whitespace-wrap">
              Indian Institute of Technology Ropar (Main Campus), Bara Phool, Ropar, India
            </td>
          </tr>
          <tr>
            <td className="px-0 py-1 whitespace-nowrap">
              <span className="font-bold">Postal Code:</span>
            </td>
            <td className="px-1 py-1 whitespace-nowrap">
              140001
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </Typography>
  
          </CardBody>
        </Card>
        <div className="lg:w-96 flex flex-col justify-between mt-3 px-5 bg-white rounded-2xl my-10 w-full mx-0">
          <h1 className="text-3xl flex justify-center text-blue-gray-700 my-10 mt-3">Contact Us</h1>
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="mb-4">
              <label htmlFor="firstName" className="pl-2 block text-sm font-medium text-blue-gray-700">First Name*</label>
              <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} className="border-2 border-blue-gray-200 p-1 mt-1 pl-2 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required />
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="pl-2 block text-sm font-medium text-blue-gray-700">Last Name*</label>
              
              <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className="border-2 border-blue-gray-200 p-1 mt-1 pl-2 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="pl-2 block text-sm font-medium text-blue-gray-700">Email*</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="border-2 border-blue-gray-200 p-1 mt-1 pl-2 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="pl-2 block text-sm font-medium text-blue-gray-700">Message*</label>
              <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="4" className="border-2 border-blue-gray-200 p-1 mt-1 pl-2 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required></textarea>
            </div>
            <Button type="submit" className="mx-auto bg-color py-3 flex justify-center">Submit</Button>
          </form>
        </div>
      </div>
    );
  }