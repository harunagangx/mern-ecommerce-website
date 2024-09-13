import React from 'react';
import LogoIcon from '../../assets/logo-icon.svg';
import PaymentImg from '../../assets/payment.png';
import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = () => {
  return (
    <div className="footer__container">
      <div className="container">
        <div className="row">
          <div className="col-xl-4 col-md-12 col-md-12">
            <div className="footer__logo">
              <div className="d-flex align-items-center gap-2">
                <img src={LogoIcon} alt="" sizes="30px, 30px" />
                <h5>NOVACANE</h5>
              </div>
              <p className="mt-xl-3 mt-md-1">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Adipisci, quis iusto aliquid consequatur omnis nostrum.
              </p>
            </div>
          </div>
          <div className="col-6 col-md-6 col-lg-3 mt-md-3">
            <div className="footer__quick-links">
              <h5 className="quick-links__title">Navigation</h5>
              <ul className="list-group">
                <li className="list-group-item">
                  <Link>Home</Link>
                </li>
                <li className="list-group-item">
                  <Link>Products</Link>
                </li>
                <li className="list-group-item">
                  <Link>Products</Link>
                </li>
                <li className="list-group-item">
                  <Link>Contact</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-6 col-md-6 col-lg-2 mt-md-3">
            <div className="footer__quick-links">
              <h5 className="quick-links__title">Navigation</h5>
              <ul className="list-group">
                <li className="list-group-item">
                  <Link>Home</Link>
                </li>
                <li className="list-group-item">
                  <Link>Products</Link>
                </li>
                <li className="list-group-item">
                  <Link>Products</Link>
                </li>
                <li className="list-group-item">
                  <Link>Contact</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-12 col-md-10 col-lg-3 mt-md-3">
            <div className="footer__quick-links">
              <h5 className="quick-links__title">Payment Methods</h5>
              <p className="mt-2">
                Select one of many supported payment providers from the list
                below.
              </p>
              <div>
                <img src={PaymentImg} alt="" />
              </div>
            </div>
          </div>
          <div className="col-12 mt-5">
            <div className="text-center">
              <p>© 2024 Copyright, All Rights Reserved</p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
