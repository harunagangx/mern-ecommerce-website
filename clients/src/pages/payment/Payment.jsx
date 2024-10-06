import React, { Fragment, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder, clearErrors } from '../../actions/orderAction';
import { clearCartItems } from '../../actions/cartAction';
import { useNavigate } from 'react-router-dom';
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from '@stripe/react-stripe-js';
import { toast } from 'sonner';
import { ImCreditCard } from 'react-icons/im';
import { MdOutlineVpnKey } from 'react-icons/md';
import { SlCalender } from 'react-icons/sl';
import axios from 'axios';
import './Payment.scss';

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));

  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const payBtn = useRef();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);

  const { user } = useSelector((state) => state.user);

  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo.orderTotal),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingFee: orderInfo.shippingFee,
    orderTotal: orderInfo.orderTotal,
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        '/api/v1/payment/process',
        paymentData,
        config
      );

      const clientSecret = data.clientSecret;

      console.log(clientSecret);

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;

        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));
          dispatch(clearCartItems());
          navigate('/success');
        } else {
          toast.error("There's some issue while processing payment");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <Fragment>
      <div className="payment__wrapper d-flex align-items-center justify-content-center">
        <div className="form__wrapper">
          <div className="d-flex justify-content-between">
            <h3>Order Total: </h3>
            <h3>${orderInfo.orderTotal}</h3>
          </div>
          <div className="divider"></div>
          <h4>Card Information</h4>
          <form onSubmit={handlePayment}>
            <div className="input__wrapper mt-1 mb-4">
              <ImCreditCard size={25} />
              <CardNumberElement className="payment__input" />
            </div>
            <div className="input__wrapper mb-4">
              <SlCalender size={25} />
              <CardExpiryElement className="payment__input" />
            </div>
            <div className="input__wrapper mb-4">
              <MdOutlineVpnKey size={25} />
              <CardCvcElement className="payment__input" />
            </div>
            <button type="submit" ref={payBtn}>
              Pay now
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Payment;
