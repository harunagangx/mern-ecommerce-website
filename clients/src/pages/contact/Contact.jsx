import React from 'react';
import BreadCrumbSection from '../../components/breadCrumbSection/BreadCrumbSection';
import { MdOutlineMarkEmailUnread } from 'react-icons/md';
import { BsTelephoneInbound, BsTwitterX } from 'react-icons/bs';
import { ImFacebook2 } from 'react-icons/im';
import { BiLogoInstagramAlt } from 'react-icons/bi';
import { GrMapLocation } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import './Contact.scss';

const Contact = () => {
  return (
    <>
      <BreadCrumbSection title="Contact Us" />
      <section className="contact__section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="contact__context">
                <h1 className="mb-4">Get in touch</h1>
                <p>
                  We're here for you every step of the way. Whether you have
                  questions, need order assistance, or want to share feedback,
                  our friendly customer support team is ready to assist. Our
                  team is here to help! Reach out to us via
                </p>
                <div className="contact__info d-flex flex-column gap-4 mt-4 mb-4">
                  <div className="d-flex align-items-center gap-3">
                    <span className="mail-icon">
                      <MdOutlineMarkEmailUnread size={30} />
                    </span>
                    <div className="contact-text">
                      <span>Mail</span>
                      <p>furniture@gmail.com</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <span className="phone-icon">
                      <BsTelephoneInbound size={30} />
                    </span>
                    <div className="contact-text">
                      <span>Phone</span>
                      <p>(+84) 24 4601 5934</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <span className="location-icon">
                      <GrMapLocation size={30} />
                    </span>
                    <div className="contact-text">
                      <span>Address</span>
                      <p>Ha Noi, Viet Nam</p>
                    </div>
                  </div>
                </div>
                <h2>Stay connected</h2>
                <div className="d-flex align-item-center gap-4 mt-4">
                  <Link>
                    <ImFacebook2 size={20} />
                  </Link>
                  <Link>
                    <BiLogoInstagramAlt size={23} />
                  </Link>
                  <Link>
                    <BsTwitterX size={20} />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 mt-lg-0 mt-md-0 mt-sm-3">
              <div className="contact__form">
                <div className="text-center">
                  <h1>Send us a message</h1>
                  <span>Your email address will not be published.</span>
                  <p>Required all fields are marked</p>
                </div>
                <div className="form__wrapper">
                  <div className="input__wrapper">
                    <label>Name</label>
                    <input type="text" />
                  </div>
                  <div className="input__wrapper">
                    <label>Email Address</label>
                    <input type="text" />
                  </div>
                  <div className="input__wrapper">
                    <label>Phone Number</label>
                    <input type="text" />
                  </div>
                  <div className="input__wrapper">
                    <label>Messages</label>
                    <textarea type="text" rows="5" cols="30"/>
                  </div>
                  <div className="submit-btn">
                    <button type='submit'>Submit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
