import React, { useState } from 'react';
import '../styles/tailwind.css';

const AddFaculty = () => { 
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [file, setFile] = useState(null);
    const [isManual, setIsManual] = useState(true);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleOptionChange = (option) => {
        setIsManual(option === 'manual');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission or file upload logic here
        console.log('Form submitted:', {
            name,
            phoneNumber,
            email,
            file,
            isManual,
        });
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Add Faculty</h1> 
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
                                className={`border border-gray-300 rounded px-4 py-2 w-full ${isManual ? '' : ' cursor-not-allowed'}`}
                                value={name}
                                onChange={isManual ? handleNameChange : null}
                                disabled={!isManual}

                            />
                        </div>
                        <div className={`mb-4 ${isManual ? '' : 'cursor-not-allowed'}`}>
                            <label htmlFor="phoneNumber" className={`block font-bold mb-2 ${isManual ? '' : 'cursor-not-allowed'}`}>
                                Phone Number
                            </label>
                            <input
                                type="text"
                                id="phoneNumber"
                                className={`border border-gray-300 rounded px-4 py-2 w-full ${isManual ? '' : 'cursor-not-allowed'}`}
                                value={phoneNumber}
                                onChange={isManual ? handlePhoneNumberChange : null}
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
                                className={`border border-gray-300 rounded px-4 py-2 w-full ${isManual ? '' : 'cursor-not-allowed'}`}
                                value={email}
                                onChange={isManual ? handleEmailChange : null}
                                disabled={!isManual}
                            />
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

export default AddFaculty;
