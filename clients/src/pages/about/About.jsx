import React from 'react';
import AboutImg1 from '../../assets/aboutImg1.jpg';
import AboutImg2 from '../../assets/aboutImg2.jpg';
import AboutImg3 from '../../assets/aboutImg3.jpg';
import AboutImg4 from '../../assets/aboutImg4.jpg';
import AboutImg5 from '../../assets/aboutImg5.jpg';
import BreadCrumbSection from '../../components/breadCrumbSection/BreadCrumbSection';
import { MdOutlineTouchApp } from 'react-icons/md';
import { BiAward } from 'react-icons/bi';
import { GiWorld } from 'react-icons/gi';
import { AiOutlineRise } from 'react-icons/ai';
import './About.scss';

const About = () => {
  return (
    <>
      <BreadCrumbSection title="About Us" />
      <section className="about__section container">
        <div className="about__section-top mb-5">
          <div className="section__title text-center">
            <h1 className="">NOVACANE</h1>
            <h3>Where Innovation Meets Designer</h3>
          </div>
          <img src={AboutImg1} alt="" />
        </div>
        <div className="about__section-journey">
          <div className="section__title text-center">
            <h1>Our Story</h1>
          </div>
          <div className="section__content">
            <div className="row mt-xl-5 mt-md-5 mt-sm-2">
              <div className="col-lg-6 col-md-6 p-4">
                <img src={AboutImg2} alt="" />
              </div>
              <div className="col-lg-6 col-md-6 p-4">
                <span className="d-flex align-items-center justify-content-center">
                  <MdOutlineTouchApp size={30} />
                </span>
                <h3 className="text-capitalize mt-4 mb-3">
                  from humble beginnings
                </h3>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Deserunt ex recusandae, earum excepturi repudiandae facere
                  error fugiat ipsa assumenda molestias voluptates! Voluptates,
                  libero doloribus exercitationem at maxime adipisci sint dolor!
                </p>
              </div>
            </div>
            <div className="row mt-xl-5 mt-md-5 mt-sm-2">
              <div className="col-lg-6 col-md-6 p-4">
                <span className="d-flex align-items-center justify-content-center">
                  <BiAward size={30} />
                </span>
                <h3 className="text-capitalize mt-4 mb-3">
                  milestones and achievements
                </h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Incidunt cumque, iure soluta, iusto voluptates quaerat quidem
                  accusamus blanditiis eos laudantium ratione ad dolor delectus
                  velit!
                </p>
              </div>
              <div className="col-lg-6 col-md-6 p-4">
                <img src={AboutImg3} alt="" />
              </div>
            </div>
            <div className="row mt-xl-5 mt-md-5 mt-sm-2">
              <div className="col-lg-6 col-md-6 p-4">
                <img src={AboutImg4} alt="" />
              </div>
              <div className="col-lg-6 col-md-6 p-4">
                <span className="d-flex align-items-center justify-content-center">
                  <AiOutlineRise size={30} />
                </span>
                <h3 className="text-capitalize mt-4 mb-3">
                  innovation and growth
                </h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem rem esse perspiciatis fuga corrupti? Esse rerum saepe repudiandae iure quidem est, maxime, excepturi ratione atque assumenda fugiat quibusdam totam doloribus.
                </p>
              </div>
            </div>
            <div className="row mt-xl-5 mt-md-5 mt-sm-2">
              <div className="col-lg-6 col-md-6 p-4">
                <span className="d-flex align-items-center justify-content-center">
                  <GiWorld size={30} />
                </span>
                <h3 className="text-capitalize mt-4 mb-3">our global reach</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Expedita recusandae modi inventore, unde minus aliquid eius
                  neque reiciendis molestias ad cupiditate repellendus cum
                  beatae quod.
                </p>
              </div>
              <div className="col-lg-6 col-md-6 p-4">
                <img src={AboutImg5} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
