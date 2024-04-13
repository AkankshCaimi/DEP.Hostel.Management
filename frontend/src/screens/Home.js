import React, { useEffect, useMemo, useRef, useState } from 'react';
import ImageSlider from '../components/ImageSlider';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Cal from '../components/Calendar';
import '../styles/tailwind.css';
import { useAuth } from '../contexts/authContext';
import aarohan from '../images/aarohan.png'
import alankar from '../images/alankar.png'
import arturo from '../images/arturo.png'
import decypher from '../images/decypher.png'
import undekha from '../images/undekha.png'
import zeitgeist from '../images/zeitgeist.png'
import axios from 'axios';
import Modal from 'react-modal';



function Home() {
  const { currentUser, loading } = useAuth();
  const backendUrl = process.env.REACT_APP_BASE_URL;
  const facilities = [
    { name: 'Aarohan', imageUrl: aarohan, url: 'https://www.google.com' },
    { name: 'Zeitgeist', imageUrl: zeitgeist, url: 'https://www.google.com' },
    { name: 'Decypher', imageUrl: decypher, url: 'https://www.google.com' },
    { name: 'Arturo', imageUrl: arturo, url: 'https://www.google.com' },
    { name: 'Undekha', imageUrl: undekha, url: 'https://www.google.com' },
    { name: 'Alankar', imageUrl: alankar, url: 'https://www.google.com' },
  ];
  const renderAddCircular = useMemo(() => {
    return !loading &&
    currentUser && (currentUser.roles.includes('caretaker')|| currentUser.roles.includes('warden') || currentUser.roles.includes('admin') )
  }, [loading]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newCircular, setNewCircular] = useState({ text: '', url: '' });
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [selectedCirculars, setSelectedCirculars] = useState([]);

  //working perfectly fine
  const [circulars, setCirculars] = useState([]);
  useEffect(() => {
    axios
      .get(`${backendUrl}/api/circulars`, { withCredentials: true })
      .then((res) => {
        // console.log("here:", res.data);
        setCirculars(res.data);
      })
      .catch((error) => {
        // console.error("Error fetching data:", error);
      });
  }, []);
  // const circulars = [{ text: 'Online Hostel/Mess Fee Payment', url: 'https://www.google.com' },
  // { text: 'Students Guest Accommodation', url: 'https://www.google.com' },
  // { text: 'Online Bulk Accommodation', url: 'https://www.google.com' },
  // { text: 'Hostel Office Working Hours', url: 'https://www.google.com' },
  // { text: 'Mess Rebate Rules', url: 'https://www.google.com' },
  // { text: 'Circular Item 6', url: 'https://www.google.com' },
  // { text: 'Circular Item 7', url: 'https://www.google.com' },
  // { text: 'Circular Item 8', url: 'https://www.google.com' },
  // { text: 'Circular Item 9', url: 'https://www.google.com' },
  // { text: 'Circular Item 10', url: 'https://www.google.com' }];
  const scrollRef = useRef();

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (scrollRef.current) {
  //       if (scrollRef.current.scrollTop + scrollRef.current.clientHeight >= scrollRef.current.scrollHeight) {
  //         console.log(scrollRef.current.scrollTop, scrollRef.current.clientHeight, scrollRef.current.scrollHeight);
  //         scrollRef.current.scrollTop = 0;
  //       } else {
  //         scrollRef.current.scrollTop += 1;
  //       }
  //     }
  //   }, 50); // Change the interval to control the speed of rotation

  //   return () => clearInterval(interval);
  // }, []);

  // const openDeleteModal = () => {
  //   setDeleteModalIsOpen(true);
  // };


  const handleCircularSelect = (id) => {
    setCirculars(circulars.map(circular => {
      if (circular.id === id) {
        return { ...circular, isSelected: !circular.isSelected };
      } else {
        return circular;
      }
    }));
  };

  const deleteSelectedCirculars = async () => {
    const selectedIds = circulars.filter(circular => circular.isSelected).map(circular => circular.id);

    axios.delete(`${backendUrl}/api/circulars/`, { data: { ids: selectedIds } }, { withCredentials: true })
      .then((res) => {
        setCirculars(circulars.filter(circular => !circular.isSelected));
        setDeleteModalIsOpen(false);
      })
      .catch((error) => {
        console.error('Failed to delete circulars:', error);
      });
  };

  const handleDelete = (event) => {
    event.preventDefault();
    deleteSelectedCirculars();
  };



  const handleSubmit = (event) => {
    // setModalIsOpen(false);
    event.preventDefault();
    axios.post(`${backendUrl}/api/circulars/`, newCircular, { withCredentials: true })
      .then((res) => {
        setCirculars(res.data);
        setModalIsOpen(false);
      })
      .catch((error) => {
        console.error("Error adding circular:", error);
      });
  };

  return (
    <div className='text-center flex flex-col '>
      <div className='w-full'>
        <ImageSlider />
      </div>

      <div className='w-full flex mt-4'>
        <div className='w-7/10 p-4'>
          <h2 className='text-lg font-bold mb-2 bg-black text-white p-2'>Student Facilities</h2>
          <div className='grid grid-cols-3 gap-4'>
            {facilities.map((facility, index) => (
              <div key={index} className='relative shadow-lg p-4 aspect-w-16 aspect-h-9'>
                <img src={facility.imageUrl} alt={facility.name} className='w-full h-full object-cover rounded shadow-lg' />
                <a href={facility.url} target="_blank" rel="noopener noreferrer" className='absolute inset-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50 text-white text-center text-2xl no-underline hover:underline rounded'>
                  {facility.name}
                </a>
              </div>
            ))}
          </div>




          <div className='w-full p-4 mb-200'>
            {/* Content for the 70% width side */}
            <div className='h-96 w-full relative'>
              <p>
                lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget nunc
              </p>
            </div>
          </div>



        </div>
        <div className='w-3/10 p-4 bg-gray-100'>
          <h2 className='text-lg font-bold mb-2'>Circulars</h2>
          <div ref={scrollRef} className='overflow-hidden h-64 space-y-4 '>
            {circulars.map((circular, index) => (
              <div key={index} className='mb-1 shadow-lg p-2 transform transition-all text-left'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                  stroke="currentColor" className="inline-block mr-2 w-6 h-6 text-yellow-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                </svg>

                <a href={circular.url} target="_blank" rel="noopener noreferrer" className="text-black no-underline hover:underline">{circular.text}</a>
              </div>

            ))}
          </div>
          {/* for caretaker only only */}
          {renderAddCircular && (<div className="flex justify-between mt-6">
            <button onClick={() => setModalIsOpen(true)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4'>
              Add Circular
            </button>
            <button onClick={() => setDeleteModalIsOpen(true)} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4'>
              Delete Circular
            </button>
          </div>)}
          <Modal isOpen={deleteModalIsOpen} className="flex items-center justify-center h-screen">
            <form className="bg-white rounded p-6 m-4 max-w-xs mx-auto" onSubmit={handleDelete}>
              <h2>Select Circulars to Delete</h2>
              {circulars.map((circular, index) => (
                <div key={index}>
                  <input type='checkbox' id={circular.id} onChange={() => handleCircularSelect(circular.id)} />
                  <label htmlFor={circular.id}>{circular.text}</label>
                </div>
              ))}
              <div className="flex justify-between mt-6">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Delete Selected</button>
                <button type="button" onClick={() => setDeleteModalIsOpen(false)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
              </div>
            </form>
          </Modal>
          <Modal isOpen={modalIsOpen} className="flex items-center justify-center h-screen">
            <form onSubmit={handleSubmit} className="bg-white rounded p-6 m-4 max-w-xs mx-auto">
              <label className="block mb-2">
                <span className="text-gray-700">Text:</span>
                <input type="text" value={newCircular.text} onChange={(e) => setNewCircular({ ...newCircular, text: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
              </label>
              <label className="block mb-2">
                <span className="text-gray-700">URL:</span>
                <input type="text" value={newCircular.url} onChange={(e) => setNewCircular({ ...newCircular, url: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
              </label>
              <div className="flex justify-between mt-6">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                <button type="button" onClick={() => setModalIsOpen(false)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
              </div>
            </form>
          </Modal>

          <div className='w-full p-4'>
            <Cal />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
