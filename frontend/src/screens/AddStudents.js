import React, { useState } from 'react';
import '../styles/tailwind.css';
import axios from 'axios';

const AddStudent = () => { 
    // const [name, setName] = useState('');
    // const [phoneNumber, setPhoneNumber] = useState('');
    // const [email, setEmail] = useState('');
    const [oneData, setOneData] = useState({
        name:'',
        // phoneNumber:'',
        email:'',
        gender:'',
        // department:''
    });
    const [file, setFile] = useState(null);
    const [isManual, setIsManual] = useState(true);
    const handleChange=(e)=>{
        setOneData({...oneData,[e.target.name]:e.target.value});
    }
    // const handleNameChange = (e) => {
    //     setName(e.target.value);
    // };

    // const handlePhoneNumberChange = (e) => {
    //     setPhoneNumber(e.target.value);
    // };

    // const handleEmailChange = (e) => {
    //     setEmail(e.target.value);
    // };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleOptionChange = (option) => {
        setIsManual(option === 'manual');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission or file upload logic here
        // console.log('Form submitted:', {
        //     name,
        //     phoneNumber,
        //     email,
        //     file,
        //     isManual,
        // });
        console.log(oneData);
        const data=new FormData();
        if(isManual){
            data.append('name',oneData.name);
            // data.append('phoneNumber',oneData.phoneNumber);
            data.append('email',oneData.email);
            data.append('gender', oneData.gender);
            // data.append('department', oneData.department);
        }
        else{
            data.append('file',file);
        }
        data.append('type','student');
        console.log(isManual);
        const backendUrl=process.env.REACT_APP_BASE_URL;
        axios.post(`${backendUrl}/api/add_users`,data,{withCredentials:true}, {headers: {'Content-Type': 'multipart/form-data'}})
        .then((res)=>{
            console.log(res);
        })
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Add Students</h1> 
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block font-bold mb-2">
                        <input
                            type="radio"
                            name="option"
                            value="manual"
                            checked={isManual}
                            onChange={() => handleOptionChange('manual')}
                        />
                        Add Manually
                    </label>
                    <label className="block font-bold mb-2">
                        <input
                            type="radio"
                            name="option"
                            value="file"
                            checked={!isManual}
                            onChange={() => handleOptionChange('file')}
                        />
                        Upload Excel File
                    </label>
                </div>
                <div className="flex gap-4">
                    <div
                        className={`w-full mb-4 ${isManual ? '' : 'opacity-50 cursor-not-allowed'}`}
                    >
                        <h2 className="text-xl mb-2 font-semibold ">Fill the Details:</h2>
                        <div className={`mb-4 ${isManual ? '' : 'cursor-not-allowed'}`}>
                            <label htmlFor="name" className={`block font-bold mb-2 ${isManual ? '' : ' cursor-not-allowed'}`}>
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name='name'
                                className={`border border-gray-300 rounded px-4 py-2 w-full ${isManual ? '' : ' cursor-not-allowed'}`}
                                value={oneData.name}
                                onChange={isManual ? handleChange : null}
                                disabled={!isManual}

                            />
                        </div>
                        <div className={`mb-4 ${isManual ? '' : 'cursor-not-allowed'}`}>
                            <label htmlFor="email" className={`block font-bold mb-2 ${isManual ? '' : 'cursor-not-allowed'}`}>
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name='email'
                                className={`border border-gray-300 rounded px-4 py-2 w-full ${isManual ? '' : 'cursor-not-allowed'}`}
                                value={oneData.email}
                                onChange={isManual ? handleChange : null}
                                disabled={!isManual}
                            />
                        </div>
                        <div className={`mb-4 ${isManual ? '' : 'cursor-not-allowed'}`}>
                            <label htmlFor="gender" className={`block font-bold mb-2 ${isManual ? '' : 'cursor-not-allowed'}`}>
                                Gender
                            </label>
                            <select
                                id="gender"
                                className={`border border-gray-300 rounded px-4 py-2 w-full ${isManual ? '' : 'cursor-not-allowed'}`}
                                value={oneData.gender}
                                name='gender'
                                onChange={isManual ? handleChange : null}
                                disabled={!isManual}
                            >
                                <option value="">Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className={`${isManual ? 'hover:bg-blue-700' : 'cursor-not-allowed'} bg-blue-500  text-white font-bold py-2 px-4 rounded`}
                            disabled={!isManual} // Disable button when not in manual mode
                        >
                            Submit
                        </button>
                    </div>
                    <div
                        className={`w-full mb-4 ${isManual ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <h2 className={`text-xl mb-2 font-semibold ${isManual ? 'cursor-not-allowed' : ''}`}>Upload Excel File:</h2>
                        <div className={`mb-4 ${isManual ? 'cursor-not-allowed' : ''}`}>
                            <label htmlFor="file" className="block font-bold mb-2">
                                Upload File
                            </label>
                            <input
                                type="file"
                                id="file"
                                className={`border border-gray-300 rounded px-4 py-2 w-full ${isManual ? 'cursor-not-allowed' : ''
                                    }`}
                                onChange={isManual ? null : handleFileChange}
                                disabled={isManual}
                            />
                        </div>

                        <button
                            type="submit"
                            className={`${isManual ? 'cursor-not-allowed' : 'hover:bg-blue-700 '} bg-blue-500  text-white font-bold py-2 px-4 rounded`}
                            disabled={isManual}

                        >
                            Submit
                        </button>
                    </div>
                </div>

            </form>
        </div>
    );
};

export default AddStudent;
