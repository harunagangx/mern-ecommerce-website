import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingInfo } from '../../actions/cartAction';
import { toast } from 'sonner';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import './Shipping.scss';

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [country, setCountry] = useState(shippingInfo.country);
  const [phoneNum, setPhoneNum] = useState(shippingInfo.phoneNum);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (phoneNum.length < 10 || phoneNum.length > 12) {
      toast.error('The format of the phone number is incorrect');
      return;
    }

    dispatch(saveShippingInfo({ address, city, country, phoneNum }));
    navigate('/confirm-order');
  };

  return (
    <div className="shipping__container d-flex flex-column align-items-center justify-content-center pt-5">
      <div className="shipping__box">
        <h3 className="text-center p-3">Shipping Details</h3>
        <form onSubmit={handleSubmit}>
          <div className="input__container mb-3">
            <label className="mb-1">Address</label>
            <input
              type="text"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="input__container mb-3">
            <label className="mb-1">City</label>
            <input
              type="text"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="input__container mb-3">
            <label className="mb-1">Country</label>
            <input
              type="text"
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <div className="input__container mb-4">
            <label className="mb-1">Phone Number</label>
            <PhoneInput
              international={true}
              countryCallingCodeEditable={true}
              value={phoneNum}
              onChange={setPhoneNum}
              required
            />
          </div>
          <button type="submit">Continue</button>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
