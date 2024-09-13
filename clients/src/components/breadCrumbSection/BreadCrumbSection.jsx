import React from 'react';
import "./BreadCrumbSection.scss"

const BreadCrumbSection = ({ title }) => {
  return (
    <section className="common__section">
      <div className="h-100 d-flex align-items-center justify-content-center">
        <h1 className='text-center'>{title}</h1>
      </div>
    </section>
  );
};

export default BreadCrumbSection;
