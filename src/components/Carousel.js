// src/components/Carousel.js
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const EventCarousel = () => {
  return (
    <Carousel showThumbs={false} autoPlay infiniteLoop>
      <div>
        <img src="/images/concert-a.jpg" alt="Concert A" />
        <p className="legend">Concert A</p>
      </div>
      <div>
        <img src="/images/concert-b.jpg" alt="Concert B" />
        <p className="legend">Concert B</p>
      </div>
    </Carousel>
  );
};

export default EventCarousel;
