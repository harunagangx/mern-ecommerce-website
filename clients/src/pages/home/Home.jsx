import React from 'react';
import HeroSection from '../../components/heroSection/HeroSection';
import HomeImg1 from '../../assets/homeImg1.png';
import HomeImg2 from '../../assets/homeImg2.png';
import ProductCard from '../../components/productCard/ProductCard';
import { Link } from 'react-router-dom';

import './Home.scss';

const Home = () => {
  return (
    <>
      <HeroSection />
      <section className="status__section container">
        <div className="row">
          <div className="col-lg-3">
            <h1 className="text-capitalize">Why choosing us</h1>
          </div>
          <div className="col-lg-3">
            <h4>Luxury facilities</h4>
            <p>
              The advantage of hiring a workspace with us is that gives you
              comfortable service and all-around facilities
            </p>
          </div>
          <div className="col-lg-3">
            <h4>Affordable Price</h4>
            <p>
              You can get a workspace of the highest quality at an affordable
              price and still enjoy the facilities that are only here
            </p>
          </div>
          <div className="col-lg-3">
            <h4>Many Choices</h4>
            <p>
              We provide many workspace choices so that you can choose the
              workspace to your liking
            </p>
          </div>
        </div>
      </section>

      {/* <section className="product__section">
        <div className="container">
          <h4 className="text-center">Featured Products</h4>
          <div className="row">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>
      </section> */}

      <section className="experience__section">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-6">
              <img src={HomeImg1} alt="" />
            </div>
            <div className="col-md-6 col-lg-6">
              <h4 className="text-uppercase">Experiences</h4>
              <h1 className="text-capitalize mt-2 mb-3">
                we provide you the best experience
              </h1>
              <p className="mb-4">
                You don't have to worry about the result because all of these
                interiors are made by people who are professionals in their
                fields with an elegant and luxurious style and with premium
                quality materials
              </p>
              <button>
                <Link>More Info</Link>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="material__section">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-6">
              <h4 className="text-uppercase">Materials</h4>
              <h1 className="text-capitalize mt-2 mb-3">
                We have a strict quality control process for materials
              </h1>
              <p className="mb-4">
                Our strict, eco-friendly quality control process ensures premium
                materials and top-notch standards, reflecting our commitment to
                both excellence and sustainability. Your satisfaction and trust
                are paramount.
              </p>
              <button>
                <Link>More Info</Link>
              </button>
            </div>
            <div className="col-md-6 col-lg-6">
              <img src={HomeImg2} alt="" />
            </div>
          </div>
        </div>
      </section>

      <section className="newsletter__section d-flex align-items-center justify-content-center flex-column">
        <h1>Subscribe To Out Newsletter</h1>
        <p className="mt-2 mb-4">
          Subscribe to our email newsletter today to receive update on the
          latest news
        </p>
        <div className="input__wrapper d-flex align-items-center">
          <input type="text" placeholder="Enter your email" />
          <button>Join Now</button>
        </div>
      </section>
    </>
  );
};

export default Home;
