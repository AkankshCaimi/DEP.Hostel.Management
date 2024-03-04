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
      <div className='flex flex-row w-full'>
        <div className='w-70 border-r border-solid border-black p-4 mb-200'>
          {/* Content for the 70% width side */}
          <p>
            {/* Your content goes here */}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate doloribus quidem dolorum quisquam nulla commodi nostrum vero dolores praesentium deleniti non suscipit sint eius, totam odio, cumque repudiandae consequuntur culpa amet officia velit. Error voluptates dolore laudantium dolores accusamus similique.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero quas ea, cum alias porro aliquam illum molestiae culpa laborum odit distinctio ipsam minus ab amet voluptas sapiente recusandae molestias, earum accusamus provident sequi exercitationem. Officia, culpa ratione numquam sed est saepe amet rerum doloremque iure earum qui. Quod hic magni rem, blanditiis a quibusdam reiciendis odio illum facere maxime id quo maiores numquam sunt ipsam cumque, quisquam qui natus dicta quam veritatis!
            Ea excepturi enim non. Inventore corrupti ad, reiciendis at voluptate possimus dolor repellat ducimus nisi obcaecati vitae facilis quibusdam explicabo velit officia, eius, recusandae modi odio similique laboriosam?
          </p>
        </div>
        <div className='w-30 p-4'>
          <Cal />
        </div>
      </div>
    </div>
  );
}

export default Home;
