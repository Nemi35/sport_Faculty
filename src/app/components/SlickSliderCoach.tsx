// components/SlickSlider.tsx

import React from 'react';
import Slider from 'react-slick';

const SlickSliderCoach = () => {
  const settings = {
    dots: true,             
    infinite: true,         // Infinite loop sliding
    speed: 500,             // Slide transition speed
    slidesToShow: 4,        // Show 3 slides at a time
    slidesToScroll: 4,      // Scroll 1 slide at a time
    responsive: [
      {
        breakpoint: 768,    // For mobile screens
        settings: {
          slidesToShow: 1,  // Show only 1 slide on mobile
        },
      },
    ],
  };

  return (
    <div className=' overflow-x-hidden '>
      <Slider {...settings}>
        <div className='w-[90%] p-2 m-2 h-[500px] bg-red-200'>
          <h3>Slide 1</h3>
          <p>Content for Slide 1</p>
        </div>
        <div className='w-full p-2 m-2 h-[500px] bg-blue-200'>
          <h3>Slide 2</h3>
          <p>Content for Slide 1</p>
        </div>
        <div className='w-full p-2 m-2 h-[500px] bg-green-200'>
          <h3>Slide 3</h3>
          <p>Content for Slide 1</p>
        </div>
        <div className='w-full p-2 m-2 h-[500px] bg-yellow-200'>
          <h3>Slide 4</h3>
          <p>Content for Slide 1</p>
        </div>
        <div className='w-full p-2 m-2 h-[500px] bg-pink-200'>
          <h3>Slide 5</h3>
          <p>Content for Slide 1</p>
        </div>
      </Slider>
    </div>
  );
};

export default SlickSliderCoach;
