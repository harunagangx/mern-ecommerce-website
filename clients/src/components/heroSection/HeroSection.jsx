import React from 'react';
import HeroImg from '../../assets/heroImg.png';
import './HeroSection.scss';

const HeroSection = () => {
  return (
    <div className="hero__container">
      <div className="hero__img">
        <img src={HeroImg} alt=""/>
      </div>
      <div className="hero__context">
          <p className="top__context">EXCLUSIVE FURNITURE</p>
          <h1 className="center__context">COMFORT</h1>
          <p className="bottom__context float-end">
            Explore a wide range of high-quality furniture classic styles
            furniture
          </p>
      </div>
    </div>
  );
};

export default HeroSection;
