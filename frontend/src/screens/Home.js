import React from 'react';
import ImageSlider from './Home/ImageSlider';
import Cal from './Home/Calendar';
import '../styles/tailwind.css';

function Home() {
  return (
    <div className='text-center flex flex-col '>
      <div className='w-full'>
        <ImageSlider />
      </div>

      <div className='w-full flex mt-4'>
  <div className='w-7/10 p-4'>
    <h2 className='text-lg font-bold mb-2 bg-black text-white p-2'>Student Facilities</h2>
    <div className='grid grid-cols-3 gap-4'>
      {['Mitr', 'Gymkhana', 'Eateries Shops', 'Hospital', 'Student Film Club', 'Hostel Security'].map((facility, index) => (
        <div key={index} className='flex flex-col items-center shadow-lg p-4'>
          {/* Replace `icon.png` with the actual path to your icons */}
          <img src={`icon${index}.png`} alt={facility} className='mb-2' />
          <span>{facility}</span>
        </div>
      ))}
    </div>
    <div className='w-full p-4 mb-200'>
      {/* Content for the 70% width side */}
      <p>
        {/* Your content goes here */}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate doloribus quidem dolorum quisquam nulla commodi nostrum vero dolores praesentium deleniti non suscipit sint eius, totam odio, cumque repudiandae consequuntur culpa amet officia velit. Error voluptates dolore laudantium dolores accusamus similique.
      </p>
    </div>
  </div>
  <div className='w-3/10 p-4 bg-gray-100'>
    <h2 className='text-lg font-bold mb-2'>Circulars</h2>
    <ul>
      {['Online Hostel/Mess Fee Payment', 'Students Guest Accommodation', 'Online Bulk Accommodation', 
       'Hostel Office Working Hours','Mess Rebate Rules'].map((circular, index) => (
        <li key={index} className='mb-1 shadow-lg p-2'>
          {/* Replace `bullet.png` with the actual path to your bullet icon */}
          <img src={`bullet${index}.png`} alt="bullet" className="inline-block mr-2" />
          {circular}
        </li>
      ))}
    </ul>
    <div className='w-full p-4'>
      <Cal />
    </div>
  </div>
</div>


    </div>
  );
}

export default Home;
