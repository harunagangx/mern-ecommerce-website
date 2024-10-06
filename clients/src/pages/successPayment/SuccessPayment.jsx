import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './SuccessPayment.scss';

const SuccessPayment = () => {
  return (
    <div className="order-success__wrapper d-flex flex-column justify-content-center align-items-center">
      <FaCheckCircle size={'7rem'} color="#f94d00" />
      <h4 className="mt-4 mb-1">
        Your order has been placed successfully.{' '}
        <Link to="/my-orders">View Orders</Link>
      </h4>
    </div>
  );
};

export default SuccessPayment;
